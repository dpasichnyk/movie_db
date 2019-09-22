require 'rails_helper'

RSpec.describe 'GET v1/categories', type: :request do
  let!(:categories) { create_list :category, 15 }
  let(:url) { '/v1/categories' }

  let!(:movies1) { create_list :movie, 5, categories: [categories.first] }
  let!(:movies2) { create_list :movie, 2, categories: [categories.last] }

  before { get url }

  it 'generally works' do
    expect(response.status).to eq 200
    body = JSON.parse(response.body)["categories"]

    expect(body.first(2).map { |c| c['name'] }).to eq([categories.first.name, categories.last.name])
  end
end