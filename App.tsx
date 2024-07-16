import React from 'react';
import {
  Platform,
  SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import Navigator from './src/navigator';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})