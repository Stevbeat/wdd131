const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperature = 10;
const windSpeed = 5;

function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * wind ** 0.16 + 0.3965 * temp * wind ** 0.16;
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${new Date(document.lastModified).toLocaleString()}`;

if (temperature <= 10 && windSpeed > 4.8) {
    document.querySelector("#wind-chill").textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
    document.querySelector("#wind-chill").textContent = "N/A";
}
