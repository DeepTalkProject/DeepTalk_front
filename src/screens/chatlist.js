import React, {
    Component
} from 'react';
import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Appbar,
    List
} from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class ChatList extends Component {
    // EventHandlers on the top bar
    _onClick = () => {

    };

    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="CHATS" />
                    <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="add-circle-outline" onPress={this._onAdd} />
                    <Appbar.Action icon="settings" onPress={this._onSetting} />
                </Appbar.Header>
                <ScrollView>
                    <List.Section title='Friends' style={styles.friends}>
                        <List.Item
                            title="Friend 1"
                            onPress={this._onClick}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={require('./../../assets/icon.png')} style={styles.friendAvatar} />}
                            onLayout={(event) => {
                                var {x, y, width, height} = event.nativeEvent.layout;
                                console.log('Friend Height: ', height);
                            }}
                        />
                    </List.Section>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    friendAvatar: {
        width: 50,
        height: 50
    },
    friends: {
        color: 'black',
    }
});

export default ChatList;
