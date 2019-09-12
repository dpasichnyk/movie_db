require 'rails_helper'

RSpec.describe Category, type: :model do
  it_behaves_like 'model with a factory'

  describe 'associations' do
    it { is_expected.to have_and_belong_to_many(:movies) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_least(3).is_at_most(250) }

    it { is_expected.to validate_presence_of(:slug) }
    it { is_expected.to validate_uniqueness_of(:slug) }

    it { is_expected.to validate_presence_of(:text) }
    it { is_expected.to validate_length_of(:text).is_at_least(20).is_at_most(2000) }
  end
end
