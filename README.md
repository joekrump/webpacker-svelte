# Webpacker-Svelte [![CircleCI](https://circleci.com/gh/will-wow/webpacker-svelte.svg?style=svg)](https://circleci.com/gh/will-wow/webpacker-svelte)

_**Note:** This is the documentation for the Git master branch. Documentation for the latest release (0.1.0) is [available here](https://github.com/will-wow/webpacker-svelte/tree/v0.1.0)._

Webpacker-Svelte makes it easy to use [Svelte](https://svelte.dev) with [Webpacker](https://github.com/rails/webpacker) in your Rails applications.

This is a port of [@renchap](https://github.com/renchap)'s excellent [webpacker-react](https://github.com/renchap/webpacker-react).

It supports Webpacker 1.2+.

An example application is available: https://github.com/will-wow/contacts

For more information, see the [blog post](https://blog.carbonfive.com/2019/10/29/the-best-of-both-worlds-html-apps-svelte)

## Installation

Your Rails application needs to use Webpacker and have the Svelte integration done. Please refer to their documentation documentation for this: https://github.com/rails/webpacker/blob/master/README.md#svelte

First, you need to add the webpacker-svelte gem to your Rails app Gemfile:

```ruby
gem 'webpacker-svelte', "~> 0.0.0"
```

Once done, run `bundle` to install the gem.

Then you need to update your `package.json` file to include the `webpacker-svelte` NPM module:

```bash
npm i webpacker-svelte
yarn add webpacker-svelte
```

You are now all set!

### Note about versions

Webpacker-Svelte contains two parts: a Javascript module and a Ruby gem. Both of those components respect [semantic versioning](http://semver.org). **When upgrading the gem, you need to upgrade the NPM module to the same minor version**. New patch versions can be released for each of the two independently, so it is ok to have the NPM module at version `A.X.Y` and the gem at version `A.X.Z`, but you should never have a different `A` or `X`.

## Usage

The first step is to register your root components (those you want to load from your HTML).
In your pack file (`app/javascript/packs/*.js`), import your components as well as `webpacker-svelte` and register them. Considering you have a component in `app/javascript/components/hello.js`:

```javascript
import Hello from "components/hello.svelte";
import WebpackerSvelte from "webpacker-svelte";

WebpackerSvelte.setup({ Hello }); // ES6 shorthand for {Hello: Hello}
```

### With Turbolinks

You have to make sure Turbolinks is loaded before calling `WebpackerSvelte.initialize()`.

For example:

```javascript
import Hello from "components/hello.svelte";
import WebpackerSvelte from "webpacker-svelte";
import Turbolinks from "turbolinks";

Turbolinks.start();

WebpackerSvelte.setup({ Hello });
```

You may also load turbolinks in regular asset pipeline `application.js`:

```javascript
//= require "turbolinks"
```

In that case, make sure your packs are loaded _after_ `application.js`

Now you can render Svelte components from your views or your controllers.

### Rendering from a view

Use the `svelte_component` helper. The first argument is your component's name, the second one is the `props`:

```erb
<%= svelte_component('Hello', name: 'Svelte') %>
```

You can pass a `tag` argument to render the Svelte component in another tag than the default `div`. All other arguments will be passed to `content_tag`:

```erb
<%= svelte_component('Hello', { name: 'Svelte' }, tag: :span, class: 'my-custom-component') %>
# This will render <span class="my-custom-component" data-svelte-component="Hello" data-svelte-props="..."></span>
```

### Rendering from a controller

```rb
class PageController < ApplicationController
  def main
    render svelte_component: 'Hello', props: { name: 'Svelte' }
  end
end
```

You can use the `tag_options` argument to change the generated HTML, similar to the `svelte_component` method above:

```rb
render svelte_component: 'Hello', props: { name: 'Svelte' }, tag_options: { tag: :span, class: 'my-custom-component' }
```

You can also pass any of the usual arguments to `render` in this call: `layout`, `status`, `content_type`, etc.

_Note: you need to have [Webpack process your code](https://github.com/rails/webpacker#binstubs) before it is available to the browser, either by manually running `./bin/webpack` or having the `./bin/webpack-watcher` process running._

### Hot Module Replacement

**HRM isn't working for Svelte3 yet. See: https://github.com/sveltejs/svelte-loader/issues/74**

[HMR](https://webpack.js.org/concepts/hot-module-replacement/) allows to reload / add / remove modules live in the browser without
reloading the page. This allows any change you make to your Svelte components to be applied as soon as you save,
preserving their current state.

**Once svelte-loader supports HMR for Svelte 3:**

1. Set up the webpack svelte loader `svelte` for HMR.

   ```javascript
   module.exports = {
     test: /\.svelte$/,
     use: [
       {
         loader: "svelte-loader",
         options: {
           // HMR isn't supported for Svelte3 yet
           // https://github.com/sveltejs/svelte-loader/issues/74
           hotReload: false
           // Emit css that webpacker can extract into a separate css file in production.
          emitCss: true
         }
       }
     ]
   };
   ```

1. Set up `webpack-dev-server` for HMR. This is easy, just switch `hmr: true` in your `webpacker.yml` for development!

1. you now need to use `webpack-dev-server` (in place of `webpack` or `webpack-watcher`).

## Development

To work on this gem locally, may want to clone and setup [the example application](https://github.com/will-wow/contacts).

Then you need to change the example app Gemfile to point to your local repository and run bundle afterwise:

```ruby
gem 'webpacker-svelte', path: '~/code/webpacker-svelte/'
```

Finally, you need to tell Yarn to use your local copy of the NPM module in this application, using [`yarn link`](https://yarnpkg.com/en/docs/cli/link):

```bash
$ cd ~/code/webpacker-svelte/javascript/webpacker_svelte-npm-module/
$ yarn
$ cd dist/
$ yarn             # compiles the code from src/ to dist/
$ yarn link
success Registered "webpacker-svelte".
info You can now run `yarn link "webpacker-svelte"` in the projects where you want to use this module and it will be used instead.
$ cd ~/code/contacts/
$ yarn link webpacker-svelte
success Registered "webpacker-svelte".
```

After launching `./bin/webpack-watcher` and `./bin/rails server` in your example app directory, you can now change the Ruby or Javascript code in your local `webpacker-svelte` repository, and test it immediately using the example app.

## Testing

If you changed the local javascript package, first ensure it is build (see above).

To run the test suite:

```sh
$ rake test
```

If you change the javascript code, please ensure there are no style errors before committing:

```sh
$ cd javascript/webpacker_svelte-npm-module/
$ yarn lint
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/will-wow/webpacker-svelte.
Please feel free to open issues about your needs and features you would like to be added.

### Thanks

All credit to [@renchap](https://github.com/renchap) for [webpacker-react](https://github.com/renchap/webpacker-react), this is just a light re-write of that repo to support Svelte!
