"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

type CheckoutFormState = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function ShportaPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { lang } = useLanguage();
  const isSq = lang === "sq";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formState, setFormState] = useState<CheckoutFormState>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const isFormValid = useMemo(() => {
    return (
      formState.firstName.trim().length > 1 &&
      formState.lastName.trim().length > 1 &&
      formState.phone.trim().length > 5 &&
      formState.address.trim().length > 5
    );
  }, [formState.address, formState.firstName, formState.lastName, formState.phone]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setStatusMessage(isSq ? "Shporta është bosh." : "Your cart is empty.");
      return;
    }

    if (!isFormValid) {
      setStatusMessage(isSq ? "Ju lutem plotësoni të gjitha fushat." : "Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formState,
          items,
          totalItems,
          subtotal,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(payload?.message || (isSq ? "Nuk u dërgua porosia." : "Order could not be sent."));
      }

      clearCart();
      setFormState({ firstName: "", lastName: "", phone: "", address: "" });
      setStatusMessage(isSq ? "Porosia u dërgua me sukses." : "Order sent successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : isSq ? "Ndodhi një gabim gjatë porosisë." : "An error occurred while placing the order.";
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Shporta juaj" : "Your cart"}</p>
          <h1 className="mt-2 font-serif text-3xl text-[#2f251d] md:text-5xl">{isSq ? "Produktet e ruajtura" : "Saved products"}</h1>

          {items.length === 0 ? (
            <div className="mt-6 rounded-sm bg-white/80 p-6 text-[#6f655b]">
              {isSq ? "Nuk keni shtuar produkte në shportë." : "You have not added products to cart yet."}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <article key={item.key} className="rounded-sm bg-white/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-lg text-[#2f251d]">{item.name}</h2>
                      <p className="mt-1 text-sm text-[#6f655b]">
                        {formatPrice(item.price)} x {item.quantity} = {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4"
                    >
                      {isSq ? "Hiq" : "Remove"}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="h-8 w-8 border border-[#c8b8a6] text-[#5f432c]"
                      aria-label={isSq ? "Ule sasinë" : "Decrease quantity"}
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm text-[#2f251d]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="h-8 w-8 border border-[#c8b8a6] text-[#5f432c]"
                      aria-label={isSq ? "Rrit sasinë" : "Increase quantity"}
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-sm bg-white/80 p-5 md:p-6">
          <h2 className="font-serif text-2xl text-[#2f251d]">{isSq ? "Përfundo porosinë" : "Complete your order"}</h2>
          <p className="mt-2 text-sm text-[#6f655b]">{isSq ? "Plotësoni të dhënat dhe porosia do të dërgohet në email-in e owner." : "Fill in your details and the order will be sent to the owner email."}</p>

          <div className="mt-4 space-y-1 border-y border-[#e2d8cd] py-4 text-sm text-[#5f5145]">
            <p>{isSq ? "Produkte" : "Items"}: {totalItems}</p>
            <p>{isSq ? "Totali" : "Total"}: {formatPrice(subtotal)}</p>
          </div>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={isSq ? "Emri" : "First name"}
              value={formState.firstName}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, firstName: event.target.value }))
              }
              className="w-full border border-[#d7cabb] bg-white px-3 py-2 text-sm outline-none focus:border-[#8e6f50]"
              required
            />
            <input
              type="text"
              placeholder={isSq ? "Mbiemri" : "Last name"}
              value={formState.lastName}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, lastName: event.target.value }))
              }
              className="w-full border border-[#d7cabb] bg-white px-3 py-2 text-sm outline-none focus:border-[#8e6f50]"
              required
            />
            <input
              type="tel"
              placeholder={isSq ? "Numri i telefonit" : "Phone number"}
              value={formState.phone}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, phone: event.target.value }))
              }
              className="w-full border border-[#d7cabb] bg-white px-3 py-2 text-sm outline-none focus:border-[#8e6f50]"
              required
            />
            <textarea
              placeholder={isSq ? "Adresa e porosisë" : "Delivery address"}
              value={formState.address}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, address: event.target.value }))
              }
              className="min-h-24 w-full border border-[#d7cabb] bg-white px-3 py-2 text-sm outline-none focus:border-[#8e6f50]"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-[#121416] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2a2e32] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (isSq ? "Duke dërguar..." : "Sending...") : isSq ? "Bëj porosi" : "Place order"}
            </button>
          </form>

          {statusMessage && (
            <p className="mt-4 text-sm text-[#5f5145]">{statusMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
