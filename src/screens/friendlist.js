import React, {
    Component
} from 'react';
import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import {
    Appbar,
    List,
    Button,
    Divider,
    Surface,
    TouchableRipple,
    Title
} from 'react-native-paper';
import {SendBirdApp} from '../../config/keys';
import {API_TOKEN} from '../../config/keys';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

//import updateState from './../components/userbox.js';
//import UserBox from './../components/userbox.js';

function updateState (value, img) {
    console.log('Called update state:', this.state.exit);
    this.setState({
        'exit': value,
        'img': img
    });
}

function onFriendPressed(param) {
    console.log(param);
    this.setState({
        'exit': param.value,
        'title': param.item,
        'img': param.img,
    })
}

class UserBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exit: true,
            img: ''
        }
        updateState = updateState.bind(this);
    }


    _onExit = () => {
        this.setState({'exit': true});
    };

    render() {
        console.log('UserBox:', this.state.exit, this.state.img);
        if (this.state.exit || this.state.img === '') {
            return null;
        }
        else {
            return (
                <Surface style={styles.card}>
                    <TouchableRipple onPress={this._onExit} style={{position: 'absolute', right: 20, top: 20, width: 50, height: 50}}>
                        <Image source={require('./../../assets/exit.png')} style={{left: 10, top: 10, width: 30, height: 30}} />
                    </TouchableRipple>
                    <Title style={{position: 'absolute', left: 20, top: 20}}>{this.props.title}</Title>
                    <Image source={{uri: this.state.img}} style={styles.profileImage} />
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '60%', width: '90%', left: '5%'}} onPress={() => console.log('view profile')}>View Profile</Button>
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '70%', width: '90%', left: '5%'}} onPress={() => console.log('chat with user')}>Chat with this user</Button>
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '80%', width: '90%', left: '5%'}} onPress={() => console.log('show emoticon')}>Show Emotion Statistic</Button>
                </Surface>
            );
        }
    }
}

class FriendBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exit: true,
            title: '',
            img: '',
        }
        onFriendPressed = onFriendPressed.bind(this);
    }


    _onExit = () => {
        this.setState({'exit': true});
    };

    _makeChatRoom = () => {
        var _this = this;
        let userID = [this.state.title];
        let chatRoomName = 'Chat of ' + this.props.user + ' and ' +  this.state.title;

        SendBirdApp.GroupChannel.createChannelWithUserIds(
            userID,
            true,
            chatRoomName,
            '',                 // cannot call the file
            chatRoomName,
            function (channel, error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Navigation');
                    console.log(_this.props.navigation);
                    _this.props.navigation.navigate('Chat', {
                        'id': this.state.title
                    });
                }
            }
        );
    }

    render() {
        console.log('UserBox:', this.state.exit);
        if (this.state.exit || this.state.img === '') {
            return null;
        }
        else {
            return (
                <Surface style={styles.card}>
                    <TouchableRipple onPress={this._onExit} style={{position: 'absolute', right: 20, top: 20, width: 50, height: 50}}>
                        <Image source={require('./../../assets/exit.png')} style={{left: 10, top: 10, width: 30, height: 30}} />
                    </TouchableRipple>
                    <Title style={{position: 'absolute', left: 20, top: 20}}>{this.state.title}</Title>
                    {(this.state.img !== 'no image') ? <Image source={{uri: this.state.img}} style={styles.profileImage} /> : <Image resizeMode='contain' source={require('./../../assets/icon.png')} style={styles.profileImageBasic} />}
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '60%', width: '90%', left: '5%'}} onPress={() => console.log('view profile')}>View Profile</Button>
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '70%', width: '90%', left: '5%'}} onPress={this._makeChatRoom}>Chat with this user</Button>
                    <Button raised theme={{ colors: {primary: '#01579b'}}} style={{position: 'absolute', top: '80%', width: '90%', left: '5%'}} onPress={() => console.log('show emoticon')}>Show Emotion Statistic</Button>
                </Surface>
            );
        }
    }
}

class FriendList extends Component {
    state = {
        id: this.props.id,
        navigation: this.props.navigation,
        pimage: '',
        myprofile: false,
        switcher: false,
        clickedOther: false,
        friends: []
    };

    _onMyProfile = () => {
        this._updateChild(false);
        // this.setState({'switcher': !this.state.swicher});
    }

    _updateChild = (value) => {
        updateState(value, this.state.pimage);
    }

    _updateFriend = (value) => {
        updateFriendBoxState(value);
    }

    _onFriend = (event) => {
        console.log('Target:', event.target);
        console.log('Elem:', ReactNativeComponentTree.getInstanceFromNode(event.target));
        // this._updateFriend(false);
    }

    _setImage = (path) => {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.state.pimage = path;
        });
    }

    componentDidMount = async () => {
        var info = await fetch('https://api.sendbird.com/v3/users/' + this.state.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': API_TOKEN,
            },
        });
        var user = await info.json();
        this.setState({'pimage': user.profile_url});

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
                            onPress={onFriendPressed.bind(this, {'item': friendsJson.users[i].user_id, 'value': false, 'img': friendsJson.users[i].profile_url})}
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
                            onPress={onFriendPressed.bind(this, {'item': friendsJson.users[i].user_id, 'value': false, 'img': 'no image'})}
                            style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                            left={() => <Image source={require('./../../assets/icon.png')} style={styles.friendAvatar} />}
                        />
                    );
                }
            }
        }

        this.setState({'friends': friends});
    }

    render () {
        console.log('Called Render');
        console.log('Switcher:', this.state.switcher);
        if (this.state.pimage === '' || this.state.friends === []) {
            return (<View></View>);
        }
        else {
            console.log('PROPERTY:', this.props);
            return (
                <View style={{height: '100%'}}>
                    <Appbar.Header>
                        <Appbar.Content title="FRIENDS" />
                        <Appbar.Action icon="search" onPress={this._onSearch} />
                        <Appbar.Action icon="person-add" onPress={this._onAdd} />
                        <Appbar.Action icon="settings" onPress={this._onSetting} />
                    </Appbar.Header>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <List.Section title='My Profile' style={styles.friends}>
                                <List.Item
                                    title={this.props.id}
                                    onPress={this._onMyProfile}
                                    style={{left: screenWidth * 0.05, width: screenWidth * 0.9}}
                                    left={() => <Image source={{uri: this.state.pimage}} style={styles.avatar} />}
                                    onLayout={(event) => {
                                        var {x, y, width, height} = event.nativeEvent.layout;
                                    }}
                                />
                            </List.Section>
                            <Divider />
                            <List.Section title='Friends' style={styles.friends}>
                                {this.state.friends}
                            </List.Section>
                        </ScrollView>
                        <UserBox navigation={this.state.navigation} title={this.state.id} exit={this.state.switcher} />
                        <FriendBox navigation={this.state.navigation} user={this.state.id} exit={this.state.switcher} />
                    </View>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 5,
        borderColor: '#01579b',
        borderWidth: 1,
    },
    friendAvatar: {
        width: 48,
        height: 48,
        borderRadius: 5,
        borderColor: '#01579b',
        borderWidth: 1,
    },
    friends: {
        color: 'black',
    },
    card: {
        position: 'absolute',
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        flex: 1,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: '35%',
        aspectRatio: 1,
        position: 'absolute',
        top: '20%',
        borderWidth: 5,
        borderColor: '#01579b',
        borderRadius: 5000
    },
    profileImageBasic: {
        height: '35%',
        aspectRatio: 1,
        position: 'absolute',
        top: '20%',
        borderRadius: 5000
    }
});

export default FriendList;
