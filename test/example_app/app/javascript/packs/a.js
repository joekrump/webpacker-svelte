import React from 'react';
import WebpackerSvelte from 'webpacker-svelte';
import HelloSvelte from 'components/hello';

const A = (props) => <div>Component A</div>;

WebpackerReact.setup({A, HelloReact});
