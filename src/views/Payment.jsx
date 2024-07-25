import { ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const Payment = (props) => {
    const navigation = props.navigation;
    
    const goToHome = () => {
        navigation.navigate('Home')
    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/images/paymentBackground.jpg')}>
            <Text style={styles.text}>Congratulations</Text>
            <Text style={[styles.text, { fontSize: 21, marginBottom: 20 }]}>You have successfully placed your order!</Text>
            <TouchableOpacity onPress={goToHome} style={styles.button}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Payment

const styles = StyleSheet.create({
    text: {
        color: '#2E8B57',
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#3CB371',
        padding: 10
    }
})