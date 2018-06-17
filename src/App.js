import React, { Component } from 'react';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'bb05503440b4483e974834e0ea45e5a7'
});

const particleOptions = {
   particles: {
     number: {
       value:30,
        density: { 
          enable: true,
          value_area : 800
        }
      }
    }
  }
                         
class App extends Component {
  constructor(){
   super();
   this.state = {
      input: '',  
      imageUrl: '',
      box: {},
      route: 'SignIn' ,
      isSignedIn: false  
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)   
    }
  } 

  displayFaceBox = (box) => {
   this.setState({box: box});
  }

  onRoute = (route) =>{
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    else{
      this.setState({isSignedIn: false})
    }
    this.setState({route: route});
  }

  onInputChange = (event) =>{
   this.setState({input: event.target.value});
  } 

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input}) 
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));                      
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
          />
        <Navigation onRoute={this.onRoute} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
         ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm 
             onInputChange={this.onInputChange} 
             onSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div> 
         :  this.state.route === 'SignIn' 
            ? <SignIn onRoute={this.onRoute}/>
            : <Register onRoute={this.onRoute}/>
          
     }
      </div>
    );
  }
}

export default App;
