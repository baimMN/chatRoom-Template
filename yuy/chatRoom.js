import React, {Component} from 'react'
import { Container, Header, Title, Content,Icon,Footer, FooterTab, Button, Left, Right, Body,Text,Item,Input } from 'native-base'
import {View,AsyncStorage,ScrollView,Image,TouchableOpacity} from 'react-native'
import axios from 'axios'
import sendPng from './image/send.png'
import logoutPng from './image/logout.png'

const url='http://192.168.1.106:3333/token/v1'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            groupData:[],
            groupMember:[],
        }
    }

    fetch=()=> {
        alert('adsadasdasd')
        axios.get('http://192.168.1.106:3333/token/v1/groups')
        .then((res) => {
            this.setState({groupData:res.data})
        })
        .catch(err => {
            alert(err)
        })
    }

    componentDidMount(){
       this.fetch()
    }

    groupPress=()=> {
        this.setState
    }

    render() {
        alert('test grips',this.state.groupData)
        return (
            <Container>
                <Header style={{backgroundColor:'rgb(111, 191, 232)'}}>
                    <Left style={{flex:1}}>
                        <Text style={{fontSize:18}}>Chat Room</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                         
                        </View>
                    </Left>
                    <Right style={{flex:1}}>
                        <TouchableOpacity onPress={this.fetch}>
                            <Image style={{width:20,height:25}} source={logoutPng}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
			    <Content style={{backgroundColor:'rgb(235, 235, 235)'}}>
                    <View style={{flex:1}}>
                        {this.state.groupData.map((item,index)=> (
                        <View style={{width:'100%',backgroundColor:'red'}}>
                            <Text>assa</Text>
                            <View style={{flex:1,flexDirection:'row',width:'100%'}}>
                                {item.member.map((item,index)=> (
                                    <Text>{item.user.username}{','}</Text>
                                ))}
                            </View>
                        </View>
                        ))}
                    </View>
                </Content>
            </Container>
        )
    }
}
