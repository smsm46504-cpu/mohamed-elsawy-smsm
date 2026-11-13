const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hide-intro");
  window.setTimeout(() => {
    intro.style.display = "none";
  }, 1100);
});

// 3D card tilt on devices that have a mouse.
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".social-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const box = card.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const rotateY = ((x / box.width) - 0.5) * 12;
      const rotateX = (0.5 - (y / box.height)) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// The QR becomes a real shareable link after the website is published online.
// On a local file, localhost, or preview address, show a clear setup note instead.
const qrImage = document.getElementById("qrImage");
const qrPlaceholder = document.getElementById("qrPlaceholder");
const isPublicWebAddress =
  (window.location.protocol === "https:" || window.location.protocol === "http:") &&
  !["localhost", "127.0.0.1"].includes(window.location.hostname);

if (isPublicWebAddress) {
  const pageUrl = window.location.href.split("#")[0];
  qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=8&data=" + encodeURIComponent(pageUrl);
  qrImage.hidden = false;
  qrPlaceholder.hidden = true;
}
