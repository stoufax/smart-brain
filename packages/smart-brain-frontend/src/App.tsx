import React, { Component } from 'react'
import Particles, { IParticlesParams } from 'react-particles-js'

import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import { config } from './config'

import './App.css'

const paramsParticle: IParticlesParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        value_area: 800
      }
    }
  }
}

interface Props {}

interface User {
  id: string
  name: string
  email: string
  password: string
  entries: number
  joined: string
}

interface State {
  input: string
  imageUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  box: any
  route: string
  isSignin: boolean
  user: User
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
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

  loadUsers = (data: any) => {
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

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ input: value })
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
              const user: User = { ...this.state.user, entries: count }
              this.setState({ ...this.state, user })
            })
            .catch(console.log)
        }
        this.updateBox(this.boundingBox(response))
      })
      .catch((err) => console.log(err))
  }

  boundingBox = (data: any) => {
    const infoBox = data.outputs[0].data.regions
    const sizeImage: any = document.querySelector('#faceReco')
    const width = Number(sizeImage.width)
    const height = Number(sizeImage.height)
    const faces = infoBox.map((data: any) => {
      return {
        leftCol: data.region_info.bounding_box.left_col * width,
        righCol: width - data.region_info.bounding_box.right_col * width,
        topRow: data.region_info.bounding_box.top_row * height,
        bottomRow: height - data.region_info.bounding_box.bottom_row * height
      }
    })
    return faces
  }

  updateBox = (box: any): void => {
    this.setState({ box: box })
  }

  updateRoute = (route: string): void => {
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
