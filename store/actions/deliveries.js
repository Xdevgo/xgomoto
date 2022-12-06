import Delivery from '../../models/delivery';
 
export const SET_DELIVERIES = 'SET_DELIVERIES';
export const ADD_LOCATION = 'ADD_LOCATION';
 
export const fetchDeliveries = () => {
 
 return async dispatch => {
   // any async code you want!
   try {
     const response = await fetch(
       'https://us-central1-xgogt502.cloudfunctions.net/xgoapiplan/api/planification/v2/plan/new'
     );
 
     if (!response.ok) {
       throw new Error('Something went wrong!');
     }
 
     const resData = await response.json();
     const loadedDeliveries= [];
 
 
     for (const key in resData.plan) {
 
 
 
       loadedDeliveries.push(
         new Delivery(
           key,
           'u1',
           resData.plan[key].orden,
           resData.plan[key].deliveryID,
           resData.plan[key].action,
           resData.plan[key].cliente.name,
           resData.plan[key].cliente.phone,
           resData.plan[key].services.description_product,
           resData.plan[key].services.quantity,
           resData.plan[key].services.amount,
           resData.plan[key].services.weight,
           resData.plan[key].services.dimensions,
           resData.plan[key].cliente.address,
           resData.plan[key].cliente.municipio,
           resData.plan[key].cliente.zone,
           resData.plan[key].cliente.indications,
           resData.plan[key].cliente.location,
           resData.plan[key].state_delivery,
           '',
           '',
           'Ruben',
           '',
           resData.totaldistance,
           resData.totalduration
         )
       );
     }
 
     dispatch({ type: SET_DELIVERIES, deliveries: loadedDeliveries });
   } catch (err) {
     // send to custom analytics server
     throw err;
   }
 };
};
 
 
export const addLocation = async (driver, longitude, latitude, heading, speed) => {
 //return async dispatch => {
 
   console.log(driver)
   // any async code you want!
   const response = await fetch('https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/plan/location', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       driver,
       longitude,
       latitude,
       heading,
       speed
     })
   });
//   dispatch({ type: ADD_LOCATION});
//   const resData = await response.json();
 
// };
};
 
export const updateDelivery = async (deliveryid_origin, type_origin, state_origin, deliveryid_target, type_target ) => {
 //return async dispatch => {
 
 
   const response = await fetch('https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries', {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       deliveryid_origin ,
       type_origin,
       state_origin,
       deliveryid_target,
       type_target
     })
   });
 
  
//   dispatch({ type: ADD_LOCATION});
  const resData = await response.json();
  //console.log(resData)
 
// };
};
 
 
export const patchServiceStatus = async (deliveryID, action ) => {
 //return async dispatch => {
 
 
   const response = await fetch('https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/plan/v2/changestate', {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       deliveryID ,
       action
     })
   });
 
  
//   dispatch({ type: ADD_LOCATION});
  const resData = await response.json();
  //console.log(resData)
 
// };
};
 
 
 
export const Planification = async (lat, lng ) => {
 //return async dispatch => {
 
 
   const response =  fetch('https://us-central1-xgogt502.cloudfunctions.net/xgoapiplan/api/planification/initial', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       lat,
       lng,
     })
   });
 
  
//   dispatch({ type: ADD_LOCATION});
// const resData = await response.json();
// console.log(resData)
 
// };
};

