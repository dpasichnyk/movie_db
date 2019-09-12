require 'rails_helper'

RSpec.describe Rating, type: :model do
  it_behaves_like 'model with a factory'

  describe 'associations' do
    it { is_expected.to belong_to(:movie) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:value) }
    it { is_expected.to validate_inclusion_of(:value).in_array((1..5).to_a) }
  end
end
