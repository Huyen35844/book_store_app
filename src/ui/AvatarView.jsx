import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

const iconContainerFactor = 0.7;
const iconSizeFactor = 0.8;
const AvatarView = ({ uri, size = 70, style }) => {
    const iconContainerSize = size * iconContainerFactor;
    const iconSize = size * iconSizeFactor;
    return (
        <View style={[{ width: size, height: size, borderRadius: size / 2 }, styles.container, !uri && styles.profileIcon, style]}>
            <Image source={{ uri }} style={[styles.flex1, { width: size, height: size }]} />
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
    profileIcon: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1: {
        flex: 1,
    },
});
