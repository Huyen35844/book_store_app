import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SliderImage from '../component/SliderImage'
import HomeTitle from '../ui/HomeTitle'
import ProductList from '../component/ProductList'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import { useNavigation } from '@react-navigation/native'
import SearchModal from '../component/SearchModal'
import color from '../utils/color'

const Home = () => {
  const [products, setProducts] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const { navigate } = useNavigation()

  const fetchProductList = async () => {
    const res = await runAxiosAsync(
      client.get("/product/get-latest-list?limit=10&page=1")
    )
    setProducts(res.data.products)
  }
  
  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.input} onPress={() => { setVisibleModal(true) }}>
          <Text style={styles.text}>Search your book</Text>
        </Pressable>
        <Image style={styles.iconSearch} source={require("../../assets/icons/icon_search.png")} />
        <Pressable style={styles.cartContainer} onPress={() => navigate("Cart")}>
          <Image style={styles.iconCart} source={require("../../assets/icons/icon_cart_white.png")} />
        </Pressable >
      </View>

      {visibleModal && <SearchModal visiable={visibleModal} closeModal={() => setVisibleModal(false)} />}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SliderImage data={sliderHome} />
        <HomeTitle title={"Latest books"} />
        <ProductList data={products} />
      </ScrollView>
    </>
  )
}

export default Home

const sliderHome = [
  "https://down-vn.img.susercontent.com/file/vn-11134208-7qukw-lhmulmkmjagx60",
  "https://www.shutterstock.com/image-vector/book-exchange-landing-page-template-600nw-2127230852.jpg",
  "https://img.freepik.com/free-psd/online-book-store-banner-template_23-2149043261.jpg"
]

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingTop: 3,
    paddingBottom: 3,
  },
  headerContainer: {
    backgroundColor: color.primary,
    flexDirection: "row",
    paddingLeft: 20
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginVertical: 15,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    paddingLeft: 50,
  },
  cartContainer: {
    alignSelf: "center",
  },
  iconCart: {
    width: 35,
    height: 35,
    marginRight: 25
  },
  iconSearch: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 27,
    left: 35,
    width: 25,
    height: 25
  },
  container: {
    flex: 1,
    paddingBottom: 60
  }
})
