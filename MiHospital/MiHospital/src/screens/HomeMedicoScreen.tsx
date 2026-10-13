import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeMedicoRouteProp = RouteProp<RootStackParamList, 'HomeMedico'>;
type HomeMedicoNavProp = NativeStackNavigationProp<RootStackParamList, 'HomeMedico'>;

type Props = {
  route: HomeMedicoRouteProp;
  navigation: HomeMedicoNavProp;
};

const HomeMedicoScreen: React.FC<Props> = ({ route, navigation }) => {
  return(
    <View>
      <Text>Holaaaa</Text>
    </View>
  );
};

export default HomeMedicoScreen;