

class Config
{

    static registerConfigFile(config)
    {
        if (typeof this.configs === 'undefined')
            this.configs = {};

        for (let key in config) {
            this.configs[key] = config[key];
        }
    }

    static get(key, defaultValue)
    {
        if (typeof this.configs[key] !== 'undefined')
            return this.configs[key];

        

        return defaultValue;
    }

    static set(key, value)
    {
        if (typeof this.configs === 'undefined')
            this.configs = {};
            
        this.configs[key] = value;
    }

}

module.exports = Config;