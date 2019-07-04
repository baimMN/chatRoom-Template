import React, {Component} from 'react'
import { Container, Header, Title, Content,Icon,Footer, FooterTab, Button, Left, Right, Body,Text,Item,Input } from 'native-base'
import {View,AsyncStorage,ScrollView,Image,TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import axios from 'axios'
import sendPng from './image/send.png'
import logoutPng from './image/logout.png'

const url='http://192.168.1.114:3000/v1'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            chatMsg:'',
            nowLogin:'',
            groupMember:[],
            allMsg:[],
            deleteModal:false,
            userName:'',
            deleteId:'',
            message:''
        }
    }

    fetchMsg=() => {
        axios.get('http://192.168.0.11:3000/v1/allChat')
        .then( res => {
            this.setState({allMsg:res.data})
        })
        .catch(err => alert(err))
    }

    async componentDidMount(){    
        const token=await AsyncStorage.getItem('userToken')
        if(token){
            this.props.logOut()
        }
        else {
            this.fetchMsg()
            setInterval(()=>{this.fetchMsg()},1500)

            AsyncStorage.getItem('userId',(err,data) => {
                this.setState({nowLogin:data})
            })
            .then(AsyncStorage.getItem('userName',(err,data) => {
                this.setState({userName:data})
            }))
    
            axios({
                method:'get',
                url:'http://192.168.0.11:3000/v1/test'
            })
            .then(res => {this.setState({groupMember:res.data})})
        }
        
    }



    sendMsg=() => {
        if(!this.state.message){
            return true
        }
        else{
            const {message}=this.state
            const ownerId=this.state.nowLogin
            const ownerName=this.state.userName

            axios({
                method:'post',
                url:'http://192.168.0.11:3000/v1/sendChat',
                data:{
                    "message":""+message+"",
                    "ownerId":""+ownerId+"",
                    "ownerName":""+ownerName+""
                }
            })
            .then(res => {
                this.fetchMsg()
                this.setState({message:''})
            })
            .catch(err => alert(err))
        }
    }

    delete=()=> {
        const _id=this.state.deleteId
		axios({
            method:'delete',
            url:'http:192.168.0.11:3000/v1/delete',
            data:{"_id":""+_id+""}
        })
		.then(res => {
			if(res.data){
                this.setState({deleteModal:false})
				this.fetchMsg()
            }
            else {
                alert(res.data.msg)
            }
        })
        .catch(err => alert(err))
    }
    
    deleteModal=(type) => {
        type === 'false' ? this.setState({deleteModal:false}) : this.setState({deleteModal:true})
    }

    logOut=()=> {
        AsyncStorage.multiRemove(['userId','userName','userToken'],(err)=> {
            if(err){alert('kesalahan saat logout')}
            else {
                this.props.logOut()
            }
        })
    }

    showModal=(ownerId,chatId)=> {
        ownerId === this.state.nowLogin ? this.setState({deleteModal:true,deleteId:chatId}) : this.setState({deleteModal:true,deleteId:''})
    }

    interval=()=> {setInterval(()=>{this.fetchMsg()},1500)}

    render() {
        return (
            <Container>
                <Header style={{backgroundColor:'rgb(111, 191, 232)'}}>
                    <Left style={{flex:1}}>
                        <Text style={{fontSize:18}}>Chat Room</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                            {this.state.groupMember.map(item => (
                                <Text style={{fontSize:14}}>{item.name}{','}</Text>
                            ))}
                        </View>
                    </Left>
                    <Right style={{flex:1}}>
                        <TouchableOpacity onPress={this.logOut}>
                            <Image style={{width:20,height:25}} source={logoutPng}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
			    <Content style={{backgroundColor:'rgb(235, 235, 235)'}}>
                    <View style={{flex:1}}>
                        <View style={{flex:8}}>
                            <Modal 
                                isVisible={this.state.deleteModal} 
                                backdropColor='transparent' 
                                animationIn='zoomIn'
                                animationOut='zoomOut' 
                                onBackButtonPress={() => this.setState({deleteModal:false})} 
                                onBackdropPress={() => this.setState({deleteModal:false})}
                            >
                                <View style={{alignSelf:'center',width:'50%',backgroundColor:'rgb(168, 214, 255)',borderRadius:5,height:100}}>
                                    {this.state.deleteId ? 
                                        <View style={{borderBottomColor:'rgb(48, 128, 255)',borderBottomWidth:1,width:'100%',flex:1,justifyContent:'center',alignItems:'center'}}>
                                            <Text onPress={this.delete}>Delete</Text>
                                        </View>
                                        :
                                        null
                                    }
                                    <View style={{width:'100%',flex:1,alignItems:'center',justifyContent:'center',}}>
                                        <Text>apadah</Text>
                                    </View>
                                </View>
                            </Modal>
                            <ScrollView>
                                {this.state.allMsg.map((item) => (
                                    <View style={{width:'100%',flex:1,alignItems:item.ownerId === this.state.nowLogin ? 'flex-end' : 'flex-start',paddingRight:7,paddingLeft:7}}>
                                        <View style={{borderWidth:0.7,backgroundColor:'rgb(167, 222, 250)',borderColor:'rgb(230, 239, 255)',maxWidth:'65%',marginTop:15,padding:10,paddingBottom:5,paddingTop:5,borderRadius:6}}>
                                            {
                                                item.ownerId !== this.state.nowLogin ? 
                                                <View style={{flex:1,alignItems:'flex-end'}}>
                                                    <Text style={{color:'rgb(41, 41, 41)'}}>{item.ownerName}</Text>
                                                </View>   
                                                :
                                                null
                                            }
                                            <View>
                                                <Text onPress={() => this.showModal(item.ownerId,item._id)} style={{fontSize:16,color:'rgb(110, 110, 110)'}}>{item.message}</Text>
                                            </View>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={{fontSize:10,color:'rgb(140, 140, 140)'}}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Content>
                <Footer style={{backgroundColor:'transparent'}}>
                    <View style={{flex:2}}>
                        <Input value={this.state.message} placeholder='type message' onChangeText={ text => {this.setState({message:text})} }/>
                        <TouchableOpacity onPress={this.sendMsg} style={{position:'absolute',right:10,top:10,width:35,height:30}}>
                            <Image  style={{width:35,height:30}}source={sendPng} />
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>
);
    }
}
