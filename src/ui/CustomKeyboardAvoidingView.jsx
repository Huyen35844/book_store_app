import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomKeyboardAvoidingView = ({children}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={50}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardAvoidingView

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})