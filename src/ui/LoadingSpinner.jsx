import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../utils/color'
import LottieView from 'lottie-react-native'

const LoadingSpinner = ({ visiable }) => {
  if (!visiable) return null
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lottie_files/loading.json")}
          autoPlay
          loop
          style={{ flex: 1, transform: [{ scale: 0.2 }] }}
        />
      </View>
    </Modal>
  )
}

export default LoadingSpinner
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backDrop,
  },
});