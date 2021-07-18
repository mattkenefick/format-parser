
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
     * Mandatory entry function to create a decision
     *
     * @return number
     */
    identify() {
        return 120;
    }
}
