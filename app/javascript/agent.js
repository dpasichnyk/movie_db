import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/v1';

const handleErrors = err => {
    if (err && err.response) {
        console.log(err);
    }
    return err;
};

const responseBody = res => res.body;

const pagination = (p) => `page=${p}`;
const search = (sq) => sq.length > 0 ? `search=${sq}` : '';

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .end(handleErrors)
            .then(responseBody),
};

const Categories = {
    getAll: () => requests.get('/categories')
};

const Movies = {
    all: (page, searchQuery) =>
        requests.get(`/movies?${pagination(page)}&${search(searchQuery)}`),
    del: slug =>
        requests.del(`/movies/${slug}`),
    get: slug =>
        requests.get(`/movies/${slug}`),
    create: movie =>
        requests.post('/movies', { movie }),
    update: movie =>
        requests.put(`/movies/${movie.slug}`, { article: movie }),
};

const Ratings = {
    create: (movieSlug, value) =>
        requests.post('/ratings', { movie_slug: movieSlug, value: value })
};

export default {
    Movies,
    Categories,
    Ratings
};