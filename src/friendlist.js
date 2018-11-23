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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class FriendList extends Component {
    // Basic methods
    state = {
        index: 0,
        routes: [
            { key: 'friends', title: 'Friends', icon: 'person' },
            { key: 'chats', title: 'Chats', icon: 'chat' },
            { key: 'setting', title: 'Setting', icon: 'settings' }
        ]
    }

    // EventHandlers on the top bar
    _onSearch = function () {
        console.log('pressed search button');
    }
    _onAdd = function () {
        console.log('pressed add button');
    }
    _onSetting = function () {
        console.log('pressed setting button');
    }

    render() {
        return (
            <Appbar.Header>
                <Appbar.Content title="FRIENDS" />
                <Appbar.Action icon="search" onPress={this._onSearch} />
                <Appbar.Action icon="person-add" onPress={this._onAdd} />
                <Appbar.Action icon="settings" onPress={this._onSetting} />
            </Appbar.Header>
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

export default FriendList;
