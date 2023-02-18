// import { useState } from 'react';
// let contentIn, contentEnd;

// const handleMessage = (content) => {
//   const [dynamicClass, setDynamicClass] = useState([])
//   const [dynamicContent, setDynamicContent] = useState([])
//   // if(!dynamicClass.includes('in')){
//   setDynamicClass(['in'])

//   clearTimeout(contentIn, contentEnd)

//   setTimeout(() => {
//     if(audioElement.current){
//       let audio = audioElement.current
//       let isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > audio.HAVE_CURRENT_DATA;

//       // audio.pause()
//       audio.currentTime = 0;
//       audio.volume = 0.2;
//       if(!isPlaying){
//         audio.play()
//       }
//     }
//   }, 50)

//   setTimeout(() => {
//     setDynamicClass(['in', 'content-in'])
//     setDynamicContent(content)
//   }, 250)

//   contentIn = setTimeout(() => {
//     setDynamicClass(['in'])
//   }, 2400)

//   contentEnd = setTimeout(() => {
//     setDynamicClass([])
//   }, 2600)

//   return [dynamicClass, dynamicContent]
// }

// export default handleMessage