(() => {
  "use strict";

  // Replace the empty contact values with verified business details before publishing.
  const businessDetails = {
    businessPhone: "",
    whatsappNumber: "",
    email: "",
    registeredAddress: "AMD Lumina Frames\nAMD House, Jangalpara, Pursurah\nNear BDO Office\nWest Bengal – 712401",
    manufacturingAddress: "AMD House, Pursurah\nNear BDO Office, Ground Floor\nWest Bengal – 712401"
  };

  const cleanPhone = (value) => value.replace(/\D/g, "");
  const whatsappConfigured = () => /^\d{8,15}$/.test(cleanPhone(businessDetails.whatsappNumber));
  const openWhatsApp = (message) => {
    if (!whatsappConfigured()) {
      return false;
    }
    const url = `https://wa.me/${cleanPhone(businessDetails.whatsappNumber)}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  };

  document.querySelectorAll("[data-contact-phone]").forEach((link) => {
    const number = businessDetails.businessPhone.trim();
    if (/^[+()\d .-]{7,20}$/.test(number) && cleanPhone(number).length >= 7) {
      link.textContent = number;
      link.href = `tel:${number.replace(/[^\d+]/g, "")}`;
    } else {
      link.textContent = "[Add business phone]";
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
    }
  });

  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    const email = businessDetails.email.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      link.textContent = email;
      link.href = `mailto:${email}`;
    } else {
      link.textContent = "[Add email address]";
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
    }
  });

  const addressQuery = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\n/g, ", "))}`;
  document.querySelectorAll("[data-address]").forEach((element) => {
    const address = element.dataset.address === "registered"
      ? businessDetails.registeredAddress
      : businessDetails.manufacturingAddress;
    element.innerHTML = address.split("\n").map((line) => line.replace(/[&<>"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
    })[character])).join("<br>");
  });
  document.querySelectorAll("[data-directions]").forEach((link) => {
    const address = link.dataset.directions === "registered"
      ? businessDetails.registeredAddress
      : businessDetails.manufacturingAddress;
    link.href = addressQuery(address);
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    if (whatsappConfigured()) {
      link.href = `https://wa.me/${cleanPhone(businessDetails.whatsappNumber)}?text=${encodeURIComponent("Hello AMD Lumina Frames, I would like to enquire about your products and services.")}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contact";
      link.setAttribute("aria-label", "WhatsApp enquiry; configure a WhatsApp number to activate");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        const status = document.querySelector("#formStatus");
        status.textContent = "WhatsApp is not configured yet. Please add the business WhatsApp number in js/script.js.";
        status.classList.add("status-error");
      });
    }
  });

  document.querySelectorAll(".product-enquiry").forEach((button) => {
    button.addEventListener("click", () => {
      const status = document.querySelector("#formStatus");
      status.textContent = "";
      status.classList.remove("status-error");
      const product = button.dataset.product;
      const message = `Hello AMD Lumina Frames, I would like to enquire about ${product}. Please share more information.`;
      if (!openWhatsApp(message)) {
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        status.textContent = "WhatsApp is not configured yet. Please add the business WhatsApp number in js/script.js.";
        status.classList.add("status-error");
      }
    });
  });

  const form = document.querySelector("#enquiryForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#formStatus");
    status.textContent = "";
    status.classList.remove("status-error");

    if (!form.reportValidity()) {
      return;
    }

    if (!whatsappConfigured()) {
      status.textContent = "WhatsApp is not configured yet. Please add the business WhatsApp number in js/script.js.";
      status.classList.add("status-error");
      return;
    }

    const formData = new FormData(form);
    const message = [
      "Hello AMD Lumina Frames, I would like to make an enquiry.",
      "",
      `Name: ${formData.get("fullName").trim()}`,
      `Phone: ${formData.get("phone").trim()}`,
      `Location: ${formData.get("location").trim()}`,
      `Interested product: ${formData.get("product")}`,
      `Project type: ${formData.get("projectType")}`,
      `Requirements: ${formData.get("message").trim()}`
    ].join("\n");

    if (!openWhatsApp(message)) {
      status.textContent = "WhatsApp could not be opened. Please check the configured number and try again.";
      status.classList.add("status-error");
    }
  });

  document.querySelector("#copyrightYear").textContent = new Date().getFullYear();

  document.querySelectorAll(".image-frame img").forEach((image) => {
    const showFallback = () => {
      image.closest(".image-frame").classList.add("image-failed");
    };
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  });

  document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-quote").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.querySelector("#mainNav");
      if (menu.classList.contains("show")) {
        window.bootstrap?.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
