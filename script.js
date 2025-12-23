document.addEventListener("DOMContentLoaded", function(){

	/* ==============================
	   Tabs
	============================== */

	document.querySelectorAll(".tab").forEach(tab => {
		tab.addEventListener("click", () => {
			document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
			document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

			tab.classList.add("active");
			document.getElementById("tab-" + tab.dataset.tab).classList.add("active");

			document.getElementById("result").style.display = "none";
		});
	});

	/* ==============================
	   Advanced Toggle
	============================== */

	const checkbox = document.getElementById("includeInterestTax");
	const label = checkbox.nextElementSibling;
	const advanced = document.getElementById("advancedSection");

	let advancedEverShown = false;

	function toggleAdvanced(){
		if(!advancedEverShown){
			advanced.style.display = "block";
			advancedEverShown = true;
		}else{
			advanced.style.display = advanced.style.display === "none" ? "block" : "none";
		}
	}

	label.addEventListener("click", function(e){
		e.preventDefault();
		toggleAdvanced();
		calculateGoal();
	});

	checkbox.addEventListener("change", calculateGoal);

	/* ==============================
	   Goal Calculator
	============================== */

	function calculateGoal(){
		const goal = parseFloat(document.getElementById("goalAmount").value);
		const num = parseFloat(document.getElementById("timeframeNumber").value);
		const unit = document.getElementById("timeframeUnit").value;

		if(!goal || !num) return;

		const interest = checkbox.checked ? parseFloat(document.getElementById("interestRate").value) || 0 : 0;
		const tax = checkbox.checked ? parseFloat(document.getElementById("taxRate").value) || 0 : 0;

		let days = num;

		if(unit === "weeks") days *= 7;
		if(unit === "months") days *= 30;
		if(unit === "years") days *= 365;

		let effectiveGoal = goal;

		if(interest > 0){
			const grossInterest = goal * (interest / 100);
			const taxAmount = grossInterest * (tax / 100);
			effectiveGoal += grossInterest - taxAmount;
		}

		const daily = effectiveGoal / days;
		const weekly = daily * 7;
		const monthly = daily * 30;
		const yearly = daily * 365;

		document.getElementById("frequencyResults").innerHTML = `
			<div class="result-row"><span>Savings in Days</span><span>${daily.toFixed(2)}</span></div>
			<div class="result-row"><span>Savings in Weeks</span><span>${weekly.toFixed(2)}</span></div>
			<div class="result-row"><span>Savings in Months</span><span>${monthly.toFixed(2)}</span></div>
			<div class="result-row"><span>Savings in Years</span><span>${yearly.toFixed(2)}</span></div>
		`;

		document.getElementById("totalSaved").innerText = effectiveGoal.toFixed(2);
		document.getElementById("result").style.display = "block";
	}

	document.getElementById("calculateBtn").addEventListener("click", calculateGoal);

	/* ==============================
	   Accumulation Calculator
	============================== */

	function calculateAccumulation(){
		const amount = parseFloat(document.getElementById("saveAmount").value);
		const freq = document.getElementById("accFrequency").value;
		const dur = parseFloat(document.getElementById("accDuration").value);
		const unit = document.getElementById("accUnit").value;

		if(!amount || !dur) return;

		const unitDays = { days:1, weeks:7, months:30, years:365 };
		const freqDays = { daily:1, weekly:7, monthly:30, yearly:365 };

		const totalDays = dur * unitDays[unit];
		const periods = Math.floor(totalDays / freqDays[freq]);
		const total = periods * amount;

		document.getElementById("frequencyResults").innerHTML = `
			<div class="result-row"><span>Total Contributions</span><span>${periods}</span></div>
		`;

		document.getElementById("totalSaved").innerText = total.toFixed(2);
		document.getElementById("result").style.display = "block";
	}

	document.getElementById("calculateAccumulation")
		.addEventListener("click", calculateAccumulation);

});
