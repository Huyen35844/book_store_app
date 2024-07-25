import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import color from '../utils/color'

const { width } = Dimensions.get('screen')
const imageWidth = width

const SliderImage = ({ data, addFavorite }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    //Pick up the index of the viewableItem
    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                //a viewable item is supposed to be seen when we can see the item at least 50%
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />
            <View style={styles.dotContainer}>
                {data?.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: currentIndex === index ? color.primary : 'white' }
                        ]}
                    />
                ))}
            </View>
            {addFavorite}
        </View>
    )
}

export default SliderImage

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        top: -25,
        alignSelf: 'center'
    },
    dot: {
        marginHorizontal: 2,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    image: {
        resizeMode: 'cover',
        width: imageWidth,
        height: imageWidth / (16 / 9),
    }
})
