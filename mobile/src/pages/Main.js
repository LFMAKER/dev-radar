import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

 var mapStyle = require('../utils/json/mapstyle.json');

function Main({ navigation }) {

    //Criando estados
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');


    //Recupera todos os devs na área do usuário
    async function getAllDevsInArea(){
        
        // if(techs === ''){
            const {latitude, longitude} = currentRegion;
            const response = await api.get('/searchbyarea', {
                params: {
                    latitude,
                    longitude
                }
            });
            setDevs(response.data.devs);   
        // }else{
        //     loadDevs();
        // }         
        
    }

   

    useEffect(() => {//Obtendo Permissão e Utilizando GPS
        async function loadInitialPosition() {//Carregando posição inicial
            const { granted } =  await requestPermissionsAsync();
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                
                if(coords !==null){

                    const { latitude, longitude } = coords;
                    setCurrentRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04
                    });
                }

            
            }    
        }
        loadInitialPosition();



    }, [])

    useEffect(() =>{//Escutando o socket.io
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs])

    function setupWebsocket() {
        disconnect();

        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs
        );

    }

    async function loadDevs(){//Carrega os Devs na região com a tech informada
        const {latitude, longitude} = currentRegion;

        if(techs !== ''){//Só será pesquisado caso tenha techs preenchidas

            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            });
            setDevs(response.data.devs);
            setupWebsocket();
        }else{//Caso não tenha, retorna todos os devs da área
            console.log("loaging devs...")
            await getAllDevsInArea();
        }
    }

    async function handleRegionChanged(region){//Pega localização quando mover o mapa
        setCurrentRegion(region);
        getAllDevsInArea();
    }

    if(!currentRegion){
      return null;  
    }

    return (
    <>
    <MapView 
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion} 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        >
        {devs.map(dev => (
            <Marker 
            key={dev._id}
            coordinate={{ 
                longitude: dev.location.coordinates[0],
                latitude: dev.location.coordinates[1]
            }}
        >
            <Image 
                style={styles.avatar}
                source={{uri: dev.avatar_url}}
            />
            <Callout onPress={() => {
                //Navegação
                navigation.navigate('Profile', {github_username: dev.github_username});
            }}>
                <View style={styles.callout}>
                    <Text style={styles.devName}>{dev.name}</Text>
                    <Text style={styles.devBio}>{dev.bio}</Text>
                    <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
            </Callout>
        </Marker>
        ))}
    </MapView>
    <View style={styles.searchForm}>
            <TextInput 
            style={styles.searchInput}
            placeholder="Buscar devs por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={text => setTechs(text)}//ou apenas setTechs
            />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name='my-location' size={20} color="#fff"/>
            </TouchableOpacity>
    </View>
    </>
    );
}


const styles = StyleSheet.create({
    map: {
        flex: 1,
        display: "flex"
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#52de97'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#2a2a2a',
        color: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#2a2a2a',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: '#fff',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 5
    }
});








export default Main;