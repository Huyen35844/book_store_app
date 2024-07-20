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
        <Pressable onPress={() => navigate("Detail", { id: item.id })} style={styles.itemContainer}>
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
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.primary,
        marginTop: 10
    },
    price: {
        fontSize: 20,
        fontWeight: "700",
        color: 'red'
    }
});
