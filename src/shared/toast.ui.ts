const TOAST_DURATION_MS = 4000;
const DEFAULT_TOAST_TYPE = "success";

export type ToastType = "success" | "error";

const toastContainer = document.querySelector<HTMLDivElement>("#toasts");

export function showToast(message: string, type: ToastType = DEFAULT_TOAST_TYPE): void {
  if (!toastContainer) throw new Error("Missing #toasts container");

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toastContainer.append(toast);

  window.setTimeout(() => toast.remove(), TOAST_DURATION_MS);
}
