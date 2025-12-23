// ===== Country List =====
const countries = [
	"Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
	"Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
	"Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
	"Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
	"Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)",
	"Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica",
	"Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
	"Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
	"Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland",
	"India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
	"Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
	"Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
	"Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
	"Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
	"Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
	"Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines",
	"Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
	"Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
	"Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
	"Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname",
	"Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga",
	"Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
	"United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen",
	"Zambia","Zimbabwe"
];

// ===== Default Interest & Tax Estimates =====
const defaultParams = /* unchanged, kept exactly as you provided */;

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

	const sortedCountries = countries.slice().sort((a, b) => a.localeCompare(b));
	sortedCountries.forEach(c => {
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

// ===== ACCUMULATION CALCULATOR =====
function calculateSavings() {
	const perDeposit = parseFloat(document.getElementById("goalAmount").value);
	const number = parseFloat(document.getElementById("timeframeNumber").value);
	const unit = document.getElementById("timeframeUnit").value;

	if (!perDeposit || perDeposit <= 0 || !number || number <= 0) return;

	// Convert timeframe to years
	let years;
	switch (unit) {
		case "days": years = number / 365; break;
		case "weeks": years = number / 52; break;
		case "months": years = number / 12; break;
		case "years": years = number; break;
	}

	const includeInterestTax = document.getElementById("includeInterestTax").checked;
	const interest = includeInterestTax ? parseFloat(document.getElementById("interestRate").value) || 0 : 0;
	const tax = includeInterestTax ? parseFloat(document.getElementById("taxRate").value) || 0 : 0;
	const netInterest = interest * (1 - tax / 100) / 100;

	const container = document.getElementById("frequencyResults");
	const resultCard = document.getElementById("result");

	container.innerHTML = "";

	Object.entries(frequencies).forEach(([label, freq]) => {
		const periods = Math.floor(years * freq);
		if (periods <= 0) return;

		let total = 0;
		const ratePerPeriod = netInterest / freq;

		for (let i = 0; i < periods; i++) {
			total += perDeposit;
			total += total * ratePerPeriod;
		}

		const p = document.createElement("p");
		p.innerHTML = `Save <strong>${label}</strong>: ₱${perDeposit.toFixed(2)} → <strong>₱${total.toFixed(2)}</strong>`;
		container.appendChild(p);
	});

	document.getElementById("totalSaved").innerText = "Accumulated total shown above";
	resultCard.style.display = "block";
	resultCard.classList.add("show");
}

// ===== Event Listeners =====
document.addEventListener("DOMContentLoaded", () => {
	populateCountries();
	detectCountry();

	const checkbox = document.getElementById("includeInterestTax");
	const advancedSection = document.getElementById("advancedSection");

	let advancedShown = false;
	checkbox.addEventListener("change", () => {
		if (!advancedShown) {
			advancedSection.style.display = "block";
			detectCountry();
			advancedShown = true;
		}
		calculateSavings();
	});

	document.getElementById("calculateBtn").addEventListener("click", calculateSavings);
	document.getElementById("goalAmount").addEventListener("input", calculateSavings);
	document.getElementById("timeframeNumber").addEventListener("input", calculateSavings);
	document.getElementById("timeframeUnit").addEventListener("change", calculateSavings);
	document.getElementById("interestRate").addEventListener("input", calculateSavings);
	document.getElementById("taxRate").addEventListener("input", calculateSavings);
});
