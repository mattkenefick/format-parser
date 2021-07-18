
/**
 * This class helps us generate a config file
 *
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
    constructor() {
        this.format = 'json';
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
            config += `${indentation}"${key}": ${value},\n`;
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
        // Not Implemented
    }

    /**
     * Convert map to TOML
     *
     * @return string
     */
    toTOML() {
        // Not Implemented
    }

    /**
     * Convert map to YAML
     *
     * @return string
     */
    toYAML() {
        // Not Implemented
    }
}
