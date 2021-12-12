import React, {useState} from 'react';
import {
    StyleSheet,
    Button,
    View,
    ScrollView,
} from 'react-native';
import Loading from '../components/loading';
import HeaderComponent from '../components/HeaderComponent';
import DataService from '../services/dataService';
import {TextInput} from 'react-native-paper';


const EditProject = ({navigation}) => {
    const [dataSource, setDataSource] = useState(DataService.projectList()[0]);

    const [data, setData] = useState({
        project_title: '',
        start_date: '',
        due_date: '',
        estimate_hours: '',
    });

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
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            label="Start date"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            // onChangeText={text =>
                            //     setData({...data, due_date: text})
                            // }
                            label="Due date"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.action}>
                        <TextInput
                            onChangeText={text =>
                                setData({...data, estimate_hours: text})
                            }
                            label="Estimate time(hours)"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 15}}>
                    <Button title="Edit"  />
                </View>


            </ScrollView>
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
