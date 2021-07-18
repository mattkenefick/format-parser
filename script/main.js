
import Prettier from './utility/prettier/prettier.js';


// References
// ---------------------------------------------------------------------------

const optFormat = document.querySelector('#optFormat');
const txtInput = document.querySelector('#txtInput');
const txtOutput = document.querySelector('#txtOutput');
const prettier = new Prettier({
    format: 'json',
});


// Attachments
// ---------------------------------------------------------------------------

optFormat.addEventListener('click', Handle_OnChangeFormat);
txtOutput.addEventListener('click', Handle_OnClickOutput);

const editor = ace.edit('txtInput');
editor.setTheme('ace/theme/tomorrow_night');
editor.session.setMode('ace/mode/typescript');
editor.session.on('change', function() {
    update();
});


// Event Handlers
// ---------------------------------------------------------------------------

function Handle_OnChangeFormat(e) {
    e.preventDefault();

    const format = e.currentTarget.value;

    // Change format
    prettier.generator.setFormat(format);

    // Update
    update();
}

function Handle_OnClickOutput(e) {
    e.preventDefault();

    e.currentTarget.select();

    document.execCommand('copy');
}

function update() {
    const input = editor.session.getValue();
    const output = prettier.parse(input);

    txtOutput.value = output;
}

update();


// Initialize
// ---------------------------------------------------------------------------

document.body.classList.add('state-active');