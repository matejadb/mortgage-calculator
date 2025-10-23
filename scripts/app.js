const form = document.querySelector('.form-fields');
const clearAll = document.querySelector('.clear-all');
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const emptyResult = document.querySelector('.results-container-empty');
const completedResult = document.querySelector('.results-container-completed');
const amountError = amountInput
	.closest('.mortgage-amount')
	.querySelector('.error-text');
const termError = termInput
	.closest('.mortgage-term')
	.querySelector('.error-text');
const rateError = rateInput
	.closest('.mortgage-rate')
	.querySelector('.error-text');
const typeError = document.querySelector('.mortgage-type .error-text');
const prefix = document.querySelector('.prefix-text');
const suffixTerm = termInput
	.closest('.input-container')
	.querySelector('.suffix-text');
const suffixRate = rateInput
	.closest('.input-container')
	.querySelector('.suffix-text');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const typeInput = document.querySelector('input[name="type"]:checked');

	let isValid = true;

	amountError.classList.add('hidden');
	termError.classList.add('hidden');
	rateError.classList.add('hidden');
	typeError.classList.add('hidden');

	prefix.classList.remove('prefix-text-error');
	suffixTerm.classList.remove('prefix-text-error');
	suffixRate.classList.remove('prefix-text-error');

	if (!amountInput.value) {
		amountError.classList.remove('hidden');
		prefix.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!termInput.value) {
		termError.classList.remove('hidden');
		suffixTerm.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!rateInput.value) {
		rateError.classList.remove('hidden');
		suffixRate.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!typeInput) {
		typeError.classList.remove('hidden');
		isValid = false;
	}

	if (!isValid) return;

	/**
	 * If a user enters 300,000 it will remove the comma and just parse 300000
	 */
	let loanAmount = parseFloat(amountInput.value.replace(/,/g, ''));
	let interestRate = parseFloat(rateInput.value) / 12 / 100;
	let loanTerm = parseFloat(termInput.value) * 12;
	const monthly = document.querySelector('.monthly-payment');
	const total = document.querySelector('.total-payment');
	if (typeInput.value == 'repayment') {
		let up = interestRate * Math.pow(1 + interestRate, loanTerm);
		let down = Math.pow(1 + interestRate, loanTerm) - 1;
		let monthlyPayment = loanAmount * (up / down);

		monthly.textContent =
			'£' + (Math.round(monthlyPayment * 100) / 100).toLocaleString('en-US');

		total.textContent =
			'£' +
			(Math.round(monthlyPayment * loanTerm * 100) / 100).toLocaleString(
				'en-US'
			);
	} else if (typeInput.value == 'interest-only') {
		let monthlyPayment = loanAmount * interestRate;
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

	inputContainers.forEach((inp) => {
		inp.classList.remove('input-container-focus');
		const focusSpan = inp.querySelector('span');

		focusSpan.classList.remove('input-container-span-focus');
	});
	options.forEach((opt) => opt.classList.remove('radio-checked'));

	emptyResult.classList.remove('hidden');
	completedResult.classList.add('hidden');
	prefix.classList.remove('prefix-text-error');
	suffixTerm.classList.remove('prefix-text-error');
	suffixRate.classList.remove('prefix-text-error');
	amountError.classList.add('hidden');
	termError.classList.add('hidden');
	rateError.classList.add('hidden');
	typeError.classList.add('hidden');
});

const inputContainers = document.querySelectorAll('.input-container');

inputContainers.forEach((container) => {
	container.addEventListener('click', (e) => {
		e.stopPropagation();

		const input = container.querySelector('input');
		input.focus();

		inputContainers.forEach((inp) => {
			inp.classList.remove('input-container-focus');
			const focusSpan = inp.querySelector('span');

			focusSpan.classList.remove('input-container-span-focus');
		});

		const focusEl = input.closest('.input-container');
		const focusElSpan = focusEl.querySelector('span');

		focusEl.classList.add('input-container-focus');
		focusElSpan.classList.add('input-container-span-focus');
	});
});

const options = document.querySelectorAll('.option');

options.forEach((option) => {
	option.addEventListener('click', () => {
		const radio = option.querySelector('input[name="type"]');
		if (radio) {
			options.forEach((opt) => opt.classList.remove('radio-checked'));

			radio.checked = true;
			option.classList.add('radio-checked');
		}
	});
});

document.addEventListener('click', () => {
	inputContainers.forEach((inp) => {
		inp.classList.remove('input-container-focus');
		const focusSpan = inp.querySelector('span');

		focusSpan.classList.remove('input-container-span-focus');
	});
});
