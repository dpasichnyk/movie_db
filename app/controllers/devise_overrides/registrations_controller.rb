class DeviseOverrides::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render_resource(resource) do
      render 'v1/users/show'
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
