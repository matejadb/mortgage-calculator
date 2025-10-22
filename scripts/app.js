const form = document.querySelector('.form-fields');
const clearAll = document.querySelector('.clear-all');
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const emptyResult = document.querySelector('.results-container-empty');
const completedResult = document.querySelector('.results-container-completed');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const typeInput = document.querySelector('input[name="type"]:checked').value;

	/**
	 * If a user enters 300,000 it will remove the comma and just parse 300000
	 */
	let loanAmount = parseFloat(amountInput.value.replace(/,/g, ''));
	let interestRate = parseFloat(rateInput.value) / 12 / 100;
	let loanTerm = parseFloat(termInput.value) * 12;

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

	amountInput.value = '';
	termInput.value = '';
	rateInput.value = '';

	const checkedType = document.querySelector('input[name="type"]:checked');
	if (checkedType) checkedType.checked = false;

	emptyResult.classList.remove('hidden');
	completedResult.classList.add('hidden');
});
