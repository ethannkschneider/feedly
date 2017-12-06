// Note: snake case for backend, camel case for frontend!
export const subscribeToFeed = (collectionId, feedId) => {
  return $.ajax({
    url: 'api/subscriptions',
    method: 'post',
    data: { subscription: {
      collection_id: collectionId,
      feed_id: feedId
    }}
  });
};

export const unfollowFeeds = (feedIds) => {
  return $.ajax({
    url: `api/feeds/unfollow`,
    method: 'post',
    data: { feeds: { feed_ids: feedIds } }
  });
};

export const fetchFeeds = (searchText) => {
  return $.ajax({
    url: 'api/feeds',
    method: 'get',
    data: { feeds: { searchText } }
  });
};

export const fetchFeedArticles = (feedId)


// // NOT CURRENTLY USED -- IMPLEMENT LATER?
// export const unsubscribeFromFeed = (collectionId, feedId) => {
//   return $.ajax({
//     url: `api/collections/${collectionId}/unsubscribe`,
//     method: 'post',
//     data: { subscription: {
//       collection_id: collectionId,
//       feed_id: feedId
//     }}
//   });
// };
