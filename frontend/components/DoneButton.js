import { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Dimensions} from "react-native"
import Animated, { withTiming } from "react-native-reanimated"
import { MaterialIcons } from '@expo/vector-icons';
import { useAnimatedStyle, withSpring } from "react-native-reanimated"
import GetDimensions from "./GetDimensions";
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')

export default function DoneButton() {
    const [btnStatus, setBtnStatus] = useState(false)

    const changeButton = () => {

        if(btnStatus){
            setBtnStatus(false)
        }else{
            setBtnStatus(true)
        }
        
    }
    const rBtn = useAnimatedStyle(() =>{
        const color = '#398640'
        if(btnStatus){
            return{
                backgroundColor: color, 
                }
        }else{
            return{ 
                backgroundColor: 'white',

            }
        }
        
    })
    return (
        <View>
            <TouchableOpacity activeOpacity={1} onPress={() => {changeButton()}} style={{width: GetDimensions.width/10,}}>
                <Animated.View style={[styles.doneBtn,rBtn]}>
                <MaterialIcons name="done" size={GetDimensions.width/20} color="black"  style={{color: 'white'}}/>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    doneBtn: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#398640', 
        width: GetDimensions.width/15,
        height: GetDimensions.width/15,
        marginRight: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})