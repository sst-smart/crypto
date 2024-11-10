// Sign-up Function
function signUp() {
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('User already exists!');
        return;
    }

    users.push({name, email, password});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! You can now log in.');

    // Clear input fields
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
}

document.getElementById('control').style.visibility = 'hidden';
document.getElementById('cryptoTable').style.visibility = 'hidden';

// Login Function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // const users = JSON.parse(localStorage.getItem('users') || '[]');

    const users = [
        {name: 'Mohamed', email: 'admin', password: '321'},
    ]
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // alert('Login successful! Welcome, ' + user.name + '.');
        setInterval(getPrice, 2000);
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('cryptoTable').style.visibility = 'visible';
        document.getElementById('control').style.visibility = 'visible';
        // Redirect or perform further actions here
    } else {
        alert('Invalid credentials');
    }

    // Clear input fields
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}


// Send API request and fetch data
const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';

async function getPrice() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
    data.forEach((item) => {
        if (
            item["symbol"].endsWith('USDT') &&
            eval(item["lastPrice"]) !== 0 &&
            eval(item["priceChangePercent"]) >= document.getElementById('percentage').value &&
            eval(item["lastPrice"]) >= document.getElementById('currencyPrice').value
        ) {
            if (document.getElementById('currency').value) {
                if (item["symbol"] === document.getElementById('currency').value){
                    if (soundAlarm) {
                        new Audio("/airport-announcement-ding.wav").play();
                    }
                    const row = document.createElement('tr');
                    const symbol = document.createElement('td');
                    symbol.textContent = item["symbol"];
                    row.appendChild(symbol);
                    const priceChangePercent = document.createElement('td');
                    priceChangePercent.textContent = eval(item["priceChangePercent"]) + ' %';
                    row.appendChild(priceChangePercent);
                    const lastPrice = document.createElement('td');
                    lastPrice.textContent = Number(item["lastPrice"]).toLocaleString(undefined, {minimumFractionDigits: 8});
                    row.appendChild(lastPrice);
                    // const volume = document.createElement('td');
                    // volume.textContent = item["volume"];
                    // row.appendChild(volume);
                    // const openTime = document.createElement('td');
                    // let openDate = new Date(Number(item["openTime"]));
                    // openTime.textContent = openDate.toLocaleString();
                    // row.appendChild(openTime);
                    // const closeTime = document.createElement('td');
                    // let closeDate = new Date(Number(item["closeTime"]));
                    // closeTime.textContent = closeDate.toLocaleString();
                    // row.appendChild(closeTime);
                    // Append row to the table body
                    tableBody.appendChild(row);
                }

            } else {
                if (soundAlarm) {
                    new Audio("airport-announcement-ding.wav").play();
                }
                const row = document.createElement('tr');
                const symbol = document.createElement('td');
                symbol.textContent = item["symbol"];
                row.appendChild(symbol);
                const priceChangePercent = document.createElement('td');
                priceChangePercent.textContent = eval(item["priceChangePercent"]) + ' %';
                row.appendChild(priceChangePercent);
                const lastPrice = document.createElement('td');
                lastPrice.textContent = Number(item["lastPrice"]).toLocaleString(undefined, {minimumFractionDigits: 8});
                row.appendChild(lastPrice);
                // const volume = document.createElement('td');
                // volume.textContent = item["volume"];
                // row.appendChild(volume);
                // const openTime = document.createElement('td');
                // let openDate = new Date(Number(item["openTime"]));
                // openTime.textContent = openDate.toLocaleString();
                // row.appendChild(openTime);
                // const closeTime = document.createElement('td');
                // let closeDate = new Date(Number(item["closeTime"]));
                // closeTime.textContent = closeDate.toLocaleString();
                // row.appendChild(closeTime);
                // Append row to the table body
                tableBody.appendChild(row);

            }

        }
    });
}


// Stop Alarm Sound
let soundAlarm = false;
function stopAlarm() {
    if (soundAlarm) {
        soundAlarm = false;
        document.getElementById('stopAndStart').innerText = 'Start Alarm Sound';
    } else {
        soundAlarm = true;
        document.getElementById('stopAndStart').innerText = 'Stop Alarm Sound';
    }
}


// Call getPrice to load data when the page is loaded
// window.onload = getPrice;
