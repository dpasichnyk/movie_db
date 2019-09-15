class V1::RatingsController < ApplicationController
  def create
    @movie = Movie.friendly.find(params[:movie_slug])
    @movie.ratings << Rating.create(value: params[:value])
  end
end
