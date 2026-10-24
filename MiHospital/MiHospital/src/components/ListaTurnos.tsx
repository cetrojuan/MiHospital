import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ListaTurnosProps = {
  nombre?: string;
  dni?: string;
};

const ListaTurnos: React.FC<ListaTurnosProps> = ({nombre, dni}) => {
  const CargarTurnos = async () => {
    try {
    const TurnosGuardados = await AsyncStorage.getItem('turnos');
      const turnos = TurnosGuardados
          ? JSON.parse(TurnosGuardados)
          : [];

    const turnosUsuario = turnos.find(
        (agenda: { id: string }) =>
          agenda.id === dni
      );

    }catch (error){
      Alert.alert('Error', 'No se pudieron cargar los turnos.');
      console.error(error);
    }
  }
  return(
    <View>
    </View>
  );
};

export default ListaTurnos;

const styles = StyleSheet.create({
});