class V1::MoviesController < ApplicationController
  def index
    @movies = Movie.includes(:categories, :user).all
  end

  def show
    @movie = Movie.friendly.find(params[:id])
  end
end
