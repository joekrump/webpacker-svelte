require "webpacker/svelte/version"

module Webpacker
  module Svelte
  end
end

require "webpacker/svelte/railtie" if defined?(Rails)
require "webpacker/svelte/helpers"
require "webpacker/svelte/component"
