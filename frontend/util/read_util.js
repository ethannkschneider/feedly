export const createRead = (articleId) => {
  return $.ajax({
    url: '/api/reads',
    method: 'post',
    data: { read: { article_id: articleId } }
  });
};

export const deleteRead = (articleId) => {
  return $.ajax({
    url: `/api/reads/${articleId}`,
    method: 'delete'
  });
};
