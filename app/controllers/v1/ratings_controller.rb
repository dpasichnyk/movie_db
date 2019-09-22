class V1::RatingsController < ApplicationController
  before_action :authenticate_user!, only: :create

  def index
    @ratings = Movie
      .select('floor(movies.rating_value)::int as floored_rating, count(movies.id) as movies_count')
      .group(:floored_rating)
      .order(floored_rating: :desc)
  end

  def create
    @movie = Movie.friendly.find(params[:movie_slug])
    rating = Rating.create(movie: @movie, user: current_user, value: params[:value])

    render_resource(rating, :conflict) do
      render 'v1/ratings/create'
    end
  end
end
