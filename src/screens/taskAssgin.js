import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Platform,
    Alert,
    FlatList,
    Image,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Loading from '../components/loading';
import {TextInput} from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';

import {db} from '../../firebaseConnect';
import {
    collection,
    deleteDoc,
    updateDoc,
    doc,
    getDoc,
    getDocs,
} from 'firebase/firestore/lite';
import {TouchableOpacity} from 'react-native-gesture-handler';
import COLORS from '../consts/color';
import {Center} from 'native-base';

const TaskAssign = ({navigation, route}) => {
    const task = route.params.data;
    const [employeeList, setEmployeeList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
        getProjectData();
    }, []);

    const fetchData = async () => {
        const employeeCol = collection(db, 'employeeList');
        const employeeSnapshot = await getDocs(employeeCol);
        const employeeList = employeeSnapshot.docs.map(doc => doc.data());
        setEmployeeList(employeeList);
    };

    const getProjectData = async () => {
        const ref = doc(db, 'projectList', task.p_id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            setTasks(docSnap.data().tasks);
        }
    };

    const alertMess = text =>
        Alert.alert('Message', text, [
            {text: 'OK', onPress: () => navigation.goBack(null)},
        ]);

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };

    const ref = doc(db, 'projectList', task.p_id);

    const onAssign = item => {
        var newTasks = tasks;
        newTasks.forEach((val, key) => {
            if (val.task_detail.t_id === task.task_detail.t_id) {
                // newTasks[key].assigned_to.push(item); // assigned to many employees
                newTasks[key].assigned_to = item;  // a task assigned to only one employee
            }
            console.log("item", typeof task.t_id);
            console.log("item", val.task_detail.t_id);
            console.log("item2", newTasks[key].assigned_to);
        });
        assign(newTasks);
    };

    const assign = async newTasks => {
        showLoading();
        await updateDoc(ref, {
            tasks: newTasks,
        })
            .then(() => {
                alertMess("Assigned success");
                console.log("newTask", newTasks);
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                console.log(error);
            });
    };

    const _renderItem = ({item}) => (
        <View style={styles.cardView}>
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Profile', {employee: item})
                }>
                <View elevation={3} style={[styles.infoCard]}>
                    <Image
                        style={{
                            width: 45,
                            height: 45,
                            marginRight: 20,
                            overflow: 'hidden',
                            borderRadius: 50 / 2,
                        }}
                        source={{
                            uri: 'https://i.imgur.com/6quHTz8.png',
                        }}
                    />
                    <View>
                        <View
                            style={{
                                paddingTop: 5,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={[
                                    {
                                        color: COLORS.dark,
                                        fontWeight: 'bold',
                                        fontSize: 13,
                                        width: '75%',
                                        overflow: 'hidden',
                                    },
                                ]}>
                                {item.fullname}
                            </Text>
                        </View>
                        <Text
                            style={[
                                {
                                    color: COLORS.greyC,
                                    fontSize: 12,
                                    paddingTop: 5,
                                    width: '80%',
                                    overflow: 'hidden',
                                },
                            ]}>
                            {item.designation}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: 5,
                            }}>
                            <Text
                                style={{
                                    color: COLORS.primary,
                                    fontSize: 12,
                                    color: COLORS.greyC,
                                    width: '65%',
                                }}>
                                {item.department}
                            </Text>
                            <TouchableOpacity
                                style={styles.buttonAssign}
                                onPress={() => onAssign(item)}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: COLORS.whiteT,
                                    }}>
                                    Assign
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Assign to"
                noIcon="true"
                navigation={navigation}
            />
            <View>
                <View style={{margin: 15}}>
                    <Text style={styles.label}>Assign to: </Text>
                    <View style={styles.action}>
                        <FlatList
                            data={employeeList}
                            showsHorizontalScrollIndicator={false}
                            maxToRenderPerBatch={2}
                            keyExtractor={() =>
                                Math.random().toString(36).substr(2, 9)
                            }
                            renderItem={_renderItem}
                        />
                    </View>
                </View>
            </View>
            {isLoading && <Loading />}
        </View>
    );
};

export default TaskAssign;

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.whiteG,
        color: '#918E8E',
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        outlineColor: '#05375a',
        fontSize: 16,
        borderBottom: 'none',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    buttonAssign: {
        backgroundColor: '#44bbec',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
