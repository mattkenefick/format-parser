
import CoreRule from '../../core/rule.js';

/**
 * Brace Style
 *
 * Brace style is closely related to indent style in programming and
 * describes the placement of braces relative to their control statement
 * and body.
 *
 * Options:
 *
 *    "1tbs" enforces one true brace style
 *    "stroustrup" (default) enforces Stroustrup style
 *    "allman" enforces Allman style
 *
 * @see https://eslint.org/docs/rules/brace-style
 */
export default class RuleBraceStyle extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'stroustrup';
    }

    /**
     * @var string
     */
    get property() {
        return 'brace-style';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        // Check for stroustrup
        if (this.input.match(/}\s*\n\s*(else|catch)[^\{\n]+{/gms)) {
            output = 'stroustrup';
        }
        else if (this.input.match(/} *(else|catch) ?(if|\()?/gms)) {
            output = '1tbs';
        }
        else if (this.input.match(/}\s*\n\s*(else|catch)[^\{]+\n\s*{/gms)) {
            output = 'allman';
        }

        return output;
    }
}
