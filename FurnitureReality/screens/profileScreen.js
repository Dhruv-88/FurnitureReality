
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
  TextInput,
  TouchableOpacity
} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import {  doc,getDoc ,getFirestore,query, where,getDocs,onSnapshot,updateDoc} from "firebase/firestore"; 
import {app} from '../firebase/firebase';







const Profile = ({navigation}) => {
  const db = getFirestore(app);
  const auth = getAuth();
  const uid = auth.currentUser.uid; 
  const [userName,updateUSerName]=useState('')

  useEffect(()=>{
   getUserDeatis()
  },[])

  async function getUserDeatis(){

    const docRef = doc(db,"Users",uid);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data().name);

    updateUSerName(docSnap.data().name)
    
  }
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

    
    <View style={styles.headerContainer}>
         <TouchableOpacity 

          onPress={ ()=>navigation.navigate('CategoriesStack',{screen:'CategoryIntro'})}
          style={styles.goBackSection}>
            <Image
             style={{alignSelf:'center'}}
             source={require('../assets/back.png')}
            />
         </TouchableOpacity>
         <View style={{justifyContent:'center',alignItems:'center',width:'60%'}}>
           <Text style={{alignSelf:'center',color:"#787575",fontSize:20}}>
             My Profile
           </Text>
          </View>     
      </View>  

      <View style={styles.logoSection}>
        <Image
         source={require('../assets/logo.png')}
         style={{height:'100%',width:'100%'}}
        />

      </View>

      <View style={{padding:'10%'}}>
        <View>
          <Text style={{fontSize:25}}>
            Hello  {userName},
          </Text>
        </View>

        <View style={{padding:'10%',height:'80%'}}>
        



          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/folder.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity 
              
               style={{height:'100%',justifyContent:'center'}}
               onPress={
                ()=>{
                  alert('Insufficent Details')
                }
              }
               >
                <Text style={{fontSize:20,alignSelf:'center'}}>My Details</Text>
              </TouchableOpacity>
          </View>





          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/pastOrders.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity
              
                style={{height:'100%',justifyContent:'center'}}
                onPress={
                  ()=>{
                    alert('Functionality Under Devlopment')
                  }
                }
                >
                <Text style={{fontSize:20,alignSelf:'center'}}>Past Orders</Text>
              </TouchableOpacity>
          </View>






          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/clock.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity 
                style={{height:'100%',justifyContent:'center'}}
                onPress={
                  ()=>{
                    alert('Functionality Under Devlopment')
                  }
                }
                >
                <Text style={{fontSize:20,alignSelf:'center'}}>Trace My Orders</Text>
              </TouchableOpacity>
          </View>







          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/password.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity 
               onPress={
                ()=>{
                  navigation.navigate('passwordReset')
                }
               }
              style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Change Password</Text>
              </TouchableOpacity>
          </View>





          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/privacy.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Privacy Policy</Text>
              </TouchableOpacity>
          </View>





          <View style={{flexDirection:'row',height:'10%'}}>
            <View style={{width:'20%',justifyContent:'center',height:'100%'}}>
                <Image
                source={require('../assets/help.png')}
                style={{alignSelf:'center',height:'60%',width:'50%'}}
                />
            </View>

              <TouchableOpacity style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Help</Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity
              style={styles.signoutButton}
              onPress={()=>onSignOut()}
            >
            <Text style={styles.signOutButtonText}>
              SignOut
            </Text>
        </TouchableOpacity>
        </View>

       

      </View>
   
   
  </View>
  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
    padding:'5%',
    backgroundColor:'#E9EAFA'
  },
  signoutButton:{
    backgroundColor:'#9E0C90',
    height:25,
    width:100,
    marginTop:'10%',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center'
  },
  signOutButtonText:{
    color:'white',
    fontSize:15,
    alignSelf:'center'
  },
  headerContainer:{
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
  }
  
 
});

export default Profile;

