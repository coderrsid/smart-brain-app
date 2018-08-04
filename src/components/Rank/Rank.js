import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className='white center f3'>
				{`${name}, your rank is`} 
			</div>
			<div className='f1 center white'>
				{entries}
			</div>
		</div>
		);
}

export default Rank;