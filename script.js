const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';


async function getPrice() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
    data.forEach((item) => {
        if (item["symbol"].endsWith('USDT') && eval(item["lastPrice"]) !== 0) {
            const row = document.createElement('tr');

            const symbol = document.createElement('td');
            symbol.textContent = item["symbol"];

            const priceChangePercent = document.createElement('td');
            priceChangePercent.textContent = eval(item["priceChangePercent"]) + ' %';
            if (eval(item["priceChangePercent"]) < 0) {
                priceChangePercent.style.color = 'red';
            } else if(eval(item["priceChangePercent"]) > 70) {
                new Audio("/Website-JavaScript/project_04_binance/airport-announcement-ding.wav").play();
                symbol.style.backgroundColor = 'green';
            } else {
                priceChangePercent.style.color = 'blue';
            }

            const lastPrice = document.createElement('td');
            lastPrice.textContent = Number(item["lastPrice"]).toLocaleString(undefined, {minimumFractionDigits: 8});

            const openPrice = document.createElement('td');
            openPrice.textContent = item["openPrice"];

            const highPrice = document.createElement('td');
            highPrice.textContent = item["highPrice"];

            const lowPrice = document.createElement('td');
            lowPrice.textContent = item["lowPrice"];

            const volume = document.createElement('td');
            volume.textContent = item["volume"];

            const openTime = document.createElement('td');
            let openDate = new Date(Number(item["openTime"]));
            openTime.textContent = openDate.toLocaleString();

            const closeTime = document.createElement('td');
            let closeDate = new Date(Number(item["closeTime"]));
            closeTime.textContent = closeDate.toLocaleString();

            // Append cells to the row
            row.appendChild(symbol);
            row.appendChild(priceChangePercent);
            row.appendChild(lastPrice);
            row.appendChild(openPrice);
            row.appendChild(highPrice);
            row.appendChild(lowPrice);
            row.appendChild(volume);
            row.appendChild(openTime);
            row.appendChild(closeTime);

            // Append row to the table body
            tableBody.appendChild(row);
        }
    });
}

setInterval(getPrice, 2000)

// Call getPrice to load data when the page is loaded
window.onload = getPrice();

// function stopAlarm(){
//     if (soundAlarm) {
//       soundAlarm = false;
//       document.getElementById('stopAndStart').innerText = 'Start';
//     } else {
//         soundAlarm = true;
//         document.getElementById('stopAndStart').innerText = 'Stop';
//     }
// }
//
// function checkPercentage() {
//     if ( ){
//
//     }
// }
//
//



