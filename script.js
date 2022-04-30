'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-02-21T10:51:36.790Z',
    '2022-02-15T23:36:17.929Z',
    '2022-02-16T17:01:17.194Z',
    '2022-02-17T14:11:59.604Z',
    '2022-02-18T10:17:24.185Z',
    '2022-02-19T07:42:02.383Z',
    '2022-02-20T21:31:17.178Z',
    '2022-02-21T09:15:04.904Z',
  ],
  currency: 'EUR',
  myPlace: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  myPlace: 'en-US',
};

const accounts = [account1, account2];
// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calc = date1 => Math.abs((new Date() - date1) / (1000 * 60 * 60 * 24));

const dateDetails = function (date) {
  return {
    day: `${date.getDate()}`.padStart(2, 0),
    month: `${date.getMonth() + 1}`.padStart(2, 0),
    year: date.getFullYear(),
    hour: `${date.getHours()}`.padStart(2, 0),
    min: `${date.getMinutes()}`.padStart(2, 0),
  };
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  // labelDate.innerText = new Intl.DateTimeFormat(currentAccount.myPlace, options).format(new Date());
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const dateTransition = new Date(account.movementsDates[i]);
    // const day = `${dateTransition.getDate()}`.padStart(2, 0);
    // const month = `${dateTransition.getMonth() + 1}`.padStart(2, 0);
    // const year = dateTransition.getFullYear();
    const date = dateDetails(dateTransition);
    const daysPassed = calc(dateTransition);
    let displayDate = `${date.day}/${date.month}/${date.year}`;
    if (dateTransition.getDate() === new Date().getDate() && daysPassed < 1) {
      displayDate = `today`;
    } else if (daysPassed < 2) {
      displayDate = `yesterday`;
    } else if (daysPassed < 3) {
      displayDate = `2 days ago`;
    } else if (daysPassed < 4) {
      displayDate = `3 days ago`;
    }
    console.log(daysPassed, mov);
    // console.log(date.day);
    // console.log(new Date().getDate);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatCur(
        mov,
        currentAccount.myPlace,
        currentAccount.currency
      )}</div>

    </div>
    `;
    // <div class="movements__value">${mov.toFixed(2)}€</div>

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const displayUsersToTransfer = function (account) {
  inputTransferTo.innerHTML = '';
  const html = `<option value="notchosen">    </option>`;
  inputTransferTo.insertAdjacentHTML('afterbegin', html);
  const others = accounts.filter(acc => acc.owner !== account.owner);
  others.forEach(function (acc) {
    const html = `<option value="${acc.owner}">${acc.owner}</option>`;
    inputTransferTo.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserNames = function (accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
  displayUsersToTransfer(currentAccount);
  resetTimer();
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(
    account.balance,
    currentAccount.myPlace,
    currentAccount.currency
  );
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(
    incomes,
    currentAccount.myPlace,
    currentAccount.currency
  );

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    currentAccount.myPlace,
    currentAccount.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (account.interestRate / 100))
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(
    interest,
    currentAccount.myPlace,
    currentAccount.currency
  );
};

function init() {
  containerApp.style.opacity = 0;
  btnTransfer.disabled = true;
  btnLoan.disabled = true;
  btnClose.disabled = true;
  btnSort.disabled = true;
  labelWelcome.textContent = `Log in to get started`;
}
init();
let currentAccount, timer;

const startLogOutTimer = function () {
  const tick = () => {
    const min = String(Math.trunc(countdown / 60)).padStart(2, 0);
    const sec = String(countdown % 60).padStart(2, 0);
    labelTimer.innerHTML = `${min}:${sec}`;
    if (countdown === 0) {
      clearInterval(timer);
      init();
    }
    countdown--;
  };

  let countdown = 60;
  tick();
  return setInterval(tick, 1000);
};
// FAKE LOGIN //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// currentAccount = account2;
// containerApp.style.opacity = 100;
// btnTransfer.disabled = false;
// btnLoan.disabled = false;
// btnClose.disabled = false;
// btnSort.disabled = false;
// updateUI(currentAccount);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

setInterval(() => {
  // const date = dateDetails(new Date());
  // // const day = `${now.getDate()}`.padStart(2, 0);
  // // const month = now.getMonth() + 1;
  // // console.log(typeof(currentAccount));
  // // const year = now.getFullYear();
  // const hour = now.getHours();
  // const min = now.getMinutes();
  // const myPlace = navigator.language;
  // console.log(myPlace)
  // labelDate.innerText = `${date.day}/${date.month}/${date.year}, ${date.hour}:${date.min}`;
  labelDate.innerText = new Intl.DateTimeFormat(
    currentAccount.myPlace,
    options
  ).format(new Date());
}, 1000);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;
    btnTransfer.disabled = false;
    btnLoan.disabled = false;
    btnClose.disabled = false;
    btnSort.disabled = false;
    updateUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  } else {
    alert('user or pin not found');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.owner === inputTransferTo.value);

  if (
    amount > 0 &&
    receiver &&
    amount <= currentAccount.balance &&
    currentAccount.owner !== receiver?.owner
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);
    receiver.movementsDates.push(new Date());
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
  } else {
    alert('not enough money or user not found');
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > 0.1 * amount)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);
    }, 1000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
  }

  inputCloseUsername.value = inputClosePin.value = '';
  init();
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  resetTimer();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
