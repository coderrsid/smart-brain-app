import React from 'react';
import swal from 'sweetalert';

class Signup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			verifypassword: '',
			nameError: false,
			emailError: false,
			passwordError: false,
			isDisabled:true
		}                                                                                                 
		this.submitForm = this.submitForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	validateEmail(email){
		const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
		const result = pattern.test(email);
		if(result){
			this.setState({
				emailError:false,
				email:email
			});
			
		}else{
			this.setState({
				emailError:true,
				
			});
			
		}
		console.log(this.emailError);
	}
	handleChange(event){
		const tar = event.target;
		const value = tar.type === 'checkbox' ? tar.checked : tar.value;
		const name = tar.name;
		console.log(name, value);
		this.setState({
			[name]: value
		});

		if(event.target.name==='name'){
			if(event.target.value==='' || event.target.value===null ){
				this.setState({
					nameError:true,
					
				});
			}else {
				this.setState({
					nameError:false,     
					name:event.target.value,
				});
				
			}
			console.log(this.nameError);
		}

		if(event.target.name==='email'){
			this.validateEmail(event.target.value);
		}
		if(event.target.name==='password'){
			if(event.target.value==='' || event.target.value===null){
				this.setState({
					passwordError:true,
					
				});
				console.log("Password done");
			}else {
				this.setState({
					passwordError:false,
					password:event.target.value,
					
				});
				
			}
			console.log(this.passwordError);
		}
		if(this.state.nameError===false && this.state.lastnameError===false && 
			this.state.emailError===false && this.state.passwordError===false){
			this.setState({
				isDisabled:false
			})
		}
	}

	submitForm = () => { 
		fetch('https://blooming-coast-99463.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.loadUser(user);	
					this.props.onRouteChange('home');
				}
			}).then(swal("Good job!", "You're registered now !", "success"))
	}	

render(){
return(
<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-150-m w-25-l mw6 center shadow-5">
	<main className="pa4 black-80">
		<div className="measure">
		<form id="signup-form">
			<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				<legend className="f1 fw6 ph0 mh0">Register</legend>
               		
            		 <div className="mt3">
            		 	<label className="tl db lh-copy fw6 f6" htmlFor="name">Name</label>	
            		 	<input 
            		 		type="text" 
            		 		id="name" 
            		 		name="name" 
            		 		className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            		 		onChange={this.handleChange} 
            		 		title="It should be more than 5 characters"
            		 	/>
                  		{this.state.nameError ? <small style={{align: "left",color: "red"}}>Please Enter some value!</small> : ''} 
                	</div>
            		<div className="mt3">
                  		<label className="tl db fw6 lh-copy f6" htmlFor="email">Email</label>
                  		<input 
                  			type="email" 
                  			id="email" 
                  			name="email" 
                  			className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  			onChange={this.handleChange} 
                  			title="It should be like 'abc@example.com'"
                  		/>
                  		{this.state.emailError ? <small style={{align: "left",color: "red"}}>Please Enter valid email address!</small> : ''}
                	</div>
                    <div className="mt3">         
                  		<label className="tl db fw6 lh-copy f6" htmlFor="password">Password</label>
                  		<input 
                  			type="password" 
                  			id="password" 
                  			name="password" 
                  			className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  			onChange={this.handleChange} 
                  			title="It should be more than 5 characters"
                  		/>
                  		{this.state.passwordError ? <small style={{align: "left", color: "red"}}>Please enter some value!</small> : ''}
               		</div>
               		</fieldset> 
               		<div className="">                
             	    	<button className="b ph3 pv2 input-reset ba b--gray bg-transparent grow pointer f6 dib " disabled={this.state.isDisabled} onClick={this.submitForm}>Signup</button>
            		</div>
            		<small>Please fill all fields.</small>
        </form>
        </div>
    </main>
</article>       
)
}
};

export default Signup;