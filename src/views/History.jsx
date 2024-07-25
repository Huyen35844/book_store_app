import { FlatList, Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import size from '../utils/size';
import AppHeader from '../component/AppHeader';
import BackButton from '../ui/BackButton';
import useClient from '../hooks/useClient';
import { runAxiosAsync } from '../api/runAxiosAsync';
import useAuth from '../hooks/useAuth';
import color from '../utils/color';

const History = () => {
    const { authClient } = useClient();
    const { authState } = useAuth();
    const [history, setHistory] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);

    const fetchHistory = async () => {
        const res = await runAxiosAsync(
            authClient.get(`/invoice/get-cart-by-user/${authState.profile.id}`)
        );
        setHistory(res.data.list);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleItemPress = (invoice) => {
        setSelectedInvoice(invoice);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
            <Text style={styles.text}>Invoice ID: {item.id}</Text>
            <Text style={styles.text}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.text}>Amount: {item.products.length}</Text>
            <Text style={styles.text}>Total: $ {item.total}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <AppHeader backButton={<BackButton />} centerTitle={"HISTORY"} right={<Text></Text>} />
            <FlatList
                style={styles.list}
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            {selectedInvoice && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Invoice Details</Text>
                            <Text style={styles.modalBoldText}>Invoice ID: {selectedInvoice.id}</Text>
                            <Text style={styles.modalBoldText}>Date: {new Date(selectedInvoice.date).toLocaleDateString()}</Text>

                            <ScrollView style={{ flex: 1 }}>
                                {selectedInvoice.products.map((product, index) => (
                                    <View style={styles.product} key={index}>
                                        <Text style={styles.modalText}>Name: {product.name}</Text>
                                        <View style={styles.priceAmount}>
                                            <Text style={[styles.modalText, { marginRight: 20 }]}>Price: $ {product.price}</Text>
                                            <Text style={styles.modalText}>Amount: {product.amount}</Text>
                                        </View>
                                        <Text style={styles.modalText}>Total: $ {product.amount * product.price}</Text>
                                    </View>
                                ))}
                            </ScrollView>

                            <Text style={styles.modalBoldText}>Total Invoice: $ {selectedInvoice.total}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
    },
    item: {
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: "black",
    },
    container: {
        padding: size.padding,
        marginBottom: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: 600,
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        alignSelf: "center",
        fontSize: 20,
        color: color.primary,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    modalBoldText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
    },
    priceAmount: {
        flexDirection: "row",
    },
    product: {
        padding: 5,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: color.primary,
        marginVertical: 5
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#3CB371',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "600"
    },
});
