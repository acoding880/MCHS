"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const frame = document.getElementById("uv-frame");
const mainUI = document.getElementById("main-ui");
const errorMsg = document.getElementById("uv-error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    // Register the Service Worker
    await registerSW();
  } catch (err) {
    errorMsg.textContent = "Failed to register Service Worker. Try refreshing.";
    throw err;
  }

  const url = search(address.value, "https://www.google.com/search?q=%s");
  
  // Create the encoded Ultraviolet URL
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);

  // Show the iframe and hide the search UI
  mainUI.classList.add("hidden");
  frame.style.display = "block";
  frame.src = encodedUrl;
});

/**
 * Basic search logic to handle both URLs and search queries
 */
function search(input, template) {
  try {
    return new URL(input).toString();
  } catch (e) {}

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (e) {}

  return template.replace("%s", encodeURIComponent(input));
}