import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
	return (
		<div>
			<p className="f3 center">
			{'The Magic Brain will detect your face in the picture.'}
			</p>
			<div className='center'>
				<div className='center form pa4 shadow-5 pa3'>
					<input type='text' className='f4 pa2 center w-70' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
					onClick={onPictureSubmit}>Detect</button>
				</div>
			</div>	
		</div>
		);
}

export default ImageLinkForm;