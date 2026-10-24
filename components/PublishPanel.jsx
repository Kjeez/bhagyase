"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PLANS, PLAN_ORDER, amountDue } from "@/lib/plans";

function loadCheckout() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = resolve;
    s.onerror = () => reject(new Error("Could not load Razorpay — check your connection"));
    document.body.appendChild(s);
  });
}

const fmt = (paise) => `₹${(paise / 100).toLocaleString("en-IN")}`;

// Plan picker + Razorpay checkout. `currentPlan` is set once the invite is published.
export default function PublishPanel({ token, currentPlan, onPublished }) {
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");

  const buy = async (plan) => {
    setErr("");
    setBusy(plan);
    try {
      const res = await fetch("/api/pay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, plan }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not start payment");
      if (order.published) { onPublished(); return; }

      await loadCheckout();
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: order.keyId,
          order_id: order.orderId,
          amount: order.amount,
          currency: "INR",
          name: "WebAlchemy Invites",
          description: order.description,
          prefill: order.prefill,
          theme: { color: "#d4af37" },
          handler: async (resp) => {
            try {
              const v = await fetch("/api/pay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, ...resp }),
              });
              const vj = await v.json();
              if (!v.ok) throw new Error(vj.error || "Payment could not be verified");
              resolve();
            } catch (e) {
              reject(e);
            }
          },
          modal: { ondismiss: () => reject(new Error("")) },
        });
        rzp.on("payment.failed", (r) => reject(new Error(r.error?.description || "Payment failed")));
        rzp.open();
      });
      onPublished();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy("");
    }
  };

  const plans = PLAN_ORDER.filter((p) => amountDue(currentPlan, p) > 0);
  if (plans.length === 0) return null;

  return (
    <div className="plans">
      {plans.map((id) => {
        const p = PLANS[id];
        const due = amountDue(currentPlan, id);
        return (
          <div className={`plan ${id === "plus" ? "hot" : ""}`} key={id}>
            {id === "plus" && <span className="plan-badge">Most loved</span>}
            <h3>{p.name}</h3>
            <div className="plan-amt">
              {fmt(due)}
              {currentPlan && <small> upgrade</small>}
            </div>
            <ul>
              {p.features.map((f) => <li key={f}><Check size={14} /> {f}</li>)}
            </ul>
            <button className={`btn ${id === "plus" ? "" : "ghost"}`} onClick={() => buy(id)} disabled={Boolean(busy)}>
              {busy === id ? <span className="spin" /> : null}
              {currentPlan ? `Upgrade to ${p.name}` : `Publish with ${p.name}`}
            </button>
          </div>
        );
      })}
      {err && <p className="ed-err">{err}</p>}
    </div>
  );
}
