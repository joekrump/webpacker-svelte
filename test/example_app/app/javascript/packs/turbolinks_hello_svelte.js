import HelloSvelte from 'components/hello'
import WebpackerSvelte from 'webpacker-svelte'
import Turbolinks from 'turbolinks'

Turbolinks.start()

if (!window.Turbolinks) {
  console.error('Turbolinks failed to install')
}

WebpackerSvelte.setup({ HelloSvelte })
