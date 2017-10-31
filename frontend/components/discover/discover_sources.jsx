import React from 'react';

class DiscoverSources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.linkInputToState = this.linkInputToState.bind(this);
  }

  componentDidMount() {
    // this.props.turnOnLoading();
    // this.props.requestAllFeeds();
    // .then( (res) => this.props.turnOffLoading());
  }

  linkInputToState(e) {
    this.setState({ searchText: e.target.value });
  }

  render() {

    return(
      <div>
        <h1>Discover Sources</h1>
      </div>
    );
  }
}

export default DiscoverSources;
