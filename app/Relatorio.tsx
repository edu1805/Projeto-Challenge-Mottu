import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto, MotoStatus } from './types/Moto';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const statusLabels: Record<MotoStatus, string> = {
  pronta: 'Pronta',
  revisao: 'Revisão',
  reservada: 'Reservada',
  sem_placa: 'Sem placa'
};

export default function Relatorio() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useFocusEffect(
    useCallback(() => {
      const carregarMotos = async () => {
        try {
          const dados = await AsyncStorage.getItem('@motos');
          if (dados) {
            const lista = JSON.parse(dados);
            setMotos(lista);
          } else {
            setMotos([]); // Se não houver dados, limpa a lista
          }
        } catch (error) {
          console.error('Erro ao carregar motos:', error);
        }
      };

      carregarMotos();
    }, [])
  );

  const motosPorStatus = (status: MotoStatus) => {
    return motos.filter((moto) => moto.status === status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Relatório de Motos por Status</Text>
      
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total de motos cadastradas: {motos.length}</Text>
      </View>

      {Object.keys(statusLabels).map((statusKey) => {
        const status = statusKey as MotoStatus;
        const motosFiltradas = motosPorStatus(status);

        return (
          <View key={status} style={styles.section}>
            <Text style={styles.statusTitle}>
              {statusLabels[status]}: {motosFiltradas.length}
            </Text>
            <FlatList
                data={motosFiltradas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.motoItem}>
                        {item.status === 'sem_placa' ? item.id : item.placa}
                    </Text>
                )}

            />
          </View>
        );
      })}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/')}>
        <Text style={styles.addButtonText}>Voltar ao menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1f2937'
  },
  totalBox: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 8
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1'
  },
  section: {
    marginBottom: 20
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8
  },
  motoItem: {
    paddingLeft: 8,
    fontSize: 16,
    color: '#374151'
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
