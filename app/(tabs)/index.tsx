import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import CurrentRouteLogger from '../components/currentRoute';

export default function HomeScreen() {
    const currDate = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <CurrentRouteLogger />

                <Text style={styles.text}>Welcome! Today is {currDate.toDateString()}.</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.textContainer}>
                <Image source={require('../../assets/images/tinna.jpg')} style={styles.logo} />
                <Text style={styles.text}>Today you are scheduled to walk Tinna ===INSERT TIME===</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        paddingBottom: 0,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    text: {
        fontSize: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});

