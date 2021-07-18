
import CoreRule from '../../core/rule.js';

/**
 * Comma Style
 *
 * This rule enforce consistent comma style in array literals, object
 * literals, and variable declarations.
 *
 * Options:
 *
 *    "last" (default) requires a comma after and on the same line as an array element, object property, or variable declaration
 *    "first" requires a comma before and on the same line as an array element, object property, or variable declaration
 *
 * @see https://eslint.org/docs/rules/comma-style
 */
export default class RuleCommaStyle extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'last';
    }

    /**
     * @var string
     */
    get property() {
        return 'comma-style';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        let sameLineCommas = 0;
        let newLineCommas = 0;

        this.objectBlocks.forEach(block => {
            sameLineCommas += [...block.matchAll(/,\n/gms)].length;
            newLineCommas += [...block.matchAll(/\n\s*,/gms)].length;
        });

        this.arrayBrackets.forEach(block => {
            sameLineCommas += [...block.matchAll(/,\n/gms)].length;
            newLineCommas += [...block.matchAll(/\n\s*,/gms)].length;
        });

        if (newLineCommas > sameLineCommas) {
            output = 'first';
        }

        return output;
    }
}
