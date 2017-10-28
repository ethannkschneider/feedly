import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { showSidebar, hideSidebar } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    feeds: state.entities.feeds,
    loading: state.ui.collectionsIndex,
    sidebarVisible: state.ui.showSidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSidebar: () => dispatch(showSidebar()),
    hideSidebar: () => dispatch(hideSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
