class CreateCategoriesMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :categories_movies do |t|
      t.belongs_to :category
      t.belongs_to :movie
    end
  end
end
