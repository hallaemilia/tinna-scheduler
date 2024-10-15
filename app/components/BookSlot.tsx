import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { Text, View } from '@/components/Themed';
import { Slot } from '../components/interfaces/ScheduleObjects';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// CODE IF I WANT TO RENDER HOUR BY HOUR
{/* <FlatList
                            data={hours}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.toString()}
                            showsVerticalScrollIndicator={false}
                        /> */}

type RootStackParamList = {
    BookSlot: { scheduleId: string, selectedDate: Date };
    // Other screens can be defined here
};

type BookSlotScreenRouteProp = RouteProp<RootStackParamList, 'BookSlot'>;
type BookSlotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookSlot'>;

interface Props {
    route: BookSlotScreenRouteProp;
    navigation: BookSlotScreenNavigationProp;
}

export default function BookSlot({ route }: Props) {
    console.log("Route", route);
    console.log(route.params);
    console.log("Selected Date in Bookslots", route.params.selectedDate);

    // useEffect(() => {
    //     const fetchSlots = async () => {
    //         const querySnapshot = await firestore()
    //             .collection('slots')
    //             .where('scheduleId', '==', "tinna")
    //             // .where('date_time', '==', dateTime)
    //             .get();
    //         const fetchedSlots: slot[] = [];
    //         querySnapshot.forEach(doc => {
    //             fetchedSlots.push({ id: doc.id, ...doc.data() } as unknown as slot);
    //         });
    //         setSlots(fetchedSlots);
    //     };
    //     fetchSlots();
    // }, [scheduleId, dateTime]);

    // const bookSlot = async (slotId: string) => {
    //     const user = auth().currentUser;
    //     const slotRef = firestore().collection('slots').doc(slotId);
    //     await slotRef.update({ user: user?.uid });
    //     setSlots(slots.map(slot => (slot.slotId === slotId ? { ...slot, user: user?.uid } : slot)));
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book a Slot for {route.params.selectedDate}</Text>
            {/* <FlatList
                data={slots}
                renderItem={({ item }) => (
                    <View style={styles.slotContainer}>
                        <Text style={styles.slotText}>{item.startTime.toString()} - {item.userId ? item.userId : 'Available'}</Text>
                        {!item.userId && <Button title="Book" onPress={() => bookSlot(item.slotId)} />}
                    </View>
                )}
                keyExtractor={(item) => item.slotId}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    slotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    slotText: {
        flex: 1,
        marginRight: 10,
    },
});
