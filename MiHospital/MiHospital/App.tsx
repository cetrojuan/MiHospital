import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './src//screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomePacienteScreen from './src/screens/HomePacienteScreen';
import HomeMedicoScreen from './src/screens/HomeMedicoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff' }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff'}}/>
          <Stack.Screen name="HomePaciente" component={HomePacienteScreen} options={{ headerShown: false }} />  
          <Stack.Screen name="HomeMedico" component={HomeMedicoScreen} options={{ headerShown: false }} />      
        </Stack.Navigator>
      </NavigationContainer>
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
