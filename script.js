class Bank {
    constructor() {
        this.accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        this.currentAccount = null;
    }

    createAcc(acno, name, password) {
        if (this.accounts[acno]) {
            alert('Account already exists!');
            return;
        }
        this.accounts[acno] = {
            accountnumber: acno,
            username: name,
            password: password,
            balance: 0
        };
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
        alert('Account created successfully!');
    }

    login(acno, password) {
        const account = this.accounts[acno];
        if (account && account.password === password) {
            this.currentAccount = account;
            return true;
        }
        return false;
    }

    deposit(amount) {
        this.currentAccount.balance += parseFloat(amount);
        this.updateLocalStorage();
        return `${amount} credited to your account successfully`;
    }

    withdraw(amount) {
        if (parseFloat(amount) > this.currentAccount.balance) {
            return 'Insufficient balance or Transaction Failed';
        }
        this.currentAccount.balance -= parseFloat(amount);
        this.updateLocalStorage();
        return `${amount} debited from your account successfully`;
    }

    balanceEnquiry() {
        return `Your current balance is ${this.currentAccount.balance}`;
    }

    updateLocalStorage() {
        this.accounts[this.currentAccount.accountnumber] = this.currentAccount;
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }

    logout() {
        this.currentAccount = null;
    }
}

const bank = new Bank();
const loginContainer = document.getElementById('login-container');
const createAccountContainer = document.getElementById('create-account-container');
const dashboardContainer = document.getElementById('dashboard-container');
const result = document.getElementById('result');
const accountInfo = document.getElementById('account-info');

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const acno = document.getElementById('login-acno').value;
    const password = document.getElementById('login-password').value;

    if (bank.login(acno, password)) {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        accountInfo.innerHTML = `Welcome, ${bank.currentAccount.username} (Account: ${acno})`;
    } else {
        alert('Invalid account number or password');
    }
});

document.getElementById('create-account-btn').addEventListener('click', function () {
    loginContainer.style.display = 'none';
    createAccountContainer.style.display = 'block';
});

document.getElementById('create-account-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const acno = document.getElementById('acno').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    bank.createAcc(acno, name, password);
    createAccountContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

document.getElementById('deposit-btn').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    result.innerHTML = bank.deposit(amount);
});

document.getElementById('withdraw-btn').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    result.innerHTML = bank.withdraw(amount);
});

document.getElementById('balance-enquiry-btn').addEventListener('click', function () {
    result.innerHTML = bank.balanceEnquiry();
});

document.getElementById('logout-btn').addEventListener('click', function () {
    bank.logout();
    dashboardContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});
