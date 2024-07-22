import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../component/AppHeader'
import size from '../utils/size'
import { categories } from '../utils/categories'
import color from '../utils/color'
import ProductList from '../component/ProductList'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import useAuth from '../hooks/useAuth'
import useClient from '../hooks/useClient'
import CartView from '../ui/CartView'

const Favorite = () => {
  const { authState } = useAuth()
  const { authClient } = useClient()
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const res = await runAxiosAsync(
      authClient.get(`/favorite/get/${authState.profile.id}`)
    )
    setProducts(res.data.list);
  }

  useEffect(() => {
    fetchProduct()
  }, [authState.favorite])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader centerTitle={"FAVORITE"} right={<CartView />} />
      </View>
      <ProductList data={products} />
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
  selectedItem: {
    color: "white",
    backgroundColor: color.primary,
    padding: 5,
    borderRadius: 5
  },
  itemText: {
    padding: 5,
    fontSize: 16,
    color: "black"
  },
  item: {
    marginRight: 15,
  },
  header: {
    paddingHorizontal: size.padding,
    paddingTop: size.padding
  }
})