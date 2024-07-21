import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import size from '../utils/size'

const AppHeader = ({ backButton, centerTitle, right }) => {
    const { goBack, canGoBack } = useNavigation()
    return (
        <View style={styles.container}>
            {/* back button */}
            {canGoBack() && <Pressable onPress={goBack}>{backButton}</Pressable>}
            {/* center ui */}
            <Text style={styles.title}>{centerTitle}</Text>
            {/* right ui */}
            {right}
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    title: {
        color: "black",
        fontSize: 23,
        fontWeight: "500"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})