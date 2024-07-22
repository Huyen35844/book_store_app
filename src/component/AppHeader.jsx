import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({ backButton, centerTitle, right }) => {
    const { goBack, canGoBack } = useNavigation()
    return (
        <View style={styles.container}>
            {/* back button */}
            {canGoBack() ? (
                <Pressable style={styles.sideContainer} onPress={goBack}>
                    {backButton}
                </Pressable>
            ) : (
                <View style={styles.sideContainer} />
            )}
            {/* center ui */}
            <View style={styles.centerContainer}>
                <Text style={styles.title}>{centerTitle}</Text>
            </View>
            {/* right ui */}
            <View style={styles.sideContainer}>
                {right}
            </View>
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    sideContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 23,
        fontWeight: "500",
        textAlign: "center"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})
