const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    //Index
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    //Store
    async store(request, response) {
        const {
            github_username,
            techs,
            latitude,
            longitude
        } = request.body;

        let dev = await Dev.findOne({github_username});
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const {
                name = login, avatar_url, bio
            } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
    
            dev = await Dev.create({
                github_username, //short sintax
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
    
        }

        return response.json(dev)

    },
    //Destroy
    async destroy(request, response) {
      
        const {
            github_username,
        } = request.query;
        let dev = await Dev.findOne({github_username});
        if(dev){
            dev = await Dev.remove(dev);
        }

        return response.json(dev)

    }
};