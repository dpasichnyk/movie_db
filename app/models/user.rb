class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_many :movies
  has_many :ratings

  validates :email, format: Devise.email_regexp
  validates :first_name, length: { in: 1..250 }
  validates :last_name, length: { in: 1..250 }
end
