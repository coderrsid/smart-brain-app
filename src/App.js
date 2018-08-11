import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SigninForm from './components/SigninForm/SigninForm';
import SignupForm from './components/SignupForm/SignupForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Particles from 'react-particles-js';
import swal from 'sweetalert';


const particlesProps = {
  particles: {
    number: {
      value: 100,
      density: {
        enabled: true,
        value_area: 800
      }
    }
  }
}

const initState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user : {
    id: '',
    name: '',
    email: '', 
    password : '',
    entries: 0,
    joined: ''
  }
}      

class App extends Component {

  constructor() {
    super()
    this.state = initState;
  }

  loadUser = (data) => {
      this.setState({user: 
        {
          id: data.id,
          name: data.name,
          email: data.email,
          password : data.password,
          entries: data.entries,
          joined: new Date()
        }
      });
  }

  calculateFaceLocation = (data) => {
    const faceCoordinates = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: faceCoordinates.left_col * width,
      topRow: faceCoordinates.top_row * height,
      rightCol: width-(faceCoordinates.right_col * width),
      bottomRow: height-(faceCoordinates.bottom_row * height)
   }
  } 

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('https://blooming-coast-99463.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://blooming-coast-99463.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
           Object.assign(this.state.user,{entries: count})
           swal("Congratulations !!", "Your rank has been increased", "success")
         }) 
        .catch(err => console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    }).catch(err => console.log(err));   
   } 

  onSignOut = (route) => {
    swal({
      title: "Are you sure ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.onRouteChange(route)
      } 
      else {
      }
    })
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initState)
    }
    else if(route === 'home') {
      this.setState({isSignedin : true})
    } 
    this.setState({route : route})
  }

  render() {
    const {isSignedin, input, route, box } = this.state;
    return (
      <div className='App'>
        <Particles className="particles" params={particlesProps}/>        
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} onSignOut={this.onSignOut}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit} 
              />
              <ImageRecognition box={box} imageUrl={input} />
            </div> 
            : ( route === 'signin'
              ?  <SigninForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              :  <SignupForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )         
        }  
      </div>
    );
  }
}

export default App;
