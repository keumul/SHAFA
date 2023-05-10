const { Users } = require('../models/models')

class userController {
    async getUsers(req, res) {
        try {
          const user = await Users.findAll();
          res.json({ user });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'ERROR: Something went wrong while fetching users!' });
        }
      };

    async deleteUser(req, res){
        try {
          const { id } = req.params;

          const user = await Users.findByPk(id);
      
          if (!user) {
            return res.status(404).json({ error: 'ERROR: User not found!' });
          }

          await user.destroy();
      
          res.status(200).json({ message: 'INFO: User deleted successfully!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'ERROR: Something with deleting user!' });
        }
      }
}

module.exports = new userController()