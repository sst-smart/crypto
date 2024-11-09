const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';

async function getPrice() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
    data.forEach((item) => {
        if (eval(item["priceChangePercent"]) > 0) {
            const row = document.createElement('tr');

            const symbol = document.createElement('td');
            symbol.textContent = item["symbol"];

            const priceChange = document.createElement('td');
            priceChange.textContent = item["priceChange"];

            const priceChangePercent = document.createElement('td');
            priceChangePercent.textContent = eval(item["priceChangePercent"]);
            if (eval(item["priceChangePercent"]) < 0) {
                priceChangePercent.style.color = 'red';
            } else {
                priceChangePercent.style.color = 'blue';
                symbol.style.backgroundColor = 'green';
            }

            const weightedAvgPrice = document.createElement('td');
            weightedAvgPrice.textContent = item["weightedAvgPrice"];

            const prevClosePrice = document.createElement('td');
            prevClosePrice.textContent = item["prevClosePrice"];

            const lastPrice = document.createElement('td');
            lastPrice.textContent = item["lastPrice"];

            const lastQty = document.createElement('td');
            lastQty.textContent = item["lastQty"];

            const bidPrice = document.createElement('td');
            bidPrice.textContent = item["bidPrice"];

            const bidQty = document.createElement('td');
            bidQty.textContent = item["bidQty"];

            const askPrice = document.createElement('td');
            askPrice.textContent = item["askPrice"];

            const askQty = document.createElement('td');
            askQty.textContent = item["askQty"];

            const openPrice = document.createElement('td');
            openPrice.textContent = item["openPrice"];

            const highPrice = document.createElement('td');
            highPrice.textContent = item["highPrice"];

            const lowPrice = document.createElement('td');
            lowPrice.textContent = item["lowPrice"];

            const volume = document.createElement('td');
            volume.textContent = item["volume"];

            const quoteVolume = document.createElement('td');
            quoteVolume.textContent = item["quoteVolume"];

            const openTime = document.createElement('td');
            openTime.textContent = item["openTime"];

            const closeTime = document.createElement('td');
            closeTime.textContent = item["closeTime"];

            const firstId = document.createElement('td');
            firstId.textContent = item["firstId"];

            const lastId = document.createElement('td');
            lastId.textContent = item["lastId"];

            const count = document.createElement('td');
            count.textContent = item["count"];

            // Append cells to the row
            row.appendChild(symbol);
            row.appendChild(priceChange);
            row.appendChild(priceChangePercent);
            row.appendChild(weightedAvgPrice);
            row.appendChild(prevClosePrice);
            row.appendChild(lastPrice);
            row.appendChild(lastQty);
            row.appendChild(bidPrice);
            row.appendChild(bidQty);
            row.appendChild(askPrice);
            row.appendChild(askQty);
            row.appendChild(openPrice);
            row.appendChild(highPrice);
            row.appendChild(lowPrice);
            row.appendChild(volume);
            row.appendChild(quoteVolume);
            row.appendChild(openTime);
            row.appendChild(closeTime);
            row.appendChild(firstId);
            row.appendChild(lastId);
            row.appendChild(count);

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
// function checkPrice() {
//     if (soundAlarm && Number(priceScreen.innerText) > 76350 ){
//         new Audio("/Website-JavaScript/project_04_binance/airport-announcement-ding.wav").play();
//     }
// }
//
//



