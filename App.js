import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Provider as PaperProvider,
    Appbar,
    BottomNavigation,
    Text
} from 'react-native-paper';

import FriendList from './src/friendlist';
import ChatList from './src/chatlist';
import SettingList from './src/settinglist';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#ffffff',
        accent: '#01579b',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#000000',
        disabled: '#505050',
        placeholder: '#333333',
        backdrop: '#222222'
    },
    fonts: {
        regular: 'sans-serif',
        medium: 'sans-serif-medium',
        light: 'sans-serif-light',
        thin: 'sans-serif-thin'
    }
}

class DeepTalk extends Component {
    // Basic methods
    state = {
        index: 0,
        routes: [
            { key: 'friends', title: 'Friends', icon: 'person' },
            { key: 'chats', title: 'Chats', icon: 'chat' },
            { key: 'setting', title: 'Setting', icon: 'settings' }
        ]
    }

    // EventHandlers on the bottom navigator
    FriendRoute = function () {
        return <FriendList />
    };
    ChatRoute = function () {
        return <ChatList />
    };
    SettingRoute = function () {
        return <SettingList />
    }
    _handleIndexChange = (index) => {
        this.setState({ index: index });
    }
    _renderScene = BottomNavigation.SceneMap({
        friends: this.FriendRoute,
        chats: this.ChatRoute,
        setting: this.SettingRoute
    })

    render() {
        return (
            <PaperProvider theme={theme}>
                <BottomNavigation navigationState={this.state} onIndexChange={this._handleIndexChange} renderScene={this._renderScene} />
            </PaperProvider>
        );
    }
}

var styles = StyleSheet.create({
    topbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1
    },
    buttom: {
        zIndex: 1
    }
});

export default DeepTalk;
