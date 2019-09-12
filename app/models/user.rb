class User < ApplicationRecord
  has_many :movies
  has_many :ratings

  #TODO: add email validation with `Devise.email_regexp` pattern, add uniqueness validation.
  validates :first_name, length: { in: 1..250 }, presence: true, allow_blank: false
  validates :last_name, length: { in: 1..250 }, presence: true, allow_blank: false
end
