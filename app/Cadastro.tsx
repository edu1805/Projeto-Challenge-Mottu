import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import RNPickerSelect from 'react-native-picker-select';


export default function Cadastro() {
  const [moto, setMoto] = useState({ placa: '', status: '' });

  const handleChange = (field: string, value: string) => {
    setMoto((prev) => ({ ...prev, [field]: value }));
  };

  const salvarMoto = async (novaMoto: { placa: string; status: string; id: string }) => {
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
      <Text style={styles.titulo}>Cadastrar Nova Moto</Text>

      <MaskedTextInput
        type="custom"
        options={{ mask: 'AAA#A##' }}
        value={moto.placa}
        onChangeText={(masked) => handleChange('placa', masked)}
        style={styles.input}
        placeholder="Placa (ex: ABC1D23)"
        autoCapitalize="characters"
      />

      <RNPickerSelect
        onValueChange={(value) => handleChange('status', value)}
        value={moto.status}
        placeholder={{ label: 'Selecione o status...', value: null }}
        items={[
          { label: 'Pronta para usar', value: 'pronta' },
          { label: 'Requer revisão', value: 'revisao' },
          { label: 'Reservada', value: 'reservada' },
          { label: 'Sem Placa', value: 'sem_placa' },
        ]}
        style={pickerSelectStyles}
      />

      <Pressable style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.botaoTexto}>Cadastrar Moto</Text>
      </Pressable>

      <View style={styles.links}>
        <Link href="/motos" style={styles.linkTexto}>📋 Ver Todas as Motos</Link>
        <Link href="/" style={styles.linkTexto}>🏠 Voltar ao Menu</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  links: {
    alignItems: 'center',
    gap: 12,
  },
  linkTexto: {
    color: '#0066cc',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#000',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#000',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
