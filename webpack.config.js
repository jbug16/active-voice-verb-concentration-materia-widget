const path = require('path')
const srcPath = path.join(__dirname, 'src') + path.sep
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')

const rules = widgetWebpack.getDefaultRules()
const entries = widgetWebpack.getDefaultEntries()

// using default creator
delete entries['creator']

// The MWDK's React rule handles JS/JSX by default. Extend it to transpile
// TypeScript/TSX too; `yarn typecheck` runs TypeScript's separate type checker.
rules.reactLoader.test = /\.(js|jsx|ts|tsx)$/i
rules.reactLoader.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js']
rules.reactLoader.use[0].options.presets.push('@babel/preset-typescript')

entries['player'] = [
	path.join(__dirname, 'src', 'player.html'),
	path.join(__dirname, 'src', 'player', 'index.tsx'),
	path.join(__dirname, 'src', 'player', 'styles', 'player.scss'),
]

const moduleRules = [
	rules.loaderDoNothingToJs,
	rules.loaderCompileCoffee,
	rules.copyImages,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.loadAndPrefixSASS,
	rules.reactLoader,
]

const options = {
	entries: entries,
	copyList: widgetWebpack.getDefaultCopyList(),
	moduleRules,
}

module.exports = widgetWebpack.getLegacyWidgetBuildConfig(options)
