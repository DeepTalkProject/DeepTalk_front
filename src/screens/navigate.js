import React, {
    Component
} from 'react';
import {
    BottomNavigation,
    Provider as PaperProvider
} from 'react-native-paper';

import FriendList from './friendlist';
import ChatList from './chatlist';
import SettingList from './settinglist';

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
        disabled: '#aaaaaa',
        placeholder: '#cccccc',
        backdrop: '#222222'
    },
    fonts: {
        regular: 'sans-serif',
        medium: 'sans-serif-medium',
        light: 'sans-serif-light',
        thin: 'sans-serif-thin'
    }
};

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }
    navigationOptions = {
        title: 'Login'
    };
    // Basic methods
    state = {
        index: 0,
        routes: [
            { key: 'friends', title: 'Friends', icon: 'person' },
            { key: 'chats', title: 'Chats', icon: 'chat' },
            { key: 'setting', title: 'Setting', icon: 'settings' }
        ]
    };

    // EventHandlers on the bottom navigator
    FriendRoute = () => {
        var id = this.params.id;
        console.log('At navigate:', this.props);
        return <FriendList id={this.params.id} navigation={this.props.navigation} />
    };
    ChatRoute = () => {
        var id = this.params.id;
        return <ChatList id={this.params.id} />
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
                <BottomNavigation style={{zIndex: 2}} navigationState={this.state} onIndexChange={this._handleIndexChange} renderScene={this._renderScene} />
            </PaperProvider>
        );
    }
};

export default Navigator;
