import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Button, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import { getScheduleForDay, getProfileNameFromId } from '../../services/fireBaseDatabase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Slot } from './interfaces/ScheduleObjects';

interface SlotProps {
    scheduleId: string;
    selectedDate: Date
}

export default function SlotComponent({ scheduleId, selectedDate }: SlotProps) {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    React.useEffect(() => {
        setSlots([]);
        setLoading(true);
        console.log("Fetching data...")
        getScheduleForDay(scheduleId, selectedDate).then(async data => {
            if (data) {
                const updatedSlots = await Promise.all(
                    data.map(async slot => {
                        slot.userName = await getProfileNameFromId(slot.user);
                        return slot;
                    })
                );
                setSlots(updatedSlots);
            }
            setLoading(false);
        });
        console.log("Data fetched, setting loading to false")
    }, [scheduleId, selectedDate]);

    return (
        <View style={styles.box}>
            {loading ? (
                <ActivityIndicator color={"#fff"}/>
            ) : (
                <FlatList
                    data={slots}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <View style={styles.contentContainer}>
                                <Image style={styles.logo} source={require('../../assets/images/profile.png')} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>WALKER: {item.userName}</Text>
                                    <Text style={styles.text}>TIME OF WALK: {item.time}</Text>
                                    <Text style={styles.text}>ESTIMATED DURATION: {item.duration}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item: Slot) => item.id}
                    ListFooterComponent={() => (
                        <View style={styles.container}>
                            <Button 
                                title="Add another slot to this day" 
                                color="00BCD4" 
                                onPress={() => navigation.navigate("Book Slot", { scheduleId, selectedDate: selectedDate.toISOString() })}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        width: '100%'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'gray',
        borderRadius: 70,
        width: '100%',
    },
    contentContainer: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '90%',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'gray'
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 100
    },
    text: {
        fontSize: 15,
        color: '#FFFFFF',
        flexShrink: 1,
    },
});