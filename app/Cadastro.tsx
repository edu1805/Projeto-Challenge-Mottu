import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';
import React from 'react';
import { Link } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';


export default function Cadastro() {
  const [moto, setMoto] = useState({ placa: '', status: ''});

  const handleChange = (field: string, value: string) => {
    setMoto((prev) => ({ ...prev, [field]: value }));
  };

  const salvarMoto = async (novaMoto: { placa: string; status: string; id: string; }) => {
    try {
      const json = await AsyncStorage.getItem('@motos');
      const motos = json ? JSON.parse(json) : [];
      motos.push(novaMoto);
      await AsyncStorage.setItem('@motos', JSON.stringify(motos));
      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
      setMoto({ placa: '', status: '' });
    } catch (e) {
      console.error('Erro ao salvar moto:', e);
    }
  };

  const handleSubmit = () => {
    const novaMoto = { id: nanoid(), ...moto };
    salvarMoto(novaMoto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Moto</Text>
      <TextInput placeholder="Placa" style={styles.input} value={moto.placa} onChangeText={(v) => handleChange('placa', v)} />
      <RNPickerSelect
        onValueChange={(value) => handleChange('status', value)}
        value={moto.status}
        placeholder={{ label: 'Selecione o status...', value: null }}
        items={[
          { label: 'Pronta para usar', value: 'pronta' },
          { label: 'Requer revisão', value: 'revisao' },
          { label: 'Reservada', value: 'reservada' },
        ]}
        style={pickerSelectStyles}
      />

      <Button title="Cadastrar" onPress={handleSubmit} />
      <Link href="/">Menu</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
});
