# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( reset.scss )
Rails.application.config.assets.precompile += %w( header.scss )
Rails.application.config.assets.precompile += %w( session.scss )
Rails.application.config.assets.precompile += %w( welcome.scss )
Rails.application.config.assets.precompile += %w( collection_index.scss )
Rails.application.config.assets.precompile += %w( loading.scss )
Rails.application.config.assets.precompile += %w( sidebar.scss )
Rails.application.config.assets.precompile += %w( collection_index_articles.scss )
Rails.application.config.assets.precompile += %w( organize.scss )
Rails.application.config.assets.precompile += %w( discover.scss )
Rails.application.config.assets.precompile += %w( article_index.scss )
