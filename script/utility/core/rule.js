
/**
 * Every rule extends this class
 *
 * @see https://prettier.io/docs/en/options.html
 */
export default class CoreRule
{
    /**
     * Get variable object blocks which could include nested
     * blocks as well.
     *
     * e.g. var foo = [ ... ]
     *
     * @return array
     */
    get arrayBrackets() {
        return this.getBracketBlock('[', ']');
    }

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
     * Get individual lines of input as array
     *
     * @return array
     */
    get lines() {
        return this.input.split('\n');
    }

    /**
     * Get variable function blocks which could include nested
     * blocks as well.
     *
     * e.g. => { ... }
     * e.g. function() { ... }
     *
     * @return array
     */
    get functionBlocks() {
        return this.getBracketBlock('{', '}', '=>|()\s?');
    }

    /**
     * Get variable object blocks which could include nested
     * blocks as well.
     *
     * We were using this but fails for matching nested blocks:
     *     [...this.input.matchAll(/=\s*{(.*?)}/gms)];
     *
     * e.g. var foo = { ... }
     *
     * @return array
     */
    get objectBlocks() {
        return this.getBracketBlock('{', '}');
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
        this.settings = {};
    }

    /**
     * Default entry function
     *
     * @return string
     */
    identify() {
        return this.default;
    }


    // region: Helpers
    // ---------------------------------------------------------------------------

    getBracketBlock(openingBracket = '{', closingBracket = '}', precedingMatcher = 'return|=') {
        const blocks = [];
        const regexp = new RegExp(`(${precedingMatcher})\\s*\\${openingBracket}`, 'gms');
        const openers = [...this.input.matchAll(regexp)];
        // const openers = [...regexp.exec(this.input)];

        openers.forEach(opener => {
            let cb;
            let ob;
            let depth = 0;
            let startIndex = opener.index + opener[0].length;
            let currentIndex = opener.index;
            let x = 0;

            // Stack brackets
            do {
                ob = this.input.indexOf(openingBracket, currentIndex);
                cb = this.input.indexOf(closingBracket, currentIndex);

                ob = ob === -1 ? Infinity : ob;

                // Opening bracket appears before closing bracket
                if (ob < cb) {
                    depth++;
                    currentIndex = ob + 1;
                }
                else {
                    depth = Math.max(depth - 1, 0);
                    currentIndex = cb + 1;
                }

                // Exit
                if (cb < ob && depth === 0) {
                    break;
                }
            } while (x++ < 10); // killswitch

            // Grab block of string
            const substring = this.input.substring(startIndex, cb);

            // Add to block stack
            blocks.push(substring);
        });

        return blocks;
    }

    // endregion: Helpers
}
