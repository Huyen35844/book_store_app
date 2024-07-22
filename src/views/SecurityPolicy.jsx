import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReadingTitle from '../ui/ReadingTitle'
import ReadingContent from '../ui/ReadingContent'
import size from '../utils/size'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'

const SecurityPolicy = () => {
  return (
    <View style={styles.container}>
      <AppHeader backButton={<BackButton />} centerTitle={"Q & A"} />
      <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
        <ReadingTitle title="Security Policy" />
        <ReadingTitle title="1. Data Protection" />
        <ReadingContent content="We encrypt and securely store customer data." />
        <ReadingContent content="SSL technology ensures secure data transfer." />
        <ReadingTitle title="2. Access Control" />
        <ReadingContent content="Only authorized personnel can access customer data." />
        <ReadingContent content="Multi-factor authentication is in place." />
        <ReadingTitle title="3. Security Audits" />
        <ReadingContent content="Regular audits and updates to prevent vulnerabilities." />
        <ReadingTitle title="4. User Privacy" />
        <ReadingContent content="No selling or sharing of personal information." />
        <ReadingContent content="Privacy policy details data handling practices." />
        <ReadingTitle title="5. Incident Response" />
        <ReadingContent content="Immediate action and user notification in case of a breach." />
      </ScrollView>
    </View>
  )
}

export default SecurityPolicy

const styles = StyleSheet.create({
  container: {
    padding: size.padding,
  }
})