import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, ScrollView, RefreshControl, Keyboard} from "react-native"
import axios from 'axios'
import DoneButton from "../components/DoneButton"
import { Ionicons } from '@expo/vector-icons';
import TodoType from "../components/TodoType"
import AddTodoForm from "../components/AddTodoForm"
import { useCallback, useEffect, useState } from "react"
import GetDimensions from "../components/GetDimensions"
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')
export default function HomeScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(false)
    const [response, setResponse] = useState([])
    const [addTodo, setAddTodo] = useState('none')

    const fetchTodoLists = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/?format=json')
            setResponse(response.data)
        }catch (err) {
            console.info(err)
        }
        
    }
    const onRefresh = useCallback(() => { 
        setRefreshing(true)
        fetchTodoLists()
        if(response){
            setRefreshing(false)
            
        }
    }, [])
    useEffect(() => {
        const updateScreen = navigation.addListener('focus', () => {
            onRefresh()
          })
            fetchTodoLists()

    }, [])
    return (
        <View>
        <ScrollView style={styles.listContiner}
        refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}/>
        }>
            <View >
                {response.map((todo) => {
                    return(
                        <View style={styles.todoContainer} key={todo.id}>
                            <DoneButton />
                            <TouchableOpacity
                                onPress={()=> {
                                    navigation.navigate('Detail', 
                                    {title: todo.title, body: todo.body, 
                                    type: todo.type, id: todo.id, onRefresh: onRefresh})
                                }} 
                                activeOpacity={0.5}
                                style={{width: GetDimensions.width}}
                                >
                            <View>
                                
                                <Text style={styles.todoText}>{todo.title}</Text>
                                    
                                
                                <TodoType type={todo.type}/> 
                            </View>
                            </TouchableOpacity>
                        </View>
                        
                        
                    )
                })}
            </View>
            
        </ScrollView>
        <View style={styles.btnContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                setAddTodo('flex')
                }}>
                    <Ionicons name="ios-add-circle" size={GetDimensions.width/5} color="#398640"/>
                </TouchableOpacity>
            </View>
        <AddTodoForm onRefresh={onRefresh} setAddTodo={setAddTodo} addTodo={addTodo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listContiner: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH, 
        height: '100%',
    },
    todoContainer: {
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: 'gray',
        alignItems: 'center',

    },
    
    todoText: {
        fontSize: 20,
        fontWeight: '400'
    }, 
    todoTypeContainer: {
        borderRadius:  55,
        width: SCREEN_WIDTH/4,
        height: SCREEN_HEIGHT/40,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    todoTypeText: {
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500',  

    }, 
    btnContainer: {
        borderRadius:  20, 
        width: GetDimensions.width/5,
        height: GetDimensions.width/5,
        position: 'absolute',
        top: GetDimensions.height/1.4,
        left: GetDimensions.width/1.3,
        justifyContent: 'center',
        alignItems: 'center',
    }

})