json.(movie, :id, :rating_value, :title, :text, :categories, :created_at, :slug)
json.categories movie.categories, partial: 'v1/categories/category', as: :category
json.user movie.user, partial: 'v1/users/user', as: :user