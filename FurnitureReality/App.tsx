/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Splash from './screens/splash.js'
import HomeStack from './screens/homeScreen.js'
import CategoryScreen from './screens/categoriesScreen.js'
import IndevidualCategory from './screens/indevidualCategoryScreen.js';
import IndevidualProductScreen from './screens/indevidualProductScreen.js';
import CartIntro from './screens/cartScreen.js'
import ProfileScreen from './screens/profileScreen.js'
import Login from './screens/login.js'
import Signup from './screens/signup.js'

const App = () => {
 

    const Stack = createNativeStackNavigator();
		const Tab = createBottomTabNavigator();

    function GetTab() {
			return tabClientNavigator;
		}

   function CategoriesStack(){
    return (
      <Stack.Navigator
					initialRouteName="CategoryIntro"
         
				>
        
        <Stack.Screen
						name="CategoryIntro"
						component={CategoryScreen}
						options={{ headerShown: false }}
           
					/>

        <Stack.Screen
						name="IndevidualCategory"
						component={IndevidualCategory}
						options={{ headerShown: false }}
           
					/>  

        <Stack.Screen
						name="IndevidualProductScreen"
						component={IndevidualProductScreen}
						options={{ headerShown: false }}
           
					/>    



      </Stack.Navigator>    
    )
   }

  function CartStack(){
    return (
      <Stack.Navigator
					initialRouteName="CartIntro"
				>
        
        <Stack.Screen
						name="CartIntro"
						component={CartIntro}
						options={{ headerShown: false, title: 'Search' }}
					/>

      </Stack.Navigator>    
    )
  }


  function ProfileStack(){
    return (
      <Stack.Navigator
					initialRouteName="Profile"
				>
        
        <Stack.Screen
						name="Profile"
						component={ProfileScreen}
						options={{ headerShown: false,}}
					/>

        



      </Stack.Navigator>    
    )
  }
  let tabClientNavigator=(
    <Tab.Navigator
				initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false
        }}
				tabBarOptions={{
					showLabel: false,

					style: {
						height: 80,
						display: 'flex',
						backgroundColor: ' #E61F65',
						padding: 20,
						paddingBottom: 5,
						marginBottom: 10,
					},
          
				}}
			>
    
        <Tab.Screen
					name="HomeStack"
					component={HomeStack}
					options={{
            showLabel: false,
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View>
								 <Image 
                    source={require('./assets/AcHome.png')}/>
									
								</View>
							) : (
								<View >
								   <Image 
                    source={require('./assets/Home.png')}/>
                 
                </View>
							),
					}}
					tabBarOptions={{ style: {} }}
				/>
    

    <Tab.Screen
					name="CategoriesStack"
					component={CategoriesStack}
          options={{
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View>
								 <Image 
                    source={require('./assets/Accategories.png')}/>
									
								</View>
							) : (
								<View >
								   <Image 
                    source={require('./assets/categories.png')}/>
                 
                </View>
							),
					}}
				/>

    <Tab.Screen
              name="CartStack"
              component={CartStack}
              options={{
                tabBarIcon: ({ focused, color, size }) =>
                  focused ? (
                    <View>
                     <Image 
                        source={require('./assets/Accart.png')}/>
                      
                    </View>
                  ) : (
                    <View >
                       <Image 
                        source={require('./assets/cart.png')}/>
                     
                    </View>
                  ),
              }}
            />

    <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={{
                tabBarIcon: ({ focused, color, size }) =>
                  focused ? (
                    <View>
                     <Image 
                        source={require('./assets/AcProfile.png')}/>
                      
                    </View>
                  ) : (
                    <View >
                       <Image 
                        source={require('./assets/Profile.png')}/>
                     
                    </View>
                  ),
              }}
            />



    </Tab.Navigator>    
  )
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Splash" options={{ headerShown: false }}>
       	<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="tabClientNavigator" component={GetTab} options={{ headerShown: false }} />
		 	</Stack.Navigator>
     </NavigationContainer>  

   
  );
};

// 		<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
    //     <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
    //     <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
    //     <Stack.Screen name="tabClientNavigator" component={GetTab} options={{ headerShown: false }} />
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:'5%',
    backgroundColor:'#E9EAFA'
  }
  
 
});

export default App;

