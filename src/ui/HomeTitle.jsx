import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

const HomeTitle = ({ title }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

export default HomeTitle

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        fontWeight: "600",
        fontSize: 25,
        color: color.primary
    }
})