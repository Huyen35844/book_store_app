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
          <ReadingContent content="The app is designed to help users buy the book with the most appealing price, easy to find book by searching the name and add the book in your favorite list, add to cart list." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="How do I add a book to my favorite list?" />
          <ReadingContent content="You can add a new book by navigating to the detailed screen of the book, press the hearted icon on the right side." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="Can I review my invoice?" />
          <ReadingContent content="Yes, the app allows you to review your invoice by navigate to Profile screen. Then press transaction history, there is a list of invoices. You can know more the info by pressing to the item." />
        </View>
        <View style={styles.qaItem}>
          <ReadingTitle title="How do I contact support?" />
          <ReadingContent content="You can contact support through this email 'thuhuyen35844@gmail.com', where you can submit your queries or issues." />
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