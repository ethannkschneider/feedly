export const signup = (formData) => {
  return $.ajax({
    url: '/api/users',
    method: 'POST',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  });
};

export const login = (formData) => {
  return $.ajax({
    url: '/api/session',
    method: 'POST',
    data: formData
  });
};

export const logout = () => {
  return $.ajax({
    url: '/api/session',
    method: 'DELETE',
  });
};
