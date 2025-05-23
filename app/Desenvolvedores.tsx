import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Integrantes() {
  const integrantes = [
    {
      nome: 'Eduardo do Nascimento Barriviera',
      rm: 'RM555309',
      github: 'https://github.com/edu1805',
      avatar: require('../assets/foto1.jpg'),
    },
    {
      nome: 'Thiago Lima de Freitas',
      rm: 'RM556795',
      github: 'https://github.com/thiglfa',
      avatar: require('../assets/foto3.jpg'),
    },
    {
      nome: 'Bruno Centurion Fernandes',
      rm: 'RM556531',
      github: 'https://github.com/brunocenturion',
      avatar: require('../assets/foto2.jpg'),
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👨‍💻 Desenvolvedores</Text>

      {integrantes.map((dev, index) => (
        <View style={styles.card} key={index}>
          <Image source={dev.avatar} style={styles.avatar} />

          <View style={styles.textContainer}>
            <Text style={styles.name}>{dev.nome}</Text>
            <Text style={styles.rm}>RM: {dev.rm}</Text>

            <TouchableOpacity onPress={() => Linking.openURL(dev.github)} style={styles.infoRow}>
              <Ionicons name="logo-github" size={16} color="#2563eb" style={styles.icon} />
              <Text style={styles.link}>{dev.github.replace('https://', '')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

        <View style={styles.footer}>
            <Text style={styles.footerTitle}>🎯 Nosso Objetivo</Text>
            <Text style={styles.footerText}>
                Este projeto foi desenvolvido com o intuito de solucionar um problema real enfrentado pela empresa Mottu:
                a desorganização e falta de controle sobre a localização das motos nos pátios de suas filiais.
            </Text>
            <Text style={styles.footerText}>
                Nossa solução propõe um sistema capaz de mapear e monitorar, de forma precisa e automatizada, todas as motos
                nos pátios. Utilizando tecnologias modernas, o sistema coleta e exibe as informações em uma interface visual intuitiva,
                permitindo uma gestão mais eficiente e rápida localização das motos.
            </Text>
        </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  rm: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#374151',
  },
  link: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  footer: {
  marginTop: 30,
  paddingTop: 20,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
},
footerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
footerText: {
  fontSize: 16,
  color: '#333',
  marginBottom: 8,
  textAlign: 'justify',
},

});
