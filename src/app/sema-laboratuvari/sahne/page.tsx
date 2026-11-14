import { notFound } from "next/navigation";
import { Services } from "@/components/home/Services";

/** Yalnızca geliştirme: adım 2b yerleşim maketi (sahne: listenin yanında sabit sahne). Üretimde 404; karar sonrası silinir. */
export default function Yerlesim() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="pb-24">
      <Services diagrams="stage" />
    </div>
  );
}
