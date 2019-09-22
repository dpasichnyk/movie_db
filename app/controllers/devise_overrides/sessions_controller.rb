class DeviseOverrides::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render 'v1/users/show'
    else
      render json: { errors: resource.errors.full_messages }, status: :bad_request
    end
  end

  def respond_to_on_destroy
    head :no_content
  end
end