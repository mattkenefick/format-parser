
import Generator from './generator.js';
import RuleArrowFunctionParentheses from './rule/arrow-function-parentheses.js';
import RuleBracketSpacing from './rule/bracket-spacing.js';
import RulePrintWidth from './rule/print-width.js';
import RuleQuotes from './rule/quotes.js';
import RuleQuoteProps from './rule/quote-props.js';
import RuleRequirePragma from './rule/require-pragma.js';
import RuleSemicolons from './rule/semicolons.js';
import RuleTabWidth from './rule/tab-width.js';
import RuleTabs from './rule/tabs.js';
import RuleTrailingCommas from './rule/trailing-commas.js';

export default class Prettier
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
            RuleArrowFunctionParentheses,
            RuleBracketSpacing,
            RulePrintWidth,
            RuleQuotes,
            RuleQuoteProps,
            RuleRequirePragma,
            RuleSemicolons,
            RuleTabWidth,
            RuleTabs,
            RuleTrailingCommas,
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