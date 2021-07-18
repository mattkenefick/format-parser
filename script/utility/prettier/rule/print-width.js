
import CoreRule from '../core/rule.js';

/**
 * Print Width
 *
 * Specify the line length that the printer will wrap on.
 *
 * @see https://prettier.io/docs/en/options.html#print-width
 */
export default class RulePrintWidth extends CoreRule
{
    /**
     * @var number
     */
    get default() {
        return 80;
    }

    /**
     * @var string
     */
    get property() {
        return 'printWidth';
    }

    /**
     * @return void
     */
    constructor(input) {
        super(input);

        // Default settings
        this.settings.minLineLength = 80;
        this.settings.maxLineLength = 120;
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return number
     */
    identify() {
        let output;
        let lineLength = 0;

        // Find longest line
        this.lines.forEach(line => lineLength = Math.max(line.length, lineLength));

        // Cap longest line
        output = Math.max(this.settings.minLineLength,
            Math.min(this.settings.maxLineLength, lineLength)
        );

        // Convert to the nearest 10
        output = Math.ceil(output / 10) * 10;

        return output;
    }
}
