import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReadingTitle from '../ui/ReadingTitle'
import ReadingContent from '../ui/ReadingContent'
import size from '../utils/size'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'

const TermsAndConditions = () => {
    return (
        <View style={styles.container} >
            <AppHeader backButton={<BackButton />} centerTitle={"Q & A"} />
            <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
                <ReadingTitle title="Terms and Conditions" />
                <ReadingTitle title="1. Accounts" />
                <ReadingContent content="Create an account with accurate information." />
                <ReadingContent content="Keep your account information confidential." />
                <ReadingTitle title="2. Purchases" />
                <ReadingContent content="Subject to availability and acceptance." />
                <ReadingContent content="Prices may change without notice." />
                <ReadingTitle title="3. Payment" />
                <ReadingContent content="Use available payment methods securely." />
                <ReadingContent content="Payment information is not stored." />
                <ReadingTitle title="4. Shipping" />
                <ReadingContent content="Efforts to deliver on time; delays may occur." />
                <ReadingContent content="Provide accurate shipping information." />
                <ReadingTitle title="5. Returns" />
                <ReadingContent content="Return within [number] days for a full refund if in original condition." />
                <ReadingContent content="Contact customer service to initiate a return." />
                <ReadingTitle title="6. Conduct" />
                <ReadingContent content="No unlawful or harmful use of the app." />
                <ReadingContent content="No offensive or infringing content." />
                <ReadingTitle title="7. Intellectual Property" />
                <ReadingContent content="Content is owned by [App Name] or licensors." />
                <ReadingContent content="No unauthorized use or distribution." />
                <ReadingTitle title="8. Liability" />
                <ReadingContent content="[App Name] is not liable for any damages from app use." />
                <ReadingContent content="No warranty of uninterrupted or error-free service." />
                <ReadingTitle title="9. Changes" />
                <ReadingContent content="Terms can be modified anytime; changes effective immediately." />
                <ReadingContent content="Continued use signifies acceptance of changes." />
                <ReadingTitle title="10. Governing Law" />
                <ReadingContent content="Governed by the laws of [Country/State]." />
                <ReadingContent content="Disputes resolved in [Country/State] courts." />
                <ReadingTitle title="11. Contact" />
                <ReadingContent content="For questions, contact us at [email/contact information]." />
            </ScrollView>
        </View >

    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: size.padding,
    }
})