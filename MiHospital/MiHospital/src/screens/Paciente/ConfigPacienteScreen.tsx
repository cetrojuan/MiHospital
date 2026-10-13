import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/pacienteTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = BottomTabScreenProps<RootTabParamList, 'Configuracion'>;

const ConfigPacienteScreen: React.FC<Props> = ({ route }) => {
  const { nombre }  = route.params;
  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bienvenido}>¡Bienvenido a Configuracion {nombre}!</Text>
      </View>
    </ScrollView>
  );
};

export default ConfigPacienteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
});