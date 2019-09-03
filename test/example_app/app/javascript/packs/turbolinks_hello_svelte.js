import WebpackerSvelte from 'webpacker-svelte'
import Turbolinks from 'turbolinks'

import HelloSvelte from 'components/hello.svelte'

Turbolinks.start()

if (!window.Turbolinks) {
  console.error('Turbolinks failed to install')
}

WebpackerSvelte.setup({ HelloSvelte })
