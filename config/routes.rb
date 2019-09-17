Rails.application.routes.draw do
  devise_for :users,
    path: '',
    controllers: {
      sessions: 'devise_overrides/sessions',
      registrations: 'devise_overrides/registrations'
    },
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    defaults: { format: 'json' }

  root 'static#index'

  namespace :v1, defaults: { format: :json } do
    resources :users do
      get :current, on: :collection
    end

    resources :categories
    resources :ratings
    resources :movies
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
