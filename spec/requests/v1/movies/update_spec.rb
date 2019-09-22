require 'rails_helper'

RSpec.describe 'PUT /v1/movies/:id', type: :request do
  let(:url) { "/v1/movies/#{movie.id}" }
  let(:user) { create :user }
  let(:params) { {movie: {title: 'Some awesome movie', text: 'some awesome movie description' * 200}} }

  let!(:movie) { create :movie }
  let(:params) { { movie: { id: movie.id, title: title, text: text } } }
  let(:title) { 'Some awesome movie title' }
  let(:text) { 'Some awesome movie description' * 100 }

  before do
    sign_in user
    put url, params: params
  end

  it 'generally works' do
    body = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(body['title']).to eq title
    expect(body['text']).to eq text
  end
end