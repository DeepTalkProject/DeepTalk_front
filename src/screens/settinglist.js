import React, {
    Component
} from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import {
    Appbar,
    List
} from 'react-native-paper';

class SettingList extends Component {
    // EventHandlers on the top bar
    _onChangeProfile = function () {
        console.log('change my profile');
    };

    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="SETTING" />
                </Appbar.Header>
                <ScrollView>
                    <List.Section title='Basic'>
                        <List.Item
                            title="Change my Profile"
                            onPress={this._onChangeProfile}
                        />
                    </List.Section>
                </ScrollView>
            </View>
        );
    }
}

export default SettingList;
