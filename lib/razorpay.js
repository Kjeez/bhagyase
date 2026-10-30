import { createHmac, timingSafeEqual } from "crypto";

// Server-side only.

export function razorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

// Lets you publish without paying (local testing / soft launch). Never set this in production.
export function freePublishEnabled() {
  return process.env.INVITES_FREE_PUBLISH === "true";
}

export async function createOrder({ amount, receipt, notes }) {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR", receipt, notes }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.description || "Razorpay order failed");
  return json; // { id, amount, currency, ... }
}

function safeEqualHex(a, b) {
  const x = Buffer.from(String(a || ""), "utf8");
  const y = Buffer.from(String(b || ""), "utf8");
  return x.length === y.length && timingSafeEqual(x, y);
}

// Checkout handler signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret)
export function verifyPaymentSignature(orderId, paymentId, signature) {
  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeEqualHex(expected, signature);
}

// Webhook signature: HMAC_SHA256(raw body, webhook secret)
export function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}
