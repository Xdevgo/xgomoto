import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import { Ionicons, AntDesign, FontAwesome5, Feather} from '@expo/vector-icons';
import * as deliveriesActions from '../store/actions/deliveries';
 
import * as Location from 'expo-location';
import * as Device from 'expo-device';
 
const ListItem = ({ item, navigation }) => {
const [isFetching, setIsFetching] = useState(false);
const [pickedLocation, setPickedLocation] = useState();
 
const { orden, deliveryID, action, driver, address,state, amount, googledata} = item
let status
let icon
let cre, cre2
 
 
const verifyPermissions = async () => {
 const result = await Location.requestForegroundPermissionsAsync();
 if (result.status !== 'granted') {
   console.log(
     'Insufficient permissions!'
   );
   return false;
 }
 return true;
};
 
const getLocationHandler = async () => {
 const hasPermission = await verifyPermissions();
 if (!hasPermission) {
   return;
 }
 
try {
   setIsFetching(true);
   const location = await Location.getCurrentPositionAsync({
     timeout: 5000
   });
   setPickedLocation({
     lat: location.coords.latitude,
     lng: location.coords.longitude
   });

 
   await deliveriesActions.addLocation(Device.deviceName, location.coords.longitude, location.coords.latitude, '0','0') ;
 } catch (err) {
   console.log(
    err
   );
 }
 setIsFetching(false);
};
 
if(item.state_delivery == 'E' || item.state_delivery == 'R'|| item.state_delivery == 'IR'){
 status = 'verde'
 icon = <Feather name="check-square" size={20} color="#9acd32" />
/* if(typeof item.googledata != "undefined"){
   cre = <Text style={styles.detailtextgoogle}> {item.googledata.distance.text}</Text>
   cre2 = <Text style={styles.detailtextgoogle}>{item.googledata.duration.text}</Text>
   }else{
     cre = <Text style={styles.detailtextgoogle}>0 km</Text>
     cre2 = <Text style={styles.detailtextgoogle}>0 min</Text>
   }*/
}else if (item.state_delivery == 'CR' || item.state_delivery == 'CE'){
   status = 'amarillo'
   icon =  <FontAwesome5 name="route" size={20} color="#ff6347" />
 
}else{
        icon = <AntDesign name="swap" size={21} color="#515A5A" />
}
   return (
           <TouchableOpacity
           style = { [ styles.container  ,
               {
                   backgroundColor: status === 'verde' ? '#fff' : status === 'amarillo' ? '#fff' : '#fff'
               }          
           ]} onPress={() => {  {getLocationHandler()}  navigation.navigate('DeliveryDetail', {  item : item })  }}>
           
             <View style={styles.buttonContainer}>
                   <View style={styles.button}>
                   <Text style={[
                   styles.titleText
               ]}>{orden}. { action === 'O'? 'Recolectar  ': 'Entregar  '    }       
               </Text>
                       </View>
                       <View style={styles.button}>
                       <Text style={[
                   styles.subtitleText,       
               ]}>Guia: { deliveryID }                          
               </Text>
                       </View>
                          
                       <View style={styles.button}>
                       <View style= {styles.icon}>
               {icon}
               </View>
                       </View>
               </View>
 
 
             <View style={styles.buttonContainer}>
 
                   <View style={styles.button}>
                   {cre}
                       </View>
                       <View style={styles.button}>
                       {cre2}
                       </View>
               </View>
 
 
               <View style={styles.buttonContainer}>
               <Text style={styles.drivertext}>Driver: {driver}</Text>
               </View>
               <View style={styles.buttonContainer}>
               <Text style={styles.detailtextaddress}>{item.address}</Text>
               </View>
 
           
 
              
           </TouchableOpacity>
   )
}
 
 
const styles = StyleSheet.create({
 
   container: {
       backgroundColor: '#fff',
       borderRadius: 0.5,
       marginBottom:0,
       padding: 8,
   },
   titleText: {
       fontSize: 15,
    
       color: "#515A5A"
     },
     subtitleText: {
       fontSize: 15,
       color: "#446293",
       fontWeight: "bold",
     },
     icon :{
       flex: 1,
       justifyContent: 'flex-end',
       alignItems: 'flex-end',
     },
     buttonImageIconStyle: {
       padding: 10,
       margin: 5,
       height: 25,
       width: 25,
       resizeMode: 'stretch',
       borderRadius: 5,
     },
     detailtextgoogle: {
       fontSize: 15,
       fontWeight: "bold",
       color: "#9acd32"
     },
     detailtextaddress: {
       fontSize: 12,
       color: "#446293"
     },
     drivertext:{
       fontSize: 12,
       color: "#ff6347"
     },
     datagoogle: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'flex-end',
       marginTop: 10,
       width: 300,
       maxWidth: '80%'
     },
     buttonContainer: {
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'space-between',
       paddingHorizontal: 10
   },
   button:{
       width: 100
   }
    
})
 
export default ListItem
 

