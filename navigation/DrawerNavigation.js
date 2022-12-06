import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import * as Device from 'expo-device';

import Home from '../screens/Home'
import Deliveries from '../screens/deliveries/deliveryList'
import DeliveryDetail from '../screens/deliveries/deliveryDetail'
import MenuBottonItem from '../components/MenuBottonItem'

 
const Drawer = createDrawerNavigator()
 
const DrawerNavigation = () => {
   return (
  
       <Drawer.Navigator
       drawerContent = { (props) => <MenuItems {...props}/>  }
       >
           <Drawer.Screen
               name = 'Inicio'
               component = { Home }
               />
 
               <Drawer.Screen
               name = 'Entregas'
               component = { Deliveries }
               />

              <Drawer.Screen
               name = 'DeliveryDetail'
               component = { DeliveryDetail }
               />
   
 
       </Drawer.Navigator>
   )
}
 
export default DrawerNavigation
 
 
const MenuItems = ({ navigation }) => {
   return (
       <DrawerContentScrollView
        style = { styles.container }
       >
           <Text
           style = { styles.title }
           >Menú</Text>
 
           <MenuBottonItem
           icon = 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
           text = "Home"
           onPress = { () => navigation.navigate('Inicio')}
           />
 
           <MenuBottonItem
           icon = 'https://images.pexels.com/photos/4246121/pexels-photo-4246121.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
           text = "Entregas"
           onPress = { () => navigation.navigate('Entregas') }
           />
 

 
 
 
 
       </DrawerContentScrollView>
   )
}
 
//const AuthNavigator = createStackNavigator({});
 
 
const styles = StyleSheet.create({
  container: {
      padding: 15,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  }
 
})

