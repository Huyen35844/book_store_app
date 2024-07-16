import { Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import color from '../utils/color'

const FormInput = (props) => {
    const [isFocused, setIsFocused] = useState(false)
    const [passwordPath, setPasswordPath] = useState(require("../../assets/icons/icon_hidden_password.png"))
    const [securePassword, setSecurePassword] = useState(true)

    const iconSources = {
        password: require("../../assets/icons/icon_password.png"),
        email: require("../../assets/icons/icon_email.png"),
        account: require("../../assets/icons/icon_account.png"),
    };

    const togglePasswordVisibility = () => {
        setSecurePassword(!securePassword)
        if (securePassword) {
            setPasswordPath(require("../../assets/icons/icon_eye.png"))
        } else {
            setPasswordPath(require("../../assets/icons/icon_hidden_password.png"))
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={[styles.textInput, isFocused ? styles.activeBorder : styles.deActiveBorder, props.type ? { paddingLeft: 57 } : { paddingLeft: 20 }]}
                onFocus={() => { setIsFocused(true) }}
                onBlur={() => { setIsFocused(false) }}
                placeholderTextColor={color.deActive}
                secureTextEntry={props.type == "password" ? securePassword : false}
                {...props}
            />

            {props.type && <Image style={styles.icon} source={iconSources[props.type]} />}

            {
                props.type == 'password' &&
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image style={styles.iconEye} source={passwordPath} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    iconEye: {
        alignSelf: "flex-end",
        position: "absolute",
        width: 30,
        height: 20,
        top: -37,
        right: 20,
    },
    container: {
        marginVertical: 10
    },
    icon: {
        position: "absolute",
        top: 12,
        left: 15,
        width: 30,
        height: 30
    },
    textInput: {
        fontSize: 16,
        width: '100%',
        // height: 58,
        color: color.black,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: color.deActive,
    },
    activeBorder: {
        borderColor: color.primary
    },
    deActiveBorder: {
        borderColor: color.deActive
    }
})