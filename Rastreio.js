import React from 'react';
import {Text, View, Button} from 'react-native';

export default function Rastreio({navigation}) {

    return (
        <View>
            <Text>Esse é o componente Rastreio</Text>
            <Button
                    title='Ir para Login'
                    onPress={() => navigation.navigate('Login',{
                    id: 30
                })}
            />
        </View>
    );
 }