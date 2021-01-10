const User = require('../models/user.model');

const people = async (req, res) => {
  const peopleList = await User.find();
  let list = peopleList.filter(
    (el) =>
      el.login !== req.session.user.login &&
      !el.subscribers.includes(req.session.user.id)
  );

  let list2 = list.map((el) => {
    delete el._doc.pass;
    return el;
  });

  res.json(list2);
};

const followers = async (req, res) => {
  const peopleList = await User.find();
  let list = peopleList.filter(
    (el) =>
      el.login !== req.session.user.login &&
      el.subscribers.includes(req.session.user.id)
  );

  let list2 = list.map((el) => {
    delete el._doc.pass;
    return el;
  });

  res.json(list2);
};

const subscribe = async (req, res) => {
  const { id } = req.params;

  await User.updateOne(
    { _id: id },
    { $push: { subscribers: req.session.user.id } }
  );

  await User.updateOne(
    { _id: req.session.user.id },
    { $push: { subscribers: id } }
  );

  res.sendStatus(200);
};

const unSubscribe = async (req, res) => {
  const { id } = req.params;

  await User.updateOne(
    { _id: id },
    { $pull: { subscribers: req.session.user.id } }
  );

  await User.updateOne(
    { _id: req.session.user.id },
    { $pull: { subscribers: id } }
  );
  res.sendStatus(200);
};

module.exports = {
  people,
  subscribe,
  followers,
  unSubscribe,
};
