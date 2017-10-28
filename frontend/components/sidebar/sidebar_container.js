import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    feeds: state.entities.feeds,
    loading: state.ui.collectionsIndex
  };
};

const mapDispatchToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
