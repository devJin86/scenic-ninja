import React, {Component} from 'react';
import { connect } from 'react-redux';
import SkyLight from 'react-skylight';
var ReactToastr = require("react-toastr-redux");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import $ from 'jquery';

class PlaceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this.handleClick.bind(this);
  }

  handleClick(e) {
      e.preventDefault;
      this.props.onSaveClick(this.props.place, this.props.user);
      this.refs.container.success(
        "You found a piece of heaven."
      );
  }

  handleWeatherClick(e) {
    e.preventDefault();
    this.setState({
      showComponent: true // or porps
    });
  }

  // componentDidMount() {
  //   cityState();
  // }
  // ["39", "780 Mission St", "San Francisco", "CA 94103", "United States"] // foo
  // foo(data) {
  //   console.log(data, 'from callback');
  //   return data;
  // }

  cityState() {
    let addressArr = this.props.place.address.split(', ');
    let city = addressArr[2]; // sanfranisco
    // let resultJsonPromise;
    let resultJson;
    // console.log(Array.isArray(city));
    city = city.split(' ').join();
    // console.log('city ', city);
    
    let akey = '455162040aac9ea807f5bd3d02694a50';

    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&callback=?' + '&appid=' + akey,
      method: 'GET',
      dataType: "json"

    }).then(function(data) {
      // console.log('function' === typeof data.then);
      console.log(data,'from ajax');
      resultJson = data; //promise
    });

    return resultJson;
    
  }
              // <p>Rating: { this.props.place.rating }</p> 
              // <p>Price Level: { this.props.place.price_level} </p>
              // <p>Reviews: { this.props.place.review.text } </p>
  render() {

    var myBigGreenDialog = {
      backgroundColor: '#FF5A3B',
      color: '#ffffff',
      width: '50%',
      height: '400px',
      marginTop: '-200px',
      marginLeft: '-25%',
      border: '10px solid #ffffff' 
    };
    
   
    var weatherResult = this.cityState();
    // var delayWeatherResult = setTimeout(weatherResult, 1000);
    // var weatherArr = weatherResult.clouds;
    // console.log('@*#&$#&@$&@*#$@&$&#@$@#*&' ,typeof weatherResult);
    // var weatherIconSrc = ;
    // console.log(weatherResult.weather);
    // console.log(Array.isArray(weatherResult.weather));


    return (
      
      <div>
        <div className='place-entry animated fadeInUp'>
        
          <div className='place-info' >
              <h4>{ this.props.place.name }</h4>
              <p>{ this.props.place.address }</p>
              <span>
                <span>
                <button type='submit' refs='myValues' onClick={() => this.cityState()}>Get Weather</button>
                <span>{this.state.showComponent}</span>
                </span>
                <h1>HELLO</h1>

                
              </span>
              <div>
                <a className='place-entry-link' href={'//www.images.google.com/search?q=' + this.props.place.name + ' ' + this.props.place.address + '&tbm=isch'}
                target='_blank'>View Images</a>
                <span className='place-entry-link-divider'>&middot;</span>
                <a className='place-entry-link' href={'//www.google.com/search?q=' + this.props.place.name + ' ' + this.props.place.address}
                target='_blank'>Find on Google</a>
                <span className='place-entry-link-divider'>&middot;</span>
                <a className='place-entry-link' href={'https://maps.google.com?saddr=Current+Location&daddr=' + this.props.place.address}
                target='_blank'>Show Directions</a>
              </div>
          </div>
        <div className='place-entry-favorite'>
          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-bottom-right" />
          <span onClick={this.handleClick.bind(this)} className='icon-heart' aria-hidden='true'></span>
        </div>
          
        </div>
        <div className='place-more-info animated fadeInUp'>
          <span onClick={() => this.refs.simpleDialog.show()} className='icon-info' aria-hidden='true'> More info</span>
        </div>
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref="simpleDialog" title="Additional Information">
          <span>Phone Number: { this.props.place.phone }</span><br></br><br></br>

          <span>Rating: { this.props.place.rating }</span><br></br><br></br>  
        </SkyLight>
      </div>
    );
  }
}


// const getCurrentTemp = () => {
//   return {
//     onSaveClick: (cityState) => {
//       $.ajax({
//         url: 'api.openweathermap.org/data/2.5/weather?q=' + cityState + '&appid=455162040aac9ea807f5bd3d02694a50',
//         method: 'GET'
//       });
//       dispatch(actions.savePlace(place));
//     }
//   };
// };

const mapStateToProps = (state) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(PlaceEntry);