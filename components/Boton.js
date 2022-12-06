import React from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
 
 
 
const Boton = (props) => {
 
   const { onPress, text } = props
   return (
       <TouchableOpacity style={styles.buttonContainer}
       onPress = { onPress }>
           <Text style={styles.buttonText}> { text }</Text>
       </TouchableOpacity>
   )
}
 
export default Boton
 
const styles = StyleSheet.create({
 
   buttonContainer: {
      backgroundColor: '#FFF',
      marginBottom: 10,
      paddingHorizontal: 20,
      paddingVertical: 10
   },
   buttonText:{
       color: '#000'
   }
 
})
 

