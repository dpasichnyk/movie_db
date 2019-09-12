FactoryBot.define do
  factory :rating do
    movie
    user
    value { rand(1..5) }
  end
end