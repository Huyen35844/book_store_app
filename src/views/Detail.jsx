import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../component/AppHeader'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import { showMessage } from 'react-native-flash-message'
import BackButton from '../ui/BackButton'
import SliderImage from '../component/SliderImage'
import color from '../utils/color'
import FormButton from '../ui/FormButton'
import useClient from '../hooks/useClient'
import useAuth from '../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { updateCart, updateFavorite } from '../store/auth'
import CartView from '../ui/CartView'

const Detail = (props) => {
    const id = props.route.params?.id
    const [product, setProduct] = useState()
    const [amount, setAmount] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const { authClient } = useClient()
    const { authState } = useAuth()
    const dispatch = useDispatch()

    const fetchDetail = async () => {
        const res = await runAxiosAsync(
            client.get(`/product/detail-by-id/${id}`)
        )
        setProduct(res.data)
    }

    useEffect(() => {
        fetchDetail();
        isInFavorite()
    }, []);


    const [total, setTotal] = useState(product?.price)
    const handleMinus = () => {
        amount == 1 ? showMessage({ message: "Quantity is invalid!", type: "danger" }) : setAmount(amount - 1)
    }

    const handlePlus = () => {
        amount >= product.quantity ? showMessage({ message: "The book is out of stock, you can't buy more!", type: "danger" }) : setAmount(amount + 1)
    }

    // On the first render, product.price could be undefined and total hasn't been set yet.
    // On the second render, product has the data. useEffect keeps track of product and sets total.
    // useEffect also tracks amount if it is adjusted.
    useEffect(() => {
        if (product) {
            setTotal(amount * product.price);
        }
    }, [product, amount]);

    const handleAddToCart = async () => {
        //Check verification email
        if (!authState.profile.verified) return showMessage({ message: "Please verify your email in Profile first!", type: "danger" })

        const res = await runAxiosAsync(
            authClient.post("/cart/add",
                { owner: authState.profile.id, productId: product.id, amount })
        )

        if (!res.status) return showMessage({ message: res.data, type: "danger" })
        showMessage({ message: res.data, type: "success" })
        dispatch(updateCart(!authState.cart))
    }

    const isInFavorite = async () => {
        const res = await runAxiosAsync(
            authClient.post("/favorite/isInFavorite", { owner: authState.profile.id, productId: id }))
        setIsFavorite(res.data.result)
    }

    const handleClickFavorite = async () => {
        //Check verification email
        if (!authState.profile.verified) return showMessage({ message: "Please verify your email in Profile first!", type: "danger" })
        if (isFavorite) {
            await runAxiosAsync(
                authClient.get(`/favorite/delete/${id}`, { owner: authState.profile.id, productId: id })
            )
        } else {
            await runAxiosAsync(
                authClient.post("/favorite/add", { owner: authState.profile.id, productId: id })
            )
        }
        dispatch(updateFavorite(!authState.favorite))
        setIsFavorite(!isFavorite)
    }

    const handleFavorite = () => (
        <Pressable style={styles.heartIconContainer} onPress={() => handleClickFavorite()}>
            {isFavorite ?
                <Image style={styles.heartIcon} source={require("../../assets/icons/icon_heart_favorite.png")} /> :
                <Image style={styles.heartIcon} source={require("../../assets/icons/icon_heart_not_favorite.png")} />}
        </Pressable>
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <AppHeader backButton={<BackButton />} centerTitle={"CHI TIẾT"} right={<CartView />} />
            </View>

            <ScrollView>
                <SliderImage data={product?.images} addFavorite={handleFavorite()} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{product?.name}</Text>
                    <Text style={styles.category}>{product?.category}</Text>
                </View>
                <Text style={styles.price}>$ {product?.price}</Text>
                <Text style={styles.description}>{product?.description}</Text>
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Đã chọn sản phẩm</Text>
                    <Text style={styles.text}>Tạm tính</Text>
                </View>
                <View style={styles.selectedContainer}>
                    <Pressable onPress={() => handleMinus()}>
                        <Image source={require("../../assets/icons/icon_minus.png")} />
                    </Pressable>
                    <Text style={styles.quantity}>{amount}</Text>
                    <Pressable onPress={() => handlePlus()}>
                        <Image source={require("../../assets/icons/icon_plus.png")} />
                    </Pressable>
                    <Text style={styles.space}></Text>
                    <Text style={styles.total}>$ {total}</Text>
                </View>
                <FormButton active title={"ADD TO CART"} onPress={() => handleAddToCart()} />
            </View>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    heartIcon: {
        width: 30,
        height: 30
    },
    heartIconContainer: {
        position: "absolute",
        right: 15,
        bottom: 20,
        borderRadius: 30,
        backgroundColor: "white",
        padding: 5
    },
    selectedContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    total: {
        marginHorizontal: 10,
        fontSize: 25,
        fontWeight: "600",
        color: "black"
    },
    quantity: {
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "600",
        color: "black"
    },
    space: {
        flex: 1
    },
    text: {
        fontSize: 19,
        fontWeight: "600"
    },
    footerContainer: {
        paddingHorizontal: 20,
    },
    textContainer: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    category: {
        padding: 5,
        backgroundColor: color.primary,
        color: "white",
        borderRadius: 5,
        fontWeight: "700",
        fontSize: 17,
    },
    description: {
        marginTop: 15,
        fontSize: 18,
        lineHeight: 22,
        marginLeft: 20,
    },
    price: {
        color: "red",
        fontSize: 25,
        marginLeft: 20,
        fontWeight: "700"
    },
    name: {
        maxWidth: 280,
        color: "black",
        fontSize: 23,
        fontWeight: "700"
    },
    infoContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerContainer: {
        marginHorizontal: 20,
        marginVertical: 13
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    }
})