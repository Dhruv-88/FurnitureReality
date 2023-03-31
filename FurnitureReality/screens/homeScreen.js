

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
import {  doc,getDocs,collection } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const HomeScreen = ({navigation}) => {
 
  
  const db = getFirestore(app);

  const [categories,updateCategories]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState('Chair')


  async function getCategories() {
    const docRef = collection(db,"Categories");
    const docSnap = await getDocs(docRef);
   
    var arr=[]
    docSnap.forEach(doc => {
      //console.log(doc.data());
      arr.push(doc.data())
  })
   
    console.log("Final array : ",arr);
    updateCategories(arr)
   
  }
  function renderCategoryView(item){
    return (
    <View style={styles.categoryIndevidualView}>
     
     <Image
      source={{uri:item.CategoryImage}}
      style={{height:'30%',
      width:150,
      alignSelf:'center',
      marginTop:'40%',
      marginBottom:'20%'
      
    }}
     />
     <Text
      style={styles.indevidualCategoryDescription}>
        {item.CategoryDescription}
      </Text>

      <TouchableOpacity
       onPress={()=>{
         navigation.navigate("CategoriesStack",{screen:'IndevidualCategory',params:{categoryName:item.CategoryName}})
       }}
       style={{width:80,height:'7%',backgroundColor:'#9E0C90',margin:'10%',borderRadius:10,justifyContent:'center'}}>

        <Text style={{color:'white',alignSelf:'center'}}>
          Explore
        </Text>
      </TouchableOpacity>
    </View>
  )}
  // async function getImages(){
      
  //   const storage = getStorage();
  //   getDownloadURL(ref(storage, 'CategoryImages/chair.png'))
  //     .then((url) => {
  //       console.log("IMAGE URL :",url );

        
  //     })
  // .catch((error) => {
  //   // Handle any errors
  // });
  // }
  useEffect(() => {
    getCategories()
  
  },[])

  return (
   
  <View style={styles.container}>
    <View style={styles.titleContainer}>

      <View style={styles.titleSubContainerOne}>

        <View>
          <Text style={styles.titleText}>
            furniture buying
          </Text>
        </View>
        <View>
          <Text style={styles.titleText}>
            made easy
          </Text>
        </View>

      </View>

      <View >
        <Text style={styles.subTitleText}>
          Design furniture using AR. 
        </Text>
      </View>

    </View>
   

  <View style={styles.menuBarContainer}>
     
       <View style={selectedCategory==='Chair'?styles.selectedIndevidualMenu:styles.indevidualMenu}>
          <TouchableOpacity
           onPress={
            ()=>{
              setSelectedCategory('Chair')
            }
           }
          >
            <Text style={styles.indevidualMenuText}>
              Chair
            </Text>
          </TouchableOpacity>  
      </View>  

      <View style={selectedCategory==='Sofa'?styles.selectedIndevidualMenu:styles.indevidualMenu}>
          <TouchableOpacity
           onPress={
            ()=>{
              setSelectedCategory('Sofa')
            }
           }
          >
            <Text style={styles.indevidualMenuText}>
              Sofa
            </Text>
          </TouchableOpacity>  
      </View>  
      

      <View style={selectedCategory==='Table'?styles.selectedIndevidualMenu:styles.indevidualMenu}>
          <TouchableOpacity
           onPress={
            ()=>{
              setSelectedCategory('Table')
            }
           }
          >
            <Text style={styles.indevidualMenuText}>
              Table
            </Text>
          </TouchableOpacity>  
      </View> 


      <View style={selectedCategory==='Wardrobes'?styles.selectedIndevidualMenu:styles.indevidualMenu}>
          <TouchableOpacity
           onPress={
            ()=>{
              setSelectedCategory('Wardrobes')
            }
           }
          >
            <Text style={styles.indevidualMenuText}>
              Wardrobes
            </Text>
          </TouchableOpacity>  
      </View> 

  </View> 
   
  <View style={styles.categoryCatlogConatiner}>
     <FlatList
       data={categories}
       renderItem={({item}) => renderCategoryView(item)}
       keyExtractor={item => item.CategoryID}
       horizontal
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
  titleContainer:{
    height:'20%',
    width:'100%',
   
    marginTop:'10%'
  },
  titleSubContainerOne:{
   
    width:'100%',
    
  },
  titleText:{
    fontSize:40,
    color:'black'
  },
  subTitleText:{
    fontSize:14,
    color:'#787575'
  },
  menuBarContainer:{
    height:'5%',
    width:'100%',
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  indevidualMenuText:{
    color:'#787575',
    fontSize:14,
    alignSelf:'center'
  },
  selectedIndevidualMenu:{
    borderBottomWidth:2,
    justifyContent:'center',
    borderColor:'#9E0C90'
  },
  indevidualMenu:{
    justifyContent:'center'
  },
  categoryCatlogConatiner:{
    height:'70%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  categoryIndevidualView:{
    height:'90%',
    width:200,
    backgroundColor:'#FAFAFA',
    borderRadius:20,
    marginHorizontal:15,
    
  },
  indevidualCategoryDescription:{
    color:"#787575",
    fontSize:12,
    margin:20
  },


  
 
});

export default HomeScreen;

