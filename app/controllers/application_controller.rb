class ApplicationController < ActionController::API
  include ActionController::ImplicitRender

  def render_resource(resource=nil, status=:bad_request)
    raise ArgumentError, "either parameter or block expected" unless resource || block_given?

    if resource&.errors&.empty?
      block_given? ? yield : render(json: resource)
    else
      validation_error(resource, status)
    end
  end

  def validation_error(resource, status=:bad_request)
    render json: { errors: resource.errors.full_messages }, status: status
  end
end
