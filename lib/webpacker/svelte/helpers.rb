module Webpacker
  module Svelte
    module Helpers
      def svelte_component(component_name, props = {}, options = {})
        Webpacker::Svelte::Component.new(component_name).render(props, options)
      end
    end
  end
end
