
import CoreRule from '../../core/rule.js';

/**
 * Tab Width
 *
 * Specify the number of spaces per indentation-level.
 *
 * @see https://prettier.io/docs/en/options.html#tab-width
 */
export default class RuleTabWidth extends CoreRule
{
    /**
     * @var number
     */
    get default() {
        return 2;
    }

    /**
     * @var string
     */
    get property() {
        return 'tabWidth';
    }

    /**
     * @return void
     */
    constructor(input) {
        super(input);

        // Default settings
        this.settings.minTabWidth = 2;
        this.settings.maxTabWidth = 16;
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return number
     */
    identify() {
        let output = this.default;

        // Gather spaces from file to array
        let spaces = [...this.input.matchAll(/^[ ]+(?!\*)/gm)]
            .map(value => value[0].length);

        // No spaces?
        if (!spaces.length) {
            return output;
        }

        // Determine minimum value in this array
        let minimumValue = spaces.reduce((previous, current, index) => Math.min(previous, current));

        // Clamp tab width
        output = Math.max(this.settings.minTabWidth,
            Math.min(this.settings.maxTabWidth, minimumValue)
        );

        return output;
    }
}
