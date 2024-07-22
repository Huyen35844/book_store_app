import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../component/AppHeader'
import BackButton from '../ui/BackButton'
import size from '../utils/size'
import { runAxiosAsync } from '../api/runAxiosAsync'
import useClient from '../hooks/useClient'
import useAuth from '../hooks/useAuth'
import { showMessage } from 'react-native-flash-message'
import color from '../utils/color'
import FormButton from '../ui/FormButton'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
  const { authClient } = useClient()
  const { authState } = useAuth()
  const [carts, setCarts] = useState([])
  const [total, setTotal] = useState()
  const { navigate } = useNavigation()

  const handleBuyNow = async () => {
    const isSelected = carts.filter((c) => c.selected)
    const productsInvoice = isSelected.map((i) => ({ productId: i.productId, amount: i.amount }))

    if (isSelected.length > 0) {
      const res = await runAxiosAsync(
        authClient.post("/invoice/add", {
          owner: authState.profile.id,
          products: productsInvoice,
          total
        })
      )
      //After successful payment, remove these products from the cart table
      if (res.status) {
        for (let i = 0; i < isSelected.length; i++) {
          await runAxiosAsync(
            authClient.post("/cart/delete", { id: isSelected[i].id })
          )
        }
      }
      navigate("Payment")
    } else {
      showMessage({ message: "You haven't choose the book yet!", type: "danger" })
    }
  }

  const caculateTotal = () => {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].price * carts[i].amount
      }
    }
    setTotal(total)
  }

  const handlePressCheck = (item) => {
    const updatedCarts = carts.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, selected: !cartItem.selected }
        : cartItem
    );
    setCarts(updatedCarts);
  }

  const handleDelete = async (item) => {
    const res = await runAxiosAsync(
      authClient.post("/cart/delete", { id: item.id })
    )
    if (res.status) showMessage({ message: res.data.message, type: "success" })
    fetchCart()
  }

  const updateAmount = async (item) => {
    await runAxiosAsync(
      authClient.post("/cart/update", { amount: item.amount, cartId: item.id })
    )
    fetchCart()
  }

  const handleMinus = (item) => {
    if (item.amount <= 1) {
      handleDelete(item)
    } else {
      item.amount -= 1
      updateAmount(item)
    }
  }

  const handlePlus = (item) => {
    if (item.amount >= item.quantity) {
      showMessage({ message: "The book is out of stock, you can't buy more!", type: "danger" })
    } else {
      item.amount += 1
      updateAmount(item)
    }
  }

  const fetchCart = async () => {
    const res = await runAxiosAsync(authClient.get(`/cart/get-cart-by-user/${authState.profile.id}`));
    const data = res.data.list.map((item) => {
      return {
        ...item,
        selected: carts.some(cartItem => cartItem.id === item.id && cartItem.selected) || false
      };
    });
    setCarts(data);
  };

  //Update cart is added from Detail screen
  useEffect(() => {
    fetchCart()
  }, [authState.cart])

  //Total purpose
  useEffect(() => {
    caculateTotal()
  }, [carts])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress={() => handlePressCheck(item)}>
        {item.selected ?
          <Image source={require("../../assets/icons/icon_checked.png")} /> :
          <Image source={require("../../assets/icons/icon_uncheck.png")} />
        }
      </Pressable>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
        <Text style={[styles.text, { color: color.primary }]}>$ {item.price}</Text>
        <View style={styles.selectedContainer}>
          <Pressable onPress={() => handleMinus(item)}>
            <Image source={require("../../assets/icons/icon_minus.png")} />
          </Pressable>
          <Text style={styles.amount}>{item.amount}</Text>
          <Pressable onPress={() => handlePlus(item)}>
            <Image source={require("../../assets/icons/icon_plus.png")} />
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.deleteContainer} onPress={() => handleDelete(item)}>
        <Text style={[styles.text, { flex: 1, textAlign: "right", textDecorationLine: "underline" }]}>Xóa</Text>
      </Pressable>
    </View>
  )


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <AppHeader backButton={<BackButton />} centerTitle={'CART'} right={<Image style={styles.deleteIcon} source={require('../../assets/icons/icon_delete.png')} />} /> */}
        <AppHeader backButton={<BackButton />} centerTitle={'CART'} right={<Text></Text>} />
      </View>

      <FlatList data={carts} renderItem={renderItem} />

      <View style={styles.footerContainer}>
        <View style={styles.infoPay}>
          <Text style={styles.text}>Total</Text>
          <Text style={[styles.text, { fontSize: 25, color: "red" }]}>$ {total}</Text>
        </View>
        <FormButton active title={"BUY NOW"} onPress={() => handleBuyNow()} />
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  deleteContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  text: {
    maxWidth: 200,
    fontSize: 17,
    fontWeight: "600",
    color: "black"
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  amount: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "black"
  },
  square: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    fontWeight: "500",
    color: "black",
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 5
  },
  image: {
    marginHorizontal: 20,
    borderRadius: 5,
    width: 80,
    height: 80
  },
  item: {
    padding: 5,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  infoPay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    width: 30,
    height: 30
  },
  container: {
    flex: 1,
    padding: size.padding,
    justifyContent: "space-between",
  }
})