import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import {auth} from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  //using firebase authentication to signIn
  const handleSubmit = async() => {
   try {
     await signInWithEmailAndPassword(auth,username,password);
     console.log('success');
     navigation.navigate('Dashboard');
   } catch (error) {
     if(error.code==='auth/email-already-in-use'){
      console.log('email already in use!');
     }else if(error.code==='auth/invalid-email'){
      console.log('invalid email');
     }else{
      console.log(error);
     }
   }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.text}>Hello again to weasydoo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
     marginTop:12,
     marginBottom:24
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    marginLeft:200
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
