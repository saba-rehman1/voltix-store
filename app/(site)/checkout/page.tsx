"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Truck,
  Zap,
  Rocket,
  CreditCard,
  Check,
  Pencil,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/checkout/Stepper";
import { OrderSummarySidebar } from "@/components/checkout/OrderSummarySidebar";
import { PaymentMethodCard, PAYMENT_METHODS, PaymentMethodId } from "@/components/checkout/PaymentMethodCard";
import { useCart } from "@/lib/cart";
import { mockAddresses, mockCards } from "@/data/orders";
import { cn, formatCurrency, generateOrderId } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

interface AddressForm {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

const EMPTY_ADDRESS: AddressForm = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  phone: "",
};

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Shipping", eta: "3-5 business days", price: 9.99, icon: Truck },
  { id: "express", label: "Express Shipping", eta: "1-2 business days", price: 19.99, icon: Zap },
  { id: "overnight", label: "Overnight Delivery", eta: "Next business day", price: 34.99, icon: Rocket },
] as const;

type DeliveryId = (typeof DELIVERY_OPTIONS)[number]["id"];

export default function CheckoutPage() {
  useDocumentTitle("Checkout");
  const router = useRouter();
  const { cartLines, subtotal, discount, shipping: cartShipping, tax, total, clearCart, couponCode } = useCart();

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [payment, setPayment] = useState<PaymentMethodId | null>(null);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [placing, setPlacing] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (cartLines.length === 0 && !redirecting) {
      router.replace("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartLines.length]);

  const deliveryOption = DELIVERY_OPTIONS.find((d) => d.id === delivery)!;
  const grandTotal = total - cartShipping + deliveryOption.price;

  const applyMockAddress = (id: string) => {
    const addr = mockAddresses.find((a) => a.id === id);
    if (!addr) return;
    setShippingAddress({
      fullName: addr.fullName,
      line1: addr.line1,
      line2: addr.line2 ?? "",
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: addr.phone,
    });
  };

  const applyMockCard = (id: string) => {
    const c = mockCards.find((x) => x.id === id);
    if (!c) return;
    setCard({ number: `•••• •••• •••• ${c.last4}`, name: c.holder, expiry: c.expiry, cvv: "" });
    setPayment(c.brand === "Visa" ? "visa" : "mastercard");
  };

  const isShippingValid =
    shippingAddress.fullName && shippingAddress.line1 && shippingAddress.city &&
    shippingAddress.state && shippingAddress.zip && shippingAddress.phone;

  const paymentMethod = PAYMENT_METHODS.find((p) => p.id === payment);
  const isPaymentValid =
    !!payment &&
    (!paymentMethod?.requiresCard || (card.number && card.name && card.expiry && card.cvv.length >= 3 || card.number.startsWith("••••")));

  const goNext = () => {
    if (step === 1 && !isShippingValid) {
      toast.error("Please complete all required shipping fields.");
      return;
    }
    if (step === 3 && !isPaymentValid) {
      toast.error("Please select a payment method and complete card details.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const orderId = generateOrderId();
      const orderData = {
        id: orderId,
        date: new Date().toISOString(),
        items: cartLines.map((l) => ({
          productId: l.product.id,
          name: l.product.name,
          image: l.product.thumbnail,
          price: l.product.price,
          quantity: l.quantity,
          variant: l.variant,
        })),
        subtotal,
        discount,
        couponCode,
        shipping: deliveryOption.price,
        tax,
        total: grandTotal,
        deliveryLabel: deliveryOption.label,
        deliveryEta: deliveryOption.eta,
        paymentLabel: paymentMethod?.label,
        address: `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`,
      };
      try {
        sessionStorage.setItem("voltix-last-order", JSON.stringify(orderData));
      } catch {}
      setRedirecting(true);
      clearCart();
      router.push("/checkout/success");
    }, 1400);
  };

  if (cartLines.length === 0) return null;

  return (
    <Container className="py-8 md:py-10">
      <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Checkout</h1>

      <div className="mt-8 overflow-x-auto pb-2">
        <Stepper steps={STEPS} current={step} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div>
                  <SectionHeader icon={MapPin} title="Shipping Address" />

                  {mockAddresses.length > 0 && (
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {mockAddresses.map((addr) => (
                        <button
                          key={addr.id}
                          onClick={() => applyMockAddress(addr.id)}
                          className={cn(
                            "rounded-xl border p-3.5 text-left text-xs transition-colors cursor-pointer",
                            shippingAddress.line1 === addr.line1
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-white/25"
                          )}
                        >
                          <p className="font-semibold text-white">{addr.label}</p>
                          <p className="mt-1 text-muted">
                            {addr.line1}, {addr.city}, {addr.state} {addr.zip}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  <AddressFields value={shippingAddress} onChange={setShippingAddress} />

                  <label className="mt-5 flex items-center gap-2.5 text-sm text-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={billingSameAsShipping}
                      onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                      className="h-4 w-4 accent-accent"
                    />
                    Billing address same as shipping
                  </label>

                  {!billingSameAsShipping && (
                    <div className="mt-5 border-t border-border pt-5">
                      <SectionHeader icon={Pencil} title="Billing Address" />
                      <AddressFields value={billingAddress} onChange={setBillingAddress} />
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <SectionHeader icon={Truck} title="Delivery Method" />
                  <div className="flex flex-col gap-3">
                    {DELIVERY_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className={cn(
                          "flex items-center gap-4 rounded-xl border p-4 text-left transition-colors cursor-pointer",
                          delivery === opt.id ? "border-accent bg-accent/10" : "border-border hover:border-white/25"
                        )}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-light">
                          <opt.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{opt.label}</p>
                          <p className="text-xs text-muted-2">{opt.eta}</p>
                        </div>
                        <span className="font-mono text-sm font-semibold text-white">
                          {formatCurrency(opt.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <SectionHeader icon={CreditCard} title="Payment Method" />

                  {mockCards.length > 0 && (
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {mockCards.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => applyMockCard(c.id)}
                          className={cn(
                            "rounded-xl border p-3.5 text-left text-xs transition-colors cursor-pointer",
                            card.number.endsWith(c.last4) ? "border-accent bg-accent/10" : "border-border hover:border-white/25"
                          )}
                        >
                          <p className="font-semibold text-white">{c.brand} •••• {c.last4}</p>
                          <p className="mt-1 text-muted">Expires {c.expiry} · {c.holder}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {PAYMENT_METHODS.map((m) => (
                      <PaymentMethodCard
                        key={m.id}
                        method={m}
                        selected={payment === m.id}
                        onSelect={() => setPayment(m.id)}
                      />
                    ))}
                  </div>

                  {paymentMethod?.requiresCard && (
                    <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <Field label="Card Number" className="sm:col-span-2">
                        <input
                          value={card.number}
                          onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Name on Card" className="sm:col-span-2">
                        <input
                          value={card.name}
                          onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                          placeholder="Jordan Blake"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Expiry">
                        <input
                          value={card.expiry}
                          onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="CVV">
                        <input
                          value={card.cvv}
                          onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                          placeholder="123"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  )}

                  {payment && !paymentMethod?.requiresCard && (
                    <p className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-xs text-muted">
                      You'll be redirected to {paymentMethod?.label} to complete your payment securely. (UI preview only)
                    </p>
                  )}
                </div>
              )}

              {step === 4 && (
                <div>
                  <SectionHeader icon={Check} title="Review Your Order" />

                  <div className="flex flex-col gap-4">
                    <ReviewRow label="Ship to" onEdit={() => setStep(1)}>
                      <p className="text-sm text-white">{shippingAddress.fullName}</p>
                      <p className="text-xs text-muted">
                        {shippingAddress.line1}{shippingAddress.line2 ? `, ${shippingAddress.line2}` : ""}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                      </p>
                      <p className="text-xs text-muted">{shippingAddress.phone}</p>
                    </ReviewRow>

                    <ReviewRow label="Delivery" onEdit={() => setStep(2)}>
                      <p className="text-sm text-white">{deliveryOption.label}</p>
                      <p className="text-xs text-muted">{deliveryOption.eta} · {formatCurrency(deliveryOption.price)}</p>
                    </ReviewRow>

                    <ReviewRow label="Payment" onEdit={() => setStep(3)}>
                      <p className="text-sm text-white">{paymentMethod?.label ?? "Not selected"}</p>
                      {card.number && <p className="text-xs text-muted">Card ending {card.number.slice(-4)}</p>}
                    </ReviewRow>

                    <ReviewRow label="Items">
                      <p className="text-sm text-white">{cartLines.length} item{cartLines.length !== 1 ? "s" : ""}</p>
                    </ReviewRow>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button variant="ghost" onClick={goBack} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button onClick={goNext}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={placeOrder} loading={placing} size="lg">
                Place Order — {formatCurrency(grandTotal)}
              </Button>
            )}
          </div>
        </div>

        <OrderSummarySidebar shippingOverride={deliveryOption.price} shippingLabel={deliveryOption.label} />
      </div>
    </Container>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <Icon className="h-5 w-5 text-accent-light" />
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
    </div>
  );
}

function AddressFields({ value, onChange }: { value: AddressForm; onChange: (v: AddressForm) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      <Field label="Full Name *" className="sm:col-span-2">
        <input value={value.fullName} onChange={(e) => onChange({ ...value, fullName: e.target.value })} className={inputClass} placeholder="Jordan Blake" />
      </Field>
      <Field label="Address Line 1 *" className="sm:col-span-2">
        <input value={value.line1} onChange={(e) => onChange({ ...value, line1: e.target.value })} className={inputClass} placeholder="412 Bellevue Ave" />
      </Field>
      <Field label="Address Line 2" className="sm:col-span-2">
        <input value={value.line2} onChange={(e) => onChange({ ...value, line2: e.target.value })} className={inputClass} placeholder="Apt, suite, etc. (optional)" />
      </Field>
      <Field label="City *">
        <input value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} className={inputClass} placeholder="Austin" />
      </Field>
      <Field label="State *">
        <input value={value.state} onChange={(e) => onChange({ ...value, state: e.target.value })} className={inputClass} placeholder="TX" />
      </Field>
      <Field label="ZIP Code *">
        <input value={value.zip} onChange={(e) => onChange({ ...value, zip: e.target.value })} className={inputClass} placeholder="78701" />
      </Field>
      <Field label="Country *">
        <input value={value.country} onChange={(e) => onChange({ ...value, country: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Phone *" className="sm:col-span-2">
        <input value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} className={inputClass} placeholder="+1 (555) 000-0000" />
      </Field>
    </div>
  );
}

function ReviewRow({ label, children, onEdit }: { label: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-2">{label}</p>
        {children}
      </div>
      {onEdit && (
        <button onClick={onEdit} className="shrink-0 text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer">
          Edit
        </button>
      )}
    </div>
  );
}
