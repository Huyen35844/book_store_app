import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BackButton = () => {
    return (
        <View>
            <Image style={styles.backIcon} source={require('../../assets/icons/icon_back.png')} />
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backIcon: {
        width: 30,
        height: 30
    }
})