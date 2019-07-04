import React, {Component} from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Item,Input } from 'native-base'
import {View,AsyncStorage} from 'react-native'
import ChatRoom from './chatRoom'
import axios from 'axios'

export default class App extends Component{
	constructor(props){
		super(props)
		this.state={
			test:'haiiii',
			email:'',
			modal:true,
			password:''
		}	
	}

	onChange=(text,type)=> {
		type === 'email' ? this.setState({email:text}) : this.setState({password:text})
	}

	login=()=> {
		const {email,password}=this.state
		axios('http:192.168.0.11:3000/v1/login',{
			method:'post',
			headers:{},
			data:{"email":""+email+"","password":""+password+""}
		})
		.then((res) => {
			if(!res.data){alert('pw salah')}
			else{
				AsyncStorage.multiSet([['userId',res.data._doc._id],['userName',res.data._doc.name],['userToken',res.data.token]])
				.then(this.setState({modal:true}))
			}
		})
		.catch(err => alert(err))
	}

	async componentDidMount(){
		// const token=await AsyncStorage.getItem('userToken')
		const tokenCoba='ads'
        if(tokenCoba){
            this.setState({modal:true})
        }
	}

	logOut=()=> {
		this.setState({modal:false})
	}

	render() {
		if(this.state.modal) {
			return (<ChatRoom logOut={this.logOut}/>)
		}
		else {
			return (
				<Container style={{flex:1,padding:20,backgroundColor:'rgb(227, 238, 255)'}}>
					<Content>
						<View style={{marginTop:60}}>
							<View style={{width:'100%',flex:1,alignItems:'center'}}>
								<Text style={{fontSize:40,fontWeight:"300",marginBottom:20}}>Chat App</Text>
							</View>
							<Item rounded style={{borderColor:'rgb(168, 214, 255)'}}>
								<Input  onChangeText={text => this.onChange(text,'email')} placeholder='email' />
							</Item>
							<Item rounded style={{borderColor:'rgb(168, 214, 255)',marginTop:10}}>
								<Input placeholder='pw' onChangeText={text => this.onChange(text,'pw')} />
							</Item>
							<Button block rounded onPress={this.login} style={{backgroundColor:'rgb(120, 172, 255)',marginTop:30}}>
								<Text>Login</Text>
							</Button>
						</View> 
					</Content>
				</Container>
			)
		} 
	}	 	
}

