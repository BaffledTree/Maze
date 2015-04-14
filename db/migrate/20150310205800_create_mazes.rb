class CreateMazes < ActiveRecord::Migration
  def change
    create_table :mazes do |t|
      t.string       :content
      t.belongs_to   :user

      t.timestamps
    end
  end
end
