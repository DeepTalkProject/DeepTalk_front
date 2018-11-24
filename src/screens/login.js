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

class LoginScene extends Component {
    state = {
        id: '',
        error: ''
    };

    _onPress = async () => {
        console.log('Login');
        // let response = await fetch(
        //     'http://192.168.1.102:5000/api/profile/all', {
        //         method: 'GET',
        //     }
        // );
        // let responseJson = await response.json();
        // console.log(JSON.stringify(responseJson));
        // const sb = new SendBird({ 'appId': '5C7C52A0-56FD-4B47-BE73-2C84ED3E1CC1' })
        // sb.connect(id, pw, function(user, error) {
        //     if (error) {
        //         console.error('connect: ', error);
        //         this.state({ error });
        //     }
        //     else {
        //         sb.updateCurrentUserInfo(id, null, function (user, error) {
        //             if (error) {
        //                 console.error('update nickname: ', error);
        //                 this.setState({ error });
        //             }
        //             else {
        //                 console.log(user);
        //                 this.setState({
        //                     id: '',
        //                     pw: '',
        //                     error: ''
        //                 });
        //             }
        //         });
        //     }
        // });
        this.props.navigation.navigate('Main');
    }
    _onRegister = async () => {
        console.log('Sign up');
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <Image style={styles.back} source={require('./../../assets/back.jpg')} />
                <View style={styles.fil}>
                    <Text style={styles.title}>DeepTalk</Text>
                    <TextInput style={styles.id} label='Username' onChangeText={id => this.setState({id})} value={this.state.id} />
                    <Button style={styles.submit} mode='text' onPress={this._onPress}>Login</Button>
                    <View style={styles.seperator}><View style={styles.line1}></View><Text style={styles.or}>or</Text><View style={styles.line2}></View></View>
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
    submit: {
        top: screenHeight * 0.25
    },
    seperator: {
        top: screenHeight * 0.3,
        width: screenWidth,
        height: 20
    },
    line1: {
        position: 'absolute',
        backgroundColor: '#aaaaaa',
        width: screenWidth * 0.4,
        height: 1,
        top: 9,
        left: screenWidth * 0.05,
    },
    line2: {
        position: 'absolute',
        backgroundColor: '#aaaaaa',
        width: screenWidth * 0.4,
        height: 1,
        top: 9,
        right: screenWidth * 0.05
    },
    or: {
        position: 'absolute',
        textAlign: 'center',
        left: screenWidth * 0.45,
        right: screenWidth * 0.45,
        width: screenWidth * 0.1,
        color: '#aaaaaa'
    },
    join: {
        top: screenHeight * 0.35
    }
});

export default LoginScene;
