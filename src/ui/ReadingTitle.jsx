import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReadingTitle = ({ title }) => {
    return (
        <Text style={styles.text}>{title}</Text>
    )
}

export default ReadingTitle

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontWeight: "700",
        fontSize: 20,
    }
})