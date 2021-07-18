
/**
 * This class helps us generate a config file
 *
 * @note This is currently duplicated until we have a better understanding
 * of how this differentiates from the Prettier generator. At a certain
 * point, these will probably abstract away.
 */
export default class Generator
{
    /**
     * @var string
     */
    get value() {
        switch (this.format) {
            default:
            case 'json':
                return this.toJSON();

            case 'js':
                return this.toJS();

            case 'toml':
                return this.toTOML();

            case 'yaml':
                return this.toYAML();
        }
    }

    /**
     * Default an empty file
     *
     * @return void
     */
    constructor(format = 'json') {
        this.format = format;
        this.map = new Map;
    }

    /**
     * Add a key/value to our config
     *
     * @param string key
     * @param mixed value
     * @return this
     */
    add(key, value) {
        this.map.set(key, value);

        return this;
    }

    /**
     * Change output format
     *
     * @todo Throw warning for bad input
     *
     * @param string format
     * @return void
     */
    setFormat(format) {
        this.format = format;
    }

    /**
     * Convert map to JSON
     *
     * @return string
     */
    toJSON() {
        let config = '';
        let indentation = ' '.repeat(4);

        // Setup outer bounds
        config += '{\n';

        // Iterate through rules
        this.map.forEach((value, key) => {
            value = typeof(value) === 'string' ? `"${value}"` : value;
            config += `${indentation}"${key}": ["error", ${value}],\n`;
        })

        // Remove last comma
        config = config.replace(/,([^,]*)$/, '$1');

        // Complete outer bounds
        config += '}\n';

        return config;
    }

    /**
     * Convert map to JS
     *
     * @return string
     */
    toJS() {
        let config = '';
        let indentation = ' '.repeat(4);

        // Setup outer bounds
        config += 'module.exports = {\n';

        // Bump
        config += `${indentation}rules: {\n`;
        indentation += indentation;

        // Iterate through rules
        this.map.forEach((value, key) => {
            value = typeof(value) === 'string' ? `"${value}"` : value;
            config += `${indentation}${key}: ["error", ${value}],\n`;
        })

        // Bump
        indentation = indentation.substr(0, indentation.length / 2);
        config += `${indentation}}\n`;

        // Complete outer bounds
        config += '};\n';

        return config;
    }

    /**
     * Convert map to TOML
     *
     * @return string
     */
    toTOML() {
        let config = '';
        let indentation = ' '.repeat(0);

        // Iterate through rules
        this.map.forEach((value, key) => {
            value = typeof(value) === 'string' ? `"${value}"` : value;
            config += `${indentation}${key} = ${value}\n`;
        })

        return config;
    }

    /**
     * Convert map to YAML
     *
     * @return string
     */
    toYAML() {
        let config = '';
        let indentation = ' '.repeat(0);

        // Iterate through rules
        this.map.forEach((value, key) => {
            value = typeof(value) === 'string' ? `"${value}"` : value;
            config += `${indentation}${key}: ${value}\n`;
        })

        return config;
    }
}
