
import CoreRule from '../../core/rule.js';

/**
 * Vue Indent Script And Style
 *
 * Whether or not to indent the code inside <script> and <style> tags in Vue files.
 *
 * @see https://prettier.io/docs/en/options.html#vue-files-script-and-style-tags-indentation
 */
export default class RuleVueIndentScriptAndStyle extends CoreRule
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
        return 'vueIndentScriptAndStyle';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return number
     */
    identify() {
        let output = this.default;

        // Not indenting <head> and <body> is blasphemy and I won't stand for it

        return output;
    }
}
