const form = document.querySelector('.form-fields');
const clearAll = document.querySelector('.clear-all');

const emptyResult = document.querySelector('.results-container-empty');
const completedResult = document.querySelector('.results-container-completed');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const amountInput = document.getElementById('amount').value;
	const termInput = document.getElementById('term').value;
	const rateInput = document.getElementById('rate').value;
	const typeInput = document.querySelector('input[name="type"]:checked').value;

	let loanAmount = parseFloat(amountInput);
	let interestRate = parseFloat(rateInput) / 12 / 100;
	let loanTerm = parseFloat(termInput) * 12;

	if (typeInput == 'repayment') {
		let up = interestRate * Math.pow(1 + interestRate, loanTerm);
		let down = Math.pow(1 + interestRate, loanTerm) - 1;
		let monthlyPayment = loanAmount * (up / down);

		const monthly = document.querySelector('.monthly-payment');
		const total = document.querySelector('.total-payment');

		monthly.textContent =
			'£' + (Math.round(monthlyPayment * 100) / 100).toLocaleString('en-US');

		total.textContent =
			'£' +
			(Math.round(monthlyPayment * loanTerm * 100) / 100).toLocaleString(
				'en-US'
			);
	}

	emptyResult.classList.add('hidden');
	completedResult.classList.remove('hidden');
});

clearAll.addEventListener('click', (e) => {
	e.preventDefault();

	emptyResult.classList.remove('hidden');
	completedResult.classList.add('hidden');
});
