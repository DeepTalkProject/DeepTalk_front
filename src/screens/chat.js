import React, {Component} from 'react';
import {
    View,
    Keyboard,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Appbar,
    Button,
    TextInput,
    IconButton,
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
        height: 0,
        id: '',
        channel: null,
        messages: []
    };

    _onEmoji = () => {

    }

    _onSend = () => {
        // Text only, for now
        var _this = this;
        this.state.channel.sendUserMessage(_this.state.text, null, null, function (message, error) {
            console.log('Sending Message: ', _this.state.text);
        });
    }

    _keyboardWillShow(event) {
        console.log('Keyboard on');
        console.log(event.endCoordinates.height);
        this.setState({
            'height': event.endCoordinates.height - 24
        });
    }

    _keyboardWillHide(event) {
        console.log('Keyboard off');
        this.setState({
            'height': screenHeight - 24 - 56 - 64
        });
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => this._keyboardWillShow(event));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (event) => this._keyboardWillHide(event));
        this.setState({
            'height': screenHeight - 24 - 56 - 64
        }); // 24: Appbar margin, 56: Appbar Height, 64: Footer Height
        console.log('Main Height:', this.state.height);
        console.log('ScreenHeight:', screenHeight);
        console.log('ID:', this.props.navigation.state.params.id);
        console.log('Channel:', this.props.navigation.state.params.channel);
        this.state.id = this.props.navigation.state.params.id;
        this.state.channel = this.props.navigation.state.params.channel;

        var previousQuery = this.state.channel.createPreviousMessageListQuery();

        previousQuery.reverse = false;
        previousQuery.load(function (message, error) {
            if (error) {
                console.log(error);
            }
            else {
                for (var index = 0; index < message.length; ++index) {
                    console.log(index, ':', message[index]);
                }
            }
        });
    }

    render() {
        console.log('Render');
        return (<PaperProvider theme={theme}>
            <View style={{
                }} onLayout={(event) => {
                    var {
                        x,
                        y,
                        width,
                        height
                    } = event.nativeEvent.layout;
                    console.log('Total:', height);
                }}>
                <Appbar.Header onLayout={(event) => {
                        var {
                            x,
                            y,
                            width,
                            height
                        } = event.nativeEvent.layout;
                        console.log('Appbar:', y, height);
                    }}>
                    <Appbar.Action icon="arrow-back" onPress={this._onLeft}/>
                    <Appbar.Content title="CHATS"/>
                    <Appbar.Action icon="list" onPress={this._onList}/>
                </Appbar.Header>
                <ScrollView style={{                                      // MAIN
                        width: screenWidth,
                        height: this.state.height,
                    }} onLayout={(event) => {
                        var {
                            x,
                            y,
                            width,
                            height
                        } = event.nativeEvent.layout;
                        console.log('Main:', height);
                    }}>
                </ScrollView>
                <View style={{width: screenWidth, height: 2, backgroundColor: '#01579b'}}></View>
                <View style={{                                      // Footer
                        height: 64,
                        backgroundColor: '#e1f5fe'
                    }} onLayout={(event) => {
                        var {
                            x,
                            y,
                            width,
                            height
                        } = event.nativeEvent.layout;
                        console.log('Footer:', height);
                    }}>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({text})
                        }}
                        value={this.state.text}
                        style={{width: screenWidth  - 88, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#01579b', bottom: 0}}
                    />
                    <IconButton
                        style={{
                            position: 'absolute',
                            right: 40,
                            height: 32,
                            width: 32
                        }}
                        color='#01579b'
                        icon="face"
                        size={32}
                        onPress={() => console.log('send')}
                    />
                    <IconButton
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 32,
                            width: 32
                        }}
                        color='#01579b'
                        icon="send"
                        size={32}
                        onPress={this._onSend}
                    />
                </View>
            </View>
        </PaperProvider>);
    }
};

export default ChatRoom;
