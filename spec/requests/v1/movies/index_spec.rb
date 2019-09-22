require 'rails_helper'

RSpec.describe 'GET v1/movies', type: :request do
  let!(:movies) { create_list :movie, 5, :with_categories }
  let(:url) { '/v1/movies' }
  let(:params) { { search: '' } }

  describe "search" do
    before { get url, params: params }

    it 'returns all records if search parameters blank' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['movies'].count).to eq 5
    end

    context 'when search against movie attributes' do
      let(:params) { { search: title } }
      let(:title) { movies.last.title }

      it 'generally works' do
        movies = JSON.parse(response.body)['movies']

        expect(response.status).to eq 200
        expect(movies.count).to eq 1
        expect(movies.first['title']).to eq title
      end
    end
  end
end