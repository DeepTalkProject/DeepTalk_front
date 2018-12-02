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
import SendBirdApp from '../../config/keys';
import {API_TOKEN} from '../../config/keys';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class ChatList extends Component {
    state = {
        id: this.props.id,
        'friends': []
    };
    // EventHandlers on the top bar
    _onClick = () => {

    };

    componentDidMount = async () => {
        var friendsInfo = await fetch('https://api.sendbird.com/v3/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': API_TOKEN,
            },
        });
        var friendsJson = await friendsInfo.json();
        var friends = [];

        for (var i = 0; i < friendsJson.users.length; ++i) {
            if (friendsJson.users[i].user_id !== this.state.id) {
                if (friendsJson.users[i].profile_url !== '') {
                    let url = friendsJson.users[i].profile_url;
                    friends.push(
                        <List.Item
                            key={friendsJson.users[i].user_id}
                            title={friendsJson.users[i].user_id}
                            onPress={() => console.log('Profile')}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={{uri: url.slice()}} style={styles.friendAvatar} />}
                        />
                    );
                }
                else {
                    friends.push(
                        <List.Item
                            key={friendsJson.users[i].user_id}
                            title={friendsJson.users[i].user_id}
                            onPress={() => console.log('No Profile Image')}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={require('./../../assets/icon.png')} style={styles.friendAvatar} />}
                        />
                    );
                }
            }
        }
        console.log('friends from chat: ', friends);
        this.setState({'friends': friends});
    }

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
                        {this.state.friends}
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
