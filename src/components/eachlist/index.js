import {Component} from 'react'

import Eachitem from '../eachitem'

import './index.css'

class Eachlist extends Component {
  state = {
    finallist: 'FRUIT',
    todoId: '',
    runing: 0,
    result12: 0,
    score: 0,
    timeElapsedInSeconds: 60,
    timerLimitInMinutes: 1,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  filtered = () => {
    const {finallist} = this.state
    const {imagesList} = this.props

    const projects = imagesList.filter(each => each.category === finallist)
    return projects
  }

  btn1 = () => {
    this.setState({finallist: 'FRUIT'})
  }

  btn2 = () => {
    this.setState({finallist: 'ANIMAL'})
  }

  btn3 = () => {
    this.setState({finallist: 'PLACE'})
  }

  updateTime = () => {
    const {timeElapsedInSeconds} = this.state
    if (timeElapsedInSeconds === 0) {
      clearInterval(this.timeInterval)
    }
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds - 1,
    }))
  }

  onStartTimer = () => {
    const {timeElapsedInSeconds} = this.state
    if (timeElapsedInSeconds === 0) {
      clearInterval(this.timeInterval)
    } else {
      this.timeInterval = setInterval(this.updateTime, 1000)
    }

    this.setState({isTimerRunning: true})
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  todo = id => {
    this.setState({todoId: id})

    const {result12} = this.state
    const {imagesList} = this.props
    const img = Math.floor(Math.random() * 30)

    this.setState({result12: img})
    console.log(result12)
    console.log(id === imagesList[result12].thumbnailUrl)

    if (id === imagesList[result12].thumbnailUrl) {
      this.setState(p => ({score: p.score + 1}))
    }
  }

  render() {
    const {runing, result12, score} = this.state

    const {imagesList} = this.props

    const result = this.filtered()
    // unable to update the state inside the render
    // check necessary documents in google to rectify the mistake
    // and update the state
    return (
      <div className="greet">
        <div className="greet1">
          <h1 className="score">score:{score}</h1>

          <h1>time:{this.renderSeconds()}</h1>
        </div>
        <div className="greet4">
          <div className="greet3">
            <img className="size" src={imagesList[result12].thumbnailUrl} />
          </div>

          <div className="btncont">
            <button type="button" className="button" onClick={this.btn1}>
              fruites
            </button>
            <button type="button" className="button" onClick={this.btn2}>
              animals
            </button>
            <button type="button" className="button" onClick={this.btn3}>
              places
            </button>
          </div>
          <div className="down">
            {result.map(each => (
              <Eachitem happy={each} key={each.id} todo={this.todo} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Eachlist
