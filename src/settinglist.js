import React, {
    Component
} from 'react';
import {
    Appbar
} from 'react-native-paper';

class SettingList extends Component {
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
                <Appbar.Content title="SETTING" />
            </Appbar.Header>
        );
    }
}

export default SettingList;
