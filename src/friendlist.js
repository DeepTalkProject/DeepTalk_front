import React, {
    Component
} from 'react';
import {
    Appbar
} from 'react-native-paper';

class FriendList extends Component {
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

export default FriendList;
