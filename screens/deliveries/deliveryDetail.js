import React, { useState , useEffect} from 'react'
import { StyleSheet, Text, View , ActivityIndicator, Button, Linking, TouchableOpacity, ImageBackground, Alert} from 'react-native'
import Boton from '../../components/Boton';
import * as deliveriesActions from '../../store/actions/deliveries';
 
//import {NavigationApps,googleMapsActions,wazeActions,actions, searchLocationByLatAndLon, navigateByLatAndLon} from "react-native-navigation-apps";
 
 
import Card from '../../components/Card';
 
const DeliveryDetail = ({ navigation, route }) => {
 const [isFetching, setIsFetching] = useState(false);
 
 
 
 const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROgsr1JbQxbCEMI_qZl1hptzStkk-XXATsiQ&usqp=CAU" };
 const imageWaze = { uri: "https://foodmachine.us/wp-content/uploads/2020/09/fd8ee3af1fab4dcb14c8bbff46153815.png" };
 
 const createTwoButtonAlert = (item) => {
 let type
 if(item.action == 'O'){
   type = 'recoleción'
 }else {
   type = 'entrega'
 }
 
 Alert.alert(
   "Confirmación",
   "Quieres confirmar la "+ type,
   [
     {text: "Cancel",onPress: () => console.log("Cancel"), style: "cancel",},
     {text: 'OK', onPress: () => changeStatusService(item)},
   ],
 );
 }
 const changestatushandler = async (item) => {
       console.log(item)
    
   /*
      try {
        console.log(item.action)
        console.log(item.state)
        if((item.action==='O' && item.state==='C') || (item.action==='T' && item.state==='CE') || (item.action==='O' && item.state==='CR') ||
          (item.action==='O' && item.state!='IR') && (item.action!='O' && item.state!='IR') && (item.action==='T' && item.state==='CE') && (item.action!='T' && item.state!='E')){
       await deliveriesActions.updateDelivery(item.deliveryID ,item.action, item.state, item.deliveryID, item.action) ;
        }else{
          console.log('No actualizó')
       }
       } catch (err) {
         console.log(err)
       }*/
     };
 
 
   const changeStatusService = async (item) => {
     try {
       console.log(item.state_delivery)
      
       if((item.state_delivery !== 'R') && (item.state_delivery !=='E')){
     await deliveriesActions.patchServiceStatus(item.deliveryID ,item.action) ;
     navigation.navigate('Entregas')
       }
     }catch(err){
       console.log(err)
     }
   }
    
 
 
   const OpenMap = () =>{
     console.log(item.location)
     Linking.openURL('http://maps.google.com/maps?daddr='+item.location.coordinates[1]+','+item.location.coordinates[0]);
   }
 
 
   const OpenMapWaze = () =>{
     Linking.openURL(`https://waze.com/ul?ll=${item.location.coordinates[1]},${item.location.coordinates[0]}&navigate=yes`);
   }
   const OpenCall = () =>{
     Linking.openURL(`tel:${item.phone_origin}`);
   }
 
   const OpenWsp= () =>{
     Linking.openURL(`whatsapp://send?phone=+502${item.phone_origin}`)
   }
 
 
   const { item } = route.params;
 
   return (
     <View style={styles.screen}>
<TouchableOpacity style={styles.buttonContainer} onPress={() => { createTwoButtonAlert( item )}}
activeOpacity={(item.action==='0' ? 1 : 0.3)}
disabled={(item.action==='0'?true:false)}
 
>
           <Text style = {styles.buttonText}>
           Confirmar
           </Text>
         </TouchableOpacity >
 
     <Card style={styles.cardCliente}>
 
           <View style={styles.titleGuia}>
               <View style={styles.textGuia}>
               <Text style={styles.subtitleText}>Guia: { item.deliveryID }</Text>
               </View>
               <View style={styles.textGuia}>
               <Text style={styles.subtitleText}>{ item.action === 'O'?'Recolección':'Entrega' }</Text>
               </View>
           </View>
 
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>Cliente </Text>
               <Text style={styles.detailtextaddress}>{ item.name_origin }</Text>
               </View>
           </View>
 
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>WhatsApp </Text>
               <TouchableOpacity  style={styles.touch} onPress={OpenWsp}><Text style={styles.detailtextaddress}>+502 { item.phone_origin }</Text></TouchableOpacity>
               </View>
           </View>
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>Telefono    </Text>
               <TouchableOpacity style={styles.touch2} onPress={OpenCall}><Text style={styles.detailtextaddress}>{ item.phone_origin }</Text></TouchableOpacity>
               </View>
           </View>
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>Descripción del producto </Text>
               <Text style={styles.detailtextaddress}>{ item.description_product }</Text>
               </View>
           </View>
 
 
           <View style={styles.titleGuia}>
               <View style={styles.textGuia}>
               <Text style={styles.detailtextaddress}>Cant. { item.quantity }</Text>
               </View>
               <View style={styles.textGuia}>
               <Text style={styles.detailtextaddress}>Peso: { item.weight } Lb</Text>
               </View>
               <View style={styles.textGuia}>
               <Text style={styles.detailtextaddress}>Md. { item.dimensions } Cm²</Text>
               </View>
           </View>
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.detailtextgoogle}>Cobrar: { item.amount }.00 GTQ</Text>
               </View>
           </View>
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>Dirección </Text>
               </View>
           </View>
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.detailtextaddress}>{item.address}</Text>
               </View>
           </View>
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.detailtextaddress}>Zona { item.zone } { item.municipio }</Text>
               </View>
           </View>
 
 
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.subtitleText}>Indicaciones </Text>
               </View>
           </View>
           <View style={styles.titleGuia}>
               <View style={styles.row}>
               <Text style={styles.detailtextgoogle}>{ item.indications }</Text>
               </View>
           </View>
 
 
 
 
    {/*   <NavigationApps
                   modalProps={{animationType:'slide',transparent:true}}
                   modalContainerStyle={{height:200,width:200,backgroundColor:'#f5f5f5',justifyContent:'center',alignItems:'center', borderRadius: 2}}
                   modalBtnCloseContainerStyle={{}}
                   modalBtnCloseStyle={{borderWidth:1}}
                   modalBtnCloseTextStyle={{fontSize:20}}
                   modalBtnOpenStyle={{borderWidth:1}}
                   modalBtnOpenTextStyle={{fontSize:30,color:'#4682b4'}}
                   modalBtnOpenText={'Locación'}
                   modalBtnCloseText={'Cerrar'}
                   iconSize={60}
                   row
                   viewMode='modal'
                   waze={{action:actions.navigateByLatAndLon,lat:'14.6208258',lon:'-90.50491190000001'}}
                   googleMaps={{action:actions.searchLocationByLatAndLon,lat:'14.6208258',lon:'-90.50491190000001'}}
                  
    />*/}
 
 
<View style={styles.locationflex}>
               <View style={styles.locationsubflex}>
               <TouchableOpacity onPress={OpenMapWaze} >         
       <View style={styles.mapPreview}>
       <ImageBackground source={imageWaze} resizeMode="center" style={styles.image}>
       </ImageBackground>
         </View>
       </TouchableOpacity>
               </View>
               <View style={styles.locationsubflex}>
             
 <TouchableOpacity onPress={OpenMap}>         
       <View style={styles.mapPreview}>
       <ImageBackground source={image} resizeMode="center" style={styles.image}>
       </ImageBackground>
         </View>
</TouchableOpacity>
               </View>
</View>
   </Card>
 
 
 
 
 
 
 
</View>
   )
}
 
export default DeliveryDetail
 
const styles = StyleSheet.create({
 screen: {
   flex: 1,
   padding: 1,
   marginHorizontal: 2
},
row:{
 flexDirection: 'row'
},
 mapPreview: {
   marginBottom: 10,
   width: '100%',
   height: '55%',
   padding:2,
   backgroundColor:'#FFF',
   borderColor: '#AEB6BF',
   borderWidth: 0.5,
   borderRadius:5,
   justifyContent: 'center',
   alignItems: 'center'
 },
 cardCliente: {
   height: '80%',
   margin: 1,
   backgroundColor: '#FDFEFE',
   alignItems: 'flex-start',
 },
 card: {
   height: 180,
   margin: 1,
   alignItems: 'flex-start',
   backgroundColor: '#FDFEFE'
 },
 description: {
   color: '#515A5A',
   fontSize: 16,
 
  
 },
 line:
   {flex: 1, height: 1, backgroundColor: '#063f88'},
   image: {
     flex: 1,
     justifyContent: "center",
     width: '100%',
     height: 100,
     backgroundColor:'#FFF',
   } ,
   touch:{
     alignItems: "center",
     borderColor: "#446293",
     borderWidth:0.3,
     padding: 3,
     borderRadius:2,
     backgroundColor: '#f5f5f5'
 
   },
   touch2:{
     alignItems: "center",
     borderColor: "#446293",
     borderWidth:0.3,
     padding: 3,
     borderRadius:2,
     backgroundColor: '#f5f5f5'
 
   },
 
 
 
 
 
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
       color: "#ff6347"
     },
     detailtextaddress: {
       fontSize: 15,
       color: "#446293",
       marginBottom:2
     },
     datagoogle: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'flex-end',
       marginTop: 10,
       width: 300,
       maxWidth: '80%'
     },
 
 
   titleGuia: {
     flexDirection: 'row',
     width: '100%',
     justifyContent: 'space-between',
     paddingHorizontal: 10,
     paddingVertical:5
 },
 locationflex: {
flexDirection: 'row',
width: '100%',
justifyContent: 'space-around',
paddingHorizontal: 2,
paddingVertical:2
 
},
locationsubflex:{
 width: 90
},
 textGuia:{
   width: 100
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
 
 
 
})
 

