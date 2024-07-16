import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomKeyboardAvoidingView from '../ui/CustomKeyboardAvoidingView'
import LayoutAuth from '../ui/LayoutAuth'
import TitleHeaderAuth from './TitleHeaderAuth'
import FormInput from './FormInput'
import FormNavigator from '../ui/FormNavigator'
import FormButton from '../ui/FormButton'
import { signUpSchema, validate } from '../utils/validator'
import client from '../api/client'
import { runAxiosAsync } from '../api/runAxiosAsync'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const {navigate} = useNavigation()

  const handleChange = (name) => (text) => {
    setUserInfo({ ...userInfo, [name]: text })
  }

  const { name, email, password, confirmPassword } = userInfo

  const handleSubmit = async () => {
    const { error, values } = await validate(signUpSchema, userInfo)
    if (error) return setError(error)

    setBusy(true)
    const res = await runAxiosAsync(
      client.post("/auth/sign-up", values)
    )

    if (!res.status) return setError(res.data)
    else {
      setBusy(false)
      setError('')
      showMessage({ message: res.data.message, type: "success" })
      navigate("SignIn")
    }

  }

  return (
    <CustomKeyboardAvoidingView>
      <LayoutAuth>
        <TitleHeaderAuth title="Sign Up" />
        <FormInput type="account" placeholder="Enter your name" value={name} onChangeText={handleChange('name')} />
        <FormInput type="email" placeholder="Enter your email" value={email} onChangeText={handleChange('email')} />
        <FormInput type="password" placeholder="Enter your password" value={password} onChangeText={handleChange('password')} />
        <FormInput type="password" placeholder="Confirm password" value={confirmPassword} onChangeText={handleChange('confirmPassword')} />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <FormButton active={!busy} title="Sign Up" onPress={handleSubmit} />
        <FormNavigator leftTitle="Sign in" onPressLeft={() => { navigate("SignIn") }} rightTitle="Forget password" onPressRight={() => { navigate("ForgetPassword") }} />
      </LayoutAuth>
    </CustomKeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red"
  }
})