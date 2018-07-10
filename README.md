# strip-regexp-loader
A [webpack](http://webpack.github.io/) loader that strips code block using [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

For example, this loader can be used to strip out blocks of the following pattern:

```
//>>debugStart
function onlyOnDebugMode() {
  console.log('Debug on');
  ...
}
//>>debugEnd
```

Installation
---

Install the loader with npm.

```
npm install strip-regexp-loader --save-dev
```

Use Case
---
Use it when you need to remove block of code. For example, on production environment remove some functions used only on development.

Example
---
webpack 1
```
module: {
    preLoaders: [
        {
                test: /\.js$/,
                loader: 'strip-regexp-loader'
        }
    ]
},
'strip-regexp-loader': {
  stripRegexp: {
    debug: true,
    custom: '[\\t ]*\\/\\/----start[\\s\\S]*?\\/\\/----end\\s*;?\\s*\\n?'
  }
}
```

webpack 2+

```
module: {
  rules: [{
    test: /\.js$/,
    enforce: 'pre',
    use: [{
      loader: 'strip-regexp-loader',
      options: {
        stripRegexp: {
          debug: true,
          custom: '[\\t ]*\\/\\/----start[\\s\\S]*?\\/\\/----end\\s*;?\\s*\\n?'
        }
      }
    }]
  }]
}
```

Options
---

You can pass options to the loader using the [`options` property](https://webpack.js.org/configuration/module/#rule-options-rule-query).

The following options are supported:

 * `stripRegexp`: Object with pre-defined RegExps or custom RegExp.

Supported names:

 * debug: strip out all blocks beginning with `//>>debugStart` and ending with `//>>debugEnd`
 * html: strip out all blocks beginning with `<!--` and ending with `-->`
 * custom: strip out all blocks that match the RegExp passed as value

For example, the following would strip out all blocks beginning with `//>>debugStart` and ending with `//>>debugEnd` and all JS // comments:

```
module: {
  rules: [{
    test: /\.js$/,
    enforce: 'pre',
    use: [{
      loader: 'strip-regexp-loader',
      options: {
        stripRegexp: {
          debug: true,
          custom: '^[\\t ]*\\/\\/[\\s\\S]*?\\n?'
        }
      }
    }]
  }]
}
```