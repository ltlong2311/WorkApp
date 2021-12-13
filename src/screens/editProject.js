import React, {useState} from 'react';
import {StyleSheet, Button, View, ScrollView, Alert} from 'react-native';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DataService from '../services/dataService';
import {TextInput} from 'react-native-paper';
import {db} from '../../firebaseConnect';
import {doc, updateDoc} from 'firebase/firestore/lite';

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

const formatDate = input => {
    var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];

    return day + '-' + month + '-' + year;
};

const now = new Date();

const EditProject = ({navigation, route}) => {
    const project = route.params.project.item;
    const [data, setData] = useState({
        project_title: project.project_title,
        start_date: project.start_date,
        due_date: project.due_date,
        estimate_hours: project.estimate_hours,
    });
    console.log(project);

    const ref = doc(db, 'projectList', project.id);

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const alertMess = text =>
        Alert.alert('Message', text, [
            {text: 'OK', onPress: navigation.goBack(null)},
        ]);

    const showDatePicker = () => {
        setShowDatePicker1(true);
    };

    const hideDatePicker = () => {
        setShowDatePicker1(false);
    };

    const showDatePickerEnd = () => {
        setShowDatePicker2(true);
    };

    const hideDatePickerEnd = () => {
        setShowDatePicker2(false);
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

    const handleEditProject = async () => {
        showLoading();
        await updateDoc(ref, {
            project_title: data.project_title,
            start_date: data.start_date,
            due_date: data.due_date,
            estimate_hours: data.estimate_hours,
        })
            .then(() => {
                hideLoading();
                alertMess('Edit successfully');
            })
            .catch(error => {
                hideLoading();
                console.log(error);
            });
    };

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };

    const alertDate = text =>
        Alert.alert('Alert', text, [
            {text: 'OK', onPress: () => showDatePicker()},
        ]);

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Edit Project"
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
                            defaultValue={project.project_title}
                        />
                    </View>
                    <View style={styles.action} onPress={showDatePicker}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, start_date: text})
                            }
                            label="Start date"
                            style={styles.textInput}
                            onFocus={showDatePicker}
                            autoCapitalize="none"
                            value={
                                startDate
                                    ? convertDateToString(startDate, 3)
                                    : formatDate(project.start_date)
                            }
                        />
                    </View>
                    <View style={styles.action} onPress={showDatePickerEnd}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, due_date: text})
                            }
                            label="Due date"
                            onFocus={showDatePickerEnd}
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={
                                endDate
                                    ? convertDateToString(endDate, 3)
                                    : formatDate(project.due_date)
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
                            defaultValue={project.estimate_hours}
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 15}}>
                    <Button title="Edit" onPress={handleEditProject} />
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
            {isLoading && <Loading />}
        </View>
    );
};

export default EditProject;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#918E8E',
    },
    toggleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        color: '#918E8E',
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        height: 50,
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
