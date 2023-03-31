

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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {app} from '../firebase/firebase';
import { doc, setDoc } from "firebase/firestore"; 

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [error,setError]=useState('')
  const auth=getAuth()
  const db = getFirestore(app);


  const addUser=()=>{
   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if(!(reg.test(userName)===true)){
     
      setError('Please Enter Valid Email Address')

    }else if(name==''){
      setError('Please Enter Valid Name')
    }
    else if(password=='' || password!=confirmpassword || password.length<=6){
      setError('Pleaser Enter Valid Password')
    }
    else {
      setError('')
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log("User Added :",user);
            
            setDoc(doc(db, "Users",user.uid), {
              name:name
            }).then(()=>{
              navigation.navigate('tabClientNavigator')
            });

            
          })
            .catch((error) => {
             console.log("Error : ",error)
             
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
             Sign Up
          </Text>
       </View>


      <View style={styles.outerContainer}>
       
      

      <View style={styles.innerContainer}>
          <View style={styles.username}>
            <Text style={styles.usernameText}>
              name : 
            </Text>
          </View>

          <View >
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
           />
          </View>
        </View>



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

        <View style={styles.innerContainer}>
          <View style={styles.username}>
            <Text style={styles.usernameText}>
              Confirm Password : 
            </Text>
          </View>

          <View >
          <TextInput
            
            style={styles.input}
            onChangeText={setconfirmPassword}
            value={confirmpassword}
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
         onPress={
          ()=>{
            addUser()
          }
         }
         >
           <Text style={styles.submitButtonText}>
            Sign Up
           </Text>
        </TouchableOpacity>

        <View style={{justifyContent:'center',marginTop:20}}>
          <Text style={{alignSelf:'center'}}>
             Already Register User ?  
            <Text 
              style={{color:'#9E0C90'}}
              onPress={() => navigation.navigate('login')}> 
              LogIn
              </Text> 
           </Text> 
        </View>  
      </View>


    </View>
  );
};
  
export default SignUp;


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
    height:'40%',
    width:'100%',
    borderWidth:3,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderColor:'#787575',
    marginTop:'10%',
    justifyContent:'center',
    
  },
  
  innerContainer:{
    height:'20%',
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



