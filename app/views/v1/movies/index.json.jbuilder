json.movies @movies, partial: 'movie', as: :movie
json.movies_count @movies.total_entries
json.page @movies.current_page
json.pages @movies.total_pages