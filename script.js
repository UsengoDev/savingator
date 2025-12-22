// ==============================
// Savingator – Core Logic
// ==============================

// ===== Frequencies (outputs, not inputs) =====
const frequencies = {
	daily: 365,
	weekly: 52,
	biweekly: 26,
	monthly: 12,
	yearly: 1
};

// ===== Country Defaults (light assumptions) =====
const defaultParams = {
	"Philippines": { interest: 4, tax: 20 },
	"United States": { interest: 3, tax: 22 },
	"United Kingdom": { interest: 2, tax: 20 },
	"Canada": { interest: 2, tax: 15 },
	"Australia": { interest: 2, tax: 15 },
	"India": { interest: 6, tax: 10 },
	"Singapore": { interest: 2, tax: 0 }
};

// ===== Timezone Guessing =====
const tzToCountry = {
	"Asia/Manila": "Philippines",
	"America/New_York": "United States",
	"America/Los_Angeles": "United States",
	"America/Toronto": "Canada",
	"Europe/London": "United Kingdom",
	"Asia/Singapore": "Singapore",
	"Asia/Kolkata": "India",
	"Australia/Sydney": "Australia"
};

// ===== Detect Country Silently =====
function detectCountry() {
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const country = tzToCountry[tz];
	if (!country) return;

	const data = defaultParams[country];
	if (!data) return;

	document.getElementById("interestRate").value = data.interest;
	document.getElementById("taxRate").value = data.tax;
}

// ===== Core Calculator =====
function calculateSavings() {
	const goal = parseFloat(document.getElementById("goalAmount").value);
	if (!goal || goal <= 0) return;

	const presetMonths = parseFloat(document.getElementById("timeframePreset").value);
	const customMonths = parseFloat(document.getElementById("timeframeCustom").value);
	const months = customMonths > 0 ? customMonths : presetMonths;

	const interest = parseFloat(document.getElementById("interestRate").value) || 0;
	const tax = parseFloat(document.getElementById("taxRate").value) || 0;

	const years = months / 12;

	// Simple, transparent growth model
	const netInterest = interest * (1 - tax / 100);
	const growthFactor = 1 + (netInterest / 100) * years;

	// Compute deposits for each frequency
	Object.entries(frequencies).forEach(([key, freq]) => {
		const periods = years * freq;
		const deposit = goal / periods / growthFactor;
		document.getElementById(key).innerText = `₱${deposit.toFixed(2)}`;
	});

	// Goal is always the final total
	document.getElementById("totalSaved").innerText = `₱${goal.toFixed(2)}`;
	document.getElementById("result").style.display = "block";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
	detectCountry();
	document.getElementById("calculateBtn")
		.addEventListener("click", calculateSavings);
});
