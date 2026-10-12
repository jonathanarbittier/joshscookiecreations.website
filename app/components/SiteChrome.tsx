"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "../site-data";

export function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5" /></svg>; }
const links = [["Home", "/"], ["Our Treats", "/our-treats"], ["Meet Josh", "/meet-josh"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return <>
    <div className="announcement"><span>Freshly baked in Central Florida</span><span>Personal delivery in Orange + Osceola</span></div>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Josh's Cookie Creations home"><img className="brand-mascot" src="/images/brand/mascot.png" alt="" width="220" height="208" /><img className="brand-wordmark" src="/images/brand/wordmark.png" alt="Josh's Cookie Creations" width="470" height="164" /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, href]) => <Link className={pathname === href ? "active" : ""} href={href} key={href}>{label}</Link>)}</nav>
      <Link className="nav-order" href="/order">Order treats <Arrow /></Link>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      <nav className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link className="mobile-order" href="/order">Order treats</Link></nav>
    </header>
  </>;
}

export function Footer() {
  return <footer><div className="footer-main">
    <Link className="footer-brand" href="/"><img className="footer-mascot" src="/images/brand/mascot.png" alt="" width="220" height="208" /><span><strong>Josh&rsquo;s</strong><small>Cookie Creations</small></span></Link>
    <div className="footer-column"><strong>Navigate</strong><Link href="/">Home</Link><Link href="/our-treats">Our Treats</Link><Link href="/meet-josh">Meet Josh</Link><Link href="/order">Request an Order</Link></div>
    <div className="footer-column"><strong>Get in touch</strong><a href={contact.phoneUrl}>{contact.phoneDisplay}</a><a href={contact.emailUrl}>Email Josh</a><a href={contact.instagram}>Instagram</a></div>
    <div className="footer-column"><strong>Ready for a treat</strong><Link href="/order">Order treats</Link><p>Fresh baked treats<br />Central Florida</p></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Josh&rsquo;s Cookie Creations</span><span>Baked with fun in Central Florida</span></div></footer>;
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><Header /><main>{children}</main><Footer /></>; }
