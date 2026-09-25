/**
 * Shared Motion easing — mirrors the --ease-out-expo CSS token in
 * globals.css. Typed `as const` so Motion accepts it as a bezier Easing.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
