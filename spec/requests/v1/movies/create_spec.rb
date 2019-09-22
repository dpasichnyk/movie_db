require 'rails_helper'

RSpec.describe 'POST /v1/movies', type: :request do
  let(:url) { '/v1/movies' }
  let(:user) { create :user }
  let(:params) { { movie: { title: title, text: text } } }

  let(:title) { 'Some awesome movie title' }
  let(:text) { 'Some awesome movie description' * 100 }

  before do
    sign_in user
    post url, params: params
  end

  it 'generally works' do
    body = JSON.parse(response.body)

    expect(response.status).to eq 200

    expect(body['title']).to eq title
    expect(body['text']).to eq text
  end
end