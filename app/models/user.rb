require 'bcrypt'
class User < ActiveRecord::Base
  # Remember to create a migration!
  include BCrypt
  has_many :mazes

  validates :username, :email, uniqueness: true
  validates :username, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end
end
