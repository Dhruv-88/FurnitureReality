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

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";






const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');

 const onSignIn=()=>{
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
  if(!(reg.test(userName)===true)){
   
    setError('Please Enter Valid Email Address')

  }
  else if(password==''  || password.length<=6){
    setError('Pleaser Enter Valid Password')
  }
  else {
    setError('')
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        setUserName('');
        setPassword('')
        navigation.navigate('tabClientNavigator')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError('Please Enter valid Email or Password ')
      });

  }
 } 
  return (
    <View
      style={styles.container}>

      <View >

        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />

      </View>
      
       <View >
          <Text style={styles.subTitle}>
             Log In 
          </Text>
       </View>


      <View style={styles.outerContainer}>
       

        <View style={styles.innerContainer}>
          <View style={styles.username}>
            <Text style={styles.usernameText}>
              Email : 
            </Text>
          </View>

          <View >
          <TextInput
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
           />
          </View>
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.username}>
            <Text style={styles.usernameText}>
              password : 
            </Text>
          </View>

          <View >
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
           />
          </View>
        </View>

       

      </View>
      {
            error==''?null:(<View>
              <Text style={{color:'red'}}>
                {error}
              </Text>
            </View>)
          }
      <View>
        <TouchableOpacity
         style={styles.submitButton}
         onPress={()=>onSignIn()}
         >
           <Text style={styles.submitButtonText}>
            Log In
           </Text>
        </TouchableOpacity>
        
          
        
        <View style={{justifyContent:'center',marginTop:20}}>
          <Text style={{alignSelf:'center'}}>
             New User ?  
            <Text 
              style={{color:'#9E0C90'}}
              onPress={() => navigation.navigate('signup')}>
              SignUp
              </Text> 
           </Text> 
        </View>  
      </View>


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
  subTitle:{
    fontSize:30,
    color:'#787575',
    alignSelf:'center',
   
  },
  outerContainer:{
    height:'25%',
    width:'100%',
    borderWidth:3,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderColor:'#787575',
    marginTop:'10%',
    justifyContent:'center'
  },
  
  innerContainer:{
    height:'30%',
    width:'90%',
    marginTop:10,
    alignSelf:'center',
    
  },
  username:{
    height:30,
    width:'100%',
    
    borderColor:'red'
  },
  usernameText:{
    fontSize:20,
    color:'#787575'
  },
  input:{
     height:30,
     width:'100%',
     backgroundColor:'white',
     borderRadius:4,
    
  },
  submitButton:{
    backgroundColor:'#9E0C90',
    height:50,
    width:200,
    marginTop:'10%',
    borderRadius:10,
    justifyContent:'center'
  },
  submitButtonText:{
    color:'white',
    fontSize:25,
    alignSelf:'center'
  }
 
});

export default Login;

