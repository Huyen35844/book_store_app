import React from 'react';
import {
  Platform,
  SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import Navigator from './src/navigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
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