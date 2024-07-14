import React from 'react';
import '../../assets/styles/DashBoard.css';

const DashBoard = (): JSX.Element => {
    return (
        <div className="doctor-thumbnail">
            <div className="heartbeat-1">
                <img className="group" src="group0.svg" />
                <div className="your">Your</div>
            </div>
            <div className="health-care">Health Care</div>
            <img className="union" src="union0.svg" />
            <div className="_22">22</div>
            <div className="available-doctors">Available Doctors</div>
            <div className="stethoscope-1">
                <img className="group2" src="group1.svg" />
            </div>
            <div className="rectangle-11"></div>
            <div className="rectangle-12"></div>
            <div className="rectangle-13"></div>
            <img className="mask-group" src="mask-group0.svg" />
            <div className="rectangle-15"></div>
            <img className="group-16" src="group-160.svg" />
            <div className="rectangle-3"></div>
            <div className="group-33">
                <div className="rectangle-6"></div>
                <div className="doctors">Doctors</div>
            </div>
            <div className="group-34">
                <div className="rectangle-32"></div>
                <div className="nurses">Nurses</div>
            </div>
            <div className="group-35">
                <div className="rectangle-33"></div>
                <div className="indoor-patients">Indoor Patients</div>
            </div>
            <div className="group-36">
                <div className="rectangle-34"></div>
                <div className="out-door-patients">Out Door Patients</div>
            </div>
            <div className="home">Home</div>
        </div>
    );
};

export default DashBoard;
