import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

const FormNavigator = ({ leftTitle, rightTitle, onPressLeft, onPressRight }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title} onPress={onPressLeft}>{leftTitle}</Text>
            <Text style={styles.title} onPress={onPressRight}>{rightTitle}</Text>
        </View>
    )
}

export default FormNavigator

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.primary,
        marginBottom: 10,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})