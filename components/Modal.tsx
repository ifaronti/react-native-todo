import { Modal, View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type props = {
    delete_todo: (id: number | null) => void,
    id: number | null,
    showModal: boolean
    cancel_action:()=>void
}

export default function Action_Modal({ delete_todo, id, cancel_action, showModal }: props) {

    return (
        <SafeAreaView style={{flex:1, zIndex:10}}>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                style={
                    {
                        opacity: 0.9,
                        position: 'absolute',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent:'center'
                    }
                }
            >

                <View style={styles.dialogBox}>
                        
                    <Ionicons name="information-circle" size={24} color={'red'} />
                    
                    <Text style={{color:'white',}}>
                        Are sure you want to delete this note? Action can not be reversed.
                    </Text>

                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', gap:10 }}>
                            
                        <Pressable
                            style={styles.dialogBtns}
                            onPress={cancel_action}
                        >
                            <Text style={{color:'white',}}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={styles.dialogBtns}
                            onPress={()=>delete_todo(id)}
                            >
                                <Text style={{color:'white',}}>Delete</Text>
                            </Pressable>

                        </View>

                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dialogBox:{
        padding: 20,
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        height: '20%',
        borderColor: 'white',
        borderWidth: 0.2,
        borderRadius: 10,
        backgroundColor: '#485563',
        flexDirection: 'column',
        gap: 20,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom:'auto'
        
    },

    dialogBtns:                                {
        width: 100,
        height: 40,
        backgroundColor: '#635fc7',
        display: 'flex',
        alignItems: 'center',
        'justifyContent': 'center',
        borderRadius:10
        
    }
})