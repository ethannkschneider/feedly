class CreateReads < ActiveRecord::Migration[5.1]
  def change
    create_table :reads do |t|
      t.integer :user_id, null: false
      t.integer :article_id, null: false
      t.timestamps
    end

    add_index :reads, [:user_id, :article_id], unique: true
    add_index :reads, :article_id
  end
end
