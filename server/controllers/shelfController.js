const { Users, Categories } = require('../models/models')
const { Shelves } = require('../models/models')
const { SharedAccess } = require('../models/models');
const { Op } = require('sequelize');

class ShelfController {
  async getAllCategories(req,res){
    try {
      const categories = await Categories.findAll();

      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong while search all categories!' });
    }
  }

  async getAllShelvesAdmin(req, res) {
    try {
      const allShelves = await Shelves.findAll();
  
      res.json(allShelves);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while searching all shelves!' });
    }
  };

   async getAllShelves(req, res) {
    try {
      const userId = req.params.id;
  
      const [userShelves, sharedShelves] = await Promise.all([
        Shelves.findAll({
          include: [
            {
              model: Users,
              where: {
                id: userId,
              },
            },
            { model: Categories },
          ],
        }),
        Shelves.findAll({
          include: [
            {
              model: SharedAccess,
              where: {
                userId,
              },
            },
            { model: Categories },
          ],
        }),
      ]);
  
      const allShelves = [...userShelves, ...sharedShelves];
  
      res.json(allShelves);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while searching all shelves!' });
    }
  };

  async addUserToShelf(req, res) {
    try {
      const { userId, shelfId } = req.body;
  
      const user = await Users.findByPk(userId);
      const shelf = await Shelves.findByPk(shelfId);
  
      if (!user || !shelf) {
        return res.status(404).json({ message: 'User or shelf not found' });
      }
  
      const sharedAccess = await SharedAccess.findOne({ where: { userId, shelfId } });
  
      if (sharedAccess) {
        return res.status(409).json({ message: 'User already has access to the shelf' });
      }
  
      // Создаем новую запись в SharedAccess
      await SharedAccess.create({ userId, shelfId });
  
      return res.status(200).json({ message: 'User added to shelf successfully' });
    } catch (error) {
      console.error('Error adding user to shelf:', error);
      return res.status(500).json({ message: 'Failed to add user to shelf' });
    }
  };
  
  // async getUserWithShelfs(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const user = await Users.findOne({
  //       where: { id: id },
  //       include: Shelves,
  //     });

  //     return user;
  //   } catch (error) {
  //     console.error('Error retrieving user with shelfs:', error);
  //     throw error;
  //   }
  // }

  async createShelf(req, res) {
    try {
      const { name, userId, categoryId } = req.body;
      const newShelf = await Shelves.create({ name, userId, categoryId }, {
        include: [
          { model: Users },
          { model: Categories }
        ],
      });
      res.status(201).json(newShelf);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong while creating shelf!' });
    }
  };
  
  async sharedAccess(req, res) {
    try {
      const { userId, shelfId } = req.body;
      const sharedAccess = await SharedAccess.create({ shelfId, userId });
      res.status(201).json({ sharedAccess: sharedAccess });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong with shared access!' });
    }
  }

async getShelfById(req, res) {
  try {
    const { id } = req.params;
    const shelf = await Shelves.findByPk(id);
    if (!shelf) {
      return res.status(404).json({ error: 'ERROR: Shelf not found!' });
    }
    res.json({ shelf: shelf });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the shelf!' });
  }
};

  async updateShelf(req, res) {
    try {
      const { id } = req.params;
      const { name, userId, categoryId } = req.body;
      const [numRowsAffected] = await Shelves.update({ name, userId, categoryId }, 
        { where: { id } }, 
        {
          include: [
            { model: Users },
            { model: Categories }
          ],
        });
    
      if (numRowsAffected === 0) {
        return res.status(404).json({ error: 'ERROR: Shelf not found!' });
      }
    
      res.status(200).json({ message: 'INFO: Shelf updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'INFO: Error updating shelf!' });
    }
    };
    
    async deleteShelf(req, res) {
      try {
        const { id } = req.params;
        const numRowsAffected = await Shelves.destroy({ where: { id } });
      
        if (numRowsAffected === 0) {
          return res.status(404).json({ error: 'ERROR: Shelf not found!' });
        }
      
        res.status(200).json({ message: 'INFO: Shelf deleted successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: Something wrong until deleting shelf!' });
      }
      
    };
}

module.exports = new ShelfController()