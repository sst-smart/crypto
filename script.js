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

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! You can now log in.');

    // Clear input fields
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
}

document.getElementById('cryptoTableHead').style.visibility = 'hidden';
document.getElementById('control').style.visibility = 'hidden';

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
        {name:'Mohamed', email:'admin', password:'321'},
    ]
    console.log(users);
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // alert('Login successful! Welcome, ' + user.name + '.');
        setInterval(getPrice, 2000);
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('cryptoTableHead').style.visibility = 'visible';
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
        if (item["symbol"].endsWith('USDT') && eval(item["lastPrice"]) !== 0 && eval(item["priceChangePercent"]) > document.getElementById('percentage').value) {
            const row = document.createElement('tr');

            const symbol = document.createElement('td');
            symbol.textContent = item["symbol"];
            row.appendChild(symbol);
            const priceChangePercent = document.createElement('td');
            priceChangePercent.textContent = eval(item["priceChangePercent"]) + ' %';
            if (eval(item["priceChangePercent"]) < 0) {
                priceChangePercent.style.color = 'red';
            } else if(eval(item["priceChangePercent"]) > document.getElementById('percentage').value) {
                if (soundAlarm) {
                    new Audio("/Website-JavaScript/project_04_binance/airport-announcement-ding.wav").play();
                }
                symbol.style.backgroundColor = 'green';
            } else {
                priceChangePercent.style.color = 'blue';
            }
            row.appendChild(priceChangePercent);
            const lastPrice = document.createElement('td');
            lastPrice.textContent = Number(item["lastPrice"]).toLocaleString(undefined, {minimumFractionDigits: 8});
            row.appendChild(lastPrice);
            const openPrice = document.createElement('td');
            openPrice.textContent = item["openPrice"];
            row.appendChild(openPrice);
            const highPrice = document.createElement('td');
            highPrice.textContent = item["highPrice"];
            row.appendChild(highPrice);
            const lowPrice = document.createElement('td');
            lowPrice.textContent = item["lowPrice"];
            row.appendChild(lowPrice);
            const volume = document.createElement('td');
            volume.textContent = item["volume"];
            row.appendChild(volume);
            const openTime = document.createElement('td');
            let openDate = new Date(Number(item["openTime"]));
            openTime.textContent = openDate.toLocaleString();
            row.appendChild(openTime);
            const closeTime = document.createElement('td');
            let closeDate = new Date(Number(item["closeTime"]));
            closeTime.textContent = closeDate.toLocaleString();
            row.appendChild(closeTime);
            // Append row to the table body
            tableBody.appendChild(row);
        }
    });
}



// Call getPrice to load data when the page is loaded
// window.onload = getPrice;

// Stop Alarm Sound
let soundAlarm;
function stopAlarm(){
    if (soundAlarm) {
      soundAlarm = false;
      document.getElementById('stopAndStart').innerText = 'Start';
    } else {
        soundAlarm = true;
        document.getElementById('stopAndStart').innerText = 'Stop';
    }
}




