class V1::MoviesController < ApplicationController
  def index
    @movies = Movie.includes(:categories, :user)
      .search(params[:search])
      .paginate(page: params[:page])
  end

  def show
    @movie = Movie.friendly.find(params[:id])
  end
end
