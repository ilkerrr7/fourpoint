import { useCallback, useSyncExternalStore } from "react";

/**
 * matchMedia'yı bir dış kaynak gibi okur: sunucuda ve hidrasyon sırasında
 * false, istemcide gerçek değer. Effect içinde setState yok.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
