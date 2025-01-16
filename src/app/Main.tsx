import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";


interface Todo {
    id: string;
    text: string;
}


interface TodoItemProps {
    item: Todo;
}

export default function TodoList() {
    const [text, setText] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        if (text.trim()) {
            setTodos([...todos, { id: Date.now().toString(), text }]);
            setText("");
        }
    };

    const removeTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleSubmit = () => {
        addTodo();
    };

    const renderTodo = ({ item }: TodoItemProps) => (
        <TouchableOpacity
            onPress={() => removeTodo(item.id)}
            style={styles.todoItem}
        >
            <Text style={styles.todoText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <Text style={styles.header}>To-Do List</Text>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Add a new task"
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
            />
            <Button title="Add Task" onPress={addTodo} />
            <FlatList
                data={todos}
                renderItem={renderTodo}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      todoItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      todoText: {
        flex: 1,
      }
});