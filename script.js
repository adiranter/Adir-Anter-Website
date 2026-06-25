// Grab the two elements we need from the page.
const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");

// Run this function whenever the form is submitted.
form.addEventListener("submit", async (event) => {
  // Stop the browser from doing its normal submit (which leaves the page).
  event.preventDefault();

  // Collect all the field values into a package to send.
  const data = new FormData(form);

  try {
    // Send the data to Formspree in the background and wait for a reply.
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Success: show a message and clear the form.
      status.textContent = "Thanks! Your message has been sent.";
      status.className = "form-status success";
      form.reset();
    } else {
      // Formspree replied, but with an error.
      status.textContent = "Oops! Something went wrong. Please try again.";
      status.className = "form-status error";
    }
  } catch (error) {
    // The request never reached the server (e.g. no internet).
    status.textContent = "Network error. Please check your connection.";
    status.className = "form-status error";
  }
});
