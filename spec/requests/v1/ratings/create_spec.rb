require 'rails_helper'

RSpec.describe 'POST v1/ratings', type: :request do
  let!(:movie) { create :movie }
  let(:params) { { movie_slug: movie.slug, value: 4 } }
  let(:url) { '/v1/ratings' }
  let(:user) { create :user }

  def vote
    sign_in user
    post url, params: params
  end

  before do
    vote
  end

  context 'when success' do
    it do
      body = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(body['title']).to eq movie.title
      expect(body['rating_value']).to eq 4.0.to_s
    end
  end

  context 'when error' do
    it 'returns error' do
      vote
      expect(response.status).to eq 409

      expect(JSON.parse(response.body)['errors']).to eq ['Movie already rated by you!']
    end
  end
end