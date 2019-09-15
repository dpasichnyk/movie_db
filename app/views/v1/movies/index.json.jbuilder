json.movies @movies, partial: 'movie', as: :movie
json.moviesCount @movies.total_entries
json.page @movies.current_page
json.pages @movies.total_pages