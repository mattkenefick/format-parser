
import CoreRule from '../../core/rule.js';

/**
 * BracketSpacing
 *
 * Print spaces between brackets in object literals.
 *
 * @see https://prettier.io/docs/en/options.html#bracket-spacing
 */
export default class RuleBracketSpacing extends CoreRule
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
        return 'bracketSpacing';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const spacedBracketsCount = [...this.input.matchAll(/[{[][ \t]/gms)];
        const nonSpacedBracketsCount = [...this.input.matchAll(/[{[][^ \t\n]/gms)];

        // We have more non-spaced brackets than spaced brackets
        if (nonSpacedBracketsCount > spacedBracketsCount) {
            output = false;
        }

        return output;
    }
}
