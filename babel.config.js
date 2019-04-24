module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': [],
        'modules': false,
        'useBuiltIns': 'entry',
        'debug': false
      }
    ],
    '@babel/preset-react'
  ],
  'plugins': [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-block-scoped-functions',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-computed-properties',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-duplicate-keys',
    '@babel/plugin-transform-for-of',
    '@babel/plugin-transform-function-name',
    '@babel/plugin-transform-instanceof',
    '@babel/plugin-transform-literals',
    '@babel/plugin-transform-new-target',
    '@babel/plugin-transform-object-super',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-sticky-regex',
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-typeof-symbol',
    '@babel/plugin-transform-unicode-regex',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-syntax-async-generators',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    [ '@babel/plugin-proposal-optional-chaining', { 'loose': false } ],
    [ '@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' } ],
    [ '@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false } ],
    '@babel/plugin-proposal-do-expressions',
    [ '@babel/plugin-proposal-decorators', { 'legacy': true } ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
