import React, { Component } from 'react';
import dragMaker from '../lib/index.js'


class SpanTest extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<span>I'm draggable tho!</span>)
    }
}

const DragSpan = dragMaker('fixed', ()=>{console.log('This is a callback function triggering on drag end. It takes this event as its parameter: ', event)}, ()=>{console.log('DRAG Callback is also passed the event')})(SpanTest)


class CircleTest extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (<React.Fragment>
            <div style={{width: 200, height: 200, border: '1px solid', borderRadius: 124, position: 'fixed'}}>
            <DragSpan/>
            <span style={{left: 50, top: 50, position: 'absolute'}} > I'm stuck in here! </span>
            </div>
            </React.Fragment>)
    }
}

const DragPiece = dragMaker('absolute', ()=>{console.log('This is a callback function triggering on drag end. It takes this event as its parameter: ', event)}, ()=>{console.log('DRAG Callback is also passed the event')})(CircleTest)


class bowlingGreen extends React.Component {
  render(){
  return (<div id='bowlingGreen' style={{ height: 400, width: 400, backgroundColor: 'palegreen', position: 'absolute', zIndex: -2, border: '5px solid plum', top: 50, left: 50}}><DragPiece providedCB={console.log}/></div>)
  }
}

const DraggableBowlingGreen = dragMaker('absolute', ()=>{console.log('This is a callback function triggering on drag end. It takes this event as its parameter: ', event)}, ()=>{console.log('DRAG Callback is also passed the event')})(bowlingGreen)



class App extends Component {


  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">
      <DraggableBowlingGreen/>
      </div>
    );
  }
}

export default App;