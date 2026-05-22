import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type OrderItem = {
  key: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderPayload = {
  customer?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  };
  items?: OrderItem[];
  totalItems?: number;
  subtotal?: number;
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;
    const customer = body.customer;
    const items = body.items ?? [];

    if (!customer || !customer.firstName || !customer.lastName || !customer.phone || !customer.address) {
      return NextResponse.json(
        { message: "Missing customer information." },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { message: "Order items are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.ORDER_RECEIVER_EMAIL;
    const from = process.env.SMTP_FROM ?? user;

    if (!host || !port || !user || !pass || !to || !from) {
      return NextResponse.json(
        { message: "Email server is not configured." },
        { status: 500 }
      );
    }

    if (pass === "your_16_char_app_password") {
      return NextResponse.json(
        { message: "SMTP_PASS is still a placeholder. Set your real Gmail App Password in .env.local." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    });

    const itemsText = items
      .map((item) => {
        const total = item.price * item.quantity;
        return `- ${item.name} | qty: ${item.quantity} | unit: ${formatPrice(item.price)} | total: ${formatPrice(total)}`;
      })
      .join("\n");

    const subtotal = body.subtotal ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = body.totalItems ?? items.reduce((sum, item) => sum + item.quantity, 0);

    const subject = `New order from ${customer.firstName} ${customer.lastName}`;

    const text = [
      "New order received",
      "",
      `Customer: ${customer.firstName} ${customer.lastName}`,
      `Phone: ${customer.phone}`,
      `Address: ${customer.address}`,
      "",
      "Items:",
      itemsText,
      "",
      `Total items: ${totalItems}`,
      `Subtotal: ${formatPrice(subtotal)}`,
    ].join("\n");

    await transporter.verify();

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Unknown email error";
    const lower = rawMessage.toLowerCase();

    const message =
      lower.includes("invalid login") || lower.includes("username and password not accepted")
        ? "SMTP authentication failed. Use a valid Gmail App Password (16 characters), not your Gmail account password."
        : process.env.NODE_ENV === "development"
          ? `Failed to send order email: ${rawMessage}`
          : "Failed to send order email.";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
