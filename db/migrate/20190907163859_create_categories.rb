class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.text :name
      t.text :text
      t.string :slug, index: true, uniq: true

      t.timestamps
    end
  end
end
