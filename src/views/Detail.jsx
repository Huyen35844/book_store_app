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

const Detail = (props) => {
    const id = props.route.params?.id
    const [product, setProduct] = useState()
    const [amount, setAmount] = useState(1)

    const fetchDetail = async () => {
        const res = await runAxiosAsync(
            client.get(`/product/detail-by-id/${id}`)
        )
        if (!res.status) return showMessage({ message: res.data, type: "danger" })
        setProduct(res.data)
    }

    useEffect(() => {
        fetchDetail();
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

    console.log(product?.quantity);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <AppHeader backButton={<BackButton />} centerTitle={"CHI TIẾT"} right={<Text></Text>} />
            </View>

            <ScrollView>
                <SliderImage data={product?.images} />
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
                <FormButton active title={"ADD TO CART"} />
            </View>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
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