
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
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpinner
} from '@viro-community/react-viro';



const InitialScene =(props)=>{
  
  useEffect(()=>{

    console.log("from ar",props.props);
  
    },[])
  
    
  const [rotation,setRotation]=useState([0,0,0])
  const [position,setPosition]=useState([0,0,-100])
  const [scale,setScale]=useState(props.props.scale)

  
 
  const [isLoading,setLoadig]=useState(false)
  ViroMaterials.createMaterials({
    material:{
      // diffuseTexture:{uri:'https://firebasestorage.googleapis.com/v0/b/furniturereality-8f496.appspot.com/o/productImages%2F7wMAq0mUloROKkAxYCw0%2FcolorOptions%2Fwooden.jpeg?alt=media&token=7a07ab84-3410-4195-9cbc-006a05029f4d'}
      diffuseTexture:{uri:props.props.ARMaterials}


    }
    
    
  })

  const moveObject=(newPosition)=>{
    //console.log(newPosition);
    setPosition(newPosition)
 }

 const rotateObject=(rotateState, rotationFactor, source)=>{
  if(rotateState===3){
    let currentLocation=[rotation[0]-rotationFactor,rotation[1]-rotationFactor,rotation[2]-rotationFactor];
    setRotation(currentLocation)
    console.log("rotation",currentLocation);
  }
}

const scaleObject=(pinchState, scaleFactor, source)=>{
  if(pinchState===3){
   let currentScale=scale[0];
   let newScale=currentScale*scaleFactor;
   let newScaleArray=[newScale,newScale,newScale]
    
   console.log(newScaleArray);
   setScale(newScaleArray)
  }
 
}

    const handleLoadStart = () => {
      console.log("OBJ loading has started");   
      setLoadig(true)
    }  
    const handleLoadEnd = () => {
      console.log("OBJ loading has finished");
      setLoadig(false)
    }
// const handleError(event) {
//   console.log("OBJ loading failed with error: " + event.nativeEvent.error);  
// }



  return (
    <ViroARScene>
      
        <ViroSpinner
        type='dark'
        position={[0, 0, -2]}
        visible={isLoading}
        
    />
      
         < Viro3DObject
            source={{uri:props.props.ARImage}}
            position={position}
            rotation={rotation}
            scale={scale}

            onDrag={moveObject}
            onPinch={scaleObject}
            //onRotate={rotateObject}
           
            materials={["material"]}
            type="OBJ"
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={()=>{
                console.log("erroe----------");
              }}
            onError={()=>{console.log('Error while loding model')}}
        />
      

      
     

      
    </ViroARScene>

    
   
    
  )
}

// function ARscreen(): JSX.Element {
const ARscreen = ({navigation,route}) => {
  useEffect(()=>{
    //console.log(route.params);
   })

  return (
 
      
          <View style={{flex:1}}>

            <View style={{height:'10%',width:'100%',flexDirection:'row'}}>

            
            <TouchableOpacity 
             style={{width:'20%',justifyContent:'center'}}
             onPress={
              ()=>{
                navigation.goBack()
              }
             }
             >
             <Image
              source={require('../assets/back.png')}
              style={{alignSelf:'flex-start',marginTop:'10%',marginLeft:'50%'}}
             />

             
            </TouchableOpacity>

            <View style={{justifyContent:'center',width:'60%'}}>
              <Text style={{alignSelf:'center',fontSize:20,marginTop:'7%',color:'#787575'}}>
                3D Preview
              </Text>
             </View>


             </View>
          
            
            <ViroARSceneNavigator
              initialScene={{
                scene:InitialScene,
                passProps: { props:route.params }

              }}
              
             
            />
          </View>
          
            

         
        
   
  );
}

const styles = StyleSheet.create({
  rotateButton:{
    marginTop:'5%',
    height:'50%',
    width:'30%',
    borderRadius:10,
    justifyContent:'center',
    backgroundColor:'purple'
  }
});

export default ARscreen;




{/* <View style={{backgroundColor:'grey',flex:0.1,flexDirection:'row',justifyContent:'space-evenly'}}>
<TouchableOpacity
 style={styles.rotateButton}
 onPress={()=>{
  // setRotation([0,0,rotation[3]+5])
 }}
>
  <Text style={{color:'white',alignSelf:'center'}}>
      Rotate Left
  </Text>
</TouchableOpacity>

<TouchableOpacity
 style={styles.rotateButton}
>
  <Text style={{color:'white',alignSelf:'center'}}>
      Rotate Right
  </Text>
</TouchableOpacity>
</View> */}