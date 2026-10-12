import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "../components/SiteChrome";
import { ourTreatsProducts } from "../site-data";

export const metadata: Metadata = { title: "Our Treats | Josh's Cookie Creations", description: "Explore cookies, truffles, and dipped treats made by Josh." };

export default function TreatsPage() {
  return <PageShell>
    <section className="treats-catalog" aria-labelledby="treats-title">
      <div className="treats-catalog-heading">
        <div className="treats-title-row">
          <span className="treats-title-rays rays-left" aria-hidden="true"><i /><i /><i /></span>
          <h1 id="treats-title">Our Treats</h1>
          <span className="treats-title-rays rays-right" aria-hidden="true"><i /><i /><i /></span>
        </div>
        <p>Freshly baked treats for every kind of sweet mood.</p>
      </div>
      <div className="treats-card-grid">
      {ourTreatsProducts.map((treat, index) => <article className={`treats-catalog-card treats-catalog-card-${index + 1}`} id={treat.id} key={treat.id}>
        <div className="treats-catalog-photo">
          <Image
            src={treat.galleryImage}
            alt={treat.alt}
            width={treat.galleryWidth}
            height={treat.galleryHeight}
            sizes="(max-width: 680px) 100vw, 50vw"
            priority={index < 2}
          />
        </div>
        <h2>{treat.name}</h2>
      </article>)}
      </div>
    </section>
  </PageShell>;
}
