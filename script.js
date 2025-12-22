// ===== Country List =====
const countries = [
	"Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
	"Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
	"Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
	"Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
	"Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
	"Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica",
	"Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark",
	"Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
	"Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
	"Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
	"Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia",
	"Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan",
	"Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia",
	"Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
	"Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
	"Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
	"Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
	"North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea",
	"Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
	"Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
	"Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
	"Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
	"Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand",
	"Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
	"Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
	"Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
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
		return;
	}
}

// ===== Format Number with Commas =====
function formatNumberWithCommas(x) {
	if (!x) return '';
	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

// ===== Calculator =====
function calculateSavings() {
	const goalInput = document.getElementById("goalAmount").value.replace(/,/g,'');
	const goal = parseFloat(goalInput);
	const months = parseFloat(document.getElementById("timeframe").value);
	const interest = parseFloat(document.getElementById("interestRate").value) || 0;
	const tax = parseFloat(document.getElementById("taxRate").value) || 0;

	if (!goal || goal <= 0 || !months || months <= 0) return;

	const years = months / 12;
	const netInterest = interest * (1 - tax / 100);
	const growthFactor = 1 + (netInterest / 100) * years;

	const container = document.getElementById("frequencyResults");
	container.innerHTML = "";

	Object.entries(frequencies).forEach(([label, freq]) => {
		const periods = years * freq;
		const deposit = goal / periods / growthFactor;
		const p = document.createElement("p");
		p.innerHTML = `Save <strong>${label}</strong>: ₱${formatNumberWithCommas(deposit.toFixed(2))}`;
		container.appendChild(p);
	});

	document.getElementById("totalSaved").innerText = `₱${formatNumberWithCommas(goal.toFixed(2))}`;
	document.getElementById("result").style.display = "block";
}

// ===== Add comma formatting while typing =====
const goalInput = document.getElementById("goalAmount");
goalInput.addEventListener("input", (e) => {
	const caretPos = goalInput.selectionStart;
	let value = goalInput.value.replace(/,/g,'');
	if (!isNaN(value) && value.length > 0) {
		goalInput.value = formatNumberWithCommas(value);
		goalInput.setSelectionRange(caretPos, caretPos);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	populateCountries();
	detectCountry();
	document.getElementById("calculateBtn").addEventListener("click", calculateSavings);
});
