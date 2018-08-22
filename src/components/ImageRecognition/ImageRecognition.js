import React from 'react';
import './ImageRecognition.css';


const ImageRecognition = ({imageUrl, box}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className='bounding-box' style={
					{	
						top:box.topRow, 
						right:box.rightCol, 
						bottom:box.bottomRow, 
						left:box.leftCol
					}
				}>
				</div>
			</div>
		</div>
		);
}

export default ImageRecognition;