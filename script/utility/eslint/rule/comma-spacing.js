
import CoreRule from '../../core/rule.js';

/**
 * Comma Spacing
 *
 * Spacing around commas improves readability of a list of items.
 *
 * Options:
 *
 *     "before": false (default) disallows spaces before commas
 *     "before": true requires one or more spaces before commas
 *     "after": true (default) requires one or more spaces after commas
 *     "after": false disallows spaces after commas
 *
 * @see https://eslint.org/docs/rules/comma-spacing
 */
export default class RuleCommaSpacing extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return {
            before: false,
            after: true,
        };
    }

    /**
     * @var string
     */
    get property() {
        return 'comma-spacing';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const beforeNoSpace = [...this.input.matchAll(/[^ ],/gms)];
        const beforeSpace = [...this.input.matchAll(/ ,/gms)];
        const afterNoSpace = [...this.input.matchAll(/,[^\s]/gms)];
        const afterSpace = [...this.input.matchAll(/,\s/gms)];

        output.before = beforeNoSpace.length < beforeSpace.length;
        output.after = afterNoSpace.length < afterSpace.length;

        return output;
    }
}
