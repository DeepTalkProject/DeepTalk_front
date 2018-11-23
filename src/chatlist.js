import React, {
    Component
} from 'react';
import {
    Appbar
} from 'react-native-paper';

class ChatList extends Component {
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
                <Appbar.Content title="CHATS" />
                <Appbar.Action icon="search" onPress={this._onSearch} />
                <Appbar.Action icon="add-circle-outline" onPress={this._onAdd} />
                <Appbar.Action icon="settings" onPress={this._onSetting} />
            </Appbar.Header>
        );
    }
}

export default ChatList;
