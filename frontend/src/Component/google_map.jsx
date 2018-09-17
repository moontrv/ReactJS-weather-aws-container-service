import React from 'react';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends React.Component {
  render() {
    let myVal = this.props;
    let passCord = { lat: this.props.passLat, lng: this.props.passLong };
    return (
      <div className="google-map">
        <GoogleMapReact
          style={{ height: 200, width: 200 }}
          defaultCenter={myVal.center}
          defaultZoom={myVal.zoom}
          center={passCord}
          lat={this.props.lat}
          lng={this.props.lng}>
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  center: {
    lat: 60.22,
    lng: 24.66
  },
  zoom: 11
};

export default GoogleMap;
