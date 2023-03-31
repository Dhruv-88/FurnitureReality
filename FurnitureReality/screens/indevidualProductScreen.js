
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
  TouchableOpacity
} from 'react-native';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {app} from '../firebase/firebase';
import { doc, setDoc ,updateDoc, arrayUnion,} from "firebase/firestore"; 
const IndevidualProductScreen = ({navigation,route}) => {

  const [uid,setUid]=useState('')
  const db = getFirestore(app);
  

  useEffect(()=>{

  console.log("====",route.params);
  const auth = getAuth();
  const user = auth.currentUser; 
  
  setUid(user.uid)

  },[])
  
  const addProductToCart=async ()=>{
    const cartRef = doc(db, "Users", uid);

    await updateDoc(cartRef, {
      cart: arrayUnion(route.params.productId)
  });

   navigation.navigate("CartStack",{screen:'CartIntro'})
  }

  return (
    <View
      style={styles.container}>
      <View style={styles.productImageContainer}>
       
        <View>
          <TouchableOpacity
           onPress={
            ()=>{navigation.goBack()}
           }
          >
            <Image
            source={require('../assets/back.png')}
            style={{marginLeft:20}}
          />

          </TouchableOpacity>
         
        </View>
       
       <View>
        <Image
            style={styles.productImage}
            source={{uri:route.params.productDisplayImage}}
          />

        
       </View>
      </View>

      <ScrollView>

      <View style={{padding:'10%'}}>
         <Text style={{fontSize:20}}>
          Color Options :  
        </Text>  

        <View style={{display:'flex',flexDirection:'row'}}>
          {
            route.params.productColorOptions.map((imageUrl)=>{
              return(
                <TouchableOpacity>

                  <Image
                  style={{height:50,width:50,margin:5,borderRadius:4}}
                  source={{uri:imageUrl}}
                  />

                 
                </TouchableOpacity>
              )
            })
          }
        </View>
       <View style={{marginTop:20}}>
         <Text style={{fontSize:20}}>
          Product Description :
         </Text>
         <Text style={{marginTop:10,color:'#787575'}}>
          {route.params.productDescription}
         </Text>
       </View>

       <View style={{marginTop:20}}>

        <Text style={{fontSize:20}}>
          Product Dimensions :
        </Text>

        <View>
          <Text style={{fontWeight:500,marginTop:10,color:'#787575'}}> Height : {route.params.productHeight}</Text>
          <Text style={{fontWeight:500,color:'#787575'}}> Width : {route.params.productWidth}</Text>
        </View>
       </View>
        <View>
          <TouchableOpacity style={{marginTop:30,width:'100%',height:50,backgroundColor:'#9E0C90',borderRadius:10,justifyContent:'center'}}>
            <Text 
            style={{alignSelf:'center',color:'white',fontSize:20}}>Virtual Try On !!</Text>
          </TouchableOpacity>
        </View>
        
        <View>
        <TouchableOpacity
        onPress={
          ()=>{
            addProductToCart()
          }
        }
        style={styles.addToCartButton}>
          <Text style={{alignSelf:'center',color:'white',fontSize:20}}>
            Add To cart
          </Text>
        </TouchableOpacity>
       </View>
        </View> 
       
      
      </ScrollView>
    </View>



  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
   
    backgroundColor:'#E9EAFA'
  },
  title:{
    fontSize:40,
    color:'#787575',
    marginTop:50
    
  },productImage:{
    height:200,
    width:200,
    alignSelf:'center'
  },
  productImageContainer:{
    height:350,
    backgroundColor:'white',
    width:'100%',
    justifyContent:'center',
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
  },
  addToCartButton:{
    marginTop:30,
    width:'100%',
    height:50,
    backgroundColor:'#787575',
    borderRadius:10,
    justifyContent:'center'
  }
  
 
});

export default IndevidualProductScreen;

