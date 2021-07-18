
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

    // Log for developer
    // console.log('ESLint:', eslintOutput);
    // console.log('Prettier:', prettierOutput);
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
