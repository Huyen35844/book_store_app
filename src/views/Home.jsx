import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../ui/SearchBar'
import SliderImage from '../component/SliderImage'
import HomeTitle from '../ui/HomeTitle'
import ProductList from '../component/ProductList'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'

const Home = () => {
  const images = [
    "https://down-vn.img.susercontent.com/file/vn-11134208-7qukw-lhmulmkmjagx60",
    "https://www.shutterstock.com/image-vector/book-exchange-landing-page-template-600nw-2127230852.jpg",
    "https://img.freepik.com/free-psd/online-book-store-banner-template_23-2149043261.jpg"
  ]

  const [products, setProducts] = useState([])

  const fetchProductList = async () => {
    const res = await runAxiosAsync(
      client.get("/product/get-latest-list?limit=4&page=1")
    )
    setProducts(res.data.products)
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SliderImage data={images} />
        <HomeTitle title={"Latest books"} />
        <ProductList data={products} />
      </ScrollView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60
  }
})
