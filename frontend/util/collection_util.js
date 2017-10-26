export const fetchCollections = () => {
  return $.ajax({
    url: '/api/collections',
    method: 'get'
  });
};

export const fetchCollection = (collectionId) => {
  return $.ajax({
    url: `/api/collections/${collectionId}`,
    method: 'get'
  });
};

export const createCollection = (collection) => {
  return $.ajax({
    url: '/api/collections',
    method: 'post',
    collection
  });
};

export const deleteCollection = (collectionId) => {
  return $.ajax({
    url: `/api/collections/${collectionId}`,
    method: 'delete'
  });
};
