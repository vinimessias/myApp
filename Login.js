import React, {useState,useEffect} from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Text, View} from 'react-native';
import {Css} from '../assets/css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Login({navigation})
{
    const [display, setDisplay]=useState('none');
    const [user, setUser]=useState(null);
    const [password, setPassword]=useState(null);
    const [login, setLogin]=useState(null);

    //Envio do formulário de login
    async function sendForm()
    {
        let response=await fetch('http://127.0.0.1:3000/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        });
        let json=await response.json();
        if(json === 'error'){
            setDisplay('flex');
            setTimeout(()=>{
                setDisplay('none');
            },5000);
            await AsyncStorage.clear();
        }else{
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('AreaRestrita');
        }
    }

    


    return(
        <KeyboardAvoidingView style={[Css.container, Css.darkbg]}>
            <View style={Css.login__logomarca}>
                <Image source={require('../assets/img/logomarca.png')} />
            </View>

            <View>
                <Text style={Css.login__msg(display)}>Usuário ou senha inválidos!</Text>
            </View>

            <View style={Css.login__form}>
                <TextInput style={Css.login__input} placeholder='Usuário:' onChangeText={text=>setUser(text)} />
                <TextInput style={Css.login__input} placeholder='Senha:' onChangeText={text=>setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={Css.login__button} onPress={()=>sendForm()}>
                    <Text style={Css.login__buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

