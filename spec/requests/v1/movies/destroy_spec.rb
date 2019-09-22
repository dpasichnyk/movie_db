require 'rails_helper'

RSpec.describe 'DELETE /v1/movies/:id', type: :request do
  let(:url) { "/v1/movies/#{movie.id}" }
  let(:user) { create :user }
  let(:params) { { movie: { title: 'Some awesome movie', text: 'some awesome movie description' * 200 } } }

  before do
    sign_in user
    delete url
  end

  context 'when success' do
    let!(:movie) { create :movie }

    it 'generally works' do
      expect(response.status).to eq 200
    end
  end
end