
import CoreRule from '../core/rule.js';

/**
 * Tabs
 *
 * Indent lines with tabs instead of spaces.
 *
 * @see https://prettier.io/docs/en/options.html#tabs
 */
export default class RuleTabs extends CoreRule
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
        return 'tabs';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        return true;
    }
}
