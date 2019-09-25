class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_and_belongs_to_many :movies

  validates :name, length: { in: 3..250 }, presence: true
  validates :slug, uniqueness: true, presence: true
  validates :text, length: { in: 20..2000 }, presence: true

  scope :with_movies_counts, -> do
    joins(:movies)
    .select('categories.*, count(DISTINCT movies.id) as movies_count')
    .group(:id)
    .order(movies_count: :desc, created_at: :desc)
  end

  def slug_candidates
    [:name]
  end
end
