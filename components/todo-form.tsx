import { StyleSheet, View, TextInput, Text, Pressable } from "react-native"
import { Dispatch, SetStateAction, useState} from "react"
import { SafeAreaView } from "react-native"

type props = {
    addTodo: () => void,
    handleChange: Dispatch<SetStateAction<string>>
    value:string
}

export default function TodoForm({addTodo, handleChange, value}:props) {


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Type what you want to do"
                onChangeText={handleChange}
                value={value}
                maxLength={60}
                autoComplete="off"
                style={styles.textInput}
            />

            <Pressable onPress={addTodo} style={styles.button}>
                <Text style={styles.btnText}>
                    Add
                </Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        width: '100%',
        gap: 5,
        position: 'relative',
        marginTop:40
    },

    textInput: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderColor: '#E0E4EA',
        borderWidth: 0.2,
        padding: 20,
        color: 'white',
    },

    button: {
        width: '20%',
        height: 50,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#635fc7'
    },

    btnText: {
        color: 'white',
        fontWeight: '500',
    }
})