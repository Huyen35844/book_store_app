import React from 'react';
import {
  Platform,
  SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import Navigator from './src/navigator';
import FlashMessage from 'react-native-flash-message';
import store from './src/store';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator />
        <FlashMessage position="top" />
      </SafeAreaView>
    </Provider>

  );
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})