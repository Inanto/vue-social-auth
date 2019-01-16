import './utils.js'
import Promise from './promise.js'
import VueSocialauth from './authenticate.js'

/**
 * VueSocialauth plugin
 * @param {Object} Vue
 * @param {Object} options
 */
function plugin(Vue, options) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  let vueAuthInstance = null;
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        if (!vueAuthInstance) {
          // Request handler library not found, throw error
          if (!this.$http) {
            throw new Error('Request handler instance not found')
          }

          vueAuthInstance = new VueSocialauth(this.$http, options)
        }
        return vueAuthInstance
      }
    }
  })
}

/**
 * External factory helper for ES5 and CommonJS
 * @param  {Object} $http     Instance of request handling library
 * @param  {Object} options   Configuration object
 * @return {VueSocialauth}  VueSocialauth instance
 */
plugin.factory = function ($http, options) {
  return new VueSocialauth($http, options)
}

export default plugin
