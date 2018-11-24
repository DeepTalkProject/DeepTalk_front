import React, {
    Component
} from 'react';
import {
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Card,
    Title,
    Button,
    Paragraph
} from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class UserBox extends Component {
    // EventHandlers on the top bar
    _onProfile = function () {
        console.log('profile');
    }

    _onChat = function () {
        console.log('chat');
    }

    render() {
        return (
            <Card style={{height: 250}}>
                <Card.Content>
                    <Title>Selected Profile</Title>
                    <Image style={{top: 20, width: 64, height: 64}} source={require('./../../assets/icon.png')} />
                    <Text style={{top: 20, fontSize: 20}}>Kim DongJae</Text>
                    <Text style={{top: 20, fontSize: 15}}>Lorem ipsum dolor sit amet</Text>
                </Card.Content>
                <Card.Actions>
                    <Button style={{top: 20}} onPress={this._onProfile} raised theme={{ colors: {primary: '#01579b'}}}>Show Profile</Button>
                    <Button style={{top: 20}} onPress={this._onChat} raised theme={{ colors: {primary: '#01579b'}}}>Chat to user</Button>
                </Card.Actions>
            </Card>
        );
    }
}

var styles = StyleSheet.create({
    action: {
        color: '#000000'
    }
});

export default UserBox;
