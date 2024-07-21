import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import color from '../utils/color'

const SearchBar = ({ value, onChangeText, onPressCart }) => {
    return (
        <View style={styles.container}>
            <TextInput value={value} onChangeText={onChangeText} style={styles.input} placeholder='Search your book' />
            <Image style={styles.iconSearch} source={require("../../assets/icons/icon_search.png")} />
            <Pressable style={styles.cartContainer} onPress={onPressCart}>
                <Image style={styles.iconCart} source={require("../../assets/icons/icon_cart_white.png")} />
            </Pressable>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary,
        flexDirection: "row"
    },
    input: {
        flex: 1,
        fontSize: 18,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 8,
        paddingLeft: 40,
    },
    cartContainer: {
        alignSelf: "center",
    },
    iconCart: {
        width: 35,
        height: 35,
        marginRight: 20
    },
    iconSearch: {
        alignSelf: "flex-start",
        position: "absolute",
        top: 27,
        left: 24,
        width: 25,
        height: 25
    }
})