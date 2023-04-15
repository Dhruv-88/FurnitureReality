
import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {app} from '../firebase/firebase';
import { collection, query, where, doc, getDocs } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";


const IndevidualCategory = ({route,navigation}) => {
    // const storage = getStorage();
    const [category,setCategory]=useState('')
    const [products,setProducts]=useState([])

    const db = getFirestore(app);


   

    async function getProducts() {
     let i=10;
      const docRef = query(collection(db,"Products"), where("productCategory", "==",route.params.categoryName));
      const docSnap = await getDocs(docRef);
    
      var arr=[]
      docSnap.forEach(doc => {
        
        arr.push(doc.data())
    })
     
      
      i++;
      setProducts(arr)
      //console.log(`---------Final array  check -->: ${i} `,products);
    }
    function renderProduct(item,navigation){
      return (
        <TouchableOpacity 
         onPress={()=>{
           navigation.navigate('IndevidualProductScreen',item)
         }}
         style={styles.indevidualProduct}>

          <View>
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
        </TouchableOpacity>
      )
    }

    useEffect(()=>{
    
      setCategory(route.params.categoryName)
      //console.log("from use effect",route.params.categoryName);
       getProducts()


    },[route.params])
   

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
             {category}
           </Text>
          </View>     
      </View>  

      
        <FlatList
          data={products}
          renderItem={({item}) => renderProduct(item,navigation)}
          keyExtractor={item => item.productId}
          style={{height:'100%',width:'100%'}}
          numColumns={2}
        />
       
      
  </View>
  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    padding:'5%',
    backgroundColor:'#E9EAFA',
    
  },
  headerContainer:{
    width:'100%',
    height:'5%',
    marginTop:'3%',
    display:'flex',
    flexDirection:'row'

  },
  goBackSection:{
    width:'20%',
    height:'100%',
    alignSelf:'flex-start',
    justifyContent:'center',
   
  },
  productContainer:{
    height:'90%',
    width:'100%',
    
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:'10%'
  },
  indevidualProduct:{
    height:200,
    width:'45%',
    marginLeft:'2%',
    marginRight:'5%',
    backgroundColor:'white',
    borderRadius:10,
    paddingTop:'10%',
    marginTop:'10%',
   
  
    
  }
  
 
});

export default IndevidualCategory;

