import React, { ProfilerProps, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CurrentRouteLogger from './currentRoute';


export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const saveProfile = () => {
        // Save profile details to backend or local storage
    };

    return (
        <View style={styles.container}>
            <CurrentRouteLogger/>
            <Text>Profile Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Save Profile" onPress={saveProfile} />
            <Button title="Manage Users" onPress={() => navigation.navigate("Manage Members")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        marginVertical: 10,
    },
});
