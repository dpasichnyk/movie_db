class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_and_belongs_to_many :movies

  validates :name, length: { in: 3..250 }, presence: true
  validates :slug, uniqueness: true, presence: true
  validates :text, length: { in: 20..2000 }, presence: true

  def slug_candidates
    [:name]
  end
end
