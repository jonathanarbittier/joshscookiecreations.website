const shopUrl = "https://www.joshscookiecreations.com/";
const phoneUrl = "tel:+14127060399";
const emailUrl = "mailto:joshua.pickens7@gmail.com";

const products = [
  { name: "Chocolate Chip Cookies", blurb: "Thick, soft, and packed with chocolate chips.", image: "/images/chocolate-chip.webp", href: "https://www.joshscookiecreations.com/product-page/cookies", color: "yellow", badge: "The original" },
  { name: "Cookies & Cream Truffles", blurb: "Creamy Oreo centers with a sweet chocolate shell.", image: "/images/oreo-truffles.webp", href: "https://www.joshscookiecreations.com/product-page/cookie-and-cream-oreo-truffle", color: "pink", badge: "Josh’s signature" },
  { name: "White Chocolate Oreos", blurb: "Classic Oreos dipped and dressed for the occasion.", image: "/images/white-oreos.webp", href: "https://www.joshscookiecreations.com/product-page/white-chocolate-dipped-oreos", color: "blue", badge: "Party ready" },
  { name: "S’more Bullies", blurb: "Sweet, salty, crunchy, and completely original.", image: "/images/smore-bullies.webp", href: "https://www.joshscookiecreations.com/product-page/smore-bullies", color: "mint", badge: "A Josh creation" },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5" /></svg>;
}

function CookieMark() {
  return <span className="cookie-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function Home() {
  return (
    <main id="top">
      <div className="announcement">
        <span>Freshly baked in Central Florida</span>
        <span>Personal delivery in Orange + Osceola</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Josh's Cookie Creations home">
          <CookieMark />
          <span><strong>Josh&rsquo;s</strong><small>Cookie Creations</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#favorites">Favorites</a>
          <a href="#delivery">Delivery</a>
          <a href="#about">Meet Josh</a>
          <a href="#events">Events</a>
        </nav>
        <a className="nav-order" href={shopUrl}>Order treats <Arrow /></a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bubble bubble-yellow" aria-hidden="true" />
        <div className="hero-bubble bubble-red" aria-hidden="true" />
        <div className="hero-bubble bubble-white" aria-hidden="true" />
        <div className="hero-photo" aria-hidden="true" />

        <div className="hero-copy">
          <h1 id="hero-title">Fresh baked fun, delivered by Josh.</h1>
          <p>Big cookies, creative truffles, and dipped treats made fresh by your neighborhood Boss Baker.</p>
          <div className="hero-actions">
            <a className="button button-red" href={shopUrl}>Shop Josh&rsquo;s favorites <Arrow /></a>
            <a className="button button-light" href="#delivery">Can Josh deliver to me?</a>
          </div>
        </div>

        <div className="hero-flavor">
          <span>Chocolate chip</span>
          <strong>Soft + chewy</strong>
        </div>

        <a className="phone-order" href={shopUrl}>
          <span><small>Ready for something good?</small><strong>Order local delivery</strong></span>
          <i><Arrow /></i>
        </a>
      </section>

      <div className="treat-ribbon" aria-hidden="true">
        <div>COOKIES <b>●</b> OREO TRUFFLES <b>●</b> DIPPED TREATS <b>●</b> BROWNIES <b>●</b> COOKIES <b>●</b> OREO TRUFFLES <b>●</b></div>
      </div>

      <section className="favorites" id="favorites" aria-labelledby="favorites-title">
        <div className="favorites-heading">
          <h2 id="favorites-title">Pick your happy.</h2>
          <p>Fan favorites, playful originals, and enough chocolate to turn the whole day around.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <a className={`product-card card-${product.color}`} href={product.href} key={product.name}>
              <div className="product-photo"><img src={product.image} alt={product.name} loading="lazy" /><span>{product.badge}</span></div>
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.blurb}</p>
                <i><Arrow /></i>
              </div>
            </a>
          ))}
        </div>
        <a className="button button-brown" href={shopUrl}>See everything Josh bakes <Arrow /></a>
      </section>

      <section className="delivery" id="delivery" aria-labelledby="delivery-title">
        <div className="delivery-copy">
          <h2 id="delivery-title">Good news. Josh delivers.</h2>
          <p>Josh handles the baking and the delivery himself, so every order stays personal and fresh.</p>
          <div className="delivery-actions">
            <a className="button button-yellow" href={shopUrl}>Order online <Arrow /></a>
            <a className="call-link" href={phoneUrl}>Call Josh at 412 706 0399</a>
          </div>
        </div>

        <div className="delivery-steps">
          <article className="step-blue"><span>1</span><h3>Orange or Osceola?</h3><p>Perfect. Place your order online for local delivery.</p></article>
          <article className="step-yellow"><span>2</span><h3>In a nearby county?</h3><p>Call Josh first. Volusia, Seminole, and neighboring areas may be possible.</p></article>
          <article className="step-pink"><span>3</span><h3>Farther away?</h3><p>Shipping is not available yet, so please check with Josh before ordering.</p></article>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-collage">
          <div className="logo-tile"><img src="/images/logo.webp" alt="Josh's Cookie Creations logo" loading="lazy" /></div>
          <div className="event-tile"><img src="/images/event-table.webp" alt="Josh's Cookie Creations dessert table at a local event" loading="lazy" /></div>
          <div className="cookie-tile"><img src="/images/buckeye-clops.webp" alt="Josh's Buckeye Clops" loading="lazy" /></div>
        </div>
        <div className="about-copy">
          <h2 id="about-title">20 years of baking. Still having fun.</h2>
          <p>Josh Pickens is the Boss Baker behind every cookie, truffle, and brownie. What started as a love of baking became a local business built around creative flavors, familiar favorites, and making people smile.</p>
          <p>Every order is baked by Josh, packed by Josh, and personally delivered by Josh.</p>
          <a className="button button-blue" href="https://www.instagram.com/joshscookiecreations/">Follow the next creation <Arrow /></a>
        </div>
      </section>

      <section className="events" id="events">
        <div className="events-photo"><img src="/images/smore-bullies.webp" alt="A tray of Josh's S'more Bullies" loading="lazy" /></div>
        <div className="events-copy">
          <h2>Make your next event taste better.</h2>
          <p>Office meetings, birthdays, school events, and dessert tables deserve more than the usual box of treats.</p>
          <a className="button button-cream" href={emailUrl}>Ask Josh about your event <Arrow /></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><CookieMark /><span><strong>Josh&rsquo;s</strong><small>Cookie Creations</small></span></div>
        <div className="footer-links"><a href={shopUrl}>Shop</a><a href={phoneUrl}>Call</a><a href={emailUrl}>Email</a><a href="https://www.instagram.com/joshscookiecreations/">Instagram</a></div>
        <p>Fresh baked treats · Central Florida</p>
      </footer>
    </main>
  );
}
