import { View, Text, StyleSheet } from "react-native";

const AddTodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the New todo Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddTodoScreen;
