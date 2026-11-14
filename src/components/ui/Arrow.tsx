/**
 * Metin bağlantılarının sonundaki "→": üst öğe (.group) üzerine gelince 4px
 * sağa kayar, yalnızca transform (effects.css .arrow-shift). Dekoratif.
 */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`arrow-shift ${className}`} aria-hidden="true">
      →
    </span>
  );
}
