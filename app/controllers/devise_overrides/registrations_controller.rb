class DeviseOverrides::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save

    @user = resource

    render_resource(resource) do
      render 'v1/users/show'
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
