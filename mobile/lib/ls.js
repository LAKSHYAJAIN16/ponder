import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ls {
  static async edit(id, val) {
    try {
      await AsyncStorage.setItem(`@${id}`, JSON.stringify(val));
    } catch (e) {}
  }

  static async get(id, isJson = true) {
    try {
      const val = await AsyncStorage.getItem(`@${id}`);
      if (isJson === true) {
        return JSON.parse(val);
      } else {
        return val;
      }
    } catch (err) {
      return undefined;
    }
  }
}
