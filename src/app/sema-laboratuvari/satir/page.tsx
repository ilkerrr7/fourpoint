import { notFound } from "next/navigation";
import { Services } from "@/components/home/Services";

/** Yalnızca geliştirme: adım 2b yerleşim maketi (satır içi küçük şema). Üretimde 404; karar sonrası silinir. */
export default function Yerlesim() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="pb-24">
      <Services diagrams="inline" />
    </div>
  );
}
