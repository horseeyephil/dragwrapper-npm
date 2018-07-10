import React from 'react'
import ReactDOM from 'react-dom'

const dragMaker = (providedPosition, providedCB, dragStartCB, dragDuringCB) => {

///////// INITIALIZE DRAG FUNCTIONS

    const dragBuild = providedPosition === 'fixed' ? (
        function(event) {

            event.stopPropagation()

            const moveY = event.clientY - this.state.diffY
            const moveX = event.clientX - this.state.diffX
            
            if((event.clientX || event.clientY)){
                event.target.style.top = moveY+'px';
                event.target.style.left = moveX+'px' 
            }
        })

    :   function(event) {

        event.stopPropagation()

        const moveX = event.clientX - this.state.diffX
        const moveY = event.clientY - this.state.diffY

        const parentWidth = this.cachedPerimeters.parentWidth
        const parentHeight = this.cachedPerimeters.parentHeight
        
        const left = moveX < this.cachedPerimeters.leftFence ? this.cachedPerimeters.leftFence : Math.min(moveX, parentWidth - this.cachedPerimeters.rightFence )
        const top = moveY < this.cachedPerimeters.topFence ? this.cachedPerimeters.topFence : Math.min(moveY, parentHeight - this.cachedPerimeters.bottomFence )
        
        if((event.clientX || event.clientY)) {
            event.target.style.top = top+'px'
            event.target.style.left = left+'px'
        } 
    }

    const dragFunction = dragDuringCB ? function(event){
        dragBuild.bind(this)(event)
        dragDuringCB(event)
    }
    : dragBuild

    const dragStartBuild = providedPosition === 'fixed' ? (
        function(event){
            if(!this.state.hasBeenDragged){
                event.target.style.position = 'fixed'
                this.cachedPerimeters.parentWidth = 0
                this.cachedPerimeters.parentHeight = 0
                this.setState({hasBeenDragged:true})
            }
            this.setState({diffX: event.clientX - event.target.offsetLeft , diffY: event.clientY - event.target.offsetTop})
        })
        :
        function(event){
            if(!this.state.hasBeenDragged){
                event.target.style.position = 'absolute'
                this.setState({hasBeenDragged:true})
            }
            if(this.cachedPerimeters.parentWidth !== event.target.parentElement.clientWidth || this.cachedPerimeters.parentHeight !== event.target.parentElement.clientHeight ){
                this.cachedPerimeters.parentWidth = event.target.parentElement.clientWidth
                this.cachedPerimeters.parentHeight = event.target.parentElement.clientHeight || window.innerHeight
            }
            this.setState({diffX: event.clientX - event.target.offsetLeft , diffY: event.clientY - event.target.offsetTop})
        }

    const dragStartFunction = dragStartCB? function(event){
        dragStartBuild.bind(this)(event)
        dragStartCB(event)
        return false
    }
    : dragStartBuild


   ////////// COMPONENT LOGIC BEGINS HERE

    return (WrappedComponent) => {

    return ( 
    class ModDrag extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                top: null,
                left: null,
                diffX: null,
                diffY: null,
                hasBeenDragged: false,
            }

            this.dragFunction = dragFunction.bind(this)
            this.dragStartFunction = dragStartFunction.bind(this)
        }

        componentDidMount(){

            const draggableNode = ReactDOM.findDOMNode(this.myRef)

                this.cachedPerimeters = 
                    {leftFence: 0,
                    rightFence: draggableNode.getBoundingClientRect().width,
                    topFence: 0,
                    bottomFence: draggableNode.getBoundingClientRect().height,
                    }

            draggableNode.setAttribute('draggable', true)
            draggableNode.addEventListener('drag', this.dragFunction)
            draggableNode.addEventListener('dragstart', this.dragStartFunction)
              
            if(providedCB) draggableNode.addEventListener('dragend', event=>{event.stopPropagation(); providedCB(event)})
        }

        render(){
            
            return (
            <WrappedComponent ref={myRef=>{this.myRef=myRef}} />
            )
                
        }
    }
    )
}
}

module.exports = dragMaker