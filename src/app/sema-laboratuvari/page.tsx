import { notFound } from "next/navigation";
import { ServiceDiagram, SERVICE_DIAGRAMS } from "@/components/hizmetler/ServiceDiagram";

/**
 * Yalnızca geliştirme: hizmet şemalarının ızgara önizlemesi (adım 2a ekran
 * görüntüsü ve webm için). Üretimde 404; adım 2b'de yerleşim yapılınca
 * silinir. Sitenin parçası değildir.
 */
export default function SemaLaboratuvari() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="min-h-svh bg-ink px-10 py-16">
      <div id="sema-izgara" className="mx-auto grid max-w-[1360px] grid-cols-5 gap-x-10 gap-y-12">
        {SERVICE_DIAGRAMS.map((d) => (
          <figure key={d.id} className="m-0">
            <ServiceDiagram id={d.id} />
            <figcaption className="mt-4 text-13 font-medium uppercase tracking-[0.2em] text-fg-subtle">
              {d.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
