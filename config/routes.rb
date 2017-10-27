Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :collections, except: [:new, :edit]
    resources :feeds, only: [:show]
    resources :subscriptions, only: [:create, :destroy]
  end
end
