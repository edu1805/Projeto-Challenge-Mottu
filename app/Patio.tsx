import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Patio() {
  const [motos, setMotos] = useState<{ id: string; placa: string; status: string }[]>([]);

  const carregarMotos = async () => {
    try {
      const json = await AsyncStorage.getItem('@motos');
      const lista = json ? JSON.parse(json) : [];
      setMotos(lista);
    } catch (e) {
      console.error('Erro ao carregar motos:', e);
    }
  };

  const excluirMoto = async (id: string) => {
  try {
    const novaLista = motos.filter((moto) => moto.id !== id);
    await AsyncStorage.setItem('@motos', JSON.stringify(novaLista));
    setMotos(novaLista);
  } catch (error) {
    console.error('Erro ao excluir moto:', error);
  }
};


  useFocusEffect(
    React.useCallback(() => {
      carregarMotos();
    }, [])
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pronta':
        return 'green';
      case 'revisao':
        return 'red';
      case 'reservada':
        return 'blue';
      case 'sem placa':
        return 'gray';
      default:
        return 'black';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Motos</Text>
        <Link href="Cadastro" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar nova moto</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {motos.length === 0 ? (
        <Text style={styles.noMotosText}>Nenhuma moto cadastrada.</Text>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FontAwesome name="motorcycle" size={24} color="black" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.placa}>
                  Placa: {item.status === 'sem_placa' ? item.id : item.placa}
                </Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                  Status: {item.status}
                </Text>
              </View>
              <TouchableOpacity onPress={() => excluirMoto(item.id)} style={styles.excluirButton}>
                <Text style={styles.excluirText}>Excluir</Text>
              </TouchableOpacity>
            </View>

          )}

        />
      )}

      <View style={styles.footer}>
        <Link href="/" style={styles.link}>Voltar ao Menu</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    backgroundColor: '#1DCD9F', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: '#222', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noMotosText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
  },
  placa: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  excluirButton: {
  marginLeft: 'auto',
  backgroundColor: '#ef4444',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
},

excluirText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},

});
