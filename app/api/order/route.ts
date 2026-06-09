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
  return `Lek ${value.toFixed(2)}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

    const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
    const port = process.env.SMTP_PORT?.trim() || "587";
    const user = process.env.SMTP_USER?.trim();
    const rawPass = process.env.SMTP_PASS?.trim();
    // Gmail App Password is 16 chars and often copied with spaces.
    const pass = rawPass?.replace(/\s+/g, "");
    const to = process.env.ORDER_RECEIVER_EMAIL?.trim();
    const from = process.env.SMTP_FROM?.trim() || user;

    const missingVars = [
      !user ? "SMTP_USER" : null,
      !pass ? "SMTP_PASS" : null,
      !to ? "ORDER_RECEIVER_EMAIL" : null,
      !from ? "SMTP_FROM" : null,
    ].filter(Boolean);

    if (missingVars.length > 0) {
      return NextResponse.json(
        { message: `Email server is not configured. Missing: ${missingVars.join(", ")}` },
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

    const itemsHtml = items
      .map((item) => {
        const lineTotal = item.price * item.quantity;
        return `
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #ece5dd; color: #2f251d; font-size: 14px;">${escapeHtml(item.name)}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #ece5dd; color: #6f655b; font-size: 14px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #ece5dd; color: #6f655b; font-size: 14px; text-align: right;">${formatPrice(item.price)}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #ece5dd; color: #2f251d; font-size: 14px; text-align: right; font-weight: 600;">${formatPrice(lineTotal)}</td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <div style="margin:0; padding:24px; background:#f6f0eb; font-family: Georgia, 'Times New Roman', serif; color:#2f251d;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e8ddd0;">
          <div style="padding:20px 24px; border-bottom:1px solid #ece5dd; background:#fbf7f3;">
            <p style="margin:0; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#8f6f52;">Orivea Glow</p>
            <h2 style="margin:8px 0 0; font-size:30px; font-weight:500; line-height:1.1;">New Order Received</h2>
            <p style="margin:8px 0 0; color:#6f655b; font-size:14px;">From ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}</p>
          </div>

          <div style="padding:20px 24px; border-bottom:1px solid #ece5dd;">
            <p style="margin:0 0 10px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#8f6f52;">Customer Details</p>
            <p style="margin:0 0 4px; font-size:14px;"><strong>Phone:</strong> ${escapeHtml(customer.phone)}</p>
            <p style="margin:0; font-size:14px;"><strong>Address:</strong> ${escapeHtml(customer.address)}</p>
          </div>

          <div style="padding:20px 24px;">
            <p style="margin:0 0 12px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#8f6f52;">Order Items</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="padding:10px 12px; border-bottom:1px solid #d8cab8; color:#6f655b; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; text-align:left;">Product</th>
                  <th style="padding:10px 12px; border-bottom:1px solid #d8cab8; color:#6f655b; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; text-align:center;">Qty</th>
                  <th style="padding:10px 12px; border-bottom:1px solid #d8cab8; color:#6f655b; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; text-align:right;">Unit</th>
                  <th style="padding:10px 12px; border-bottom:1px solid #d8cab8; color:#6f655b; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; text-align:right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top:16px; padding:14px 16px; background:#fbf7f3; border:1px solid #ece5dd;">
              <p style="margin:0 0 6px; font-size:14px; color:#6f655b;">Total items: <strong style="color:#2f251d;">${totalItems}</strong></p>
              <p style="margin:0; font-size:16px; color:#2f251d;">Subtotal: <strong>${formatPrice(subtotal)}</strong></p>
            </div>
          </div>
        </div>
      </div>
    `;

    await transporter.verify();

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
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
