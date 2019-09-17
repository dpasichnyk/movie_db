FactoryBot.define do
  factory :user do
    transient do
      sequence :n
    end

    email { "user#{n}@isp.com" }

    first_name { "John" }
    last_name  { "Doe" }

    after :build do |user|
      user.password ||= "goodPassword123"
      user.password_confirmation ||= "goodPassword123"
    end

    trait :with_movies do
      after :create do |user|
        user.movies << create_list(:movie, 3)
      end
    end

    trait :with_ratings do
      after :create do |user|
        user.ratings << create_list(:rating, 3)
      end
    end
  end
end