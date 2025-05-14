import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';
import React from 'react';
import { Link } from 'expo-router';

export default function Cadastro() {
  const [moto, setMoto] = useState({ placa: '', motor: '', situacao: '' });

  const handleChange = (field: string, value: string) => {
    setMoto((prev) => ({ ...prev, [field]: value }));
  };

  const salvarMoto = async (novaMoto: { placa: string; motor: string; situacao: string; id: string; }) => {
    try {
      const json = await AsyncStorage.getItem('@motos');
      const motos = json ? JSON.parse(json) : [];
      motos.push(novaMoto);
      await AsyncStorage.setItem('@motos', JSON.stringify(motos));
      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
      setMoto({ placa: '', motor: '', situacao: '' });
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
      <TextInput placeholder="Motor" style={styles.input} value={moto.motor} onChangeText={(v) => handleChange('motor', v)} />
      <TextInput placeholder="Situação" style={styles.input} value={moto.situacao} onChangeText={(v) => handleChange('situacao', v)} />
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