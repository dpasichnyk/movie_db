require 'rails_helper'

RSpec.describe User, type: :model do
  it_behaves_like "model with a factory"

  describe "associations" do
    it { is_expected.to have_many(:movies) }
    it { is_expected.to have_many(:ratings) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_length_of(:first_name).is_at_least(1).is_at_most(250) }
    it { is_expected.to validate_presence_of(:last_name) }
    it { is_expected.to validate_length_of(:last_name).is_at_least(1).is_at_most(250) }
  end
end
