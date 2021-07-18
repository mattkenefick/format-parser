
import Generator from './generator.js';
import RulePrintWidth from './rule/print-width.js';
import RuleTabWidth from './rule/tab-width.js';
import RuleTabs from './rule/tabs.js';

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
    constructor() {
        this.generator = new Generator();
        this.rules = [
            RulePrintWidth,
            RuleTabWidth,
            RuleTabs,
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