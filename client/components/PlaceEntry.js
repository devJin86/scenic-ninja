import React, {Component} from 'react';
import { connect } from 'react-redux';
import SkyLight from 'react-skylight';
var ReactToastr = require("react-toastr-redux");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class PlaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick(e) {
      e.preventDefault;
      this.props.onSaveClick(this.props.place, this.props.user);
      this.refs.container.success(
        "You found a piece of heaven."
      );
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
    // var cityState = function() {
    //   var foo = props.place.address.split(', ');
    //   console.log(foo, '!!!!!!!!!!!!!!!!!!!');
    //   return foo;
    // }
    var getCurrentTemp = () => {
      return {
        onSaveClick: (cityState) => {
          $.ajax({
            url: 'api.openweathermap.org/data/2.5/weather?q=' + cityState + '&appid=' + {API KEY},
            method: 'GET',
            data: {}
          });
          dispatch(actions.savePlace(place));
        }
      };
    };

    return (
      
      <div>
        <div className='place-entry animated fadeInUp'>
        {console.log(this.props.place.address)}
          <div className='place-info' >
              <h4>{ this.props.place.name }</h4>
              <p>{ this.props.place.address }</p>
              <h1>{cityState}</h1>
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


const mapStateToProps = (state) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(PlaceEntry);