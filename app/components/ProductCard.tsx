import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./SiteChrome";
import type { products } from "../site-data";

type Product = (typeof products)[number];
export function ProductCard({ product }: { product: Product }) {
  return <Link className={`product-card card-${product.color}`} href={`/our-treats#${product.id}`}><div className="product-photo"><Image src={product.image} alt={product.alt} width={product.width} height={product.height} sizes="(max-width: 680px) 82vw, (max-width: 1050px) 50vw, 25vw" /></div><div className="product-copy"><h3>{product.name}</h3><i><Arrow /></i></div></Link>;
}
