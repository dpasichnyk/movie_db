FactoryBot.define do
  factory :movie do
    transient do
      sequence :n
    end

    title { "Some awesome movie title ##{n}" }
    text  { "Watch this movie" + (" again and" * 50) }
    user

    trait :with_categories do
      after :create do |movie|
        movie.categories = create_list(:category, 3)
      end
    end

    trait :with_ratings do
      after :create do |movie|
        movie.ratings = create_list(:rating, 3)
      end
    end
  end
end