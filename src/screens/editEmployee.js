import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Platform,
} from 'react-native';
// import {Form, Item, Input, Label} from 'native-base';
import Loading from '../components/loading';
import {TextInput} from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';

const EditEmployee = ({navigation, route}) => {
    const [dataSource, setDataSource] = useState(route.params.employee);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        project_title: route.params.employee.name,
        start_date: '',
        due_date: '',
        estimate_hours: '',
    });

    const showLoading = () => {
        setIsLoading(true);
    };
    const hideLoading = () => {
        setIsLoading(false);
    };
    //navigate to screens
    // const navigateScreen = viewId => {
    //     const {navigate} = this.props.navigation;
    //     navigate(viewId);
    // };

    const editEmp = () => {};

    return (
        <View style={styles.container}>
            <HeaderComponent
                back="true"
                title="Edit Employee"
                noIcon="true"
                navigation={navigation}
            />
            <ScrollView>
                <View style={{margin: 15}}>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Full name"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Phone"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Department"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, project_title: text})
                            }
                            mode="outlined"
                            label="Designation"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <Button title="Edit Employee" onPress={editEmp} />
                </View>
            </ScrollView>
        </View>
    );
};

export default EditEmployee;

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
    loginLabel: {
        fontSize: 14,
        color: '#000000',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
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
        height: 40,
        backgroundColor: '#e6fffe',
        paddingBottom: 0,
        outlineColor: '#05375a',
        fontSize: 16,
        borderBottom: 'none',
    },
    label: {
        fontSize: 14,
        fontHeight: 400,
    },
});
