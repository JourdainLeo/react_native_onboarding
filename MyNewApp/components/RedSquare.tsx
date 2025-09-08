import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RedSquare = () => (
    <View style={styles.square}>
        <Text style={styles.text}>hello</Text>
    </View>
);

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RedSquare;