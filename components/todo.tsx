import { View, Text, Pressable, StyleSheet, useColorScheme } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

type props = {
    todo: todo,
    delete_todo: (id:number) => void,
    update_todo: (id: number) => void,

}



type todo = {text:string, isCompleted:boolean, id:number}

export default function Todo({ todo, delete_todo, update_todo }: props) {
    
    const colorScheme = useColorScheme()
    
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={()=>update_todo(todo.id)}>
                <Text style={
                    {
                        color: colorScheme === 'dark' ?
                            'white'
                            :
                            todo.isCompleted ?
                                'gray'
                                :
                                'black',
                        textDecorationLine:
                            todo.isCompleted ?
                                'line-through'
                                :
                                'none'
                    }
                }
                >
                    {todo.text}
                </Text>
            </Pressable>

            <Pressable style={styles.delBtn} onPress={()=>delete_todo(todo.id)}>
                
                <Ionicons
                    name="trash"
                    size={24}
                    style={{ backgroundColor: 'red', borderRadius:5 }}
                />

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        width:'100%'
    },

    button: {
        width: '80%',
        
    },

    completeText: {
        textDecorationLine: 'line-through',
        color:'#E0E4EA'
    },
    
    delBtn: {
        position:'relative'
    }
})