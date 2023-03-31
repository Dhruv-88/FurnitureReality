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
  TouchableOpacity,
  FlatList
} from 'react-native';

import { getFirestore } from "firebase/firestore";
import {app} from '../firebase/firebase';
import { getAuth } from "firebase/auth";
import {  doc,getDoc,collection ,query, where,getDocs} from "firebase/firestore"; 
import { useIsFocused } from '@react-navigation/native';


const Cart = ({navigation}) => {
 

const db = getFirestore(app);
const [items,updateitems]=useState([]); 
const [products,updateProducts]=useState([])
const auth = getAuth();
const uid = auth.currentUser.uid; 

const isFocused = useIsFocused();


useEffect(()=>{
 getCartItems()
},[isFocused])


    async function getCartItems(){
        const docRef = doc(db,"Users",uid);
        const docSnap = await getDoc(docRef);

        const productRef = collection(db, "products");
        //console.log(docSnap.data().cart);

        updateitems(docSnap.data().cart)
      
        console.log();
        var prodctArr=[]
        for(i=0;i<items.length;i++){
          
          const q = query(collection(db, "Products"), where("productId", "==",items[i]));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            prodctArr.push(doc.data())
          });
    
        }

        console.log("-",prodctArr);
        updateProducts(prodctArr)
        

    }

    function renderProduct(item,navigation){
       return(
        <TouchableOpacity 
        onPress={()=>{
          //navigation.navigate('IndevidualProductScreen',item)
        }}
         style={styles.indevidualProduct}>
            <View style={{width:'50%'}}>

              <View >
                <Image
                  source={{uri:item.productDisplayImage}}
                  style={{height:100,width:'80%',alignSelf:'center'}}
                />

                
              </View>
              <Text
                style={{alignSelf:'center',marginTop:10,fontWeight:700,color:'#787575'}}
              >{item.productName}</Text>

              <Text style={{color:'#9E0C90',fontWeight:700,alignSelf:'center'}}>
                Price : {item.productPrice} {`\u20B9`}
              </Text>
            </View>

            <View>
                  <Text style={{fontSize:12}}>
                  Product Dimensions :
                </Text>
                <Text style={{fontWeight:500,marginTop:10,color:'#787575'}}> Height : {item.productHeight}</Text>
                <Text style={{fontWeight:500,color:'#787575'}}> Width : {item.productWidth}</Text>
            
              <TouchableOpacity
              
              >
                <Text>Remove</Text>
              </TouchableOpacity>
        
            </View>

       </TouchableOpacity>
       )
    }



  return (
   
  <View style={styles.container}>
     <View style={{height:'10%',justifyContent:'center'}}>
      <Text style={{alignSelf:"center",color:'#787575',fontSize:20}}>
        My Cart
      </Text>
     </View>  

     <View style={{height:'90%',width:'100%',display:'flex',flexDirection:'row'}}>
      <FlatList
            data={products}
            renderItem={({item}) => renderProduct(item,navigation)}
            keyExtractor={item => item.productId}
            style={{height:'100%'}}
          />
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
  productContainer:{
    height:'90%',
    width:'100%',
    borderWidth:1,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
   
   
  },
  indevidualProduct:{
    height:200,
    width:'100%',
    marginLeft:'5%',
    backgroundColor:'white',
    borderRadius:10,
    paddingTop:'10%',
    marginTop:'3%',
    display:'flex',
    flexDirection:'row'
    
  }
  
 
});

export default Cart;

