import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './services/firebaseConfig';

export default function LoginScreen() {
  // Estados para armazenar os valores digitados
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@user');
        if (usuarioSalvo) {
          router.push('/');
        }
      } catch (error) {
        console.log("Erro ao verificar login", error);
      }
    };

    verificarUsuarioLogado();
  }, []);

  // Função para realizar o login
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      console.log('🔐 Tentando login...');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      console.log('✅ Login realizado com sucesso');
      
      router.push('/HomeScreen');
      
    } catch (error: any) {
      console.log("Erro no login:", error);
      
      let errorMessage = 'Erro ao fazer login';
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          errorMessage = 'Email ou senha incorretos';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuário desativado';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        default:
          errorMessage = error.message || 'Erro desconhecido';
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função enviar o e-mail de reset de senha para o usuário
  const esqueceuSenha = () => {
    if (!email) {
      Alert.alert('Atenção', 'Digite o email para recuperar a senha');
      return;
    }
    
    sendPasswordResetEmail(auth, email)
      .then(() => { 
        Alert.alert('Sucesso', 'E-mail de recuperação enviado!'); 
      })
      .catch((error) => {
        console.log("Erro ao enviar email", error.message);
        Alert.alert('Erro', 'Erro ao enviar e-mail. Verifique se o email está correto.');
      });
  };

  // Navegar para tela de cadastro
  const irParaCadastro = () => {
    router.push('/CadastrarScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏍️ Login</Text>
      <Text style={styles.subtitle}>Sistema de Gerenciamento de Motos</Text>

      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
        editable={!loading}
      />

      
      <TouchableOpacity 
        style={[styles.botao, loading && styles.botaoDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Entrar</Text>
        )}
      </TouchableOpacity>

      
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={esqueceuSenha} style={styles.link}>
          <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={irParaCadastro} style={styles.link}>
          <Text style={styles.linkText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  botao: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 12,
  },
  link: {
    padding: 8,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});