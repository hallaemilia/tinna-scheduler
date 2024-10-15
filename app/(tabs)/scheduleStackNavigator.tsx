import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookSlot from '../components/BookSlot';
import ScheduleScreen from '../components/schedule';

const Stack = createStackNavigator();

const ScheduleStackNavigator: React.FC = () => (
    <Stack.Navigator>
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Book Slot" component={BookSlot} options={{ headerShown: false }} />
    </Stack.Navigator>
);

export default ScheduleStackNavigator;