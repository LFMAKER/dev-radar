import { createAppContainer } from 'react-navigation';
import { creteStackNavigator, createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes =  createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                headerShown: false,//Removendo o header
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        },
    },
    {
       defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#2a2a2a'
        }
       },
    })
);

export default Routes;
