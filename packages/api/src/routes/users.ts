// https://sequelize.org/v5/manual/querying.html
// Post.findAll({
//   where: {
//     [Op.or]: [{authorId: 12}, {authorId: 13}]
//   }
// });
// const Op = Sequelize.Op

// [Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
// [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
// [Op.gt]: 6,                // > 6
// [Op.gte]: 6,               // >= 6
// [Op.lt]: 10,               // < 10
// [Op.lte]: 10,              // <= 10
// [Op.ne]: 20,               // != 20
// [Op.eq]: 3,                // = 3
// [Op.is]: null              // IS NULL
// [Op.not]: true,            // IS NOT TRUE
// [Op.between]: [6, 10],     // BETWEEN 6 AND 10
// [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
// [Op.in]: [1, 2],           // IN [1, 2]
// [Op.notIn]: [1, 2],        // NOT IN [1, 2]
// [Op.like]: '%hat',         // LIKE '%hat'
// [Op.notLike]: '%hat'       // NOT LIKE '%hat'
// [Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
// [Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
// [Op.startsWith]: 'hat'     // LIKE 'hat%'
// [Op.endsWith]: 'hat'       // LIKE '%hat'
// [Op.substring]: 'hat'      // LIKE '%hat%'
// [Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
// [Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
// [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
// [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
// [Op.like]: { [Op.any]: ['cat', 'hat']}
//                            // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
// [Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
// [Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
// [Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
// [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

// [Op.col]: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
// [Op.gt]: { [Op.all]: literal('SELECT 1') }
//                           // > ALL (SELECT 1)

import { Router } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/User';

export const usersRouter = Router();

// CRUD of the User in REST API

// Get list of users
usersRouter.get('/', async (_req, res) => {
  // Fetch ALL the users
  const users = await User.findAll();
  // Send them in the pipe
  res.json(users);
});

// Get ONE user
// usersRouter.get('/:userID', async (req, res) => {
//   const { userID } = req.params;
//   const user = await User.findByPk(userID);
//   res.json(user);
// });

// Search an user

usersRouter.get('/search', async(req, res, next) => {
  const query = req.query.q;
  try {
    const users = await User.findAll({
      where:{
        firstName: { [Op.like]: `%${query}%` }
      }
    });
    res.json(users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName
    })));
  } catch (e) {
    next(e);
  }

});

// Update a user
usersRouter.patch('/:userID', async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.userID },
      returning: true // TODO: Fix this
    });
    const user = await User.findByPk(req.params.userID);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// Delete a user
usersRouter.delete('/:userID', async (req, res, next) => {
  try {
    User.destroy({
      where: { id: req.params.userID }
    });
    res.json({
      message: 'Successfully deleted user'
    });
  } catch (e) {
    next(e);
  }
});
