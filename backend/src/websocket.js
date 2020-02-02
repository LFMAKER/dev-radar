const socketio =  require('socket.io');
const connections = []
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculteDistance');

let io;
exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;


        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs:parseStringAsArray(techs)
        });//end push
    });//end io.on
};


exports.findConnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connections.coordinates) < 10
        && connections.techs.some(item => techs.includes(item))
    });
};

exports.sendMessage = (to, message, data) =>{
    to.forEach( connection => {
       io.to(connection.id).emit(message, data); 
    });
};