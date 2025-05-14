import { Link } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const motos = [
  { id: '1', placa: 'ABC1234', motor: 'OK', situacao: 'prontas para uso' },
  { id: '2', placa: 'XYZ5678', motor: 'com defeito', situacao: 'motor com defeito' },
  { id: '3', placa: '---', motor: 'OK', situacao: 'sem placa' },
  { id: '4', placa: 'AAA1111', motor: 'OK', situacao: 'reservada' },
];

export default function Patio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todas as Motos</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`Placa: ${item.placa} | Motor: ${item.motor} | Situação: ${item.situacao}`}</Text>
        )}
      />
      <Link href="/">Menu</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});