class PagesController < ApplicationController
  def view_component
  end

  def view_consecutive
    @count = (params[:count] || 2).to_i
  end

  def controller_component
    render svelte_component: "HelloSvelte", props: { name: "a component rendered from a controller" }
  end
end
