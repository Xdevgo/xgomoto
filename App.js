
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DeliveryList from './screens/deliveries/deliveryList';

import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native'

import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import 'react-native-gesture-handler';

import deliveriesReducer from './store/reducers/deliveries';
const rootReducer = combineReducers({
  deliveries: deliveriesReducer
 });
  
 const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
 
export default function App() {
  return (
    <SafeAreaView style = {{ flex: 1}} >
      <Provider store={store}>
      <NavigationContainer>
     <DrawerNavigation  yigation/>
     </NavigationContainer>

      </Provider>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
