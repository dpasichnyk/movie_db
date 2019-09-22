class DeviseOverrides::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render 'v1/users/show'
    else
      render json: { errors: resource.errors.full_messages }, status: :bad_request
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
