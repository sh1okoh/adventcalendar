Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :todos, only: %i[show index create update destroy]
  end
end
