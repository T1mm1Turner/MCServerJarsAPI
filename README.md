# MC Server Jars API #

## The most of this code is based on original [ServerJars-API](https://github.com/craftaro/ServerJars-JavaScriptAPI "Original server jars api") ## 

Another Node JavaScript API for ServerJars.com

**Examples:**

**Fetching Jar types and subtypes (called "category"):**
```javascript
const ServerJars = require('mcserverjarsapi')

ServerJars.fetchTypes().then(types => console.log(types)).catch(e => console.log(e))
```

**Fetching all the Jars for a specific type and catefory:**
```javascript
const ServerJars = require('mcserverjarsapi');

// If type, category or both are specified, "vanilla" will be the default.
// Check the docs to see all the options
ServerJars.fetchAll({type: "bedrock", category: "pocketmine"})
    .then(jars => console.log(jars))
    .catch(e => console.log(e))
```

**Downloading Jars:**
```javascript
const ServerJars = require('mcserverjarsapi');

// On development
```
