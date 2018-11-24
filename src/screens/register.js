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

class RegisterScene extends Component {
    state = {
        id: '',
        email: '',
        pw1: '',
        pw2: '',
        error: ''
    };

    _onRegister = async () => {
        console.log('Sign up');
        // let response = await fetch('http://192.168.1.102:5000/api/users/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         'user_id': this.state.id,
        //     }),
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        // let responseJson = await response.json();
        // console.log(JSON.stringify(responseJson));
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <Image style={styles.back} source={require('./../../assets/back.jpg')} />
                <View style={styles.fil}>
                    <Text style={styles.title}>DeepTalk</Text>
                    <TextInput style={styles.id} label='Username' onChangeText={id => this.setState({id})} value={this.state.id} />
                    <TextInput style={styles.email} label='e-mail' onChangeText={email => this.setState({email})} value={this.state.email} />
                    <TextInput style={styles.pw1} label='Password' onChangeText={pw1 => this.setState({pw1})} value={this.state.pw1} />
                    <TextInput style={styles.pw2} label='Confirm Password' onChangeText={pw2 => this.setState({pw2})} value={this.state.pw2} />
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
    join: {
        top: screenHeight * 0.35
    }
});
export default RegisterScene;
