/** Simple client-side validation + fake submit */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const showError = (name, message) => {
    const el = document.querySelector(`.error[data-for="${name}"]`);
    if (el) el.textContent = message || "";
  };

  const validators = {
    name: (v) =>
      v.trim().length >= 2 || "Please enter your full name (2+ chars).",
    email: (v) => /.+@.+\..+/.test(v) || "Please enter a valid email.",
    topic: (v) => v.trim() !== "" || "Please select a topic.",
    message: (v) => v.trim().length > 0 || "Message cannot be empty.",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("success", "error");
    let ok = true;

    const data = new FormData(form);
    // Clear previous errors
    document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

    for (const [key, val] of data.entries()) {
      if (validators[key]) {
        const res = validators[key](String(val));
        if (res !== true) {
          ok = false;
          showError(key, res);
        } else showError(key, "");
      }
    }

    if (!form.querySelector('input[name="contact"]:checked')) {
      ok = false;
      // optional: show a message near the fieldset
    }

    if (ok) {
      status.textContent = "✅ Form ready! (Demo only, no real submission)";
      status.classList.add("success");
      form.reset();
      status.focus?.();
    } else {
      status.textContent = "⛔ Please fix the highlighted fields.";
      status.classList.add("error");
      status.focus?.();
    }
  });
});
