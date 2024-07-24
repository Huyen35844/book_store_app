import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../component/AppHeader'
import size from '../utils/size'
import { categories } from '../utils/categories'
import color from '../utils/color'
import ProductList from '../component/ProductList'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import CartView from '../ui/CartView'

const Category = () => {
  const [selectedItem, setSelectedItem] = useState(categories[0])
  const [products, setProducts] = useState([])

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => setSelectedItem(item)}>
      <Text style={[styles.itemText, selectedItem == item ? styles.selectedItem : null]}>{item}</Text>
    </Pressable>
  )
  const fetchProduct = async () => {
    const res = await runAxiosAsync(
      client.get(`/product/get-product-by-category/${selectedItem}`)
    )
    setProducts(res.data.products);
  }

  useEffect(() => {
    fetchProduct()
  }, [selectedItem])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader centerTitle={"CATETORY"} right={<CartView />} />
        <FlatList showsHorizontalScrollIndicator={false} horizontal data={categories} renderItem={renderItem} />
      </View>
      <ProductList data={products} />
    </View>
  )
}

export default Category

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
    marginTop: 10,
    marginRight: 15,
  },
  header: {
    padding: size.padding
  }
})