import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

const SearchBar = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput value={value} onChangeText={onChangeText} style={styles.input} placeholder='Search your book' />
            <Image style={styles.icon} source={require("../../assets/icons/icon_search.png")} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary
    },
    input: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
    },
    icon: {
        alignSelf: "flex-end",
        position: "absolute",
        top: 25,
        right: 22,
        width: 30,
        height: 30
    }
})