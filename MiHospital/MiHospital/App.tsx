import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './src//screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomePacienteScreen from './src/screens/HomePacienteScreen';
import HomeMedicoScreen from './src/screens/HomeMedicoScreen';
import NuevoTurnoScreen from './src/screens/Paciente/Turnos/NuevoTurnoScreen'
import NuevaAgendaScreen from './src/screens/Medico/NuevaAgendaScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff' }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff'}}/>
          <Stack.Screen name="HomePaciente" component={HomePacienteScreen} options={{ headerShown: false}} />  
          <Stack.Screen name="HomeMedico" component={HomeMedicoScreen} options={{ headerShown: false }} />  
          <Stack.Screen name="NuevoTurno" component={NuevoTurnoScreen} options={{headerBackButtonDisplayMode: 'minimal', title:'Nuevo Turno', headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff'}}/>
          <Stack.Screen name="NuevaAgenda" component={NuevaAgendaScreen} options={{ headerBackButtonDisplayMode: 'minimal', title:'Nueva Agenda', headerStyle: {backgroundColor: '#004aad'}, headerTintColor: '#ffffff' }} />     
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
