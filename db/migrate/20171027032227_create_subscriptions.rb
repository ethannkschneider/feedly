class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.integer :feed_id, null: false
      t.integer :collection_id, null: false
      t.timestamps
    end

    add_index :subscriptions, [:feed_id, :collection_id], unique: true
    add_index :subscriptions, :collection_id
  end
end
