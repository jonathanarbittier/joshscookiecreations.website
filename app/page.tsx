import Link from "next/link";
import { Footer, Header, Arrow } from "./components/SiteChrome";
import { ProductCard } from "./components/ProductCard";
import { products } from "./site-data";

export default function Home() {
  return (
    <><Header /><main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Big cookies Bigger smiles</h1>
          <p>Big cookies, creative truffles, and dipped treats made fresh by your neighborhood Boss Baker.</p>
          <div className="hero-actions">
            <Link className="button button-red" href="/our-treats">Explore our treats <Arrow /></Link>
          </div>
        </div>
      </section>

      <div className="treat-ribbon" aria-label="Treat categories: Cookies, Oreo Truffles, Dipped Treats, Brownies">
        <div className="treat-ribbon-track" aria-hidden="true">
          {[0, 1].map((group) => <div className="treat-ribbon-group" key={group}>
            {Array.from({ length: 8 }, (_, index) => <span key={index}>COOKIES <b>●</b> OREO TRUFFLES <b>●</b> DIPPED TREATS <b>●</b> BROWNIES <b>●</b></span>)}
          </div>)}
        </div>
      </div>

      <section className="favorites" aria-labelledby="favorites-title">
        <div className="section-heading">
          <h2 id="favorites-title">Pick your happy</h2>
          <p>Fan favorites, playful originals, and enough chocolate to turn the whole day around.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
        <Link className="button button-brown centered-button" href="/our-treats">See everything Josh bakes <Arrow /></Link>
      </section>

      <section className="easy-steps" aria-labelledby="easy-title"><div className="section-heading"><h2 id="easy-title">Sweet treats. Simple steps</h2><p>Josh keeps ordering personal, easy, and delicious.</p></div><div className="easy-grid"><article className="easy-yellow"><span>01</span><h3>Explore the treats</h3><p>Browse all the delicious creations Josh makes.</p></article><article className="easy-pink"><span>02</span><h3>Get in touch</h3><p>Contact Josh about what you&rsquo;re craving.</p></article><article className="easy-mint"><span>03</span><h3>Enjoy something sweet</h3><p>Arrange your order and local delivery directly with Josh.</p></article></div></section>

      <section className="delivery" id="delivery" aria-labelledby="delivery-title">
        <div className="delivery-copy">
          <h2 id="delivery-title">Good news. Josh delivers</h2>
          <p>Josh handles the baking and the delivery himself, so every order stays personal and fresh.</p>
          <div className="delivery-actions">
            <Link className="button button-yellow" href="/order">Order treats <Arrow /></Link>
          </div>
        </div>

        <div className="delivery-steps">
          <article className="step-blue"><div className="delivery-card-content"><h3>Orange or Osceola</h3><p>Local delivery is available.</p></div></article>
          <article className="step-yellow"><div className="delivery-card-content"><h3>In a nearby county</h3><p>Contact Josh to check delivery availability.</p></div></article>
          <article className="step-pink"><div className="delivery-card-content"><h3>Farther away</h3><p>Check with Josh before placing an order.</p></div></article>
        </div>
      </section>

      <section className="about" aria-labelledby="about-title">
        <div className="about-collage">
          <div className="logo-tile"><img src="/images/logo.webp" alt="Josh's Cookie Creations logo" loading="lazy" /></div>
          <div className="event-tile"><img src="/images/event-table.webp" alt="Josh's Cookie Creations dessert table at a local event" loading="lazy" /></div>
          <div className="cookie-tile"><img src="/images/buckeye-clops.webp" alt="Josh's Buckeye Clops" loading="lazy" /></div>
        </div>
        <div className="about-copy">
          <h2 id="about-title">Baking with heart. Still having fun</h2>
          <p>Josh Pickens is the Boss Baker behind every cookie, truffle, and dipped treat. His local business is built around creative flavors, familiar favorites, and making people smile.</p>
          <p>Every order is baked by Josh, packed by Josh, and personally delivered by Josh.</p>
          <Link className="button button-blue" href="/meet-josh">Meet Josh <Arrow /></Link>
        </div>
      </section>

      <section className="events-home">
        <div className="events-photo"><img src="/images/smore-bullies.webp" alt="A tray of Josh's S'more Bullies" loading="lazy" /></div>
        <div className="events-copy">
          <h2>Make your next event taste better</h2>
          <p>Parties, celebrations, office gatherings, and custom dessert tables deserve something fun.</p>
          <Link className="button button-cream" href="/order?type=event">Ask Josh about your event <Arrow /></Link>
        </div>
      </section>

    </main><Footer /></>
  );
}
