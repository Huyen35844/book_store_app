import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../utils/color'

const FormButton = ({ title, onPress, active }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, active ? styles.buttonActive : styles.buttonDeActive]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default FormButton

const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: Color.white
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        borderRadius: 32,
        height: 56,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonActive: {
        backgroundColor: Color.primary
    },
    buttonDeActive: {
        backgroundColor: Color.deActive
    }
})