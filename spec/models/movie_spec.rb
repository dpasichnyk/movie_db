require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:ratings) }
    it { is_expected.to have_and_belong_to_many(:categories) }
  end

  describe 'validations' do
    it { is_expected.to validate_inclusion_of(:rating_value).in_range(0..5) }

    it { is_expected.to validate_presence_of(:slug) }
    it { is_expected.to validate_uniqueness_of(:slug) }

    it { is_expected.to validate_presence_of(:text) }
    it { is_expected.to validate_length_of(:text).is_at_least(200) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_least(3).is_at_most(250) }
  end

  describe 'private methods' do
    let(:record) { build me, title: title }

    describe '#assign_rating_value' do
      let(:record) { create me, :with_ratings}

      subject { record.send(:assign_rating_value) }

      it { is_expected.to be true }
    end
  end
end
