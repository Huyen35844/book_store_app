import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../component/AppHeader'
import AvatarView from '../ui/AvatarView'
import TitleProfile from '../ui/TitleProfile'
import ItemProfile from '../ui/ItemProfile'
import { useNavigation } from '@react-navigation/native'
import size from '../utils/size'
import useAuth from '../hooks/useAuth'
import color from '../utils/color'
import { runAxiosAsync } from '../api/runAxiosAsync'
import useClient from '../hooks/useClient'
import { showMessage } from 'react-native-flash-message'
import { updateAuthState } from '../store/auth'
import { useDispatch } from 'react-redux'

const Profile = () => {
  const { navigate } = useNavigation()
  const { authState, signOut } = useAuth()
  const { authClient } = useClient()
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchProfile = async () => {
    dispatch(updateAuthState({ profile: authState.profile, pending: true }))
    setRefreshing(true)
    const res = await runAxiosAsync(
      authClient.get("/auth/profile")
    )
    setRefreshing(false)
    console.log(res.data);
    if (!res) {
      dispatch(updateAuthState({ profile: authState.profile, pending: false }))
    } else {
      dispatch(updateAuthState({ profile: { ...authState.profile, ...res.data }, pending: false }))
    }
  }

  const handleVerification = async () => {
    setBusy(true)
    const res = await runAxiosAsync(
      authClient.post("/auth/generate-verification-link")
    )
    setBusy(false)
    if (!res.status) showMessage({ message: res.data.message, type: "danger" })
    else showMessage({ message: res.data.message, type: "success" })
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchProfile} />} style={styles.container}>
      {!authState.profile.verified &&
        <View style={styles.verificationContainer}>
          <Text style={styles.verificationTitle}>It looks like your account is not verified</Text>
          <Pressable onPress={handleVerification}>
            {busy ? <Text style={styles.verificationLink}>Please wait ...</Text> :
              <Text style={styles.verificationLink}>Tap here to get the link</Text>}
          </Pressable>
        </View>
      }
      <AppHeader centerTitle={"PROFILE"} right={<Text></Text>} />
      <View style={styles.userContainer}>
        <AvatarView uri={authState.profile.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{authState.profile.name}</Text>
          <Text style={styles.email}>{authState.profile.email}</Text>
        </View>
      </View>
      <TitleProfile title={"Security and Terms"} />
      <ItemProfile name={"Edit Information"} onPress={() => navigate("EditProfile")} />
      <ItemProfile name={"Reading Tips"} />
      <ItemProfile name={"Transaction History"} onPress={() => navigate("History")} />
      <ItemProfile name={"Q & A"} />
      <TitleProfile title={"Security and Terms"} />
      <ItemProfile name={"Terms and Conditions"} />
      <ItemProfile name={"Privacy Policy"} />
      <ItemProfile name={"Transaction History"} />
      <ItemProfile name={"Log Out"} onPress={() => signOut()} />
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  verificationTitle: {
    fontSize: 15,
    fontWeight: "600"
  },
  verificationLink: {
    marginTop: 5,
    fontSize: 15,
    color: "#0099FF",
    fontWeight: "600"
  },
  verificationContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: "center"
  },
  email: {
    fontSize: 15
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  infoContainer: {
    padding: 5,
    marginLeft: 20,
    justifyContent: "space-between"
  },
  userContainer: {
    marginVertical: 15,
    flexDirection: "row"
  },
  container: {
    padding: size.padding
  }
})