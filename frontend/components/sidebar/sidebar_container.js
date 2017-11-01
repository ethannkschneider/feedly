import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { showSidebar, hideSidebar } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    allFeeds: state.entities.feeds,
    feeds: state.session.currentUser.feed_ids.map( (id) => state.entities.feeds[id]),
    feedsById: state.session.currentUser.feeds_by_id,
    loading: state.ui.collectionsIndex || state.ui.discoverSources
      || state.ui.organizeSources,
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
