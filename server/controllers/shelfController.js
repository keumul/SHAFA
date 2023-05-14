const Error = require('../errors/error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users, Categories } = require('../models/models')
const { Shelves } = require('../models/models')
const {UsersInShelves} = require('../models/models');
const { where } = require('sequelize');

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
  async getAllShelves(req, res) {
    try {
      const shelves = await Shelves.findAll({
        include: [
          { model: Users },
          { model: Categories }
        ],
      });

      res.json(shelves);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong while search all shelves!' });
    }
  };
  
  async getShelfByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const shelves = await Shelves.findAll({
        include: [
          { model: Users },
          { model: Categories }
        ],
        where: {
          userId: user_id 
        }
      },
      );

      res.json(shelves);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong while search all shelves!' });
    }
  };
  

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
        const { shelfId } = req.params;
        const { userId } = req.body;
        const sharedAccess = await UsersInShelves.create({shelfId, userId}, {
          include: [
            { model: Users },
            { model: Categories }
          ],
        });
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