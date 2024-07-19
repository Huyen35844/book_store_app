import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import size from '../utils/size'

const ItemProfile = ({ name, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    )
}

export default ItemProfile

const styles = StyleSheet.create({
    name: {
        fontSize: size.text,
        color: "black",
        marginVertical: 10,
        fontWeight: "500"
    }
})