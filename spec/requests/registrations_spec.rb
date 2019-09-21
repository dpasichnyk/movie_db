require 'rails_helper'

RSpec.describe 'POST /signup', type: :request do
  let(:url) { '/signup' }
  let(:params) { { user: { email: 'user@example.com', first_name: "John", last_name: "Doe", password: 'password' } } }

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      expect(JSON.parse(response.body)['user']).to include(params[:user].stringify_keys.except('password'))
    end
  end

  context 'when user already exists' do
    before do
      create :user, email: params[:user][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      expect(JSON.parse(response.body)['errors']).to eq(['Email has already been taken'])
    end
  end
end