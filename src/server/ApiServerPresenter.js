function ApiServerPresenter(doc) {
  return {
    'id': doc._id,
    'vars': doc.vars,
    'pid': doc.pid,
  };
};

module.exports = ApiServerPresenter;
