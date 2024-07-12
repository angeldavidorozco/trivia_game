/*import '/css/style.css';
import javascriptLogo from '/images/javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

const https = require('https');

const options = {
    method: 'GET',
    hostname: '500-quiz-api.p.rapidapi.com',
    port: null,
    path: '/api',
    headers: {
        'x-rapidapi-key': 'b7b4481d67msh66e9498b96590f3p10503fjsn7b0e8fa33f35',
        'x-rapidapi-host': '500-quiz-api.p.rapidapi.com'
    }
};

const req = https.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();


function makeRequest() {
  fetch(
    'https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple&encode=url3986',
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

makeRequest();

setupCounter(document.querySelector('#counter'));
*/
// client id 025828cc33694ba9bd99d584ebfee3c1
//client secret ef2bef5a09b74e00b153241db8934315
