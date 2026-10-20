/** Session flag: preloader just completed → Hero runs entry handoff once. */
export const ENTRY_HANDOFF_KEY = "trevyk-entry-handoff";

export function markEntryHandoff(): void {
  try {
    sessionStorage.setItem(ENTRY_HANDOFF_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function consumeEntryHandoff(): boolean {
  try {
    const v = sessionStorage.getItem(ENTRY_HANDOFF_KEY);
    if (v === "1") {
      sessionStorage.removeItem(ENTRY_HANDOFF_KEY);
      return true;
    }
  } catch {
    /* private mode */
  }
  return false;
}

export function peekEntryHandoff(): boolean {
  try {
    return sessionStorage.getItem(ENTRY_HANDOFF_KEY) === "1";
  } catch {
    return false;
  }
}
