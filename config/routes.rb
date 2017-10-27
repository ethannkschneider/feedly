Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"


  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :feeds, only: [:show]
    resources :collections, except: [:new, :edit]
    post '/collections/:id/unsubscribe', to: 'subscriptions#destroy'
    # Should we namespace subscriptions under collections?
    resources :subscriptions, only: [:create]
  end
end
