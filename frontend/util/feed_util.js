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

export const unsubscribeFromFeed = (collectionId, feedId) => {
  return $.ajax({
    url: `api/collections/${collectionId}/unsubscribe`,
    method: 'post',
    data: { subscription: {
      collection_id: collectionId,
      feed_id: feedId
    }}
  });
};
