import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScene from './src/screens/login';
import Navigator from './src/screens/navigate';
import RegisterScene from './src/screens/register';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginScene,
        navigationOptions: {
            header: null
        }
    },
    Main: {
        screen: Navigator,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: RegisterScene,
        navigationOptions: {
            header: null
        }
    }
}, {
    initialRouteName: 'Login'
});

export default createAppContainer(AppNavigator);
