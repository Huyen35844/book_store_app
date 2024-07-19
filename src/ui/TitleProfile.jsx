import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

const TitleProfile = ({ title }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

export default TitleProfile

const styles = StyleSheet.create({
    title: {
        marginVertical: 20,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: color.deActive,
        fontSize: 20,
        color: color.deActive,
        fontWeight: "bold"
    }
})