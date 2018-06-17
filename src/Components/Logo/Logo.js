import React from 'react' ;
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () =>{
	return(
		<div className = 'm4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150, margin: 20 }} >
 				<div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} src="https://png.icons8.com/ios/100/000000/brain.png" alt="logo" /> </div>
			</Tilt>
		</div>
	);
}

export default Logo;