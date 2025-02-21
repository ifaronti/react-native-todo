import { FlatList, View, Alert} from "react-native";
import { useEffect, useState } from "react";
import { data } from "@/constants/Data";
import TodoForm from "@/components/todo-form";
import Todo from "@/components/todo";
import Action_Modal from "@/components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";

type todo = { text: string, id: number, isCompleted: boolean } | {}

export default function Todos() {
    const [todos, setTodos] = useState(data)
    const [newTodo, setNewTodo] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentId, setCurrentId] = useState(0)

    function addTodo() {

        if (!newTodo) {
            return Alert.alert('field is required')
        }
        const cp_todos = [...todos]

        setTodos([
            {
                text: newTodo,
                isCompleted: false,
                id: cp_todos.length + 1
            }
            , ...cp_todos]
        )
    }

    function delete_dialogue(id: number) {
        setCurrentId(id)
        setShowModal(true)
    }

    function delete_todo(id: number) {
        //@ts-expect-error
        setTodos(prev => {
            prev.map(item => {
                return item.id === id ? null: item
            })
        })
    }

    function update_todo(id: number) {
        setTodos(prev => {
            return prev.map(item => {
               return item.id === id? {...item, isCompleted:!item.isCompleted}: item
            })
        })
    }

    useEffect(() => {
        setTodos(data)
    }, [])

    const separator = <View style={{backgroundColor:'white', marginVertical:10, width:'100%', height:0.3}} />
    
    return (
        <SafeAreaView style={{width:'100%', flex:1}}>
            <View style={{padding:20, flex:1, width:'100%'}}>
                <TodoForm
                    handleChange={setNewTodo}
                    addTodo={addTodo}
                    value={newTodo}
                />

                <FlatList
                    data={todos}
                    renderItem={({ item }) => <Todo todo={item} delete_todo={delete_dialogue} update_todo={()=>update_todo(item.id)} />}
                    
                    extraData={currentId}
                    keyExtractor={item =>item.id.toString()}
                    ItemSeparatorComponent={()=>separator}
                />

                <Action_Modal
                    delete_todo={() => delete_todo(currentId)}
                    id={currentId}
                    showModal={showModal}
                    cancel_action={()=>setShowModal(false)}
                />

            </View>
        </SafeAreaView>
    )
}