
/**
 * Every rule extends this class
 *
 * @see https://prettier.io/docs/en/options.html
 */
export default class CoreRule
{
    /**
     * Default value is empty string. This getter has a dynamic return
     * value based on the rule type. It's common to be an integer or
     * boolean, but can be string as well.
     *
     * @var string
     */
    get default() {
        return '';
    }

    /**
     * @var string
     */
    get property() {
        return 'undefined';
    }

    /**
     * Accept entire string for each rule
     *
     * @param string input
     * @return void
     */
    constructor(input) {
        this.input = input;
    }

    /**
     * Default entry function
     *
     * @return string
     */
    identify() {
        return this.default;
    }
}
