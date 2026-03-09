// get all data
module.exports.indexService = async (model) => {
  const index = await model.findAll({});
  return index;
};

// create data
module.exports.createService = async (model, data) => {
  const create = await model.create(data);
  return create;
};

// get single by id
module.exports.showService = async (model, id) => {
  const show = await model.findByPk(id);
  return show;
};

// update single by id
module.exports.updateService = async (model, id, data) => {
  const record = await model.findByPk(id);
  if (!record) throw new Error("Record not found");
  const update = await record.update(data);
  return update;
};

// bulk update multiple records
module.exports.bulkUpdateService = async (model, dataArray) => {
  // dataArray = [{ id: 1, data: {...} }, { id: 2, data: {...} }]
  const promises = dataArray.map((item) =>
    model.findByPk(item.id).then((record) => record?.update(item.data)),
  );
  const results = await Promise.all(promises);
  return results;
};

// delete single by id
module.exports.deleteService = async (model, id) => {
  const deleted = await model.destroy({
    where: { id },
  });
  if (!deleted) {
    throw new Error("Record not found");
  }
  return deleted;
};

// bulk delete
module.exports.bulkDeleteService = async (model, ids) => {
  // ids = [1,2,3]
  const results = await model.destroy({ where: { id: ids } });
  return { message: `Deleted ${results} records successfully` };
};

// query with filter, pagination, sorting
module.exports.queryDataService = async (model, filters = {}, queries = {}) => {
  const { page = 1, limit = 10, sortBy = "id", filterBy = null } = queries;

  const offset = (page - 1) * limit;

  const result = await model.findAll({
    where: filters,
    offset: offset,
    limit: limit,
    order: [[sortBy, "ASC"]],
    attributes: filterBy || undefined,
  });

  const totalRecords = await model.count({ where: filters });
  const pageCount = Math.ceil(totalRecords / limit);

  return { totalRecords, pageCount, result };
};
