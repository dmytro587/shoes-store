const { alias, configPaths } = require('react-app-rewire-alias')

const aliasMap = configPaths('./tsconfig.paths.json')

module.exports = alias(aliasMap)

// module.exports = override(
//    addDecoratorsLegacy(),
//    addWebpackAlias({
//       "@": path.resolve(__dirname, 'src'),
//       "actions": path.resolve(__dirname, 'src/actions'),
//       "api": path.resolve(__dirname, 'src/api'),
//       "common": path.resolve(__dirname, 'src/common'),
//       "components": path.resolve(__dirname, 'src/components'),
//       "containers": path.resolve(__dirname, 'src/containers'),
//       "helper": path.resolve(__dirname, 'src/helper'),
//       "icon": path.resolve(__dirname, 'src/icon'),
//       "reducers": path.resolve(__dirname, 'src/reducers')
//    })
// )