class V1::RatingsController < ApplicationController
  before_action :authenticate_user!

  def create
    @movie = Movie.friendly.find(params[:movie_slug])
    rating = Rating.new(movie: @movie, user: current_user, value: params[:value])

    unless rating.save
      render json: { errors: rating.errors.full_messages }, status: :conflict
    end
  end
end
