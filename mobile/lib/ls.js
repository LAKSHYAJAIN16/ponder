import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ls {
  static async edit(id, val) {
    try {
      await AsyncStorage.setItem(`@${id}`, JSON.stringify(val));
    } catch (e) {}
  }
}
