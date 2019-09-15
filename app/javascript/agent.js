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
    all: (page) =>
        requests.get(`/movies?${pagination(page)}`),
    del: slug =>
        requests.del(`/movies/${slug}`),
    get: slug =>
        requests.get(`/movies/${slug}`),
    create: movie =>
        requests.post('/movies', { movie })
};

export default {
    Movies,
    Categories,
};