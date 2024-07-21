import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CartView = () => {
    const { navigate } = useNavigation()
    return (
        <Pressable onPress={() => { navigate("Cart") }}>
            <Image style={styles.icon} source={require("../../assets/icons/icon_cart_black.png")} />
        </Pressable>
    )
}

export default CartView

const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35
    }
})