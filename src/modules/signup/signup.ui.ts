import { getElement } from "../../shared/dom.ui";
import { showToast } from "../../shared/toast.ui";

const SIGNUP_FAILURE_STATUS = 500;

const signupForm = getElement<HTMLFormElement>(".form");

async function submitSignup(): Promise<void> {
  try {
    const response = await Promise.resolve({ ok: false, status: SIGNUP_FAILURE_STATUS });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    showToast("Account created successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup request failed.";
    showToast(message, "error");
  }
}

export function bindSignupForm(): void {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void submitSignup();
  });
}
