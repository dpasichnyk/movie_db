class V1::RatingsController < ApplicationController
  before_action :authenticate_user!

  def create
    @movie = Movie.friendly.find(params[:movie_slug])
    rating = Rating.create(movie: @movie, user: current_user, value: params[:value])

    render_resource(rating, :conflict) do
      render 'v1/ratings/create'
    end
  end
end
