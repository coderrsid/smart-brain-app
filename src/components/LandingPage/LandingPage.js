import React from 'react';
import Tilt from 'react-tilt';
import ReactRevealText from 'react-reveal-text';
import brain from './brain.png';
import './LandingPage.css';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);
  }

  render() {

	return(
		<div className="flex center">
			<div className='ma4 mt6 center'>
				<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
					<div className="Tilt-inner pa-3">
						<img style={{padding: '25px 45px 0px 25px'}} alt='logo' src={brain}/>
					</div>
				</Tilt>
			</div>
			<div className='div'>
				<ReactRevealText className='h1' show={this.state.show} text="SMART BRAIN APP" />
			</div>
			<div className='pt5 pb4'>	
				<ReactRevealText className='p' show={this.state.show} text="This app will detect the face in your picture" />
			</div>
			<div>	
				<button className="pt2 f6 link grow br-pill ph3 pv2 mb2 dib white bg-black shadow-10" onClick={() => this.props.onRouteChange('signin')}>Give it a try!</button>
			</div>
		</div>		   		

	);
  }
}

export default LandingPage;