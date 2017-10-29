class AddTimestampsToArticles < ActiveRecord::Migration[5.1]
  def change
    add_timestamps :articles 
  end
end
