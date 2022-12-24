import { View, Text, StyleSheet } from "react-native";
import GetDimensions from "./GetDimensions";
export default function TodoType({type}) {
    
    let typeBackgroundColor  = '#d9133c'
    if(type === 'essential'){
        type = '🔥' + type
       
    }else{
        type = '🐢' + type
        typeBackgroundColor = '#8ac76f'
    }
    return(
    <View style={[styles.todoTypeContainer, {backgroundColor: typeBackgroundColor}]}>
        <Text style={styles.todoTypeText}>{type}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    todoTypeContainer: {
        borderRadius:  55,
        width: GetDimensions.width/4,
        height: GetDimensions.height/40,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    todoTypeText: {
        color: 'white', 
        fontSize: 14, 
        fontWeight: '500',  

    }
})