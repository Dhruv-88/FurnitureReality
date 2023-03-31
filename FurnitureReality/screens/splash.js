
import React,{useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {app} from '../firebase/firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from '../screens/login';
import SignUp from '../screens/signup'; 

const Splash = ({navigation}) => {


const [isLogiIn,setLogin]=useState(false)
// const auth=getAuth()

useEffect(()=>{

 
    getAuth().onAuthStateChanged(user=>{
    
      if(user){
      setLogin(true)
      navigation.navigate('tabClientNavigator')
     }
     else{
      setLogin(false)
      navigation.navigate('login')
     }
  
     console.log("user",isLogiIn)
    })
  

},[app])

  return (
    <View
      style={styles.container}>

      <View>

        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />

      </View>
      
      <View>
        <Text 
          style={styles.title}
         >
          furniture reality
        </Text>
      </View>

    </View>



  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:'10%',
    backgroundColor:'#E9EAFA'
  },
  title:{
    fontSize:40,
    color:'#787575',
    marginTop:50
    
  }
 
});

export default Splash;

