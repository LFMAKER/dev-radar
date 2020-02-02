const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

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

            //Filtrar as conexões que estão há no máximo 10km de distância
            //e que o novo dev tenha pelo menos uma das tecnologias filtradas
            //envia a mensagem para todas as conexões do socket.io
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            );
            console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }//if end

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

    //Feature: Create the Update Endpoint
};