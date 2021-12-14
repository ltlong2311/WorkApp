import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Input,
    TouchableOpacity,
    // TextInput,
    Platform,
    Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../../firebaseConnect';
import {doc, setDoc} from 'firebase/firestore/lite';

const convertDateToString = (date, mode) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    var dateString = '';
    mode === 1
        ? (dateString = month + '-' + day + '-' + year)
        : mode === 2
        ? (dateString = year + '-' + month + '-' + day)
        : mode === 3
        ? (dateString = day + '-' + month + '-' + year)
        : '';

    return dateString;
};

const now = new Date();

const CreateProject = ({navigation}) => {
    const [data, setData] = useState({
        project_title: '',
        start_date: '',
        due_date: '',
        estimate_hours: '',
    });
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const randomId = Math.random().toString(36).substr(2, 11);

    const alertDate = text =>
        Alert.alert('Alert', text, [
            {text: 'OK', onPress: () => showDatePicker()},
        ]);

    const handleCreateProject = async () => {
        await setDoc(doc(db, 'projectList', randomId), {
            project_title: data.project_title,
            assign_lead: '1',
            start_date: data.start_date,
            due_date: data.due_date,
            progress: 0,
            project_created: convertDateToString(now, 2),
            estimate_hours: data.estimate_hours,
            id: randomId,
            tasks: [],
        })
            .then(() => {
                alertMess('Created successfully');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const alertMess = text =>
        Alert.alert('Message', text, [
            // {text: 'OK', onPress: navigation.pop()},
            {text: 'OK', onPress: navigation.goBack(null)},
        ]);

    const onCreateProject = () => {
        if (
            data.project_title !== '' &&
            data.start_date !== '' &&
            data.due_date !== '' &&
            data.estimate_hours !== ''
        ) {
            handleCreateProject();
        } else {
            Alert.alert('Alert', 'Some input fields cannot be empty!');
        }
    };

    const showDatePicker = () => {
        setShowDatePicker1(true);
    };

    const hideDatePicker = () => {
        setShowDatePicker1(false);
    };

    const handleConfirm = date => {
        const dateStart = convertDateToString(date, 2);
        const startDay = new Date(dateStart).getTime();
        const today = new Date(convertDateToString(now, 2)).getTime();

        if (startDay >= today) {
            setStartDate(date);
            setData({...data, start_date: dateStart});
            hideDatePicker();
        } else {
            hideDatePicker();
            alertDate('The start date cannot be before the current date!');
        }
    };

    const handleConfirmEnd = date => {
        const dateEnd = convertDateToString(date, 2);
        const endDay = new Date(dateEnd).getTime();
        const today = new Date(convertDateToString(now, 2)).getTime();

        if (endDay >= today) {
            setEndDate(date);
            setData({...data, due_date: dateEnd});
            hideDatePicker();
        } else {
            hideDatePicker();
            alertDate('The end date cannot be before the current date!');
        }
    };

    const showDatePickerEnd = () => {
        setShowDatePicker2(true);
    };

    const hideDatePickerEnd = () => {
        setShowDatePicker2(false);
    };

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Create Project"
                noIcon="true"
                navigation={navigation}
            />
            <ScrollView>
                <View style={{margin: 15}}>
                    {/* <Text style={styles.label}>Project name: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View> */}
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            label="Project name"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            value={
                                startDate
                                    ? convertDateToString(startDate, 3)
                                    : ''
                            }
                            label="Start date"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onFocus={showDatePicker}
                            right={
                                <MaterialCommunityIcons
                                    name="calendar"
                                    color="grey"
                                    size={20}
                                />
                            }
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            label="Due date"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={endDate && convertDateToString(endDate, 3)}
                            onFocus={showDatePickerEnd}
                            right={
                                <MaterialCommunityIcons
                                    name="calendar"
                                    color="grey"
                                    size={20}
                                />
                            }
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, estimate_hours: text})
                            }
                            label="Estimate time(hours)"
                            keyboardType="numeric"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 15}}>
                    <Button title="create" onPress={onCreateProject} />
                </View>

                <DateTimePickerModal
                    isVisible={showDatePicker1}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <DateTimePickerModal
                    isVisible={showDatePicker2}
                    mode="date"
                    onConfirm={handleConfirmEnd}
                    onCancel={hideDatePickerEnd}
                />
            </ScrollView>
        </View>
    );
};

export default CreateProject;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
        // backgroundColor: '#e6f9ff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#BFBBBB',
    },
    textInput: {
        flex: 1,
        height: 55,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        color: '#05375a',
        fontSize: 16,
        borderBottom: 'none',
    },
    label: {
        fontSize: 14,
        fontHeight: 400,
    },
});
