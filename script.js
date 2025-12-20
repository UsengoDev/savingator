// ===== Country List =====
const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo (Congo‑Brazzaville)","Costa Rica",
  "Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark",
  "Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
  "Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
  "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea‑Bissau",
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
  "Timor‑Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
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

// ===== Timezone Mappings (approx.) =====
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

// ===== Populate Countries =====
function populateCountries() {
  const sel = document.getElementById("country");
  sel.innerHTML = "<option value=''>Select Country</option>";
  countries.forEach(c => {
    let opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", () => applyDefaults(sel.value));
}

// ===== Apply Defaults =====
function applyDefaults(country) {
  const obj = defaultParams[country];
  if (obj) {
    document.getElementById("interestRate").value = obj.interest;
    document.getElementById("taxRate").value = obj.tax;
  } else {
    document.getElementById("interestRate").value = "";
    document.getElementById("taxRate").value = "";
  }
}

// ===== Detect Country =====
function detectCountry() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const guess = tzToCountry[tz];
  const sel = document.getElementById("country");

  if (guess && countries.includes(guess)) {
    sel.value = guess;
    applyDefaults(guess);
  } else {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (countries.includes(data.country_name)) {
          sel.value = data.country_name;
          applyDefaults(data.country_name);
        }
      }).catch(() => {});
  }
}

// ===== Calculator Logic =====
function calculateSavings() {
  const goal = parseFloat(document.getElementById("goalAmount").value);
  const months = parseFloat(document.getElementById("timeframe").value);
  const freq = parseFloat(document.getElementById("frequency").value);
  const interest = parseFloat(document.getElementById("interestRate").value);
  const tax = parseFloat(document.getElementById("taxRate").value);

  if (!goal || goal <= 0) {
    alert("Please enter a valid goal amount.");
    return;
  }

  const totalPeriods = months * (freq / 12);
  let deposit = goal / totalPeriods;

  if (interest > 0) {
    const factor = 1 + (interest / 100) * (months / 12);
    deposit /= factor;
  }
  if (tax > 0) {
    deposit /= (1 - tax / 100);
  }

  const totalSaved = deposit * totalPeriods;
  document.getElementById("requiredDeposit").innerText = `₱${deposit.toFixed(2)}`;
  document.getElementById("totalSaved").innerText = `₱${totalSaved.toFixed(2)}`;
  document.getElementById("result").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  populateCountries();
  detectCountry();
  document.getElementById("calculateBtn").addEventListener("click", calculateSavings);
});
