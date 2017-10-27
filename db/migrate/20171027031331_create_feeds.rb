class CreateFeeds < ActiveRecord::Migration[5.1]
  def change
    create_table :feeds do |t|
      t.string :title, null: false
      t.text :url, null: false
      t.timestamps
    end

    add_index :feeds, :url, unique: true
  end
end
