class V1::CategoriesController < ApplicationController
  def index
    @categories = Category.with_movies_counts.limit(3)
  end
end
