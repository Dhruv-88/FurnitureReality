
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
  const [rotation,setRotation]=useState([0,100,0])
  const [position,setPosition]=useState([0,0,-100])
  const [scale,setScale]=useState([1,1,1])
 
  const [isLoading,setLoadig]=useState(false)
  ViroMaterials.createMaterials({
    wood:{
      // diffuseTexture:{uri:'https://firebasestorage.googleapis.com/v0/b/furniturereality-8f496.appspot.com/o/productImages%2F7wMAq0mUloROKkAxYCw0%2FcolorOptions%2Fwooden.jpeg?alt=media&token=7a07ab84-3410-4195-9cbc-006a05029f4d'}
      diffuseTexture:require('./assets/wood.jpeg'),


    },
    pink:{
      diffuseTexture:{uri:'https://firebasestorage.googleapis.com/v0/b/furniturereality-8f496.appspot.com/o/productImages%2F7wMAq0mUloROKkAxYCw0%2Fm1.jpg?alt=media&token=977c0105-5d7f-4da0-adc6-e38c0e7c7f92'}
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
            source={{uri:'https://firebasestorage.googleapis.com/v0/b/furniturereality-8f496.appspot.com/o/productImages%2F7wMAq0mUloROKkAxYCw0%2Fsofa.obj?alt=media&token=45f2eca9-12df-46b1-a890-686ec1520fd8'}}
            position={position}
            rotation={rotation}
            scale={scale}

            onDrag={moveObject}
            onPinch={scaleObject}
            //onRotate={rotateObject}
           
            materials={['wood']}
            type="OBJ"
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              //onError={this._onError}
            onError={()=>{console.log('Error while loding model')}}
        />
      

      
     

      
    </ViroARScene>

    
   
    
  )
}

function ARscreen(): JSX.Element {
  

  return (
 
      
          
            <ViroARSceneNavigator
              initialScene={{
                scene:InitialScene
              }}
            />
         

         
        
   
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