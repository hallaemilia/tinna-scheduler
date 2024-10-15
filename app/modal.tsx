import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { logout } from '../services/auth';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import CurrentRouteLogger from './components/currentRoute';

export default function ModalScreen() {

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout();
      navigation.navigate("LogIn");
    } catch (e) {
      console.log("Error:", e);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <CurrentRouteLogger/>

      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    fontSize: 15,
  },
});
