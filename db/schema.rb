# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_07_174446) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.text "name"
    t.text "text"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_categories_on_slug"
  end

  create_table "categories_movies", force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "movie_id"
    t.index ["category_id"], name: "index_categories_movies_on_category_id"
    t.index ["movie_id"], name: "index_categories_movies_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.bigint "user_id"
    t.decimal "rating_value", precision: 2, scale: 1
    t.string "slug"
    t.text "title"
    t.text "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["rating_value"], name: "index_movies_on_rating_value"
    t.index ["slug"], name: "index_movies_on_slug"
    t.index ["user_id"], name: "index_movies_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "movie_id"
    t.bigint "user_id"
    t.integer "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["movie_id"], name: "index_ratings_on_movie_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
    t.index ["value"], name: "index_ratings_on_value"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
