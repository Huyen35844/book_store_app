import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../views/Home';
import Category from '../views/Category';
import Cart from '../views/Cart';
import Profile from '../views/Profile';


const Tab = createBottomTabNavigator()

// "require" cannot accept dynamic parameter
const IconTab = (source) => {
    return <Image source={source} style={{ width: 25, height: 25 }} />;
};


const tabBarIcon = (route, focused) => {
    switch (route.name) {
        case "Home":
            return focused ? IconTab(require('../../assets/icons/icon_home_selected.png')) : IconTab(require('../../assets/icons/icon_home.png'));
        case "Category":
            return focused ? IconTab(require('../../assets/icons/icon_category_selected.png')) : IconTab(require('../../assets/icons/icon_category.png'));
        case "Cart":
            return focused ? IconTab(require('../../assets/icons/icon_cart_selected.png')) : IconTab(require('../../assets/icons/icon_cart.png'));
        case "Profile":
            return focused ? IconTab(require('../../assets/icons/icon_person_selected.png')) : IconTab(require('../../assets/icons/icon_person.png'));
        default:
            return null;
    }
};


//route is a param of screenOptions, focused is a param of tabBarIcon, return ()
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarLabel: (route) => route.name,
    tabBarIcon: ({ focused }) => tabBarIcon(route, focused)
})


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Category' component={Category} />
            <Tab.Screen name='Cart' component={Cart} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})