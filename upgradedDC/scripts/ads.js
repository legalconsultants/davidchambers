const ads = [
  {
    title: "Legal Consultation - Free!",
    description: "Get a free 30-minute consultation with our legal experts.",
    link: "https://consultsaha.com/",
  },
  {
    title: "Know Your Rights",
    description: "Download our free legal rights guide to stay informed.",
    link: "https://usaconsultant.us/",
  },
];

function displayAds() {
  const adContainer = document.getElementById("ads");
  adContainer.innerHTML = ads
    .map(
      (ad) => `
        <div class="ad">
          <h3>${ad.title}</h3>
          <p>${ad.description}</p>
          <a href="${ad.link}" target="_blank">Learn More</a>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", displayAds);
