const fs = require('fs'),
    path = require('path');


class Config
{
    
    static register(config)
    {
        if (typeof this.configs === 'undefined')
            this.configs = {};
        
        if (typeof config === 'string') {
            if (config.substr(-5) !== '.json')
                config += '.json';

            if (fs.existsSync(appRoot + '/' + config)) {
                let filename = path.basename(config),
                    filecontent = JSON.parse(fs.readFileSync(appRoot + '/' + config));

                filename = filename.substr(0, filename.indexOf('.'));

                config = {};
                config[filename] = filecontent;
            }
        }
        
        if (typeof config === 'object') {
            for (let key in config) {
                this.configs[key] = config[key];
            }
        }
    }
    
    static get(key, defaultValue)
    {
        if (typeof this.configs[key] !== 'undefined')
            return this.configs[key];
        
        if (key.indexOf('.') > 0) {
            key = key.split('.'); 
            
            let value = this.configs;
            for (let k of key) {
                if (typeof value[k] !== 'undefined') {
                    value = value[k];
                    continue;
                }
                
                value = undefined;
                break;
            }
            
            if (typeof value !== 'undefined') {
                this.configs[key.join('.')] = value;
                return value;
            }
        }
        
        return defaultValue || null;
    }
    
    static set(key, value)
    {
        if (typeof this.configs === 'undefined')
            this.configs = {};
        
        this.configs[key] = value;
    }
    
}

module.exports = Config;