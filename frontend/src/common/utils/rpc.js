export const normResponse = (result, error) => {
  if (error) {
    return error;
  }

  return {
    success: true,
    result,
  };
};

export const refetchQueries = (client, queries) => {
  return Promise.all(queries.map(q => client.query(
    Object.assign({}, q, {
      fetchPolicy: 'network-only',
    }),
  )));
};

