import './App.css';
import React, {useRef, useState} from 'react';
const App =()=> {
  const bedTime = useRef();
  const minSleepHours = useRef();
  const [lightSleepIntervals, setLightSleepIntervals] = useState([]);
  const [hasResults, setHasResults] = useState(false);

  const calculateLightSleep = () => {
    setHasResults(true);
    const newIntervals = [];
    const startSleepMin = (Number(bedTime.current.value.substring(0, 2)) * 60) + Number(bedTime.current.value.substring(3, 5));
    let sleepingTime = 0;
    while (startSleepMin + sleepingTime < startSleepMin + 12 * 60) {
      if (sleepingTime > Number(minSleepHours.current.value) * 60) {
        //calculating first part of interval hours/min
        let startLightSleepHours = ((startSleepMin + sleepingTime) / 60) % 12;
        let startLightSleepMin = ((startSleepMin + sleepingTime) % 60);
        if (startLightSleepHours % 1 != 0) {
          startLightSleepHours = Math.floor(startLightSleepHours);
        }
        if (startLightSleepMin < 10) {
          startLightSleepMin = "0" + startLightSleepMin;
        }

        //calculating second part of interval hours/min
        let endLightSleepHours = ((startSleepMin + sleepingTime + 30) / 60) % 12;
        let endLightSleepMin = ((startSleepMin + sleepingTime + 30) % 60);
        if (endLightSleepHours % 1 != 0) {
          endLightSleepHours = Math.floor(endLightSleepHours);
        }
        if (endLightSleepMin < 10) {
          endLightSleepMin = "0" + endLightSleepMin;
        }



        newIntervals.push(startLightSleepHours + ":" + startLightSleepMin +  
                            " - " + endLightSleepHours + ":" + endLightSleepMin + "\n");
      }
      sleepingTime += 90;
    }
    setLightSleepIntervals(newIntervals);
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>Sleep Calculator</h1>
        <label>When You Are Heading to Bed</label>
        <input type="time" ref={bedTime}/>
        <label>Minimum Hours of Sleep</label>
        <input type="number" ref={minSleepHours}/>
        <button className="App-button" type="submit" onClick={calculateLightSleep}>Enter</button>
        {hasResults && <h2>Recommended Wakeup Times</h2>}
        {hasResults &&
        <div>{lightSleepIntervals.map((interval) => {
          return <div key={Math.random()}>{interval}</div>
        })}</div>}
      </div>
    </div>
  );
}

export default App;
