
import CoreRule from '../../core/rule.js';

/**
 * Block Spacing
 *
 * This rule enforces consistent spacing inside an open block token and
 * the next token on the same line.
 *
 * This is a weird rule. Are we sure this is right?
 *
 * Options:
 *
 *    "always" (default) requires one or more spaces
 *    "never" disallows spaces
 *
 * @see https://eslint.org/docs/rules/block-spacing
 */
export default class RuleBlockSpacing extends CoreRule
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
        return 'block-spacing';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;
        let hasSpaces = 0;
        let noSpaces = 0;

        // Determine if any blocks have
        this.functionBlocks.forEach(block => {
            hasSpaces += (block.match(/^[\s]/gms) || []).length;
            noSpaces += (block.match(/^[^\s]/gms) || []).length;
        });

        // Check if no spaces is better
        if (noSpaces > hasSpaces) {
            output = 'never';
        }

        return output;
    }
}
