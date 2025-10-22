const form = document.querySelector('.form-fields');

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

		console.log(Math.round(monthlyPayment * 100) / 100);
		console.log(Math.round(monthlyPayment * loanTerm * 100) / 100);
	}

	console.log(amountInput, termInput, rateInput, typeInput);
});
