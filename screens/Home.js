import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
 
const image = { uri: "https://reactjs.org/logo-og.png" };
 
const Home = ({ navigation }) => {
   return (
     <View style={styles.container}>
             <Text style={styles.text}>XGO</Text>

 </View>
   )
}
 
export default Home
 
 
const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 image: {
   flex: 1,
   justifyContent: "center",
 
 
  
 },
 text: {
   color: "white",
   fontSize: 12,
   lineHeight: 22,
   fontWeight: "bold",
   textAlign: "center",
   backgroundColor: "#00377b"
 }
});

