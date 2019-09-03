module Webpacker
  module Svelte
    class Component
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::TextHelper

      attr_accessor :name

      def initialize(name)
        @name = name
      end

      def render(props = {}, options = {})
        tag = options.delete(:tag) || :div
        data = { data: { "svelte-component" => @name, "svelte-props" => props.to_json } }

        content_tag(tag, nil, options.deep_merge(data))
      end
    end
  end
end
