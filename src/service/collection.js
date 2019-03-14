import axios from 'axios';

export const collectService = {
    getCollectionBySearch,
};

function getCollectionBySearch(param) {
    return axios.get(`https://images-api.nasa.gov/search?q=${param}`).then(response => {
        return response;
    });
}