import { FlatList, View, Alert, useColorScheme, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import { data } from "@/constants/Data";
import TodoForm from "@/components/todo-form";
import Todo from "@/components/todo";
import Action_Modal from "@/components/Modal";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Separator from "@/components/separator";

export type todoType = {text:string, isCompleted:boolean, id:number}

export default function Todos() {
    const [todos, setTodos] = useState()
    const [newTodo, setNewTodo] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currentId, setCurrentId] = useState<number | null>(null)
    
    const colorScheme = useColorScheme()

    async function addTodo() {
        const id = Math.floor(Math.random() * 847448389384)
        const payload = { isCompleted: false, text: newTodo, id: id }
        await AsyncStorage.setItem(String(id), JSON.stringify(payload))
        setCurrentId(id)
        setNewTodo('')
    }

    async function delete_dialogue(id: number) {
        setCurrentId(id)
        setShowModal(true)
    }

    async function delete_todo(id: number) {
        await AsyncStorage.removeItem(String(id))
        setCurrentId(null)
        setShowModal(false)
    }

    async function update_todo(id: number) {
        if (currentId === id) {
            setCurrentId(null)
        }
        // @ts-expect-error
        const item = JSON.parse(await AsyncStorage.getItem(String(id)))
        
        await AsyncStorage.setItem(String(item.id), JSON.stringify({ ...item, isCompleted: !item.isCompleted }))
        setCurrentId(id)
    }

    async function getData() {
        //@ts-expect-error
        if (!todos?.length) {
            data.map(async(item) => {
                await AsyncStorage.setItem(String(item.id), JSON.stringify(item))
            })
        }
        const newData = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())
        
        const newTodos = newData.map(item => {
            //@ts-expect-error
            return JSON.parse(item[1])
        })
        //@ts-expect-error
        setTodos(newTodos);        
    }

    useEffect(() => {
        getData()
    }, [currentId])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colorScheme === 'dark' ?
                    '#203A43'
                    :
                    '#8e9eab'
            }
        }>
            <View style={{padding: 20, flex: 1, height:'auto', gap:70}}>
                <TodoForm
                    handleChange={setNewTodo}
                    addTodo={addTodo}
                    value={newTodo}
                />

                <FlatList
                    data={todos}
                    renderItem={({ item }) => <Todo todo={item} delete_todo={delete_dialogue} update_todo={()=>update_todo(item.id)} />}
                    
                    // extraData={currentId}
                    keyExtractor={item =>String(item?.id)}
                    ItemSeparatorComponent={()=><Separator/>}
                />

                <Action_Modal
                    delete_todo={() => delete_todo(Number(currentId))}
                    id={currentId}
                    showModal={showModal}
                    cancel_action={()=>setShowModal(false)}
                />

            </View>
        </SafeAreaView>
    )
}