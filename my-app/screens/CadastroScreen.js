import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');

  
  const buscarEndereco = async (cep) => {
    try {
      if (cep.length === 8) {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
          Alert.alert('Erro', 'CEP não encontrado');
        } else {
          setEndereco(response.data.logradouro);
          setBairro(response.data.bairro);
          setEstado(response.data.uf);
        }
      } else {
        Alert.alert('Erro', 'CEP deve ter 8 dígitos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o endereço');
    }
  };


  const cadastrar = () => {
    if (!nome || !email || !senha || !cep) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    Alert.alert('Cadastro realizado com sucesso', `Nome: ${nome}\nE-mail: ${email}`);
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          if (text.length === 8) {
            buscarEndereco(text);
          }
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
        editable={false}
      />

      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e2a47',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});