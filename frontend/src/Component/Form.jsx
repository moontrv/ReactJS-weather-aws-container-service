import React from 'react';
//import Chart from './chart';
//import GoogleMap from './google_map';

export class Form extends React.Component {
  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.getWeather} >
          <div className="titles-text">
            <h1 className=" text-center title-container__title">Weather Finder</h1>
            <h3 className="text-center title-container__subtitle">Find out temperature, conditions and more...</h3>
          </div>
          <input type="text" name="city" placeholder="City..." />
          <input type="text" name="country" placeholder="Country..." />
          <button>Get Weather</button>
        </form>
      </div>
    );
  }
}

export default Form;
