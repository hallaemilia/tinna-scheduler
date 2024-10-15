import React, { useState } from 'react';
import { StyleSheet, Image, Button, FlatList, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import { getSchedule, getScheduleForDay } from '../../services/fireBaseDatabase';
import SlotComponent from './slot'


export default function ScheduleScreen() {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
    console.log("Selected Date", selectedStartDate);
    const navigation = useNavigation();

    // Function to handle date change
    const onDateChange = (date: Date) => {
        setSelectedStartDate(date);
        console.log("Selected Date Changed", selectedStartDate);

    };

    return (
        <View style={styles.container}>
            <CalendarPicker
                    onDateChange={(date: Date) => onDateChange(date)}
                    textStyle={styles.calendarText}
                    selectedDayStyle={styles.selectedDay}
                    selectedDayTextStyle={styles.selectedDayText}
                    todayTextStyle={styles.todayText}
                    previousTitleStyle={styles.navTitle}
                    nextTitleStyle={styles.navTitle}
                />
            <Text style={styles.dateText}>{selectedStartDate?.toDateString()}</Text>
            {/* <Button title="Get schedule test" onPress={() => getScheduleForDay('tinna', selectedStartDate)}/> */}
            <SlotComponent
                scheduleId={'tinna'}
                selectedDate={selectedStartDate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        marginBottom: 100,
    },
    calendarText: {
        color: '#FFFFFF', // Light text color for calendar
    },
    selectedDay: {
        backgroundColor: '#6200ee', // Highlight color for selected day
    },
    scheduleContainer: {
        flex: 1,
    },
    selectedDayText: {
        color: '#FFFFFF', // Light color for selected day text
    },
    todayText: {
        color: '#00BCD4', // Color for today's date
    },
    navTitle: {
        color: '#FFFFFF', // Color for navigation arrows
    },
    dateText: {
        fontSize: 16,
        color: '#FFFFFF', // Light color for selected date text
        marginTop: 20,
    },
});