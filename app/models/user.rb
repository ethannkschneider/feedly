class Users < ApplicationRecord
  validates :username, :first_name,
    :last_name, :password_digest, :session_token,
    presence: true

  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
end
