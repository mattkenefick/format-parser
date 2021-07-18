
import CoreRule from '../../core/rule.js';

/**
 * Semicolons
 *
 * Print semicolons at the ends of statements
 *
 * @see https://prettier.io/docs/en/options.html#semicolons
 */
export default class RuleSemiColons extends CoreRule
{
    /**
     * @var boolean
     */
    get default() {
        return true;
    }

    /**
     * @var string
     */
    get property() {
        return 'semicolons';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        // Find all of our semi colon line endings
        const semicolons = [...this.input.matchAll(/;\s*$/gm)];

        // Determine if they make up a valuable percentage of the file (5%)
        output = semicolons.length / this.lines.length > 0.05;

        return output;
    }
}
