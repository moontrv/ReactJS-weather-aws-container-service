import React from 'react';

export class LoadModal extends React.Component {

  render() {
    return (
      <div className="justify-content-center">
        <div className="loader">
        </div>
        <span>Loading...</span>
      </div>
    );
  }
}

export default LoadModal;
