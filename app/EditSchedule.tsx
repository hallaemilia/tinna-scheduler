import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import CurrentRouteLogger from './components/currentRoute';

export default function EditSchedule() {
    return (
        <View>
            <CurrentRouteLogger/>

            <Text>Edit Schedule</Text>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        </View>
    );
};