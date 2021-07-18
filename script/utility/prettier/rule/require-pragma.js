
import CoreRule from '../core/rule.js';

/**
 * Require Pragma
 *
 * Include parentheses around a sole arrow function parameter.
 *
 * @see https://prettier.io/docs/en/options.html#require-pragma
 */
export default class RuleRequirePragma extends CoreRule
{
    /**
     * @var boolean
     */
    get default() {
        return false;
    }

    /**
     * @var string
     */
    get property() {
        return 'requirePragma';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        // Check if we have pragma
        output = !!this.input.match(/(\/\/|\*)\s*(@prettier|@format)/gms);

        return output;
    }
}
