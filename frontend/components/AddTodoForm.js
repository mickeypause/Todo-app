import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GetDimensions from "./GetDimensions";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
export default function AddTodoForm({onRefresh, addTodo, setAddTodo}) {
    const bodyRef = useRef()
    const titleRef = useRef()
    const [title, setTitle] = useState('')
    const [focusTextInput, setFocusTextInput] = useState(false)
    const [body, setBody] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('essential')
    const [items, setItems] = useState([
    {label: '🔥 essential', value: 'essential'},
    {label: '🐢 later', value: 'later'}
    ])
    useEffect(() => {
        if(addTodo === 'flex'){
            setFocusTextInput(true)
            
        }
    },)
    

    return (
        <KeyboardAvoidingView style={[ {display: addTodo, flex: 1}]} behavior='position' contentContainerStyle={{paddingBottom: '-2%'}}> 
            <View style={{backgroundColor: 'black', width: GetDimensions.width, height: GetDimensions.height, position: 'absolute', bottom: 0, opacity: 0.3}}></View>
        
       
        <View style={styles.container}>
            <View style={{right: '6%', zIndex: 2000, position: 'absolute', top: '5%'}} >
            <TouchableOpacity activeOpacity={1} onPress={() => {
                if(title != ''){
                    try{
                        const request = axios({
                            method: 'POST',
                            url: 'http://127.0.0.1:8000/api/',
                            data: {
                                title: title,
                                body: body,
                                type: value,
                            }
                        })

                    }catch (error){
                        console.info(error)
                    }  
                }
                setTitle('')
                setBody('')
                Keyboard.dismiss()
                onRefresh()
                setAddTodo('none')
               
            
        }}>
         <Ionicons name="arrow-forward-circle" size={'40%'} color="#398640" />
        </TouchableOpacity>
            </View>
      
            <View style={{zIndex: 100,paddingHorizontal: '5%', marginTop: '3%'}}> 
            <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode='SCROLLVIEW'
        scrollViewProps={{
            keyboardShouldPersistTaps: 'handled'
        }}
        style={{
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#398640',
            color: 'gray',
            width: '80%',
            borderRadius: 3,
        }}
        textStyle={{
            color: 'black'
        }}
        dropDownContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#398640',
            color: 'gray',
            width: '80%', 
            borderTopWidth: 0,

        }}
        onChangeValue={() => {
            titleRef.current.focus()
        }}
        />
        
            </View>
            <View style={{paddingHorizontal: '5%', height: GetDimensions.height, backgroundColor: 'white'}}> 
          
                <View style={styles.titleContainer}>
                    <TextInput 
                    placeholder="Todo Title"
                    placeholderTextColor={'gray'}
                    selectionColor={'#398640'}
                    autoFocus={focusTextInput}
                    returnKeyType='next'
                    ref={titleRef}
                    maxLength={70}
                    value={title}
                    onSubmitEditing={() => {
                        bodyRef.current.focus()
                    }}
                    onChangeText={(val) => {
                        setTitle(val)
                    }}
                    autoCorrect={false}
                    />
                </View>
                <View style={styles.bodyContainer}>
                    <TextInput 
                    placeholder="Todo body "
                    placeholderTextColor={'gray'}
                    selectionColor={'#398640'}
                    multiline={true}
                    value={body}
                    ref={bodyRef}
                    autoCorrect={false}
                    onChangeText={(val) => {
                        setBody(val)
                    }}
                    />
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        width: GetDimensions.width,
        height: GetDimensions.height/3, 
        bottom: GetDimensions.height/16,
    
    },
    headerText: {
        fontSize: 20,
         fontWeight: '600', 
         color: '#398640',
         alignSelf: 'center', 
         marginTop: '2%'
    },
    titleContainer: {
        borderRadius: 3, 
        borderColor: '#398640',
        borderWidth: 2, 
        padding: '2%',
        marginTop: '3%',

    },
    bodyContainer: {
        fontSize : 20,
        borderRadius: 3, 
        borderColor: '#398640',
        borderWidth: 2, 
        padding: '1%',
        marginTop: '3%',
        height: '12%',
    }
})