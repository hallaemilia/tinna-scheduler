import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';


const DogInfo = () => {

    var currDate = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
            <Text style={styles.text}>Welcome! Today is {currDate.toDateString()}.</Text>
            <Image source={require('../../assets/images/tinna.jpg')} style={styles.image} />
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 1000,
        height: 100,
        marginRight: 10,
    },
});

export default DogInfo;