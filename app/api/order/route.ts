import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const JOSH_EMAIL = "joshua.pickens7@gmail.com";
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();

type Inquiry = Record<string, unknown>;
const clean = (value: unknown, max = 2000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validType = (value: string) => ["treats", "event", "business"].includes(value);

function isPastDate(value: string) {
  if (!value) return false;
  const chosen = new Date(`${value}T23:59:59`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Number.isNaN(chosen.getTime()) || chosen < today;
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) { requests.set(ip, recent); return true; }
  recent.push(now);
  requests.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character] || character));
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many inquiries were sent from this connection. Please wait a few minutes and try again." }, { status: 429 });

  let body: Inquiry;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "The inquiry could not be read. Please refresh and try again." }, { status: 400 }); }
  if (clean(body.companyWebsite)) return NextResponse.json({ error: "The inquiry could not be accepted." }, { status: 400 });

  const orderType = clean(body.orderType, 20);
  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 60);
  const treats = clean(body.treats, 2000);
  const preferredDate = clean(body.preferredDate, 20);
  const quantity = clean(body.quantity, 200);
  const location = clean(body.location, 200);
  const eventType = clean(body.eventType, 200);
  const guestCount = clean(body.guestCount, 100);
  const eventDetails = clean(body.eventDetails, 2000);
  const details = clean(body.details, 2000);
  const eventInquiry = orderType === "event" || orderType === "business";

  if (!validType(orderType) || !name || !validEmail(email) || !treats || !location) return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
  if ((preferredDate && isPastDate(preferredDate)) || (eventInquiry && !preferredDate)) return NextResponse.json({ error: "Please choose a valid event date that is not in the past." }, { status: 400 });
  if (eventInquiry && !eventType) return NextResponse.json({ error: "Please tell Josh what type of event you're planning." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: "Online inquiries aren't configured yet. Please call or email Josh using the contact details below." }, { status: 503 });

  const labels: Record<string, string> = { treats: "Sweet treats", event: "Party or special event", business: "Business or corporate event" };
  const rows = [["Order type", labels[orderType]], ["Name", name], ["Email", email], ["Phone", phone || "Not provided"], ["Treats", treats], [eventInquiry ? "Event date" : "Preferred date", preferredDate || "Not provided"], ["Approximate quantity", quantity || "Not provided"], ["City and ZIP", location], ...(eventInquiry ? [["Event type", eventType], ["Estimated guests", guestCount || "Not provided"], ["Event details", eventDetails || "Not provided"]] : []), ["Additional details", details || "Not provided"]];
  const html = `<h1>New order inquiry</h1>${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}`;

  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [JOSH_EMAIL], reply_to: email, subject: `New ${labels[orderType].toLowerCase()} inquiry from ${name}`, html }) });
    if (!response.ok) { console.error("Resend rejected order inquiry", response.status); return NextResponse.json({ error: "Josh couldn't receive your inquiry right now. Please try again or contact him directly." }, { status: 502 }); }
    return NextResponse.json({ accepted: true });
  } catch (error) {
    console.error("Order inquiry delivery failed", error);
    return NextResponse.json({ error: "Josh couldn't receive your inquiry right now. Please try again or contact him directly." }, { status: 502 });
  }
}
