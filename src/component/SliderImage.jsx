import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import size from '../utils/size'

const { width } = Dimensions.get('screen')
const imageWidth = width
const aspect = 16 / 9

const SliderImage = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50
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
                viewabilityConfig={viewabilityConfig}
            />
            <View style={styles.dotContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: currentIndex === index ? 'green' : 'white' }
                        ]}
                    />
                ))}
            </View>
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
        height: imageWidth / aspect,
    }
})
