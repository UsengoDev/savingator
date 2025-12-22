// ===== Frequencies =====
const frequencies = {
	"Daily": 365,
	"Weekly": 52,
	"Bi-Weekly": 26,
	"Monthly": 12,
	"Quarterly": 4,
	"Yearly": 1
};

// ===== Country Defaults (Optional) =====
const countries = ["Philippines","United States","United Kingdom","Canada","Australia","India","Singapore"];
const defaultParams = {
	"Philippines": { interest: 4, tax: 20 },
	"United States": { interest: 3, tax: 22 },
	"United Kingdom": { interest: 2, tax: 20 },
	"Canada": { interest: 2, tax: 15 },
	"Australia": { interest: 2, tax: 15 },
	"India": { interest: 6, tax: 10 },
	"Singapore": { interest: 2, tax: 0 }
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

// ===== Convert timeframe to months =====
function convertToMonths(number, unit) {
	switch(unit) {
		case 'days': return number / 30;
		case 'weeks': return number / 4.345;
		case 'months': return number;
		case 'years': return number * 12;
		default: return number;
	}
}

// ===== Calculator =====
function calculateSavings() {
	const goal = parseFloat(document.getElementById("goalAmount").value);
	const num = parseFloat(document.getElementById("timeframeNumber").value);
	const unit = document.getElementById("timeframeUnit").value;
	const months = convertToMonths(num, unit);

	const includeTaxInterest = document.getElementById("includeTaxInterest").checked;
	let interest = 0, tax = 0;
	if (includeTaxInterest) {
		interest = parseFloat(document.getElementById("interestRate").value) || 0;
		tax = parseFloat(document.getElementById("taxRate").value) || 0;
	}

	if (!goal || goal <= 0 || !months || months <= 0) return;

	const years = months / 12;
	const netInterest = interest * (1 - tax / 100);
	const growthFactor = 1 + (netInterest / 100) * years;

	const container = document.getElementById("frequencyResults");
	container.innerHTML = "";

	Object.entries(frequencies).forEach(([label, freq]) => {
		const monthsPerDeposit = 12 / freq;
		if (monthsPerDeposit > months) return; // skip if deposit interval exceeds timeframe
		const periods = years * freq;
		const deposit = goal / periods / growthFactor;
		const p = document.createElement("p");
		p.innerHTML = `Save <strong>${label}</strong>: ₱${deposit.toFixed(2)}`;
		container.appendChild(p);
	});

	document.getElementById("totalSaved").innerText = `₱${goal.toFixed(2)}`;
	document.getElementById("result").style.display = "block";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
	populateCountries();
	document.getElementById("calculateBtn").addEventListener("click", calculateSavings);
});
