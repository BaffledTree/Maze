class Maze < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :user
  validates :content, presence: true
  validates :content, uniqueness: true
end
