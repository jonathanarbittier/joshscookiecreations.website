"use client";

import { FormEvent, useMemo, useState } from "react";

export type OrderType = "treats" | "event" | "business";
type Status = { kind: "idle" | "submitting" | "success" | "error"; message?: string };

const orderOptions: { value: OrderType; title: string; note: string }[] = [
  { value: "treats", title: "Just some sweet treats", note: "A personal order or something to share" },
  { value: "event", title: "A party or special event", note: "Birthdays, school events, and celebrations" },
  { value: "business", title: "A business or corporate event", note: "Office treats, client gifts, and gatherings" },
];

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function OrderForm({ initialType }: { initialType: OrderType }) {
  const [orderType, setOrderType] = useState<OrderType>(initialType);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const isEvent = orderType !== "treats";
  const minDate = useMemo(localToday, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ kind: "submitting" });
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Josh couldn't receive your inquiry right now. Please try again in a moment.");
      setStatus({ kind: "success", message: "Thanks! Your inquiry was sent to Josh. He’ll be in touch to discuss the details." });
      form.reset();
      setOrderType("treats");
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    }
  }

  return <form className="order-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset className="order-type-fieldset"><legend><span>01</span> What are you ordering for</legend><div className="order-type-grid">{orderOptions.map((option) => <label className={orderType === option.value ? "selected" : ""} key={option.value}><input type="radio" name="orderType" value={option.value} checked={orderType === option.value} onChange={() => { setOrderType(option.value); setStatus({ kind: "idle" }); }} /><i aria-hidden="true" /><strong>{option.title}</strong><small>{option.note}</small></label>)}</div></fieldset>

    <div className="form-card form-card-yellow"><div className="form-card-title"><span>02</span><div><h2>Tell us about you</h2><p>So Josh knows how to get back in touch.</p></div></div><div className="order-fields two-columns"><label>Full name <b>*</b><input name="name" autoComplete="name" required /></label><label>Email address <b>*</b><input name="email" type="email" inputMode="email" autoComplete="email" required /></label><label>Phone number <small>Optional</small><input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label><label>City and ZIP code <b>*</b><input name="location" autoComplete="postal-code" required placeholder="Orlando, 32801" /></label></div></div>

    <div className="form-card form-card-pink"><div className="form-card-title"><span>03</span><div><h2>What sounds good</h2><p>No cart needed—just tell Josh what you have in mind.</p></div></div><div className="order-fields"><label>What treats are you interested in? <b>*</b><textarea name="treats" rows={4} required placeholder="Chocolate chip cookies, truffles, brownies..." /></label><div className="two-columns"><label>{isEvent ? "Event date" : "Preferred date"} {isEvent ? <b>*</b> : <small>Optional</small>}<input name="preferredDate" type="date" min={minDate} required={isEvent} /></label><label>Approximate quantity <small>Optional</small><input name="quantity" placeholder="e.g. 24 cookies, 2 dozen truffles..." /></label></div></div></div>

    <div className={`event-fields ${isEvent ? "visible" : ""}`} aria-hidden={!isEvent}>{isEvent && <div className="form-card form-card-blue"><div className="form-card-title"><span>04</span><div><h2>Event details</h2><p>A few helpful details for planning.</p></div></div><div className="order-fields two-columns"><label>Event type <b>*</b><input name="eventType" required placeholder="Birthday, office party, school event..." /></label><label>Estimated number of guests <small>Optional</small><input name="guestCount" inputMode="numeric" /></label><label className="wide-field">Additional event details <small>Optional</small><textarea name="eventDetails" rows={4} placeholder="Tell Josh a little more about the occasion..." /></label></div></div>}</div>

    <div className="form-card form-card-mint"><div className="form-card-title"><span>{isEvent ? "05" : "04"}</span><div><h2>Anything else</h2><p>Share special requests or questions.</p></div></div><div className="order-fields"><label>Additional details <small>Optional</small><textarea name="details" rows={5} placeholder="Special requests, flavors, delivery questions..." /></label></div></div>

    {status.kind === "success" && <div className="form-status success" role="status">{status.message}</div>}
    {status.kind === "error" && <div className="form-status error" role="alert">{status.message}</div>}
    <button className="button button-brown order-submit" type="submit" disabled={status.kind === "submitting"}>{status.kind === "submitting" ? "Sending…" : <>Send my inquiry <span aria-hidden="true">→</span></>}</button>
    <p className="order-disclaimer">Submitting this form does not confirm your order. Josh will contact you to discuss availability, pricing, and delivery.</p>
  </form>;
}
