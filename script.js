// ===== Country List =====
const countries = [
	"Philippines","United States","United Kingdom","Canada","Australia","India","Singapore"
	// ... include full list if needed ...
];

// ===== Default Interest & Tax Estimates =====
const defaultParams = {
	"Philippines": { interest: 4, tax: 20 },
	"United States": { interest: 3, tax: 22 },
	"United Kingdom": { interest: 2, tax: 20 },
	"Canada": { interest: 2, tax: 15 },
	"Australia": { interest: 2, tax: 15 },
	"India": { interest: 6, tax: 10 },
	"Singapore": { interest: 2, tax: 0 }
};

// ===== Timezone Mappings =====
const tzToCountry = {
	"Asia/Manila": "Philippines",
	"America/New_York": "United States",
	"America/Los_Angeles": "United States",
	"America/Toronto": "Canada",
	"Europe/London": "United Kingdom",
	"Europe/Paris": "France",
	"Asia/Singapore": "Singapore",
	"Asia/Kolkata": "India",
	"Australia/Sydney": "Australia"
};

// ===== Frequencies =====
const frequencies = {
	"Daily": 365,
	"Weekly": 52,
	"Bi-Weekly": 26,
	"Monthly": 12,
	"Quarterly": 4,
	"Yearly": 1
};

// ===== Populate Countries =====
function populateCountries() {
	const sel = document.getElementById("country");
	sel.innerHTML = "<option value=''>Auto-detected</option>";
	countries.forEach(c => {
		const opt = document.createElement("option");
		opt.value = c;
		opt.textContent = c;
		sel.appendChild(opt);
	});
	sel.addEventListener("change", () => applyDefaults(sel.value));
}

// ===== Apply Defaults =====
function applyDefaults(country) {
	const data = defaultParams[country];
	if (!data) return;
	document.getElementById("interestRate").value = data.interest;
	document.getElementById("taxRate").value = data.tax;
}

// ===== Detect Country =====
function detectCountry() {
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const guess = tzToCountry[tz];
	const sel = document.getElementById("country");
	if (guess && countries.includes(guess)) {
		sel.value = guess;
		applyDefaults(guess);
	}
}

// ===== Event Listeners =====
document.addEventListener("DOMContentLoaded", () => {
	populateCountries();

	const checkbox = document.getElementById("includeInterestTax");

	// Toggle advanced section when checkbox changes
	checkbox.addEventListener("change", () => {
		const section = document.getElementById('advancedSection');
		section.style.display = checkbox.checked ? 'block' : 'none';
		if (checkbox.checked) detectCountry();
	});

	document.getElementById("calculateBtn").addEventListener("click", calculateSavings);
});

// ===== Calculator =====
function calculateSavings() {
	const goal = parseFloat(document.getElementById("goalAmount").value);
	const number = parseFloat(document.getElementById("timeframeNumber").value);
	const unit = document.getElementById("timeframeUnit").value;

	if (!goal || goal <= 0 || !number || number <= 0) return;

	// Convert timeframe to months
	let months;
	switch (unit) {
		case "days": months = number / 30; break;
		case "weeks": months = number / 4.345; break;
		case "months": months = number; break;
		case "years": months = number * 12; break;
	}

	const years = months / 12;
	const includeInterestTax = document.getElementById("includeInterestTax").checked;
	const interest = includeInterestTax ? parseFloat(document.getElementById("interestRate").value) || 0 : 0;
	const tax = includeInterestTax ? parseFloat(document.getElementById("taxRate").value) || 0 : 0;
	const netInterest = interest * (1 - tax / 100);
	const growthFactor = 1 + (netInterest / 100) * years;

	const container = document.getElementById("frequencyResults");
	container.innerHTML = "";

	Object.entries(frequencies).forEach(([label, freq]) => {
		const periodMonths = 12 / freq;
		if (periodMonths > months) return; // skip frequencies exceeding chosen timeframe
		const periods = years * freq;
		const deposit = goal / periods / growthFactor;
		const p = document.createElement("p");
		p.innerHTML = `Save <strong>${label}</strong>: ₱${deposit.toFixed(2)}`;
		container.appendChild(p);
	});

	document.getElementById("totalSaved").innerText = `₱${goal.toFixed(2)}`;
	document.getElementById("result").style.display = "block";
}
