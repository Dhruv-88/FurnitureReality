
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
import { getAuth, signOut } from "firebase/auth";







const Profile = ({navigation}) => {
 
const onSignOut=()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    navigation.navigate('login')
  }).catch((error) => {
    alert('Something Wrong Please try again later')
  });
}


  return (
   
  <View style={styles.container}>
    <TouchableOpacity
         style={styles.signoutButton}
         onPress={()=>onSignOut()}
         >
           <Text style={styles.signOutButtonText}>
            SignOut
           </Text>
        </TouchableOpacity>
  </View>
  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:'5%',
    backgroundColor:'#E9EAFA'
  },
  signoutButton:{
    backgroundColor:'#9E0C90',
    height:50,
    width:200,
    marginTop:'10%',
    borderRadius:10,
    justifyContent:'center'
  },
  signOutButtonText:{
    color:'white',
    fontSize:25,
    alignSelf:'center'
  }
  
 
});

export default Profile;

