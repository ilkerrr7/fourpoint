/**
 * Form values are written into an HTML email and into its subject line. Both
 * are built by hand, so both need the visitor's text neutralised first.
 */

/** Entity-escapes the five characters that can break out of HTML text or an attribute. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Flattens a value for use in a header-like field (a subject line).
 *
 * Resend takes JSON and assembles the message itself, so a newline here does
 * not splice in a Bcc the way a raw SMTP header would. It is still removed:
 * the same strings are passed to other transports, and a subject that spans
 * lines is malformed regardless. Control characters go with it, and the
 * result is capped so one long field cannot push the subject to an
 * unreasonable length.
 */
export function sanitizeHeaderValue(value: string, maxLength = 120): string {
  const flattened = value.replace(/[\r\n\t\u0000-\u001F\u007F]+/g, " ").trim();
  return flattened.length > maxLength ? `${flattened.slice(0, maxLength - 1)}…` : flattened;
}
