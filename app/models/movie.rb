class Movie < ApplicationRecord
  include PgSearch::Model
  extend FriendlyId

  friendly_id :title, use: [:finders, :slugged]

  pg_search_scope :text_search,
    against: { title: 'A', text: 'B' },
    associated_against: {
      categories: {
        name: 'A',
        text: 'B'
      }
    }

  self.per_page = 10

  after_touch :assign_rating_value

  belongs_to :user
  has_many :ratings
  has_and_belongs_to_many :categories

  validates :slug, uniqueness: true, presence: true
  validates :rating_value, inclusion: { in: 0..5 }
  validates :text, length: { minimum: 200 }, presence: true
  validates :title, length: { in: 3..250 }, presence: true

  def self.search(query)
    if query.present?
      text_search(query)
    else
      order(created_at: :desc)
    end
  end

  private

  # @return [Float] Assigned rating.
  def assign_rating_value
    return if rating_value.present? && rating_value_changed?

    value = 0.0
    ratings = self.ratings.pluck(:value)
    value = (ratings.sum.to_f / ratings.size) if ratings.present?

    update(rating_value: value)
  end

  def slug_candidates
    [:title]
  end
end
