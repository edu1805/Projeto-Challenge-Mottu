import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { auth } from './services/firebaseConfig';
import { deleteUser } from 'firebase/auth';

export default function Usuario() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  // Função para realizar logoff
  const realizarLogoff = async () => {
    await AsyncStorage.removeItem('@user');
    router.replace('/');
  };

  // Função para excluir conta
  const excluirConta = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir", style: 'destructive',
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user); // Apaga do Firebase Auth
                await AsyncStorage.removeItem('@user');
                Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
                router.replace('/');
              } else {
                Alert.alert("Erro", "Nenhum usuário logado.");
              }
            } catch (error) {
              console.log("Erro ao excluir conta:", error);
              Alert.alert("Erro", "Não foi possível excluir conta.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👤 Meu Perfil</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{email}</Text>
      </View>

      <TouchableOpacity style={[styles.botao, { backgroundColor: '#2563eb' }]} onPress={realizarLogoff}>
        <Text style={styles.textoBotao}>Sair da Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, { backgroundColor: '#dc2626' }]} onPress={excluirConta}>
        <Text style={styles.textoBotao}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  botao: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
