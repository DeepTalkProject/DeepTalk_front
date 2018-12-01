import React, {
    Component
} from 'react';
import {
    Provider as PaperProvider
} from 'react-native-paper';

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
    static navigationOptions = {
        title: 'Chat'
    }
    // Basic methods
    state = {
        index: 0
    };


    render() {
        return (
            <PaperProvider theme={theme}>
                <Appbar.Header>
                    <Appbar.Content title="CHATS" />
                    <Appbar.Action icon="search" onPress={this._onSearch} />
                    <Appbar.Action icon="add-circle-outline" onPress={this._onAdd} />
                    <Appbar.Action icon="settings" onPress={this._onSetting} />
                </Appbar.Header>
                <View>
                </View>
            </PaperProvider>
        );
    }
};

export default ChatRoom;
