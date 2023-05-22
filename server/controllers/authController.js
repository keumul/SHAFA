const Error = require('../errors/error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../models/models')

const generateJwt = (id, email, roleId) => {
    return jwt.sign(
        {id, email, roleId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
          const { userName, email, password, roleId } = req.body;
      
          const existingUser = await Users.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ error: 'INFO: User already exists!' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await Users.create({
            userName,
            email,
            passwordHash: hashedPassword,
            roleId
          });
          const token = generateJwt(newUser.id, newUser.email, newUser.roleId)
          console.log(token);
          res.status(201).json({ token: `${token}` });
      }
      

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(Error.internal('INFO: User is undefined!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.passwordHash)
        if (!comparePassword) {
            return next(Error.internal('INFO: Wrong password!'))
        }
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({token})
    }
    
    async getUserInfoWithToken(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await Users.findOne({ where: { id: userId } });
        
            if (!user) {
              return next(Error.internal('INFO: User not found!'));
            }
            const token = generateJwt(user.id, user.userName, user.email);
            return res.json({id: userId });
          } catch (error) {
            return next(error);
          }
    }
}

module.exports = new UserController()