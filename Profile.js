import React, {useState,useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Css} from '../../assets/css/Css';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
export default function Profile({navigation}) {
    const [idUser, setIdUser] = useState(null);
    const [senhaAntiga, setSenhaAntiga] = useState(null);
    const [novaSenha, setNovaSenha] = useState(null);
    const [confNovaSenha, setConfNovaSenha] = useState(null);
    const [msg, setMsg] = useState(null);
    useEffect(()=>{
       async function getIdUser()
       {
           let response=await AsyncStorage.getItem('userData');
           let json=JSON.parse(response);
           setIdUser(json.id);
       }
       getIdUser();
    });

    async function sendForm()
    {
        let response=await fetch('http://127.0.0.1:3000/verifyPass',{
            method:'POST',
            body:JSON.stringify({
                id: idUser,
                senhaAntiga: senhaAntiga,
                novaSenha: novaSenha,
                confNovaSenha: confNovaSenha
            }),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json=await response.json();
        setMsg(json);
    }

    return (
        <View style={[Css.containerTop]}>
            <MenuAreaRestrita title='Perfil' navigation={navigation} />

            <View>
                <Text style={Css.login__buttonText}>{msg}</Text>
                <TextInput style={Css.login__input} placeholder='Senha Antiga:' onChangeText={text=>setSenhaAntiga(text)} />
                <TextInput style={Css.login__input} placeholder='Nova Senha:' onChangeText={text=>setNovaSenha(text)} />
                <TextInput style={Css.login__input} placeholder='Confirmação da Nova Senha:' onChangeText={text=>setConfNovaSenha(text)} />
                <TouchableOpacity style={Css.login__button}  onPress={()=>sendForm()}>
                    <Text style={Css.login__buttonText}>Trocar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}