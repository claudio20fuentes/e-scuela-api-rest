const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@utils': 'src/utils',
    '@components': 'src/components',
    '@images' : 'src/assets/images',
    '@context': 'src/context',
    '@variables': 'src/config/variables.js',
    '@customElements': 'src/components/forms/custom-elements',
    '@containers': 'src/components/container',
  })(config)

  return config
}