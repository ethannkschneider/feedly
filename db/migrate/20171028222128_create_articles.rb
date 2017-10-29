class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :headline, null: false
      t.string :author, null: false
      t.integer :feed_id, null: false
      t.datetime :date_published, false
      t.text :content
      t.text :image_url
    end

    add_index :articles, :feed_id
  end
end
