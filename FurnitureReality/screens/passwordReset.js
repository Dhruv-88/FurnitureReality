
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
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {app} from '../firebase/firebase';


import Login from '../screens/login';
import SignUp from '../screens/signup'; 

import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const PasswordReset = ({navigation}) => {


const auth = getAuth();
const user=auth.currentUser;
const[oldPassword,updateOldPassword]=useState('')
const [changed,setChanged]=useState(false)
async function reAuth(pass){
//console.log(user.email)
  sendPasswordResetEmail(auth, user.email)
  .then(() => {

    setChanged(true)
    navigation.navigate('Profile')
    // Password reset email sent!
    // ..

  })
    
}

// useEffect(()=>{

//  console.log(user.password);
    

// },[])

  return (
    <View
      style={styles.container}>
     

     <View style={styles.headerContainer}>
         <TouchableOpacity 

          onPress={ ()=>navigation.navigate('ProfileStack',{screen:'Profile'})}
          style={styles.goBackSection}>
            <Image
             style={{alignSelf:'center'}}
             source={require('../assets/back.png')}
            />
         </TouchableOpacity>
         <View style={{justifyContent:'center',alignItems:'center',width:'60%'}}>
           <Text style={{alignSelf:'center',color:"#787575",fontSize:20}}>
            PasswordReset
           </Text>
          </View>     
      </View>  


      <View>
      </View>



        <View style={styles.logoSection}>
        <Image
         source={require('../assets/logo.png')}
         style={{height:'100%',width:'100%'}}
        />

      </View>

     <View style={{marginTop:'20%'}}>
     <TextInput
            style={styles.input}
            onChangeText={updateOldPassword}
            value={oldPassword}
           />

            <TouchableOpacity
              style={styles.signoutButton}
              onPress={()=>{
                reAuth(oldPassword)
              }
            
            }
            >
            <Text style={styles.signOutButtonText}>
              Verify Old Password 
            </Text>
        </TouchableOpacity>
     </View>

     { changed?
        <Text>
            Go To the Register Email adrress and check for Link to reset password,Thankyou.
        </Text>
        :
        null
     }
    </View>



  );
};
  
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:'10%',
    backgroundColor:'#E9EAFA'
  }, headerContainer:{
    width:'100%',
    height:'5%',
    marginTop:'3%',
    display:'flex',
    flexDirection:'row'

  },  goBackSection:{
    width:'20%',
    height:'100%',
    alignSelf:'flex-start',
    justifyContent:'center',
   
  },
  logoSection:{
    height:'20%',
    width:'50%',
    alignSelf:'center',
    marginTop:'10%'
  },
  input:{
    height:'15%',
    width:'100%',
    backgroundColor:'white',
    borderRadius:4,
   
 },
 signoutButton:{
    backgroundColor:'#9E0C90',
    height:30,
    width:150,
    marginTop:'10%',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center'
  },
  signOutButtonText:{
    color:'white',
    fontSize:13,
    alignSelf:'center'
  },
 
});

export default PasswordReset;

