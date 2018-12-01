import React, {
    Component
} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Appbar,
    BottomNavigation,
    Button,
    Text,
    TextInput,
    Provider as PaperProvider
} from 'react-native-paper';
import SendBird from 'sendbird';
import SendBirdApp from '../../config/keys';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#ffffff',
        accent: '#01579b',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#ffffff',
        disabled: '#aaaaaa',
        placeholder: '#cccccc',
        backdrop: '#222222'
    },
    fonts: {
        regular: 'sans-serif',
        medium: 'sans-serif-medium',
        light: 'sans-serif-light',
        thin: 'sans-serif-thin'
    }
};

class RegisterScene extends Component {
    state = {
        id: '',
        nickname: '',
        pw1: '',
        pw2: '',
        err: ''
    };

    _onRegister = async () => {
        console.log('Sign up');

        if (this.state.id === '') {
            this.setState({'err': 'You should enter your ID.'});
            return;
        }
        let exist = await fetch('http://10.64.146.24:5000/api/users/getId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.id
            }),
        });
        let res = await exist.json();
        res = JSON.parse(res);
        if (res.error !== true) {
            console.log('FOUND');
            this.setState({'err': 'User ID already exists.'});
        }
        else if (this.state.id.length < 5 || this.state.id.length > 20) {
            this.setState({'err': 'Your ID should have length between 5 and 20.'});
        }
        else if (this.state.pw1 !== this.state.pw2) {
            this.setState({'err': 'The password doesn\'t match.'});
        }
        else if (this.state.pw1.length < 5 || this.state.pw1.length > 20) {
            this.setState({'err': 'Your Password should have length between 5 and 20.'});
        }
        else {
            this.setState({'err': 'Fine!'});
            if (this.state.nickname === '') {
                this.setState({'nickname': this.state.id});
            }

            let encrypt = hash.read(this.state.id + '\n---\n' + this.state.pw1);

            // Register Request to server
            let register = await fetch('http://10.64.146.24:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: encrypt
                }),
            });
            let res = await JSON.parse(register.json());
            if (res.error === true) {
                console.log('error on register');
            }
            else {
                // Access Tokens are saved in the server.
                SendBirdApp.connect(this.state.id, auth, function (user, error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        this.props.navigation.navigate('Main');
                    }
                });
            }
        }
        // let response = await fetch('https://api.sendbird.com/v3/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Api-Token': 'eeae1b577f8d08fe78cd8f3636cc66576794ce0c',
        //     },
        //     body: JSON.stringify({
        //         user_id: this.state.id,
        //         nickname: this.state.nickname,
        //         profile_url: '',
        //         issue_access_token: true,
        //     }),
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        // let responseJson = await response.json();
        // console.log(JSON.stringify(responseJson));
        // this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <Image style={styles.back} source={require('./../../assets/back.jpg')} />
                <View style={styles.fil}>
                    <Text style={styles.title}>DeepTalk</Text>
                    <TextInput style={styles.id} label='User ID' onChangeText={id => this.setState({id})} value={this.state.id} />
                    <TextInput style={styles.email} label='Nickname' onChangeText={nickname => this.setState({nickname})} value={this.state.nickname} />
                    <TextInput style={styles.pw1} label='Password' onChangeText={pw1 => this.setState({pw1})} value={this.state.pw1} secureTextEntry={true} />
                    <TextInput style={styles.pw2} label='Confirm Password' onChangeText={pw2 => this.setState({pw2})} value={this.state.pw2} secureTextEntry={true} />
                    <TextInput style={styles.err} error={true} value={this.state.err} underlineColor='rgba(0, 0, 0, 0)' raised theme={{ colors: {text: '#ff0000'}}} />
                    <Button style={styles.join} mode='text' onPress={this._onRegister}>Sign up</Button>
                </View>
            </PaperProvider>
        );
    }
}

var styles = StyleSheet.create({
    back: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    fil: {
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        backgroundColor: 'rgba(1, 87, 155, 0.9)'
    },
    title: {
        width: screenWidth,
        top: screenHeight * 0.15,
        textAlign: 'center',
        fontSize: 30
    },
    id: {
        top: screenHeight * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white'
    },
    email: {
        top: screenHeight * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white'
    },
    pw1: {
        top: screenHeight * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white'
    },
    pw2: {
        top: screenHeight * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white'
    },
    err: {
        top: screenHeight * 0.2,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    join: {
        top: screenHeight * 0.35
    }
});
export default RegisterScene;
