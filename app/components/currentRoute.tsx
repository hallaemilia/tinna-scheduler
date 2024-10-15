import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CurrentRouteLogger() {
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        console.log('Current route:', route.name);
        // console.log('Navigation state:', navigation.getState());
    }, [route.name]);

    return null;
};

