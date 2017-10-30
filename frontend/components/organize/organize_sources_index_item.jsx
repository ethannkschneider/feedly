import React from 'react';

class OrganizeSourcesIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck(e) {
    const oldState = this.state.isChecked;
    this.setState({
      isChecked: !oldState
    });
    this.props.selectOrUnselectSource(this.props.feed.id);
  }

  render() {
    const feedTitle = this.props.feed.title;
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleCheck}
          >
        </input>
        <div>
          {feedTitle}
        </div>
      </div>
    );
  }
}

export default OrganizeSourcesIndexItem;
