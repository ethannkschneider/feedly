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
      <tr className="organize-sources-table-row">
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleCheck}
          >
        </input>
        <div>
          <img src={this.props.feed.image_url} />
        </div>
        <div className="organize-sources-table-row-title">
          {feedTitle}
        </div>
      </tr>
    );
  }
}

export default OrganizeSourcesIndexItem;
