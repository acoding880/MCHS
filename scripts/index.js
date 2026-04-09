"use strict";

const uvForm = document.getElementById("searchbox");
const uvAddress = document.getElementById("search");
const uvFrame = document.getElementById("frame");
const uvMainUI = document.getElementById("main-ui");

uvForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    alert("Service Worker failed. Please refresh the page.");
    return;
  }

  const template = document.getElementById("searchengine").value;
  const url = searchInput(uvAddress.value, template);
  
  uvMainUI.classList.add("hidden");
  uvFrame.style.display = "block";
  uvFrame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

function searchInput(input, template) {
  try {
    return new URL(input).toString();
  } catch (e) {}

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (e) {}

  return template.replace("%s", encodeURIComponent(input));
}