class DeviseOverrides::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render_resource(resource) do
      render 'v1/users/show'
    end
  end

  def respond_to_on_destroy
    head :no_content
  end
end