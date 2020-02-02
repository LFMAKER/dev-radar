const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        //Buscar todos devs num raio de 10km
        //filtrar por tecnologias
        const {latitude, longitude, techs} = request.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance: 10000//10km
                },
            }
        });
        return response.json({devs});
    },
    async byArea(request, response){
        //Buscar todos devs num raio de 10km da coordernada
        const {latitude, longitude} = request.query;

        const devs = await Dev.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance: 10000//10km
                },
            }
        });
        return response.json({devs});
    }
};