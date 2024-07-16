import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import LayoutAuth from '../ui/LayoutAuth'
import TitleHeaderAuth from './TitleHeaderAuth'
import FormInput from './FormInput'
import FormButton from '../ui/FormButton'
import FormNavigator from '../ui/FormNavigator'
import useAuth from '../hooks/useAuth'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const {navigate} = useNavigation()


  // create a new function with the parameter name fixed, and then this function will wait to receive the parameter text when the event occurs
  const handleChange = (name) => (text) => {
    setUserInfo({ ...userInfo, [name]: text })
  }

  const { signIn } = useAuth();

  const handleSubmit = async () => {
    setBusy(true)
    const res = await signIn(userInfo)
    setBusy(false)
    if (!res.status) return setError(res.data)

    setError("")
    showMessage({ message: "Login successfully!", type: "success" })
  }

  const { email, password } = userInfo
  return (
    <CustomKeyboardAvoidingView>
      <LayoutAuth>
        <TitleHeaderAuth title="Login" />
        <FormInput type="email" placeholder="Enter your email" value={email} onChangeText={handleChange("email")} />
        <FormInput type="password" placeholder="Enter your password" value={password} onChangeText={handleChange("password")} />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <FormButton active={!busy} title="Sign In" onPress={handleSubmit} />
        <FormNavigator leftTitle="Sign up" onPressLeft={() => { navigate("SignUp") }} rightTitle="Forget password" onPressRight={() => { navigate("ForgetPassword") }} />
      </LayoutAuth>
    </CustomKeyboardAvoidingView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red"
  }
})