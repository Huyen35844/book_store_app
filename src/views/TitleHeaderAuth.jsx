import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../utils/color'

const TitleHeaderAuth = ({title}) => {
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default TitleHeaderAuth

const styles = StyleSheet.create({
    text: {
        alignSelf: "center",
        fontSize: 34,
        fontWeight: "bold",
        color: Color.primary,
        marginBottom: 15
    }
})