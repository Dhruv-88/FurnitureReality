
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
import { getFirestore } from "firebase/firestore";
import {app} from '../firebase/firebase';
import {  doc,getDocs,collection } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";






const CategoriesScreen = ({navigation}) => {
 
  // const [categories,updateCategories]=useState([]);
  // const db = getFirestore(app);

  // async function getCategories() {
  //   const docRef = collection(db,"Categories");
  //   const docSnap = await getDocs(docRef);

  //   var arr=[]
  //   docSnap.forEach(doc => {
  //     //console.log(doc.data());
  //     arr.push(doc.data())
  // })
   
  //   console.log("Final array : ",arr);
  //   updateCategories(arr)
   
  // }

  // useEffect(() => {
  //   getCategories()
  
  // },[])
 

  return (
   
  <View style={styles.container}>
      <View style={styles.headerContainer}>
         <TouchableOpacity 
          onPress={()=>navigation.goBack()}
          style={styles.goBackSection}>
            <Image
             style={{alignSelf:'center'}}
             source={require('../assets/back.png')}
            />
         </TouchableOpacity>
         <View style={{alignItems:'center',width:'60%',justifyContent:'center'}}>
           <Text style={{alignSelf:'center',color:"#787575",fontSize:20}}>
             Categories
           </Text>
          </View>     
      </View>


      <View style={styles.categorySection}>
        <TouchableOpacity 
         onPress={
          ()=>{
            navigation.navigate('IndevidualCategory',{categoryName:'Chair'})
          }
         }
         style={styles.indevidualCategoryContainer}>
          
          <Image 
           style={styles.indevidualCategoryImage}
           source={require('../assets/chair.png')}
          />
         

         <View style={styles.indevidualCategoryTextContainer}>
          <Text style={styles.indevidualCategoryText}>
              Chair
            </Text>
         </View>
          
          
        </TouchableOpacity>

        <TouchableOpacity 
           onPress={
            ()=>{
              navigation.navigate('IndevidualCategory',{categoryName:'Sofa'})
            }
           }
          style={styles.indevidualCategoryContainer}>
          <Image 
            style={styles.indevidualCategoryImage}
            source={require('../assets/sofa.png')}
            />
          

          <View style={styles.indevidualCategoryTextContainer}>
            <Text style={styles.indevidualCategoryText}>
                Sofa
              </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
           onPress={
            ()=>{
              navigation.navigate('IndevidualCategory',{categoryName:'Table'})
            }
           }
          style={styles.indevidualCategoryContainer}>
          <Image 
            style={styles.indevidualCategoryImage}
            source={require('../assets/table.png')}
            />
          

          <View style={styles.indevidualCategoryTextContainer}>
            <Text style={styles.indevidualCategoryText}>
                Table
              </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
           onPress={
            ()=>{
              navigation.navigate('IndevidualCategory',{categoryName:'Wardrob'})
            }
           }
          style={styles.indevidualCategoryContainer}>
          <Image 
            style={styles.indevidualCategoryImage}
            source={require('../assets/wardrob.png')}
            />
          

          <View style={styles.indevidualCategoryTextContainer}>
            <Text style={styles.indevidualCategoryText}>
                Wardrob
              </Text>
          </View>
        </TouchableOpacity>

      </View>
  </View>
  );
};
  

const styles = StyleSheet.create({
  container:{
    flex: 1,
   
    alignItems: 'center',
    padding:'5%',
    backgroundColor:'#E9EAFA'
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
  categorySection:{
    height:'90%',
    width:'100%',
    display:'flex',
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop:'5%'
  },
  indevidualCategoryContainer:{
    backgroundColor:'white',
    height:'40%',
    width:'45%',
    borderRadius:10,
    margin:'2.5%',
    padding:'5%'
  },
  indevidualCategoryImage:{
    alignSelf:'center',
    height:"60%",
    width:'100%'
   },
   indevidualCategoryTextContainer:{
    height:'40%',
    justifyContent:'center'
  },
    indevidualCategoryText:{
      fontSize:20,
      alignSelf:'center',
      color:'#787575'}
});

export default CategoriesScreen;

