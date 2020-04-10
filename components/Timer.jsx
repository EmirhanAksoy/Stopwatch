import React, { Component } from "react";
import { FlatList, Text, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, View, YellowBox } from 'react-native';
import { Divider } from 'react-native-elements';


export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: 0,
            minute: 0,
            second: 0,
            hour: 0,
            splitSecond: 0
        }
        this.lab = [];
    }

    setRecord = () => {
        this.lab.unshift({
            order: this.lab.length + 1,
            key: this.lab.length + 1,
            hour: this.state.hour,
            minute: this.state.minute,
            second: this.state.second,
            splitSecond: this.state.splitSecond
        });
    }

    formatNumber = (number) => {
        let lenght = number.toString().length;
        let result = '';
        if (lenght === 1) {
            result = '0' + number.toString()
        } else {
            return number.toString()
        }
        return result;
    }

    Reset = () => {
        this.lab = [];
        this.setState({ value: 0, splitSecond: 0, second: 0, minute: 0 });
    }

    stopTimer = () => {
        clearInterval(this.state.interval);
        this.setState({ interval: 0 })
    }

    buttonText = () => {
        if (this.state.splitSecond > 0 && this.state.interval === 0)
            return { Text: 'Continue', Color: 'green' }
        else if (this.state.splitSecond === 0 && this.state.interval === 0)
            return { Text: 'Start', Color: '#353940' }
        else
            return { Text: 'Stop', Color: 'red' }
    }

    setTimerValues = () => {
        this.setState({ splitSecond: this.state.splitSecond + 1 });
        if (this.state.splitSecond === 60) {
            this.setState({ second: this.state.second + 1, splitSecond: 0 });
        }
        if (this.state.second === 60) {
            this.setState({ minute: this.state.minute + 1, second: 0 });
        }
        if (this.state.minute === 60) {
            this.setState({ hour: this.state.hour + 1, minute: 0 });
        }
    }

    _renderItem = ({ item }) => (
        <MyListItem
            order={item.order}
            minute={this.formatNumber(item.minute)}
            hour={this.formatNumber(item.hour)}
            second={this.formatNumber(item.second)}
            splitSecond={this.formatNumber(item.splitSecond)}
        />
    );

    toogleTimer = () => {
        if (this.state.interval === 0) {
            let interval = setInterval(() => {
                this.setTimerValues();
            }, 1)
            this.setState({ interval });

        } else {
            this.stopTimer();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column', alignSelf: 'stretch' }}>
                <View style={{ flex: 0, backgroundColor: '#202b3d', borderRadius: 20, marginTop: 20, flexDirection: 'row', alignSelf: 'center', width: '90%' }}>
                    <View style={{ flexDirection: 'column', width: '24%', alignItems: 'center' }}>
                        <TimerLabel name="Hour" value={this.formatNumber(this.state.hour)} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '2%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: '40%', color: 'white' }}>:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '24%', alignItems: 'center' }}>
                        <TimerLabel name="Hour" value={this.formatNumber(this.state.minute)} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '2%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 40, color: 'white' }}>:</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '24%', alignItems: 'center' }}>
                        <TimerLabel name="Hour" value={this.formatNumber(this.state.second)} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '2%', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 40, color: 'white' }}>,</Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '22%', alignItems: 'center' }}>
                        <TimerLabel name="Hour" value={this.formatNumber(this.state.splitSecond)} />
                    </View>
                </View>
                <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
                    <TouchableOpacity
                        onPress={this.toogleTimer}
                        style={{
                            borderWidth: 2,
                            borderColor: '#f0adb8',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 90,
                            height: 90,
                            backgroundColor: '#f54260',//this.buttonText().Color,
                            borderRadius: 45,
                            marginLeft: 30
                        }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            {this.buttonText().Text}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.setRecord}
                        style={{
                            borderWidth: 2,
                            borderColor: '#f0adb8',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 90,
                            height: 90,
                            backgroundColor: '#f54260',
                            borderRadius: 45,
                            marginRight: 25,
                            marginLeft: 25
                        }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Set
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.Reset}
                        style={{
                            borderWidth: 2,
                            borderColor: '#f0adb8',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 90,
                            height: 90,
                            backgroundColor: '#f54260',
                            borderRadius: 45,
                            marginRight: 25
                        }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Reset
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1, backgroundColor: '#202b3d', borderRadius: 10, marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 15, flexDirection: 'column', alignItems: 'center' }}>
                    <FlatList
                        data={this.lab}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this.state.order}
                        renderItem={this._renderItem}
                        getItemLayout={(data, index) => ({ length: 88, offset: 88 * index, index })}
                    />
                </View>
            </View>
        );
    }


}


export default Timer;




function TimerLabel(props) {
    return (
        <Text style={{ fontSize: 50, color: 'white', padding: 5 }}>
            {props.value}
        </Text>
    );
}







export class MyListItem extends React.PureComponent {
    render() {
        return (
           
                <View style={{ width: '100%', flexDirection: 'column', marginBottom: 10, alignSelf: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'bottom', width: '15%', color: 'white' }}>
                            {this.props.order}.
                    </Text>
                        <Text style={{ fontSize: 25, width: '15%', color: 'white' }}>
                            {this.props.hour}
                        </Text>
                        <Text style={{ fontSize: 25, width: '5%', color: 'white' }}>
                            :
                    </Text>
                        <Text style={{ fontSize: 25, width: '15%', color: 'white' }}>
                            {this.props.minute}
                        </Text>
                        <Text style={{ fontSize: 25, width: '5%', color: 'white' }}>
                            :
                    </Text>
                        <Text style={{ fontSize: 25, width: '15%', color: 'white' }}>
                            {this.props.second}
                        </Text>
                        <Text style={{ fontSize: 25, width: '5%', color: 'white' }}>
                            ,
                    </Text>
                        <Text style={{ fontSize: 25, width: '15%', color: 'white' }}>
                            {this.props.splitSecond}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', color: 'white', marginTop: 10 }}>
                        <Divider style={{ backgroundColor: 'white', width: '90%' }} />
                    </View>
                </View>
            

        );
    }
}




