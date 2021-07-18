
import CoreRule from '../../core/rule.js';

/**
 * Capitalized Comments
 *
 * This rule enforces consistency in comment legibility.
 *
 * This class checks how many comments are capitalized versus non-capitalized
 * in the format of //.
 *
 * Example:
 *
 *     // Capitalized comment
 *     // lowercase comment
 *     // another lowercase comment
 *
 * If there are more lowercase comments, then we set it to "never"
 *
 * Options:
 *
 *    "always" (default) Sentences must start with capital letter
 *    "never" Sentences must start with lowercase letter
 *
 * @see https://eslint.org/docs/rules/capitalized-comments
 */
export default class RuleCapitalizedComments extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'always';
    }

    /**
     * @var string
     */
    get property() {
        return 'capitalized-comments';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const capitalizedComments = [...this.input.matchAll(/(\/\/)(?=( [^a-z]|[^a-z ]))/gms)];
        const lowercaseComments = [...this.input.matchAll(/(\/\/)(?=( [a-z]|[a-z ]{2,}))/gms)];

        if (lowercaseComments.length > capitalizedComments.length) {
            output = 'never';
        }

        return output;
    }
}
