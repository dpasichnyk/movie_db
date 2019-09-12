class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.belongs_to :user

      t.decimal :rating_value, precision: 2, scale: 1, index: true
      t.string :slug, index: true, uniq: true
      t.text :title
      t.text :text

      t.timestamps
    end
  end
end
