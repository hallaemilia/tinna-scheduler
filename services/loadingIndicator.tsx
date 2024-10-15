// LoadingIndicator.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import LottieView from 'lottie-react-native';

const Loader: React.FC = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animations/loading.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Set the background color as needed
    },
    animation: {
        width: 150,
        height: 150,
    },
});

export default Loader;
