
import ESLint from './utility/eslint/eslint.js';
import Prettier from './utility/prettier/prettier.js';

// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                                                                              │
// │ Format Generator                                                             │
// │                                                                              │
// │ This project / file is intentionally basic for the time being.               │
// │ The goal is to build out the rules for formatters before wasting             │
// │ time over-structuring the UI.                                                │
// │                                                                              │
// └──────────────────────────────────────────────────────────────────────────────┘


// Setup / References
// ---------------------------------------------------------------------------

const optFormat = document.querySelector('#optFormat');
const txtESLintOutput = document.querySelector('#txtESLintOutput');
const txtPrettierOutput = document.querySelector('#txtPrettierOutput');
const editor = setupEditor();

const eslint = new ESLint({
    format: 'json',
});

const prettier = new Prettier({
    format: 'json',
});


// Attachments
// ---------------------------------------------------------------------------

optFormat.addEventListener('click', Handle_OnChangeFormat);
txtESLintOutput.addEventListener('click', Handle_OnClickOutput);
txtPrettierOutput.addEventListener('click', Handle_OnClickOutput);


// Event Handlers
// ---------------------------------------------------------------------------

/**
 * When we change the format dropdown box.
 *
 * @param Event e
 * @return void
 */
function Handle_OnChangeFormat(e) {
    e.preventDefault();

    const format = e.currentTarget.value;

    // Change format
    eslint.generator.setFormat(format);
    prettier.generator.setFormat(format);

    // Update
    update();
}

/**
 * Copy our output upon click
 *
 * @param Event e
 * @return void
 */
function Handle_OnClickOutput(e) {
    e.preventDefault();

    e.currentTarget.select();
    document.execCommand('copy');
}

/**
 * Process ESLint + Prettier rules
 *
 * @return void
 */
function update() {
    const input = editor.session.getValue();
    const prettierOutput = prettier.parse(input);
    const eslintOutput = eslint.parse(input);

    // Display for user
    txtESLintOutput.value = eslintOutput;
    txtPrettierOutput.value = prettierOutput;
}

update();


// Initialize
// ---------------------------------------------------------------------------

document.body.classList.add('state-active');


// Helpers
// ---------------------------------------------------------------------------

function setupEditor() {
    const editor = ace.edit('txtInput');

    editor.setTheme('ace/theme/tomorrow_night');
    editor.session.setMode('ace/mode/typescript');
    editor.session.on('change', function() {
        update();
    });

    return editor;
}


// Special Graphics
// uFrequency, uStrength, uAmplitude, uDensity, uDeepPurple, uDeepGreen, uDeepBlue, uOpacity
// ---------------------------------------------------------------------------

let mouse = {
    x: 0,
    y: 0,
    d: 0,
}

document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.d = Math.sqrt(
        (Math.pow(window.innerWidth / 2 - mouse.x, 2))
        +
        (Math.pow(window.innerHeight / 2 - mouse.y, 2))
    );
});

window.uRotationX = 0;
window.uRotationY = 0;

setInterval(() => {
    const input = editor.session.getValue();
    const length = input.length;

    window.uFrequency = length % 10 / 5;
    // window.uAmplitude = mouse.x / window.innerWidth * 4; //length % 20 / 10;
    window.uStrength =length % 20 / 10; // mouse.d / window.innerWidth * 2;
    window.uDeepPurple = mouse.y / window.innerHeight * 4;
    window.uDeepGreen = 0.0; //(input.match(/{/gms) || []).length % 10 / 10;
    window.uDeepBlue = (input.match(/,/gms) || []).length % 10 * 0.5;
    window.uOpacity = (input.match(/{/gms) || []).length % 10 * 0.05;
    // window.uRotationX = mouse.x / 5000;
    window.uRotationX += 0.01;
    window.uRotationY = mouse.y / 5000;
}, 250);
