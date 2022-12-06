//import DELIVERIES from '../../data/dummy-data';
 
import {
 SET_DELIVERIES,
 ADD_LOCATION
} from '../actions/deliveries';
import Delivery from '../../models/delivery';
 
const initialState = {
 availableDeliveries: [],
// userDeliveries: DELIVERIES.filter(prod => prod.order === '1')
};
 
 
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_DELIVERIES:
     return {
       availableDeliveries: action.deliveries,
       userDeliveries: action.deliveries.filter(prod => prod.order === '1')
     };
 }
 return state;
};
