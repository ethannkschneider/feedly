import { connect } from 'react-redux';
import OrganizeSources from './organize_sources';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    feeds: Object.values(state.entities.feeds)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeSources);
