import intersection from 'lodash.intersection'
import keys from 'lodash.keys'
import assign from 'lodash.assign'
import omit from 'lodash.omit'
import ujs from './ujs'

const CLASS_ATTRIBUTE_NAME = 'data-svelte-component'
const PROPS_ATTRIBUTE_NAME = 'data-svelte-props'

const noop = () => {}

const WebpackerSvelte = {
  registeredComponents: {},

  render(node, Component) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
    const props = propsJson && JSON.parse(propsJson)

    new Component({
      target: node,
      props
    })
  },

  registerComponents(components) {
    const collisions = intersection(
      keys(this.registeredComponents),
      keys(components)
    )
    if (collisions.length > 0) {
      console.error(
        `webpacker-svelte: can not register components. Following components are already registered: ${collisions}`
      )
    }

    assign(this.registeredComponents, omit(components, collisions))
    return true
  },

  mountComponents() {
    const { registeredComponents } = this
    const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)

    for (let i = 0; i < toMount.length; i += 1) {
      const node = toMount[i]
      const className = node.getAttribute(CLASS_ATTRIBUTE_NAME)
      const component = registeredComponents[className]

      if (component) {
        if (node.innerHTML.length === 0) this.render(node, component)
      } else {
        console.error(
          `webpacker-svelte: can not render a component that has not been registered: ${className}`
        )
      }
    }
  },

  setup(components = {}) {
    if (typeof window.WebpackerSvelte === 'undefined') {
      window.WebpackerSvelte = this
      ujs.setup(this.mountComponents.bind(this), noop)
    }

    window.WebpackerSvelte.registerComponents(components)
    window.WebpackerSvelte.mountComponents()
  }
}

export default WebpackerSvelte
