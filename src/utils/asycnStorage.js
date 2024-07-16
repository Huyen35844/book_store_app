import AsyncStorage from "@react-native-async-storage/async-storage"

const save = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}

const get = async (key) => {
    return await AsyncStorage.getItem(key)
}

const remove = async (key) => {
    await AsyncStorage.removeItem(key)
}


const clear = async () => {
    await AsyncStorage.clear()
}

export const Keys = {
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
};

const asyncStorage = { save, get, remove, clear }
export default asyncStorage