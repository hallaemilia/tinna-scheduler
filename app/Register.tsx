import { ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../services/auth";
import Loader from "../services/loadingIndicator";
import { saveUserData } from "../services/fireBaseDatabase";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const naviation = useNavigation();

    const handleSignup = async () => {
        setLoading(true);
        try {
            const user = await signup(email, password);
            if (user) {
                const id = user.uid;
                await saveUserData(id, firstName, lastName);
                naviation.navigate("LogIn");
            }
        } catch (e: any) {
            setLoading(false);
            let errorMessage = "An error occurred";
            switch (e.code) {
                case "auth/email-already-in-use":
                    errorMessage = "Email already in use";
                    break;
                case "auth/weak-password":
                    errorMessage = "Weak password";
                    break;
                default:
                    errorMessage += ": " + e.message;
                    break;
            }
            alert(errorMessage);
        }
    };

    const handleLogin = () => {
        naviation.navigate("LogIn");
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Create account!</Text>
                    <Text style={styles.subTitle}>Register to get started.</Text>
                </View>
                <View style={styles.textContainer}>

                    <TextInput style={styles.writeText} placeholder="First Name" autoCapitalize="none" value={firstName} onChangeText={setFirstName} />
                    <TextInput style={styles.writeText} placeholder="Last Name" autoCapitalize="none" value={lastName} onChangeText={setLastName} />
                    <TextInput style={styles.writeText} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.writeText} placeholder="Password" autoCapitalize="none" secureTextEntry value={password} onChangeText={setPassword} />

                    {loading ? (<Loader /> ) : (<TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.signUpText}>Register</Text>
                    </TouchableOpacity>)}
                    
                    <TouchableOpacity onPress={handleLogin} style={styles.specialContainer}>
                        <Text style={styles.text}>Already have an account?</Text>
                        <Text style={styles.loginText}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        margin: 10,
    },
    imageContainer: {
        flex: 2,
        flexDirection: 'column',
        padding: 30,
        width: '100%',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        // borderWidth: 3,
        // borderColor: 'white',
        width: '100%',
    },
    specialContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        // borderWidth: 3,
        // borderColor: 'white',
        width: '100%',
    },
    button: {
        fontSize: 15,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 20,
    },
    orText: {
        fontSize: 15,
        color: 'white',
    },
    text: {
        fontSize: 15,
        color: 'white',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    loginText: {
        fontSize: 15,
        color: 'white',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    signUpText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    writeText: {
        fontSize: 15,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: '100%',
        backgroundColor: "#1E1E1E",
        color: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    subTitle: {
        fontSize: 20,
        color: 'white'
    },
    sepCont: {
        flex: 0.1,
        flexDirection: 'row',
        
    },
    separator: {
        marginVertical: 10,
        marginHorizontal: 10,
        height: 1,
        width: '40%',
    },
    logo: {
        width: 300,
        height: 300,
        paddingBottom: 30,
        borderRadius: 150,
    },
});

