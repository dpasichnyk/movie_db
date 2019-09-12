class Rating < ApplicationRecord
  belongs_to :movie, touch: true
  belongs_to :user

  validates :value, inclusion: { in: (1..5).to_a }, presence: true
end
