class V1::MoviesController < ApplicationController
  require 'movies_query'

  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    @movies = ::MoviesQuery.new(Movie.all, params[:search], params[:categories], params[:ratings])
      .perform
      .paginate(page: params[:page])
  end

  def show
    @movie = movie
  end

  def create
    @movie = Movie.create(movie_params.merge(user: current_user))

    render_resource(@movie) do
      render 'v1/movies/show'
    end
  end


  def update
    @movie = movie
    @movie.update(movie_params)

    render_resource(@movie) do
      render 'v1/movies/show'
    end
  end

  def destroy
    if movie.delete
      head :ok
    else
      render json: { errors: ['Unable to delete the movie!'] }, status: :bad_request
    end
  end

  private

  def movie
    @_movie ||= Movie.friendly.find(params[:id])
  end

  def movie_params
    params.require(:movie).permit(:title, :text, category_ids: [])
  end
end
