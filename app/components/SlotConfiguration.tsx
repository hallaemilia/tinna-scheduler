import React, { useState } from 'react';
import { TextInput, Button, FlatList, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { v4 as uuidv4 } from "uuid";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Slot } from '../components/interfaces/ScheduleObjects';

interface SlotConfigurationProps {
    date: string;
    schedule: string;
    onSave: (slots: Slot[]) => void;
}


const SlotConfiguration: React.FC<SlotConfigurationProps> = ({ schedule, date, onSave }) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [slotId, setSlotId] = useState<string>(uuidv4());
    const [scheduleId, setScheduleId] = useState<string>(schedule);
    const [userId, setUserId] = useState<string>('');
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
    const [showEndPicker, setShowEndPicker] = useState<boolean>(false);


    // const addSlot = () => {
    //     setSlots([...slots, {
    //         slotId: uuidv4(),
    //         scheduleId: schedule,
    //         date: new Date(date),
    //         startTime: startTime,
    //         endTime: endTime,
    //         userId: '',
    //     }]);
    // };

    const onChangeStartTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || startTime;
        setShowStartPicker(Platform.OS === 'ios');
        setStartTime(currentDate);
    };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || endTime;
        setShowEndPicker(Platform.OS === 'ios');
        setEndTime(currentDate);
    };

    return (
        <View>
            <Text>Configure Slots for {date}</Text>

            <Button title="Select Time" onPress={() => setShowStartPicker(true)} />
            {showStartPicker && (
                <DateTimePicker
                    testID="startTimePicker"
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartTime}
                />
            )}
            <Text>Start Time: {startTime.toLocaleTimeString()}</Text>

            <Button title="SelectDuration" onPress={() => setShowEndPicker(true)} />
            {showEndPicker && (
                <DateTimePicker
                    testID="endTimePicker"
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEndTime}
                />
            )}
            <Text>End Time: {endTime.toLocaleTimeString()}</Text>

            <Button title="Add Slot" onPress={addSlot} />

            <FlatList
                data={slots}
                renderItem={({ item }) => (
                    <Text>
                        {item.startTime.toLocaleTimeString()} - {item.endTime.toLocaleTimeString()}
                    </Text>
                )}
                keyExtractor={(item) => item.slotId}
            />

            <Button title="Save" onPress={() => onSave(slots)} />
        </View>
    );
};

export default SlotConfiguration;