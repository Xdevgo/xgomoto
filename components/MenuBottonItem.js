import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
 
const MenuBottonItem = ( {text, onPress, icon} ) => {
   return (
       <TouchableOpacity
       style = { styles.buttonContainer }
       onPress = { onPress }
       >
 
           <Image
           name = {icon}
           source = {{ uri: icon}}
           style = { styles.image }
           />
           <Text
           style = {styles.text }
           >{ text }</Text>
       </TouchableOpacity>
   )
}
 
const styles = StyleSheet.create({
 
   buttonContainer: {
       alignItems: 'center',
       backgroundColor: '#fbfbfb',
       borderRadius: 10,
       borderRadius: 10,
       flexDirection: 'row',
       marginBottom: 15,
       padding: 15,
 
   },
 
   image: {
       borderRadius: 23,
       height: 45,
       width: 45
   },
 
   text: {
       fontWeight: 'bold',
       marginStart: 7,
 
   }
})
 
export default MenuBottonItem
 
 
 

