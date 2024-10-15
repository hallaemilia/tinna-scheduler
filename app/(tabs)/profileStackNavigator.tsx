import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../components/profile';
import ManageMembersScreen from '../components/manageMembers';

const Stack = createStackNavigator();

const ProfileStackNavigator: React.FC = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Manage Members" component={ManageMembersScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

export default ProfileStackNavigator;