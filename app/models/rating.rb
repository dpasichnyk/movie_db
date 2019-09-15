class Rating < ApplicationRecord
  belongs_to :movie, touch: true
  belongs_to :user

  validates :value, inclusion: { in: (1..5).to_a }, presence: true
  validates_uniqueness_of :movie_id, scope: :user_id
end
