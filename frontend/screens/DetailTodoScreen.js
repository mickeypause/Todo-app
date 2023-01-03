import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import GetDimensions from "../components/GetDimensions";
import TodoType from "../components/TodoType";
import axios from "axios";
import AddTodoForm from "../components/AddTodoForm";
import { useState, useRef } from "react";
export default function DetailTodoScreen({route, navigation}) {
    let title = route.params.title
    let body = route.params.body
    const type = route.params.type
    const id = route.params.id 
    const url = `http://127.0.0.1:8000/api/${id}/`
    const [edit, setEdit] = useState(false)
    const [todoText, setTodoText] = useState('black')

    const deleteTodo = () => {
        axios.delete(url)

    }

    const putTodo = () => {
        try{
            const request = axios({
                method: 'PUT',
                url: url,
                data: {
                    title: title,
                    body: body,
                    type: type,
                },
                headers: {"Content-Type" : "application/json"}
            })
        }catch (error){
            console.info(error)
        }  
    }

    const deleteAlert = () => {
        Alert.alert(
            'Delete todo',
            'Are you sure that you want to delete todo?',
            [
                {
                    text: 'Yes', 
                    onPress: () => {
                        deleteTodo()
                        navigation.navigate('Home')
                    }
                },
                {
                    text: 'No',
                    style: 'destructive'
                },
                
            ]
        )
    }

    
    return( 
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => {
                    navigation.navigate('Home')
                    putTodo()
                    
                }}
                >
                    <Ionicons name="chevron-back" size={40} color="#398640"/>
                </TouchableOpacity>
                <TodoType type={type}/>
                <View style={[styles.header, {left:GetDimensions.width/2.2}]}>
                    <TouchableOpacity activeOpacity={1} style={{marginRight: '15%'}}
                    onPress={() => {
                        alert('You may now edit your todo')
                        setEdit(true)
                        setTodoText('gray')
                    }} 
                    >
                        <Ionicons name="ios-pencil" size={26} color="#398640" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        deleteAlert()
                    }}>
                        <AntDesign name="delete" size={26} color="#398640" />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={styles.titleContainer}>
                    <TextInput style={styles.title} 
                    placeholder={title} 
                    placeholderTextColor={todoText} 
                    selectionColor={'#398640'} 
                    editable={edit}
                    
    
                    onChangeText={(value) => {
                        title = value
                    }}
                    
                    />
                </View>
                <View style={styles.bodyContainer}>
                <TextInput style={styles.bodyText} 
                    placeholder={body} 
                    placeholderTextColor={todoText} 
                    selectionColor={'#398640'} 
                    editable={edit}
                    multiline
                    onChangeText={(value) => {
                        body = value
                    }}
                    
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500'
    },
    titleContainer: {
        width: GetDimensions.width,
        marginTop: '5%'
    },
    bodyContainer: {
        marginHorizontal: '4%',
         alignItems: 'center',
         marginTop: '3%',
    },
    bodyText: {
        fontSize: 16
    },
    todoTypeContainer: {
        borderRadius:  55,
        width: GetDimensions.width/4,
        height: GetDimensions.height/40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        left: '13%'
    }, 
    todoTypeText: {
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500',  

    }
})