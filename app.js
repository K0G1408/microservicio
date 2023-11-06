const currency = document.querySelector('#moneda');
const cryptocurrency = document.querySelector('#criptomonedas');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');
const api = '3838f62706aaa393f1c2d4cb837bf1b3e8c8125c02c7e6b5b141febdb1770037';
let url, div;

form.addEventListener('submit', validateForm);

document.addEventListener('DOMContentLoaded', () => {

    url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
        .then(response => response.json())
        .then(result => getCryptos(result.Data))
        .then(data => fillSelect(data));
});

const getCryptos = cryptos => new Promise(resolve => resolve(cryptos));

function fillSelect(data) {

    data.forEach(crypto => {

        const { FullName, Name } = crypto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        cryptocurrency.appendChild(option);

    });

};

function newAlert(message) {

    if (!document.querySelector('.error')) {
        div = document.createElement('div');
        div.classList.add('error');

        div.textContent = message;

        form.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

};

function validateForm(e) {

    e.preventDefault();

    if (currency.value === '' || cryptocurrency.value === '') {
        newAlert('Todos los campos son obligatorios');
        return;
    };

    /// Realizar consulta
    fetchCryptos();

};

function fetchCryptos() {

    url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency.value}&tsyms=${currency.value}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showData(data.DISPLAY[cryptocurrency.value][currency.value]));

};

function showData(data) {

    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

    const { HIGHDAY, LOWDAY, PRICE, LASTUPDATE, CHANGEPCT24HOUR } = data;

    div = document.createElement('div');
    div.innerHTML = `
        <p class="precio">Precio actual: ${PRICE}</p>
        <p>Precio más alto del día: ${LOWDAY}</p>
        <p>Precio más bajo del día: ${HIGHDAY}</p>
        <p>Variación durante las últimas 24 horas: ${CHANGEPCT24HOUR}%</p>
        <p>Última actualización: ${LASTUPDATE}</p>
    `;

    result.appendChild(div);

};