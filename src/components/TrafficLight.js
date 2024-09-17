import React, { useEffect, useState } from 'react';
import './TrafficLight.css'
import 'bootstrap/dist/css/bootstrap.css'
import { FaWalking } from "react-icons/fa";

const TrafficLight = () => {

    const [redCount, setRedCount] = useState(5);
    const [yellowCount, setYellowCount] = useState(3);
    const [greenCount, setGreenCount] = useState(5);
    const [currentLight, setCurrentLight] = useState('red'); // track which light is active

    useEffect(() => {
        let intervalId;

        if (currentLight === 'red') {
            intervalId = setInterval(() => {
                setRedCount(prevVal => {
                    if (prevVal > 0) {
                        return prevVal - 1;
                    } else {
                        clearInterval(intervalId);
                        setCurrentLight('yellow'); // Switch to yellow when red is done
                        return 0;
                    }
                });
            }, 1000);
        } else if (currentLight === 'yellow') {
            intervalId = setInterval(() => {
                setYellowCount(prevVal => {
                    if (prevVal > 0) {
                        return prevVal - 1;
                    } else {
                        clearInterval(intervalId);
                        setCurrentLight('green'); 
                        return 0;
                    }
                });
            }, 1000);
        } else if (currentLight === 'green') {
            intervalId = setInterval(() => {
                setGreenCount(prevVal => {
                    if (prevVal > 0) {
                        return prevVal - 1;
                    } else {
                        clearInterval(intervalId);
                        setCurrentLight('red'); 
                        setRedCount(5);
                        setYellowCount(3);
                        setGreenCount(5);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [currentLight]);

    const onClickButton=()=>{
        if (currentLight === 'red'){
            setRedCount(prevVal=>prevVal + 5)
        }
    }
    
    return (
        <div className='bg'>
            <h1 className='text-light mb-5'>Traffic Light Simulator <br/>with Pedestrian Crossing</h1>

            <div className='lights-container'>
                <h3 className={currentLight === 'red' ? 'light red' : 'light light-off'}>{currentLight === 'red' && <span>{redCount}</span>}</h3>
                <h3 className={currentLight === 'yellow' ? 'light yellow' : 'light light-off'}>{currentLight === 'yellow' && <span>{yellowCount}</span>}</h3>
                <h3 className={currentLight === 'green' ? 'light green' : 'light light-off'}>{currentLight === 'green' && <span>{greenCount}</span>}</h3>
                <h1 className={currentLight === 'red' ? 'light Pedestrian Active-Pedestrian' : 'light Pedestrian'}>{currentLight === 'red' && <FaWalking /> }</h1>
            </div>
            <div>
                <button className='btn btn-primary m-3' onClick={onClickButton}>Request Pedestrian</button>
            </div>
        </div>
    );
};


export default TrafficLight;