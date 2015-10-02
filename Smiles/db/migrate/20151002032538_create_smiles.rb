class CreateSmiles < ActiveRecord::Migration
  def change
    create_table :smiles do |t|
      t.string :space, :null => false
      t.string :title, :null => false
      t.string :story, :null => false
      t.integer :happiness_level, :null => false
      t.integer :like_count, :null => false

      t.timestamps null: false
    end
  end
end
