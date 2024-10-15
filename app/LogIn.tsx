import { KeyboardAvoidingView, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import React, { useState } from "react";
import { login, emailVerification, logout } from "../services/auth";
import Loader from "../services/loadingIndicator";
import { useNavigation } from "@react-navigation/native";
import CurrentRouteLogger from "./components/currentRoute";
import { or } from "firebase/firestore";
// import Checkbox from "@react-native-community/checkbox";

export default function LoginScreen() {
    const [email, setEmail] = useState('hallaemilia@gmail.com');
    const [password, setPassword] = useState('Iissllaanndd0011!!');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [showEmailMessage, setShowEmailMessage] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSignup = async () => {
        navigation.navigate("Register");
    };

    const handleLogin = async () => {
        try {
            const user = await login(email, password);
            if (user) {
                if (!user.emailVerified) {
                    setShowEmailMessage(true);
                    await emailVerification();
                    await logout();
                    setLoading(false);
                }
            } else {
                await emailVerification();
                setShowEmailMessage(true);
            }
            console.log("Logged in")
            console.log("User", user);
            navigation.navigate("(tabs)");

        } catch (e: any) {
            setLoading(false);
            if (e.code === "auth/user-not-found") {
                alert("User not found");
            } else if (e.code === "auth/wrong-password") {
                alert("Wrong password");
            } else {
                alert("An error occurred" + e.message);
            }
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/tinna.jpg')} style={styles.logo} />
            </View>

            <View style={styles.textContainer}>
                <TextInput style={styles.writeText} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <TextInput style={styles.writeText} placeholder="Password" autoCapitalize="none" secureTextEntry value={password} onChangeText={setPassword} />
                {/* <Checkbox
                    // value={rememberMe}
                    // tintColors={{ true: 'white', false: '#1E1E1E' }}
                    // onValueChange={setRememberMe}
                    /> */}
                {loading ? (<Loader />) : (<TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>)}
            </View>

            <View style={styles.sepCont}>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
                <Text style={styles.orText}>or</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
            </View>

            <View style={styles.textContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
                {showEmailMessage && <Text style={styles.text}>Email verification sent. Check your email.</Text>}
            </View>
        </View>
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
        fontSize: 40,
        fontWeight: 'bold',
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