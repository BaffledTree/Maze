class ChangeContentInMazesToText < ActiveRecord::Migration
  def change
    change_column :mazes, :content, :text
  end
end
