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
    List,
    Divider
} from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import UserBox from './../components/userbox.js'

class FriendList extends Component {
    state = {
        myprofile: false,
        clickedOther: false
    };

    _onMyProfile = () => {
        console.log('my profile');
        this.setState({myprofile: !this.state.myprofile});
        console.log(this.state.myprofile);
    }

    _onFriend = () => {
        console.log('your friend');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Appbar.Header>
                    <Appbar.Content title="FRIENDS" />
                    <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="person-add" onPress={this._onAdd} />
                    <Appbar.Action icon="settings" onPress={this._onSetting} />
                </Appbar.Header>
                <ScrollView>
                    <List.Section title='My Profile' style={styles.friends}>
                        <List.Item
                            title="Kim DongJae"
                            onPress={this._onMyProfile}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={require('./../../assets/icon.png')} style={styles.avatar} />}
                            onLayout={(event) => {
                                var {x, y, width, height} = event.nativeEvent.layout;
                                console.log('Person Height: ', height);
                            }}
                        />
                    </List.Section>
                    <Divider />
                    <List.Section title='Friends' style={styles.friends}>
                        <List.Item
                            title="Friend 1"
                            onPress={this._onFriend}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={require('./../../assets/icon.png')} style={styles.friendAvatar} />}
                            onLayout={(event) => {
                                var {x, y, width, height} = event.nativeEvent.layout;
                                console.log('Friend Height: ', height);
                            }}
                        />
                    </List.Section>
                </ScrollView>
                {(this.state.myprofile) ? <UserBox style={{position: 'absolute', bottom: 0}} /> : null}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    avatar: {
        width: 52,
        height: 52
    },
    friendAvatar: {
        width: 48,
        height: 48
    },
    friends: {
        color: 'black',
    }
});

export default FriendList;
