class Movie < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  self.per_page = 10

  before_validation :assign_rating_value

  belongs_to :user
  has_many :ratings
  has_and_belongs_to_many :categories

  validates :slug, uniqueness: true, presence: true
  validates :rating_value, inclusion: { in: 0..5 }
  validates :text, length: { minimum: 200 }, presence: true
  validates :title, length: { in: 3..250 }, presence: true

  private

  # @return [Float] Assigned rating.
  def assign_rating_value
    return if rating_value.present? && rating_value_changed?

    value = 0.0
    ratings = self.ratings.pluck(:value)
    value = (ratings.sum.to_f / ratings.size) if ratings.present?

    self.rating_value = value
  end

  def slug_candidates
    [:title]
  end
end
