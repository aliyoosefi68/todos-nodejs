const { ObjectId } = require("bson");
const ConnectToMongoDB = require("./../utils/mongo-connection");
const todosCollection = "todo";

async function find() {
  const db = await new ConnectToMongoDB().Get();
  return new Promise(async (resolve, reject) => {
    const todos = await db.collection(todosCollection).find({}).toArray();
    resolve(todos);
  });
}

async function findById(id) {
  const db = await new ConnectToMongoDB().Get();
  return new Promise(async (resolve, reject) => {
    const todos = await db
      .collection(todosCollection)
      .findOne({ _id: new ObjectId(id) });
    resolve(todos);
  });
}
async function create(todo) {
  const db = await new ConnectToMongoDB().Get();
  return new Promise(async (resolve, reject) => {
    const result = await db.collection(todosCollection).insertOne(todo);
    resolve(result);
  });
}

async function update(id, payload) {
  const db = await new ConnectToMongoDB().Get();
  return new Promise(async (resolve, reject) => {
    const result = await db.collection(todosCollection).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...payload },
      }
    );
    resolve(result);
  });
}
async function remove(id) {
  const db = await new ConnectToMongoDB().Get();
  return new Promise(async (resolve, reject) => {
    const result = await db
      .collection(todosCollection)
      .deleteOne({ _id: new ObjectId(id) });
    resolve(result);
  });
}

const TodosModel = {
  find,
  findById,
  create,
  update,
  remove,
};

module.exports = TodosModel;
