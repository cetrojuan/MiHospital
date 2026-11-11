import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TurnosMedRootTabParamList } from '../../../navigation/turnosMedNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import ListaTurnosMedico from '../../../components/ListaTurnosMedico';

type Props = BottomTabScreenProps<TurnosMedRootTabParamList, 'ProxTurnos'>;

const ProximosTurnosMedScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre, dni }  = route.params;
  return(
    <View style={{flex: 1}}>
      <ListaTurnosMedico dni={dni} estado='pendiente'/>
    </View>
  );
};

export default ProximosTurnosMedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
});