
import Prettier from './utility/prettier/prettier.js';


// References
// ---------------------------------------------------------------------------

const btnParse = document.querySelector('#btnParse');
const txtInput = document.querySelector('#txtInput');
const txtOutput = document.querySelector('#txtOutput');


// Attachments
// ---------------------------------------------------------------------------

btnParse.addEventListener('click', Handle_OnClickParse);


// Event Handlers
// ---------------------------------------------------------------------------

function Handle_OnClickParse(e) {
    e.preventDefault();

    const prettier = new Prettier({
        format: 'yaml',
    });

    const input = txtInput.value;
    const output = prettier.parse(input);

    txtOutput.value = output;
}
