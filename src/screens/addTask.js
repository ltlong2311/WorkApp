import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Switch,
    ScrollView,
    Platform,
    Button,
    Alert,
    Pressable,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';

import {db} from '../../firebaseConnect';
import {doc, updateDoc} from 'firebase/firestore/lite';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

const randomId = Math.random().toString(10).substr(2, 6);

const AddTask = ({navigation, route}) => {
    const project = route.params.data;
    const [data, setData] = useState({
        task_name: '',
        start_date: '',
        end_time: '',
        end_date: '',
        estimated_hours: '',
        description: '',
        task_progress: 0,
        user_id: '',
        t_id: randomId,
    });
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const ref = doc(db, 'projectList', project.id);

    const onCreateTask = () => {
        if (
            data.task_title !== '' &&
            data.start_date !== '' &&
            data.estimated_hours !== ''
        ) {
            handleCreateTask();
        } else {
            Alert.alert('Alert', 'Some input fields cannot be empty!');
        }
    };

    const handleCreateTask = async () => {
        showLoading();
        const tasks = project.tasks;
        const task = {
            task_detail: data,
            task_comment: [],
            task_files: [],
            assigned_to: [],
            p_id: project.id,
        };
        tasks.push(task);
        await updateDoc(ref, {
            tasks: tasks,
        })
            .then(() => {
                hideLoading();
                alertMess('Create successfully');
            })
            .catch(error => {
                hideLoading();
                console.log(error);
            });
    };

    const alertMess = text =>
        Alert.alert('Message', text, [
            {text: 'OK', onPress: navigation.pop(2)},
        ]);

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

    const alertDate = text =>
        Alert.alert('Alert', text, [
            {text: 'OK', onPress: () => showDatePicker()},
        ]);

    const showDatePicker = () => {
        setIsShowDatePicker(true);
    };

    const hideDatePicker = () => {
        setIsShowDatePicker(false);
    };

    const showLoading = () => {
        setIsLoading(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Create Task"
                noIcon="true"
                navigation={navigation}
            />
            <ScrollView>
                <View style={{margin: 15}}>
                    <Text style={styles.label}>Task Title: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, task_name: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={styles.label} onPress={showDatePicker}>
                        Start Date:
                    </Text>
                    <Pressable onPress={showDatePicker}>
                        <View style={styles.action}>
                            <TextInput
                                onChangeText={text =>
                                    setData({...data, start_date: text})
                                }
                                style={styles.textInput}
                                autoCapitalize="none"
                                editable={false}
                                value={
                                    startDate
                                        ? convertDateToString(startDate, 3)
                                        : ''
                                }
                            />
                        </View>
                    </Pressable>

                    <Text style={styles.label}>Estimated Hours: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, estimated_hours: text})
                            }
                            style={styles.textInput}
                            keyboardType="numeric"
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={styles.label}>Description: </Text>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, description: text})
                            }
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <Button title="create" onPress={onCreateTask} />
                </View>
                <DateTimePickerModal
                    isVisible={isShowDatePicker}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
            {isLoading && <Loading />}
        </View>
    );
};

export default AddTask;

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
        borderBottomWidth: 1,
        borderBottomColor: '#BFBBBB',
    },
    textInput: {
        flex: 1,
        height: 35,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        color: '#05375a',
        fontSize: 16,
    },
    label: {
        fontSize: 14,
    },
});
