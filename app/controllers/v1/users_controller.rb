class V1::UsersController < ApplicationController
  def current
    @user = current_user
    render 'v1/users/show'
  end
end
