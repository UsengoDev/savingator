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
const defaultParams = {
	"Afghanistan": { interest: 5.0, tax: 15 }, "Albania": { interest: 6.0, tax: 15 },
	"Algeria": { interest: 5.0, tax: 20 }, "Andorra": { interest: 1.5, tax: 10 },
	"Angola": { interest: 8.8, tax: 20 }, "Antigua and Barbuda": { interest: 1.3, tax: 0 },
	"Argentina": { interest: 44.6, tax: 35 }, "Armenia": { interest: 9.1, tax: 20 },
	"Australia": { interest: 3.6, tax: 32 }, "Austria": { interest: 1.5, tax: 27 },
	"Azerbaijan": { interest: 9.55, tax: 14 }, "Bahamas": { interest: 0.5, tax: 0 },
	"Bahrain": { interest: 2.0, tax: 0 }, "Bangladesh": { interest: 6.0, tax: 10 },
	"Barbados": { interest: 2.0, tax: 15 }, "Belarus": { interest: 5.0, tax: 13 },
	"Belgium": { interest: 2.0, tax: 30 }, "Belize": { interest: 2.5, tax: 0 },
	"Benin": { interest: 4.0, tax: 20 }, "Bhutan": { interest: 4.5, tax: 15 },
	"Bolivia": { interest: 5.0, tax: 25 }, "Bosnia and Herzegovina": { interest: 3.0, tax: 10 },
	"Botswana": { interest: 4.5, tax: 25 }, "Brazil": { interest: 8.0, tax: 15 },
	"Brunei": { interest: 2.5, tax: 0 }, "Bulgaria": { interest: 2.0, tax: 10 },
	"Burkina Faso": { interest: 4.0, tax: 20 }, "Burundi": { interest: 5.0, tax: 25 },
	"Cabo Verde": { interest: 3.5, tax: 15 }, "Cambodia": { interest: 5.0, tax: 20 },
	"Cameroon": { interest: 4.0, tax: 15 }, "Canada": { interest: 2.0, tax: 25 },
	"Central African Republic": { interest: 5.0, tax: 25 }, "Chad": { interest: 5.0, tax: 25 },
	"Chile": { interest: 4.0, tax: 15 }, "China": { interest: 3.0, tax: 20 },
	"Colombia": { interest: 3.5, tax: 19 }, "Comoros": { interest: 5.0, tax: 20 },
	"Congo (Congo-Brazzaville)": { interest: 4.0, tax: 20 }, "Costa Rica": { interest: 4.0, tax: 15 },
	"Croatia": { interest: 2.5, tax: 24 }, "Cuba": { interest: 3.0, tax: 15 },
	"Cyprus": { interest: 2.0, tax: 20 }, "Czechia": { interest: 2.0, tax: 15 },
	"Denmark": { interest: 1.5, tax: 37 }, "Djibouti": { interest: 5.0, tax: 20 },
	"Dominica": { interest: 1.5, tax: 0 }, "Dominican Republic": { interest: 4.0, tax: 25 },
	"Ecuador": { interest: 3.5, tax: 22 }, "Egypt": { interest: 13.6, tax: 20 },
	"El Salvador": { interest: 2.5, tax: 10 }, "Equatorial Guinea": { interest: 5.0, tax: 22 },
	"Eritrea": { interest: 5.0, tax: 25 }, "Estonia": { interest: 1.5, tax: 20 },
	"Eswatini": { interest: 4.5, tax: 25 }, "Ethiopia": { interest: 7.0, tax: 15 },
	"Fiji": { interest: 4.0, tax: 15 }, "Finland": { interest: 1.5, tax: 30 },
	"France": { interest: 1.7, tax: 30 }, "Gabon": { interest: 4.0, tax: 25 },
	"Gambia": { interest: 4.0, tax: 20 }, "Georgia": { interest: 10.9, tax: 20 },
	"Germany": { interest: 1.5, tax: 26 }, "Ghana": { interest: 11.0, tax: 8 },
	"Greece": { interest: 2.0, tax: 22 }, "Grenada": { interest: 2.0, tax: 0 },
	"Guatemala": { interest: 5.0, tax: 10 }, "Guinea": { interest: 5.5, tax: 20 },
	"Guinea-Bissau": { interest: 5.0, tax: 20 }, "Guyana": { interest: 5.0, tax: 15 },
	"Haiti": { interest: 5.0, tax: 25 }, "Honduras": { interest: 4.0, tax: 15 },
	"Hungary": { interest: 3.0, tax: 30 }, "Iceland": { interest: 3.0, tax: 22 },
	"India": { interest: 6.0, tax: 10 }, "Indonesia": { interest: 5.5, tax: 20 },
	"Iran": { interest: 15.0, tax: 25 }, "Iraq": { interest: 10.0, tax: 0 },
	"Ireland": { interest: 2.0, tax: 20 }, "Israel": { interest: 2.5, tax: 25 },
	"Italy": { interest: 1.8, tax: 27 }, "Jamaica": { interest: 4.0, tax: 25 },
	"Japan": { interest: 0.75, tax: 20 }, "Jordan": { interest: 5.0, tax: 15 },
	"Kazakhstan": { interest: 14.3, tax: 10 }, "Kenya": { interest: 9.0, tax: 15 },
	"Kiribati": { interest: 2.0, tax: 10 }, "Kuwait": { interest: 2.5, tax: 0 },
	"Kyrgyzstan": { interest: 13.0, tax: 10 }, "Laos": { interest: 5.0, tax: 10 },
	"Latvia": { interest: 1.8, tax: 20 }, "Lebanon": { interest: 10.0, tax: 10 },
	"Lesotho": { interest: 5.0, tax: 15 }, "Liberia": { interest: 5.0, tax: 20 },
	"Libya": { interest: 7.0, tax: 20 }, "Liechtenstein": { interest: 1.5, tax: 15 },
	"Lithuania": { interest: 1.5, tax: 20 }, "Luxembourg": { interest: 1.5, tax: 15 },
	"Madagascar": { interest: 8.5, tax: 10 }, "Malawi": { interest: 12.0, tax: 10 },
	"Malaysia": { interest: 4.0, tax: 10 }, "Maldives": { interest: 5.0, tax: 15 },
	"Mali": { interest: 6.0, tax: 15 }, "Malta": { interest: 1.5, tax: 15 },
	"Marshall Islands": { interest: 2.0, tax: 0 }, "Mauritania": { interest: 8.0, tax: 20 },
	"Mauritius": { interest: 3.0, tax: 15 }, "Mexico": { interest: 5.0, tax: 30 },
	"Micronesia": { interest: 2.0, tax: 0 }, "Moldova": { interest: 5.0, tax: 12 },
	"Monaco": { interest: 1.5, tax: 0 }, "Mongolia": { interest: 13.8, tax: 10 },
	"Montenegro": { interest: 3.0, tax: 9 }, "Morocco": { interest: 4.5, tax: 20 },
	"Mozambique": { interest: 7.0, tax: 20 }, "Myanmar": { interest: 9.0, tax: 20 },
	"Namibia": { interest: 6.0, tax: 30 }, "Nauru": { interest: 3.0, tax: 0 },
	"Nepal": { interest: 8.0, tax: 10 }, "Netherlands": { interest: 1.8, tax: 30 },
	"New Zealand": { interest: 3.5, tax: 33 }, "Nicaragua": { interest: 5.0, tax: 15 },
	"Niger": { interest: 5.0, tax: 20 }, "Nigeria": { interest: 6.0, tax: 10 },
	"North Korea": { interest: 0.0, tax: 0 }, "North Macedonia": { interest: 3.0, tax: 18 },
	"Norway": { interest: 2.5, tax: 22 }, "Oman": { interest: 3.5, tax: 0 },
	"Pakistan": { interest: 10.0, tax: 15 }, "Palau": { interest: 3.0, tax: 15 },
	"Panama": { interest: 2.5, tax: 10 }, "Papua New Guinea": { interest: 5.0, tax: 15 },
	"Paraguay": { interest: 10.0, tax: 10 }, "Peru": { interest: 6.0, tax: 15 },
	"Philippines": { interest: 4.0, tax: 20 }, "Poland": { interest: 2.5, tax: 19 },
	"Portugal": { interest: 1.8, tax: 28 }, "Qatar": { interest: 3.0, tax: 0 },
	"Romania": { interest: 4.0, tax: 16 }, "Russia": { interest: 12.9, tax: 13 },
	"Rwanda": { interest: 8.0, tax: 15 }, "Saint Kitts and Nevis": { interest: 2.0, tax: 0 },
	"Saint Lucia": { interest: 2.5, tax: 10 }, "Saint Vincent and the Grenadines": { interest: 2.0, tax: 0 },
	"Samoa": { interest: 3.0, tax: 15 }, "San Marino": { interest: 1.8, tax: 15 },
	"Sao Tome and Principe": { interest: 5.5, tax: 20 }, "Saudi Arabia": { interest: 3.0, tax: 0 },
	"Senegal": { interest: 7.0, tax: 15 }, "Serbia": { interest: 4.5, tax: 20 }, "Seychelles": { interest: 3.5, tax: 0 },
	"Sierra Leone": { interest: 8.0, tax: 15 }, "Singapore": { interest: 2.5, tax: 0 }, "Slovakia": { interest: 2.0, tax: 19 },
	"Slovenia": { interest: 2.5, tax: 22 }, "Solomon Islands": { interest: 6.0, tax: 15 }, "Somalia": { interest: 8.0, tax: 20 },
	"South Africa": { interest: 7.0, tax: 18 }, "South Korea": { interest: 4.0, tax: 25 }, "South Sudan": { interest: 10.0, tax: 0 },
	"Spain": { interest: 1.8, tax: 24 }, "Sri Lanka": { interest: 6.0, tax: 12 }, "Sudan": { interest: 10.0, tax: 15 },
	"Suriname": { interest: 25.29, tax: 24 }, "Sweden": { interest: 1.5, tax: 30 }, "Switzerland": { interest: 1.25, tax: 35 },
	"Syria": { interest: 9.0, tax: 20 }, "Tajikistan": { interest: 16.61, tax: 5 }, "Tanzania": { interest: 8.0, tax: 15 },
	"Thailand": { interest: 3.0, tax: 15 }, "Timor-Leste": { interest: 5.0, tax: 0 }, "Togo": { interest: 6.0, tax: 20 },
	"Tonga": { interest: 3.0, tax: 15 }, "Trinidad and Tobago": { interest: 3.0, tax: 25 }, "Tunisia": { interest: 6.0, tax: 15 },
	"Turkey": { interest: 25.0, tax: 15 }, "Turkmenistan": { interest: 10.0, tax: 10 }, "Tuvalu": { interest: 2.0, tax: 0 },
	"Uganda": { interest: 11.88, tax: 15 }, "Ukraine": { interest: 13.03, tax: 18 },
	"United Arab Emirates": { interest: 3.0, tax: 0 }, "United Kingdom": { interest: 0.5, tax: 20 },
	"United States": { interest: 1.0, tax: 22 }, "Uruguay": { interest: 8.0, tax: 12 },
	"Uzbekistan": { interest: 21.31, tax: 10 }, "Vanuatu": { interest: 2.0, tax: 0 },
	"Venezuela": { interest: 36.0, tax: 0 }, "Vietnam": { interest: 6.0, tax: 20 },
	"Yemen": { interest: 15.0, tax: 0 }, "Zambia": { interest: 12.0, tax: 10 },
	"Zimbabwe": { interest: 20.0, tax: 0 }
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
	
	// Sort alphabetically
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

// ===== Calculator =====
function calculateSavings() {
	const goal = parseFloat(document.getElementById("goalAmount").value);
	const number = parseFloat(document.getElementById("timeframeNumber").value);
	const unit = document.getElementById("timeframeUnit").value;

	if (!goal || goal <= 0 || !number || number <= 0) return;

	const resultCard = document.getElementById("result");
	const container = document.getElementById("frequencyResults");

	container.innerHTML = "<p>Calculating...</p>";
	resultCard.classList.remove("show");
	resultCard.style.display = "block";

	setTimeout(() => {
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
		const growthFactor = 1 + (netInterest / 100) * years; // total growth factor

		container.innerHTML = "";

		Object.entries(frequencies).forEach(([label, freq]) => {
			const periodMonths = 12 / freq;
			if (periodMonths > months) return;

			const periods = Math.floor(years * freq);
			if (periods === 0) return;

			// Distribute deposits so the total sums exactly to goal
			const rawPerPeriod = goal / periods / growthFactor;
			const deposits = Array(periods).fill(rawPerPeriod);

			// Adjust last deposit to compensate rounding errors
			const sumDeposits = deposits.reduce((a,b)=>a+b,0);
			const roundingDiff = (goal / growthFactor) - sumDeposits;
			deposits[deposits.length - 1] += roundingDiff;

			const p = document.createElement("p");
			p.innerHTML = `Save <strong>${label}</strong>: ₱${rawPerPeriod.toFixed(2)}`;
			container.appendChild(p);
		});

		document.getElementById("totalSaved").innerText = `₱${goal.toFixed(2)}`;
		resultCard.classList.add("show");
	}, 150);
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
			advancedSection.style.display = 'block';
			detectCountry();
			advancedShown = true;
		}
		calculateSavings();
	});

	document.getElementById("calculateBtn").addEventListener("click", calculateSavings);

	// Auto-calc if goal or timeframe changes
	document.getElementById("goalAmount").addEventListener("input", calculateSavings);
	document.getElementById("timeframeNumber").addEventListener("input", calculateSavings);
	document.getElementById("timeframeUnit").addEventListener("change", calculateSavings);
	document.getElementById("interestRate").addEventListener("input", calculateSavings);
	document.getElementById("taxRate").addEventListener("input", calculateSavings);
});

// ===== Growth Calculator =====
function calculateGrowth() {
	const amount = parseFloat(document.getElementById("amount2").value);
	const timeframeNumber = parseFloat(document.getElementById("timeframeNumber2").value);
	const timeframeUnit = document.getElementById("timeframeUnit2").value;
	const frequency = document.getElementById("frequency2").value;
	const resultEl = document.getElementById("growthResult2");

	if (!amount || amount <= 0 || !timeframeNumber || timeframeNumber <= 0) {
		resultEl.innerText = "Please enter valid numbers.";
		return;
	}

	// Convert timeframe to days
	let totalDays;
	switch (timeframeUnit) {
		case "days": totalDays = timeframeNumber; break;
		case "weeks": totalDays = timeframeNumber * 7; break;
		case "months": totalDays = timeframeNumber * 30; break;
		case "years": totalDays = timeframeNumber * 365; break;
	}

	// Convert frequency to days
	let frequencyDays;
	switch (frequency) {
		case "daily": frequencyDays = 1; break;
		case "weekly": frequencyDays = 7; break;
		case "monthly": frequencyDays = 30; break;
		case "yearly": frequencyDays = 365; break;
	}

	// ❗ Guard: frequency longer than timeframe
	if (frequencyDays > totalDays) {
		resultEl.innerText = "Contribution frequency cannot be longer than the selected timeframe.";
		return;
	}

	// Calculate contributions
	const contributions = Math.floor(totalDays / frequencyDays);
	const totalSaved = amount * contributions;

	resultEl.innerHTML =
		`Saving ${amount} ${frequency} for ${timeframeNumber} ${timeframeUnit} will total <div class="goal_calculator_total">${totalSaved}.</div>`;
}


// ===== Tab Switching =====
document.addEventListener("DOMContentLoaded", () => {
	const tab1 = document.querySelector(".tab1");
	const tab2 = document.querySelector(".tab2");
	const goalCalc = document.querySelector(".savings_goal_calculator");
	const growthCalc = document.querySelector(".savings_growth_calculator");

	// Default: show Goal
	goalCalc.style.display = "block";
	growthCalc.style.display = "none";

	tab1.addEventListener("click", () => {
        goalCalc.style.display = "block";
        growthCalc.style.display = "none";

        tab1.classList.add("active", "selected_tab");
        tab2.classList.remove("active", "selected_tab");
    });


	tab2.addEventListener("click", () => {
        growthCalc.style.display = "block";
        goalCalc.style.display = "none";

        tab2.classList.add("active", "selected_tab");
        tab1.classList.remove("active", "selected_tab");
    });


	// Attach growth calculator
	document.getElementById("calculateGrowthBtn").addEventListener("click", calculateGrowth);
});
