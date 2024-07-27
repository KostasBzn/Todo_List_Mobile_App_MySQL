import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../style/colors";
import TodoListNavbar from "../components/navbar/TodoListNavbar.js";
import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext.js";
import { useNavigation } from "@react-navigation/native";

const TodosScreen = () => {
  const { todos } = useContext(TodoContext);

  const navigation = useNavigation();

  const handleEdit = (id) => {
    // Handle the edit action
    console.log("Edit todo with id:", id);
  };

  const handleDelete = (id) => {
    // Handle the delete action
    console.log("Delete todo with id:", id);
  };

  const navigateToAddTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <View style={styles.container}>
      <TodoListNavbar />
      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your list is empty</Text>
        </View>
      ) : (
        todos.map((todo) => (
          <View key={todo._id} style={styles.todoContainer}>
            <Text style={styles.todoTitle}>{todo.title}</Text>
            <Text style={styles.todoDescription}>{todo.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleEdit(todo._id)}
              >
                <Image
                  source={require("../assets/svg/edit.png")}
                  style={styles.editLogo}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.button]}
                onPress={() => handleDelete(todo._id)}
              >
                <Image
                  source={require("../assets/svg/delete.png")}
                  style={styles.editLogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={navigateToAddTodo}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orange,
  },
  todoContainer: {
    backgroundColor: colors.white,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  todoDescription: {
    fontSize: 16,
    color: colors.darkGray,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.tealGreen,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  deleteLogo: {
    backgroundColor: colors.red,
  },
  editLogo: {
    backgroundColor: colors.red,
  },

  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.orange,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
  },
  floatingButtonText: {
    fontSize: 48,
    color: colors.blueLight,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 60,
  },
});

export default TodosScreen;
