import { View, Text, Pressable, StyleSheet, useColorScheme } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from "react-native-safe-area-context";

type props = {
    todo: todo,
    delete_todo: (id:number) => void,
    update_todo: (id: number) => void,

}



type todo = {text:string, isCompleted:boolean, id:number}

export default function Todo({ todo, delete_todo, update_todo }: props) {
    
    const colorScheme = useColorScheme()

    function text_color() {
        let color
        let decor = 'none'
        if (colorScheme === 'dark') {
            color = 'white'
        }
        else {
            color = 'black'
        }
        if (todo.isCompleted) {
            color = '#928dab'
            decor = 'line-through'
        }

        return {color:color, decor:decor}
    }
    
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={()=>update_todo(todo.id)}>
                    <Text style={
                            {
                                color: text_color().color,
                                textDecorationColor: colorScheme === 'dark'? 'white':'black',
                                textDecorationLine:text_color().decor
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
        </SafeAreaView>
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
        color:'#928dab'
    },
    
    delBtn: {
        position:'relative'
    }
})