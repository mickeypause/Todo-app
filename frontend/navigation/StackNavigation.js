import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailTodoScreen from '../screens/DetailTodoScreen';

const Stack = createStackNavigator()

export default function StackNavigation(){
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerTitleStyle: {
                fontSize: 30,
            }
        }}>
            <Stack.Screen name='Home' component={HomeScreen} options={{title: 'Todo', headerTintColor: '#398640', headerStyle: {borderBottomWidth: 0, shadowOpacity: 0}}}/>
            <Stack.Screen name='Detail' component={DetailTodoScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}