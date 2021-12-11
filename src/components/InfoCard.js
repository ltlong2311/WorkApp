import React from 'react';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CardView from 'react-native-cardview';

const InfoCard = ({item}) => {
    return (
        <View style={styles.scene}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <CardView
                    style={styles.cardData}
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={0}>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Employee ID
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text
                                style={[
                                    {textAlign: 'right'},
                                    styles.swipeCardRightText,
                                ]}>
                                {item.user_id}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Phone
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text
                                style={[
                                    {textAlign: 'right'},
                                    styles.swipeCardRightText,
                                ]}>
                                {item.phone}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Email
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text
                                style={[
                                    {textAlign: 'right'},
                                    styles.swipeCardRightText,
                                ]}>
                                {item.email}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Birthday
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text
                                style={[
                                    {textAlign: 'right'},
                                    styles.swipeCardRightText,
                                ]}>
                                {item.dob}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.taskRow}>
                        <View style={styles.leftContainer}>
                            <Text
                                style={[
                                    {textAlign: 'left'},
                                    styles.swipeCardLeftText,
                                ]}>
                                Gender
                            </Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text
                                style={[
                                    {textAlign: 'right'},
                                    styles.swipeCardRightText,
                                ]}>
                                {item.dob}
                            </Text>
                        </View>
                    </View>
                </CardView>
                <CardView
                    style={[styles.cardData, {marginTop: 20, marginBottom: 20}]}
                    cardElevation={0}
                    cardMaxElevation={0}
                    cornerRadius={0}>
                    <View style={styles.leftContainer}>
                        <Text
                            style={[
                                {
                                    textAlign: 'left',
                                    fontWeight: '600',
                                },
                                styles.swipeCardLeftText,
                            ]}>
                            Address
                        </Text>
                    </View>
                    <View style={styles.leftContainer}>
                        <Text
                            style={[
                                {textAlign: 'left'},
                                styles.swipeCardLeftText,
                            ]}>
                            {item.address},
                            {item.city},
                            {item.country}
                        </Text>
                    </View>
                </CardView>
            </ScrollView>
        </View>
    );
};

export default InfoCard;

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editIcon: {
        width: 25,
        height: 25,
    },
    scene: {
        flex: 1,
        marginTop: 20,
    },
    cardData: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    cardData: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#e7e7e7',

        borderBottomWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },

    leftContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    addressContainer: {
        flex: 1,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    swipeCardLeftText: {
        color: '#2D2D2D',
        fontSize: 14,
    },
    swipeCardRightText: {
        color: '#8e8e93',
        fontSize: 14,
        // lineHeight: 30,
    },
});
