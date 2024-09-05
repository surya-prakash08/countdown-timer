import React, { useEffect, useState } from 'react'

const Timer = () => {

    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    // const convertedTime= Math.floor(time/60);
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
    
    let timing= formatTime(time)

     function inputTime(e){
        const minutes=(e.target.value);
        if(minutes<60){
        setTime(minutes*60)
        }
        else{
            alert("Please enter time less than 60 minutes")
        }
    }

    useEffect(() => {
        let intervalId;
    
        if (isActive && !isPaused && time > 0) {
          intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
        } else if (time === 0) {
          clearInterval(intervalId); // Stop when time reaches zero
        }
    
        // Clean up interval on component unmount or when timer stops
        return () => clearInterval(intervalId);
      }, [isActive, isPaused, time]);



    const startTimer = () => {
        if(time>0){
        setIsActive(true);
        setIsPaused(false);
        }
        
      };

      const pauseResumeTimer=()=>{
            
        if (isPaused) {
            startTimer(); // Resume the timer when paused
          } else {
            setIsPaused(true); // Pause the timer
          }

          

            
      }
    
    const resetTimer = () => {
        setIsActive(false);
        setIsPaused(false);
        setTime(0); // Reset time to 0
      };

  return (
    <div className='hero'>
      <div className="main">
        <h1>Countdown Timer</h1>
        <input type="number" placeholder='Enter number in Minutes' onChange={inputTime} disabled={isActive}/>
        <p style={{fontWeight:'bolder'}}>{timing}</p>
      </div>
      <div className="buttons">
        <button className='btn' onClick={startTimer}disabled={isActive && !isPaused}>Start</button>
        <button className='btn' onClick={pauseResumeTimer}disabled={isActive && isPaused}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button className='btn' onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Timer
