import { Modal, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dispatch, SetStateAction, useState } from "react";

type props = {
    delete_todo: (id: number) => void,
    id: number,
    showModal: boolean
    cancel_action:Dispatch<SetStateAction<boolean>>
}

export default function Action_Modal({ delete_todo, id, cancel_action, showModal }: props) {



    return (
        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Modal
                visible={showModal ? true : false}
                transparent={true}
                animationType="slide"
            >

                <View style={{padding:20}}>
                        
                    <Ionicons name="alert" size={24} color={'red'} />
                    
                    <Text style={{color:'white',}}>
                        Are sure you want to delete this todo? Action can not be reversed.
                    </Text>

                    <View style={{ flex: 1, justifyContent: 'center', gap:10 }}>
                            
                            <Pressable
                                
                                onPress={()=>cancel_action}
                            >
                                <Text style={{color:'white',}}>Cancel</Text>
                            </Pressable>

                            <Pressable
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