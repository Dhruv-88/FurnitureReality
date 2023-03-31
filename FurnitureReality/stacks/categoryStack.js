import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export function CategoriesStack(){
    return (
      <Stack.Navigator
					initialRouteName="CategoryIntro"
         
				>
        
        <Stack.Screen
						name="CategoryIntro"
						component={CategoryScreen}
						options={{ headerShown: false }}
           
					/>

      </Stack.Navigator>    
    )
   }