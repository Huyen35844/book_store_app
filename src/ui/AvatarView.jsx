import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

const AvatarView = ({ uri, size = 70, style }) => {
    return (
        <View style={[{ width: size, height: size, borderRadius: size / 2 }, styles.container, style]}>
            {/* while is waiting for uri from api, react native informs there is no source in Image
            to handle that, I display a grey view */}
            {uri ? (
                <Image source={{ uri }} style={[styles.flex1, { width: size, height: size }]} />
            ) : (
                <View style={[styles.flex1, { width: size, height: size, backgroundColor: 'grey' }]} />
            )}
        </View>
    );
};

export default AvatarView;

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    container: {
        overflow: 'hidden',
    },
    flex1: {
        flex: 1,
    },
});
