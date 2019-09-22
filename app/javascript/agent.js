import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import errorStore from './stores/errorStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000';
const API_VERSION = '/v1';

const headers = req => {
    if (commonStore.token) {
        req.set('authorization', commonStore.token);
        req.set('key-inflection', 'camel');
    }
};

const handleErrors = err => {
    if (err) {
        if (err.response.status === 401) {
            authStore.logout();
        }

        if (err.response.body.errors) {
            err.response.body.errors.map(e => {
                errorStore.addError(e);
            });
        }
    }

    return err;
};

const response = ({ body, headers }) => {
    const authToken = headers.authorization;
    if (authToken) commonStore.setToken(authToken);

    return body;
};

const pagination = (p) => `page=${p}`;
const search = (sq) => sq.length > 0 ? `search=${sq}` : '';

const requests = {
    del: (url, apiVersion) =>
        superagent
            .del(`${API_ROOT}${apiVersion}${url}`)
            .use(headers)
            .end(handleErrors)
            .then(response),
    get: (url, apiVersion='') =>
        superagent
            .get(`${API_ROOT}${apiVersion}${url}`)
            .use(headers)
            .end(handleErrors)
            .then(response),
    post: (url, body, apiVersion='') =>
        superagent
            .post(`${API_ROOT}${apiVersion}${url}`, body)
            .use(headers)
            .end(handleErrors)
            .then(response),
    put: (url, body, apiVersion='') =>
        superagent
            .put(`${API_ROOT}${apiVersion}${url}`, body)
            .use(headers)
            .end(handleErrors)
            .then(response),
};

const Auth = {
    current: () =>
        requests.get('/users/current', API_VERSION),
    login: (email, password) =>
        requests.post('/login', { user: { email, password } }),
    register: (firstName, lastName, email, password) =>
        requests.post('/signup', { user: { first_name: firstName, last_name: lastName, email, password } }),
};

const Categories = {
    getAll: () => requests.get('/categories', API_VERSION)
};

const Movies = {
    all: (page, searchQuery) =>
        requests.get(`/movies?${pagination(page)}&${search(searchQuery)}`, API_VERSION),
    del: slug =>
        requests.del(`/movies/${slug}`, API_VERSION),
    get: slug =>
        requests.get(`/movies/${slug}`, API_VERSION),
    create: movie =>
        requests.post('/movies', { movie }, API_VERSION),
    update: movie =>
        requests.put(`/movies/${movie.slug}`, { movie: movie }, API_VERSION),
};

const Ratings = {
    create: (movieSlug, value) =>
        requests.post('/ratings', { movie_slug: movieSlug, value: value }, API_VERSION)
};

export default {
    Auth,
    Movies,
    Categories,
    Ratings
};