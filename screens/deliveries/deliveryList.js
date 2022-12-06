import React , { useState, useEffect, useCallback }  from 'react'
import { View, Text,  FlatList, TouchableOpacity , StyleSheet, } from 'react-native'
import ListItem from '../../components/ListItem';

import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
 
import * as deliveriesActions from '../../store/actions/deliveries';
 
const Deliveries = ({ navigation }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [error, setError] = useState();
   const [pickedLocation, setPickedLocation] = useState();
   const [isFetching, setIsFetching] = useState(false);
   const deliveries = useSelector(state => state.deliveries.availableDeliveries);
   const dispatch = useDispatch();
   const [internetcheck, setInternetCheck] = useState(0);
 
   const verifyPermissions = async () => {
     const result = await Location.requestForegroundPermissionsAsync();
     if (result.status !== 'granted') {
       Alert.alert(
         'Insufficient permissions!',
         'You need to grant location permissions to use this app.',
         [{ text: 'Okay' }]
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
     //console.log(location)
       setPickedLocation({
         lat: location.coords.latitude,
         lng: location.coords.longitude
       });
 
       await deliveriesActions.addLocation(Device.deviceName, location.coords.longitude, location.coords.latitude, '0','0') ;
        
     } catch (err) {
       Alert.alert(
         'Could not fetch location!',
         'Please try again later or pick a location on the map.',
         [{ text: 'Okay' }]
       );
     }
     setIsFetching(false);
   };
 
  
  const handlerLoadDeliveries  = async () => {
   try {
     await dispatch(deliveriesActions.fetchDeliveries());
   } catch (err) {
     setError(err.message);
   }
  }
 
  console.log("-------------------------------------------------------------")
   const loadDeliveries = useCallback(async () => {
       setError(null);
       setIsRefreshing(true);
       try {
         await dispatch(deliveriesActions.fetchDeliveries());
       } catch (err) {
         setError(err.message);
       }
       setIsRefreshing(false);
     }, [dispatch, setIsLoading, setError]);
 
 
     /*useEffect(() => {
       setIsLoading(true);
       console.log("DEBERIA DE CARGAR")
       loadDeliveries().then(() => {
         setIsLoading(false);
       });
 
       getLocationHandler();
 
     }, []);*/
 
     useEffect(() => {
 
       setIsLoading(true);       
       const unsubscribe = navigation.addListener('focus', () => {
         console.log("DEBERIA DE CARGAR")
         loadDeliveries().then(() => {
           setIsLoading(false);
         });
 
         return unsubscribe
       })
       getLocationHandler();
     }, [navigation]);
 
 
   return (
       <View style = {styles.screen}>
         <TouchableOpacity style={styles.buttonContainer} onPress={handlerLoadDeliveries}>
           <Text style = {styles.buttonText}>
           Actualizar Ruta
           </Text>
         </TouchableOpacity >
       
           <FlatList
           data = {deliveries}
           keyExtractor = {(item) => item.id}
           renderItem = {({ item, index }) => <ListItem item = { item } navigation = { navigation }/>}
           ItemSeparatorComponent = { () => <View style = {{ marginVertical: 0, borderColor: '#D7DBDD', borderWidth: 0.3}}/>}
           //ListHeaderComponent = { () => <Text style = {{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}> Listado de Envios </Text>}
           />
       </View>
   )
}
 
export default Deliveries
 
const styles = StyleSheet.create({
 screen: {
     flex: 1,
     padding: 1,
     marginHorizontal: 2
 },
 buttonContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   paddingVertical: 15,
   paddingHorizontal: 32,
   borderRadius: 2,
   elevation: 3,
   backgroundColor: '#4682b4',
},
buttonText:{
color:'white',
fontSize:17
}

});