
import CoreRule from '../core/rule.js';

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
     * Mandatory entry function to create a decision
     *
     * @return number
     */
    identify() {
        return 4;
    }
}
