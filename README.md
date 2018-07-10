# DragWrapper

This package is a lightweight function that returns an HOF (higher-order-function) that will take any React Class component and make it draggable.

The inspiration was for a minimalist drag and drop wrapper to use for very quick prototyping as well as experimenting with mockups and layout views when styling.

The function takes a string 'fixed' or 'absolute' as its first parameter to define whether the component will remain in the bounds of its parent, or may be dragged anywhere within the window.

The function may also take optional second and third arguments to create callbacks on the component's dragend and drag events, respectively. It may be a good idea to provide a 'throttled' callback for the drag event (third argument), depending on the use.

Once configured and invoked, the function _will return another function_ that then may be called and re-used on your React.Component class.

Example:

```javascript
import  dragwrapper  from dragwrapper

class  SomethingIWantToDrag  extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
    return (
	  <React.Fragment>
	    <div  style={{width: 200, height: 200, border: '1px solid', borderRadius: 124, position: 'fixed'}}>
	    <span  style={{left: 50, top: 50, position: 'absolute'}} >Make me draggable!</span>
		</div>
	  </React.Fragment>)
  }
}

export const nowDraggableWithinContainer = dragwrapper('absolute', ()=>{console.log('Now I can drag!')})(SomethingIWantToDrag)

export const nowDraggableAcrossScreen = dragwrapper('fixed', null, ()=>{console.log('I\'m being dragged!')})(SomethingIWantToDrag)
```

### To try the demo:

Clone the repo

```
npm install
npm run docs
```

Thanks everyone!
Special shoutout to markusengland for his great starter boilerplate on creating React Components for npm.
