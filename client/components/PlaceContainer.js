import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PlaceEntry from './PlaceEntry';
import actions from '../actions/index.js';
import SkyLight from 'react-skylight';
import $ from 'jquery';

class PlaceContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='col-2-12'>
          <h1> </h1>
        </div>
        <div id='loading-container' className='col-6-12'>
        {console.log(this.props.places)}
          { this.props.places.map((place) => (
            <div>
              <PlaceEntry onSaveClick={this.props.onSaveClick} place={ place }></PlaceEntry>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClick: (place, user) => {
      $.ajax({
        url: '/api/places/saved',
        method: 'POST',
        data: {user: user, place: place}
      });
      dispatch(actions.savePlace(place));
    }
  };
};

PlaceContainer.propTypes = {
  places: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceContainer);
