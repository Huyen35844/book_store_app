import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../utils/color'
import { runAxiosAsync } from '../api/runAxiosAsync'
import client from '../api/client'
import { useNavigation } from '@react-navigation/native'

const SearchModal = ({ closeModal, visiable }) => {
    const [value, setValue] = useState(null)
    const [data, setData] = useState([])
    const { navigate } = useNavigation()
    const handleSearch = async () => {
        const res = await runAxiosAsync(
            client.get(`/product/search?name=${value}`)
        )
        setData(res.data.products);
    }

    const renderItem = ({ item }) => (
        <Pressable style={styles.item} onPress={() => { closeModal(), navigate("Detail", { id: item.id }) }}>
            <Image style={styles.image} source={{ uri: item.images[0] }} />
            <View>
                <Text style={styles.name} >{item.name}</Text>
                <Text style={styles.price} >$ {item.price}</Text>
            </View>
        </Pressable>
    )

    useEffect(() => {
        handleSearch()
    }, [value])

    return (
        <Modal
            visible={visiable}
            onRequestClose={closeModal}
        >
            <View style={styles.headerContainer}>
                <Pressable style={styles.iconBackContainer} onPress={closeModal}>
                    <Image style={styles.iconBack} source={require("../../assets/icons/icon_back_arrow.png")} />
                </Pressable>
                <TextInput value={value} onChangeText={(text) => setValue(text)} style={styles.input} placeholder='Search your book' />
                <Image style={styles.iconSearch} source={require("../../assets/icons/icon_search.png")} />
            </View>
            <FlatList data={data} renderItem={renderItem} />
        </Modal>
    )
}

export default SearchModal

const styles = StyleSheet.create({
    price: {
        marginLeft: 15,
        fontWeight: "700",
        fontSize: 17,
        color: color.primary
    },
    name: {
        marginLeft: 16,
        fontWeight: "700",
        fontSize: 15,
        color: "black"
    },
    image: {
        borderRadius: 5,
        width: 60,
        height: 60,
    },
    item: {
        margin: 20,
        flexDirection: "row"
    },
    iconBackContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    iconBack: {
        width: 30,
        height: 30,
    },
    headerContainer: {
        backgroundColor: color.primary,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    input: {
        flex: 1,
        fontSize: 18,
        marginVertical: 15,
        marginRight: 12,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 8,
        paddingLeft: 45,
    },
    iconSearch: {
        alignSelf: "flex-start",
        position: "absolute",
        top: 27,
        left: 48,
        width: 25,
        height: 25
    }
})