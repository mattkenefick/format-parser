
import Generator from './generator.js';
import RuleArrayBracketNewline from './rule/array-bracket-newline.js';
import RuleArrayBracketSpacing from './rule/array-bracket-spacing.js';
import RuleArrayElementNewline from './rule/array-element-newline.js';
import RuleBlockSpacing from './rule/block-spacing.js';

export default class ESLint
{
    /**
     * @var string
     */
    get config() {
        return this.generator.value;
    }

    /**
     * Define the rules we are willing to parse
     *
     * @return void
     */
    constructor(settings = {}) {
        this.generator = new Generator(settings.format);
        this.rules = [
            RuleArrayBracketNewline,
            RuleArrayBracketSpacing,
            RuleArrayElementNewline,
            RuleBlockSpacing,
        ];
    }

    /**
     * Identify rules and generate file
     *
     * @return string
     */
    parse(input) {
        let output;

        // Execute all rules defined in constructor
        this.rules.forEach(rule => {
            const instance = new rule(input);
            const key = instance.property;
            const value = instance.identify();

            this.generator.add(key, value);
        });

        // Return generated configuration file
        output = this.generator.value;

        return output;
    }
}