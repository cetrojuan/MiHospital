import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type StartNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: StartNavProp;
};

const StartScreen: React.FC<Props> = ({navigation}) => (
  <View style={styles.container}>
    <View>
      <Image source={require('./../../../assets/miHospital.png')} style={{alignSelf:'center', width: 350, height: 80, }}/>
      <Text style={styles.title}>Tu Salud Digital</Text>
      <View style={{ flexDirection: 'column', marginTop: 20 }}>
        <TouchableOpacity style={styles.botonPaciente} onPress={() => navigation.navigate('Login', {rol: 'Paciente'})}>
          <Ionicons name="person-outline" size={22} color="#004aad"/>
          <Text style={styles.textoBotonPaciente}>Ingresar como Paciente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonMedico} onPress={() => navigation.navigate('Login', {rol: 'Medico'})}>
          <Ionicons name="medkit-outline" size={22} color="#ffffff"/>
          <Text style={styles.textoBotonMedico}>Ingresar como Profesional</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default StartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { textAlign: 'center', fontSize: 19, fontWeight: '500', marginBottom: 8 },
  botonPaciente: {flexDirection: 'row',alignItems: 'center',justifyContent: 'center', backgroundColor: '#e0e0e0',padding: 15,borderRadius: 5,marginTop: 10},
  botonMedico: {flexDirection: 'row',alignItems: 'center',justifyContent: 'center', backgroundColor: '#004aad',padding: 15,borderRadius: 5,marginTop: 15},
  textoBotonPaciente: {color: '#004aad',marginLeft: 8,},
  textoBotonMedico: {color: '#ffffff',marginLeft: 8,},
});