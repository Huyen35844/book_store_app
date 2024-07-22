import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReadingTitle = ({ content }) => {
    return (
        <Text style={styles.text}>{content}</Text>
    )
}

export default ReadingTitle

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 18,
    }
})