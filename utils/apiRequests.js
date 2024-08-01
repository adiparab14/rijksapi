const supertest = require("supertest")
const env = require('../env');
const request = supertest(env.url);


function collections(params,isAuthorised) {
    if(isAuthorised){
        return request.get(`/api/nl/collection?key=${env.token}&${params}`);
    }
    return request.get(`/api/nl/collection?key=&${params}`);
}

function objects(id,isAuthorised) {
    if(isAuthorised){
        return request.get(`/api/nl/collection/${id}?key=${env.token}`);
    }
    return request.get(`/api/nl/collection/${id}?key=`);
}

module.exports = { collections, objects };