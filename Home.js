import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Css, css} from '../assets/css/Css';

export default function Home({navigation}) {

    return (
        <View style={Css.container2}>
            <TouchableOpacity style={Css.button__home} onPress={() => navigation.navigate('Login')}>
                <Image style={Css.image} source={ require('../assets/img/buttonLogin.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={Css.button__home} onPress={() => navigation.navigate('Rastreio')}>
                <Image style={Css.image} source={require('../assets/img/buttonRastreio.png')}/>
            </TouchableOpacity>

            
        </View>
    );
}