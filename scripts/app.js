// DECLARATIONS

const form = document.querySelector('.form-fields');
const clearAll = document.querySelector('.clear-all');
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const emptyResult = document.querySelector('.results-container-empty');
const completedResult = document.querySelector('.results-container-completed');
const inputContainers = document.querySelectorAll('.input-container');
const options = document.querySelectorAll('.option');
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

// MAIN

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const typeInput = document.querySelector('input[name="type"]:checked');

	let isValid = validateInput(
		amountInput.value,
		termInput.value,
		rateInput.value,
		typeInput
	);

	if (!isValid) return;

	calculatePayments(
		amountInput.value,
		rateInput.value,
		termInput.value,
		typeInput.value
	);

	emptyResult.classList.add('hidden');
	completedResult.classList.remove('hidden');
});

document.addEventListener('click', () => {
	removeInputContainerFocus();
});

inputContainers.forEach((container) => {
	container.addEventListener('click', (e) => {
		e.stopPropagation();

		const input = container.querySelector('input');
		input.focus();

		removeInputContainerFocus();

		const focusEl = input.closest('.input-container');
		const focusElSpan = focusEl.querySelector('span');

		focusEl.classList.add('input-container-focus');
		focusElSpan.classList.add('input-container-span-focus');
	});
});

options.forEach((option) => {
	option.addEventListener('click', () => {
		const radio = option.querySelector('input[name="type"]');
		if (radio) {
			removeRadioChecked();

			radio.checked = true;
			option.classList.add('radio-checked');
		}
	});
});

// FUNCTIONS

function addErrorHiddenClass() {
	amountError.classList.add('hidden');
	termError.classList.add('hidden');
	rateError.classList.add('hidden');
	typeError.classList.add('hidden');
}

function removeRadioChecked() {
	options.forEach((opt) => opt.classList.remove('radio-checked'));
}

function removeInputContainerFocus() {
	inputContainers.forEach((inp) => {
		inp.classList.remove('input-container-focus');
		const focusSpan = inp.querySelector('span');

		focusSpan.classList.remove('input-container-span-focus');
	});
}

function removeTextErrorClass() {
	prefix.classList.remove('prefix-text-error');
	suffixTerm.classList.remove('prefix-text-error');
	suffixRate.classList.remove('prefix-text-error');
}

clearAll.addEventListener('click', (e) => {
	e.preventDefault();

	amountInput.value = '';
	termInput.value = '';
	rateInput.value = '';

	const checkedType = document.querySelector('input[name="type"]:checked');
	if (checkedType) checkedType.checked = false;

	removeInputContainerFocus();
	removeRadioChecked();

	emptyResult.classList.remove('hidden');
	completedResult.classList.add('hidden');

	removeTextErrorClass();
	addErrorHiddenClass();
});

function validateInput(amount, term, rate, type) {
	let isValid = true;

	addErrorHiddenClass();
	removeTextErrorClass();
	if (!amount) {
		amountError.classList.remove('hidden');
		prefix.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!term) {
		termError.classList.remove('hidden');
		suffixTerm.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!rate) {
		rateError.classList.remove('hidden');
		suffixRate.classList.add('prefix-text-error');
		isValid = false;
	}
	if (!type) {
		typeError.classList.remove('hidden');
		isValid = false;
	}

	return isValid;
}

function calculatePayments(amount, rate, term, type) {
	const monthly = document.querySelector('.monthly-payment');
	const total = document.querySelector('.total-payment');

	let loanAmount = parseFloat(amount.replace(/,/g, ''));
	let interestRate = parseFloat(rate) / 12 / 100;
	let loanTerm = parseFloat(term) * 12;

	switch (type) {
		case 'repayment':
			let up = interestRate * Math.pow(1 + interestRate, loanTerm);
			let down = Math.pow(1 + interestRate, loanTerm) - 1;
			monthlyPayment = loanAmount * (up / down);

			monthly.textContent =
				'£' + (Math.round(monthlyPayment * 100) / 100).toLocaleString('en-US');

			total.textContent =
				'£' +
				(Math.round(monthlyPayment * loanTerm * 100) / 100).toLocaleString(
					'en-US'
				);
			break;
		case 'interest-only':
			monthlyPayment = loanAmount * interestRate;
			monthly.textContent =
				'£' + (Math.round(monthlyPayment * 100) / 100).toLocaleString('en-US');

			total.textContent =
				'£' +
				(Math.round(monthlyPayment * loanTerm * 100) / 100).toLocaleString(
					'en-US'
				);
			break;
		default:
			console.error('There has been an error');
	}
}
