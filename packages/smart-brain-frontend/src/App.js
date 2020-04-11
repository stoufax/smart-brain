import React, { Component } from 'react'
import Particles from 'react-particles-js'

import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import { config } from './config'

import './App.css'

const paramsParticle = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignin: true,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUsers = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonChange = () => {
    this.setState({ imageUrl: this.state.input })
    fetch(config.backendUrl + 'imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(config.backendUrl + 'image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.updateBox(this.boundingBox(response))
      })
      .catch((err) => console.log(err))
  }

  boundingBox = (data) => {
    let infoBox = data.outputs[0].data.regions
    let sizeImage = document.querySelector('#faceReco')
    let width = Number(sizeImage.width)
    let height = Number(sizeImage.height)
    const faces = infoBox.map((data) => {
      return {
        leftCol: data.region_info.bounding_box.left_col * width,
        righCol: width - data.region_info.bounding_box.right_col * width,
        topRow: data.region_info.bounding_box.top_row * height,
        bottomRow: height - data.region_info.bounding_box.bottom_row * height
      }
    })
    return faces
  }

  updateBox = (box) => {
    this.setState({ box: box })
  }

  updateRoute = (route) => {
    if (route === 'home') {
      this.setState({ isSignin: false })
    } else if (route === 'signin') {
      this.setState({ isSignin: true, imageUrl: '' })
    }
    this.setState({ route: route })
  }

  render() {
    let homePage = null
    let signInPage = null
    let registerPage = null

    if (this.state.route === 'home') {
      homePage = (
        <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <Logo />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonChange={this.onButtonChange} />
          <FaceRecognition image={this.state.imageUrl} box={this.state.box} />
        </div>
      )
    }

    if (this.state.route === 'signin') {
      signInPage = (
        <div>
          <Signin loadUsers={this.loadUsers} updateRoute={this.updateRoute} />
        </div>
      )
    }

    if (this.state.route === 'register') {
      registerPage = (
        <div>
          <Register loadUsers={this.loadUsers} updateRoute={this.updateRoute} />
        </div>
      )
    }

    return (
      <div className="App">
        <Particles className="particles" params={paramsParticle} />
        <Navigation isSignin={this.state.isSignin} updateRoute={this.updateRoute} />
        {homePage}
        {signInPage}
        {registerPage}
      </div>
    )
  }
}

export default App
