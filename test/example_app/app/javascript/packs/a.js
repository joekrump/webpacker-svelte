import WebpackerSvelte from 'webpacker-svelte'
import HelloSvelte from 'components/hello.svelte'
import A from 'components/a.svelte'

WebpackerSvelte.setup({ A, HelloSvelte })
