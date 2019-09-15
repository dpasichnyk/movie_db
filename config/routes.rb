Rails.application.routes.draw do
  root 'static#index'

  namespace :v1, defaults: { format: :json } do
    resources :users
    resources :categories
    resources :ratings
    resources :movies
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
