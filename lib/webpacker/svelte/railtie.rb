require "rails/railtie"

module Webpacker
  module Svelte
    class Engine < ::Rails::Engine
      initializer :webpacker_svelte do
        ActiveSupport.on_load(:action_controller) do
          ActionController::Base.helper ::Webpacker::Svelte::Helpers
        end

        ActiveSupport.on_load :action_view do
          include ::Webpacker::Svelte::Helpers
        end
      end

      initializer :webpacker_svelte_renderer, group: :all do |_app|
        ActionController::Renderers.add :svelte_component do |component_name, options|
          props = options.fetch(:props, {})
          tag_options = options.fetch(:tag_options, {})
          html = Webpacker::Svelte::Component.new(component_name).render(props, tag_options)
          render_options = options.merge(inline: html)
          render(render_options)
        end
      end
    end
  end
end
