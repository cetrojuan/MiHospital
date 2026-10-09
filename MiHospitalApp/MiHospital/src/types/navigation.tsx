export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: {
    rol: 'Paciente' | 'Medico';
  };
};