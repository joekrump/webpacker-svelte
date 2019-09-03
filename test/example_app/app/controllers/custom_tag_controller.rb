class CustomTagController < ApplicationController
  def view_component
  end

  def controller_component
    render svelte_component: "HelloSvelte", props: { name: "a component rendered from a controller in a span" }, tag_options: { tag: :span }
  end
end
