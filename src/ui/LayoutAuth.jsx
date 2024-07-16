import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const LayoutAuth = ({ children }) => {
  //At first, I set height: "35%" and it causes the error with keyboardAvodingView
  const { height: screenHeight } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Image style={[styles.image, { height: screenHeight * 0.35 }]} source={require("../../assets/images/background_top.jpg")} />
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  )
}

export default LayoutAuth

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: "white",
    marginTop: -30,
    padding: 30
  },
  image: {
    height: "35%"
  },
  container: {
    flex: 1
  }
})