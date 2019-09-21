class ApplicationController < ActionController::API
  include ActionController::ImplicitRender

  def render_resource(resource=nil)
    raise ArgumentError, "either parameter or block expected" unless resource || block_given?

    if resource&.errors&.empty?
      if block_given?
        yield
      else
        render(json: resource)
      end
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: { errors: resource.errors.full_messages }, status: :bad_request
  end
end
