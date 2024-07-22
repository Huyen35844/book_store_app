import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import size from '../utils/size';
import color from '../utils/color';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const aspect = 12 / 5;

const ProductList = ({ data }) => {
    const { navigate } = useNavigation()
    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigate("Detail", item.productId ? { id: item.productId } : { id: item.id })} style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.images[0] }} />
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.price}>$ {item.price}</Text>
        </Pressable >
    );

    return (
        <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
        />
    );
};

export default ProductList;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 5,
        flexWrap: 'wrap'
    },
    list: {
        padding: size.padding
    },
    image: {
        borderRadius: 10,
        width: width / 2.3,
        height: width / aspect
    },
    columnWrapper: {
        justifyContent: "flex-start"
    },
    name: {
        fontSize: 18,
        height: 30,
        fontWeight: 'bold',
        textAlign: "center",
        color: color.primary,
        maxWidth: 180,
        marginTop: 5
    },
    price: {
        marginTop: -5,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700",
        color: 'red'
    }
});
