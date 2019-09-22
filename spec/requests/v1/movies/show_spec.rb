require 'rails_helper'

RSpec.describe 'GET /v1/movies/:id', type: :request do
  let(:url) { "/v1/movies/#{movie.id}" }
  let(:user) { create :user }

  before do
    sign_in user
    get url
  end

  let!(:movie) { create :movie }

  it 'generally works' do
    body = JSON.parse(response.body)

    expect(response.status).to eq 200

    expect(body['title']).to eq movie.title
    expect(body['text']).to eq movie.text
  end
end