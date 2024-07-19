import { Button, Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'
import size from '../utils/size'
import AvatarView from '../ui/AvatarView'
import FormInput from '../ui/FormInput'
import FormButton from '../ui/FormButton'
import useAuth from '../hooks/useAuth'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import useClient from '../hooks/useClient'
import { useDispatch } from 'react-redux'
import { updateAuthState } from '../store/auth'
import { showMessage } from 'react-native-flash-message'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import { updateProfileSchema, validate } from '../utils/validator'

const EditProfile = () => {
    const { authState } = useAuth()
    const { authClient } = useClient()
    const [busy, setBusy] = useState(false)
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({
        email: authState.profile.email,
        name: authState.profile.name,
        phoneNumber: authState.profile.phoneNumber,
        address: authState.profile.address,
        avatar: authState.profile.avatar
    })

    const handleChange = (name) => (text) => {
        setUserInfo({ ...userInfo, [name]: text })
    }



    const handleOnImageSelection = async () => {
        const options = {
            mediaType: 'photo',
            quality: 0.3,
            selectionLimit: 1, //only allow 1 image
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.assets) {
                const imageUri = response.assets.map(({ uri }) => uri)
                setUserInfo({ ...userInfo, avatar: imageUri.toString() })
            }
        });
    }


    const handleSubmit = async () => {
        const { error } = validate(updateProfileSchema)
        if (error) return showMessage({ message: error, type: "danger" })


        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);

        //Keep this in mind, OMG it took me days to fix
        formData.append('avatar', {
            uri: userInfo.avatar,
            type: 'image/jpeg',
            name: 'avatar.jpg',
        });

        dispatch(updateAuthState({ profile: authState.profile, pending: true }))
        setBusy(true)
        const res = await runAxiosAsync(
            authClient.post("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        )
        setBusy(false)

        if (res.status) {
            dispatch(updateAuthState({ profile: res.data.profile, pending: false }))
            showMessage({ message: "Updated your profile successfully!", type: "success" })
        } else {
            dispatch(updateAuthState({ profile: authState.profile, pending: false }))
            showMessage({ message: res.data, type: "danger" })
        }

    }
    const { email, name, phoneNumber, address, avatar } = userInfo
    return (
        <CustomKeyboardAvoidingView >
            <View style={styles.container}>
                <AppHeader backButton={<BackButton />} centerTitle={"EDIT PROFILE"} right={<Text></Text>} />
                <View>
                    <AvatarView uri={avatar} onChangeText={handleChange("avatar")} size={100} style={{ alignSelf: "center", marginTop: 30 }} />
                    <Pressable onPress={handleOnImageSelection}>
                        <Image style={styles.editIcon} source={require('../../assets/icons/icon_edit_pen.png')} />
                    </Pressable>
                </View>
                <Text style={styles.note}>Your information will be saved for the next purchase, click on the details to edit.</Text>
                <FormInput value={name} placeholder={"Name"} onChangeText={handleChange("name")} />
                <FormInput editable={false} value={email} placeholder={"Email"} onChangeText={handleChange("email")} />
                <FormInput value={address} placeholder={"Address"} onChangeText={handleChange("address")} />
                <FormInput value={phoneNumber} placeholder={"Phone number"} onChangeText={handleChange("phoneNumber")} />
                <FormButton active={!busy} onPress={handleSubmit} title={"SAVE PROFILE"} />
            </View>
        </CustomKeyboardAvoidingView>

    )
}

export default EditProfile

const styles = StyleSheet.create({
    editIcon: {
        width: 35,
        height: 35,
        top: -10,
        marginLeft: Dimensions.get("screen").width * 0.52
    },
    note: {
        marginVertical: 30,
        textAlign: "center",
        fontSize: size.text
    },
    container: {
        padding: size.padding
    }
})