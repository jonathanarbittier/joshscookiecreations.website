import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageShell } from "../components/SiteChrome";

export const metadata: Metadata = { title: "Meet Josh | Josh's Cookie Creations", description: "Meet Josh Pickens, the Boss Baker behind every treat." };

export default function MeetJoshPage() {
  return <PageShell>
    <section className="story-hero"><div className="about-collage"><div className="logo-tile"><img src="/images/logo.webp" alt="Josh's Cookie Creations logo" /></div><div className="event-tile"><img src="/images/event-table.webp" alt="Josh's dessert table at a community event" /></div><div className="cookie-tile"><img src="/images/buckeye-clops.webp" alt="Chocolate treats made by Josh" /></div></div><div className="story-intro"><h1>Meet the Boss Baker</h1><p>Josh Pickens is the baker behind every cookie, truffle, and dipped treat at Josh&rsquo;s Cookie Creations.</p></div></section>
    <section className="story-section"><div><h2>Made by Josh, shared with you</h2></div><div className="story-body"><p>Josh&rsquo;s local business is built around creative flavors, familiar favorites, and making people smile. Each order gets his personal attention from the kitchen to your door.</p><p>That hands-on approach is what makes every box feel special: Josh bakes it, packs it, and personally arranges local delivery.</p></div></section>
    <section className="bottom-cta cta-blue"><h2>Ready to see what&rsquo;s baking</h2><Link className="button button-yellow" href="/our-treats">See what Josh is baking <Arrow /></Link></section>
  </PageShell>;
}
