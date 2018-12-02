import React, {
    Component
} from 'react';
import {
    View,
    Keyboard,
    Dimensions
} from 'react-native';
import {
    Appbar,
    TextInput,
    Provider as PaperProvider
} from 'react-native-paper';

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
        text: '#000000',
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

class ChatRoom extends Component {
    state = {
        text: '',
        height: 0
    };

    _keyboardWillShow(event) {
        console.log('Keyboard on');
        console.log(event.endCoordinates.height);
        this.setState({'height': event.endCoordinates.height - 24});
    }

    _keyboardWillHide(event) {
        console.log('Keyboard off');
        this.setState({'height': screenHeight - 24 - 56 - 64});
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => this._keyboardWillShow(event));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (event) => this._keyboardWillHide(event));
        this.setState({'height': screenHeight - 24 - 56 - 64});              // 24: Appbar margin, 56: Appbar Height, 58: Footer Height
        console.log('Main Height:', this.state.height);
        console.log('ScreenHeight:', screenHeight);
    }

    render() {
        console.log('Render');
        return (
            <PaperProvider theme={theme}>
            <View style={{borderWidth: 3, borderColor: '#00ff00'}} onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                console.log('Total:', height);
            }}>
                <Appbar.Header style={{borderWidth: 1, borderColor: '#0000ff'}} onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    console.log('Appbar:', y, height);
                }}>
                    <Appbar.Action icon="arrow-back" onPress={this._onLeft} />
                    <Appbar.Content title="CHATS" />
                    <Appbar.Action icon="list" onPress={this._onList} />
                </Appbar.Header>
                <View style={{width: screenWidth, height: this.state.height, borderWidth: 3}} onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    console.log('Main:', height);
                }}>
                </View>
                <View style={{borderWidth: 3, borderColor: '#ff0000'}} onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    console.log('Footer:', height);
                }}>
                    <TextInput
                        onChangeText={(text) => {this.setState({text})}}
                        value={this.state.text}
                    />
                </View>
            </View>
            </PaperProvider>
        );
    }
};

export default ChatRoom;
