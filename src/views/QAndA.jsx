import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import size from '../utils/size'
import ReadingTitle from '../ui/ReadingTitle'
import ReadingContent from '../ui/ReadingContent'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'

const QAndA = () => {
  return (
    <View style={styles.container}>
      <AppHeader backButton={<BackButton />} centerTitle={"Q & A"} />
      <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.qaItem}>
          <ReadingTitle title="What is the purpose of this app?" />
          <ReadingContent content="The app is designed to help users manage and track their reading activities, including finding books, tracking progress, and more." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="How do I add a new book to my reading list?" />
          <ReadingContent content="You can add a new book by navigating to the 'Add Book' section, filling out the details, and saving it to your list." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="Can I track my reading progress?" />
          <ReadingContent content="Yes, the app allows you to track your reading progress, set goals, and view your reading history." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="How do I contact support?" />
          <ReadingContent content="You can contact support through the 'Contact Us' section in the app, where you can submit your queries or issues." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="Is my data secure?" />
          <ReadingContent content="Yes, we take data security seriously and ensure that your personal information is protected with encryption and secure servers." />
        </View>
      </ScrollView>
    </View>
  )
}

export default QAndA

const styles = StyleSheet.create({
  qaItem: {
    marginBottom: 20,
  },
  container: {
    padding: size.padding,
  }
})