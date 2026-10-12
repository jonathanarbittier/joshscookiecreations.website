import type { Metadata } from "next";
import { PageShell } from "../components/SiteChrome";
import { OrderForm, type OrderType } from "./OrderForm";

export const metadata: Metadata = {
  title: "Request an Order | Josh's Cookie Creations",
  description: "Ask Josh about cookies, truffles, custom treats, and event orders.",
};

type OrderPageProps = { searchParams: Promise<{ type?: string | string[] }> };

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const params = await searchParams;
  const requestedType = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialType: OrderType = requestedType === "event" ? "event" : requestedType === "business" ? "business" : "treats";

  return <PageShell>
    <section className="order-section"><OrderForm initialType={initialType} /></section>
  </PageShell>;
}
