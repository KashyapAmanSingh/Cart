 import React from 'react';
 import {RotatingLines,ThreeCircles} from  'react-loader-spinner'

 const Loader = () => {
   return (
     <div>
      <RotatingLines
  strokeColor="green"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>


     </div>
   )
 }
 
 
 export const Loader1 = () => {
  return (
    <div>
     <ThreeCircles
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor="red"
  innerCircleColor="grey"
  middleCircleColor="blue"
/>


    </div>
  )
}

  

export default Loader
