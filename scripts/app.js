const form = document.querySelector('.form-fields');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const amountInput = document.getElementById('amount').value;
	const termInput = document.getElementById('term').value;
	const rateInput = document.getElementById('rate').value;
	const typeInput = document.querySelector('input[name="type"]:checked').value;

	console.log(amountInput, termInput, rateInput, typeInput);
});
