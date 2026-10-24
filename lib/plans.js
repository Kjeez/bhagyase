// Paid plans. Amounts are in paise (Razorpay's unit).

export const PLANS = {
  classic: {
    id: "classic",
    name: "Classic",
    amount: 149900,
    price: "₹1,499",
    monthsAfterWedding: 6,
    maxPhotos: 10,
    features: [
      "Animated invitation — Marigold Mela, Royal Palace or Emerald Noir",
      "Countdown, scratch card, timeline, maps, music",
      "RSVP inbox & guest wishes",
      "Unlimited edits from your phone",
      "Live till your wedding + 6 months",
    ],
  },
  plus: {
    id: "plus",
    name: "Shaadi Plus",
    amount: 299900,
    price: "₹2,999",
    monthsAfterWedding: 12,
    maxPhotos: 30,
    features: [
      "Everything in Classic",
      "A hand-drawn illustration of the two of you, made for your invitation",
      "Up to 30 photos in your gallery",
      "Live till your wedding + 12 months",
      "Done-for-you setup — send details on WhatsApp, we build it",
      "Priority WhatsApp support from the WebAlchemy team",
    ],
  },
};

export const PLAN_ORDER = ["classic", "plus"];

// What it costs to move an invite to `plan` given what it already has.
// Returns 0 when the invite already has that plan (or better).
export function amountDue(currentPlan, plan) {
  const target = PLANS[plan];
  if (!target) return null;
  const paid = currentPlan ? PLANS[currentPlan]?.amount || 0 : 0;
  return Math.max(0, target.amount - paid);
}

// Expiry = wedding date + the plan's months (falls back to now when the date is missing).
export function expiryFor(dateISO, plan) {
  const base = dateISO ? new Date(dateISO) : new Date();
  const d = isNaN(base) ? new Date() : base;
  d.setMonth(d.getMonth() + (PLANS[plan]?.monthsAfterWedding || 6));
  return d.toISOString();
}
