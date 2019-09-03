require "test_helper"

module Webpacker
  class SvelteTest < Minitest::Test
    def test_that_it_has_a_version_number
      refute_nil ::Webpacker::Svelte::VERSION
    end
  end
end
