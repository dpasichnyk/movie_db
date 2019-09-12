FactoryBot.define do
  factory :category do
    transient do
      sequence :n
    end

    name { "Awesome category name #{n}" }
    text  { "Awesome category description" }
  end
end