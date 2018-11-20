import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class DeepTalk extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text>header</Text>
                </View>
                <View style={styles.main}>
                    <Text>main</Text>
                </View>
                <View style={styles.footer}>
                    <Text>footer</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    wrapper: {

    },
    header: {

    },
    main: {

    },
    footer: {

    }
});

export default DeepTalk;
