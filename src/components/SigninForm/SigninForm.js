import React from 'react';
import swal from 'sweetalert';

class SigninForm extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		if(event.length<8) {
				swal({
					title: "Short Password",
					text: "Password length should be more than 8 characters",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
		} else {
			this.setState({signInPassword: event.target.value})
		}
	}

	onSubmitSignIn = () => { 
		fetch('https://blooming-coast-99463.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.loadUser(user);	
					this.props.onRouteChange('home');
					swal("Welcome to Magical World", "", "success")
				} else {
					swal({
					title: "Wrong Credentials",
					text: "The email and password combination you entered is incorrect",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				}
			})
	}
		
	render() {
	const { onRouteChange } = this.props;	
	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-150-m w-25-l mw6 center shadow-5">
		<main className="pa4 black-80">
			<div className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f1 fw6 ph0 mh0">Sign In</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<input 
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="email" 
							name="email-address"  
							id="email-address"
							onChange = {this.onEmailChange} 
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
						<input 
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="password" 
							name="password" 
							id="password" 
							onChange = {this.onPasswordChange}
						/>
					</div>
				</fieldset>
					<div className="">
						<input 
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
							type="submit" 
							value="Sign in"
							onClick= {this.onSubmitSignIn} 
						/>
					</div>
					<div className="lh-copy mt3">
						<a onClick= {() => onRouteChange('signup')} href="#0" className="f4 link dim black db">Sign up</a>
					</div>
			</div>
		</main>
		</article>
	);
	
	} 
	
}

export default SigninForm;