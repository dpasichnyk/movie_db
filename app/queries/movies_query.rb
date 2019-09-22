class MoviesQuery
  attr_reader :categories
  attr_reader :relation
  attr_reader :search
  attr_reader :ratings

  attr_reader :_relation

  def initialize(relation, search, categories, ratings)
    @relation = relation
    @categories = categories
    @search = search
    @ratings = ratings
  end

  def perform
    with_users_and_categories
    with_search_within_categories
    with_search_within_ratings
    with_search_results
  end

  private

  def cleaned_categories
    @cleaned_categories ||= categories&.tr('"', '')&.split(',')
  end

  def cleaned_ratings
    @cleaned_ratings ||= ratings&.tr('"', '')&.split(',')
  end

  def with_search_results
    @_relation = _relation.search(search)
  end

  def with_search_within_categories
    @_relation = cleaned_categories.blank? ? _relation : _relation.where('categories_movies.slug IN (?)', cleaned_categories)
  end

  def with_search_within_ratings
    @_relation = cleaned_ratings.blank? ? _relation : _relation.where('floor(movies.rating_value)::int IN (?)', cleaned_ratings)
  end

  def with_users_and_categories
    @_relation = relation.eager_load(:categories, :user)
  end
end