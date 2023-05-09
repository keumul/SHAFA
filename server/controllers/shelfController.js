const Error = require('../errors/error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../models/models')
const { Shelves } = require('../models/models')

class ShelfController {
  async getAllShelves(req, res) {
    try {
      const shelves = await Shelves.findAll();

      res.json(shelves);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong until search all shelves!' });
    }
  };
  
  async createShelf(req, res) {
    try {
      const { name, userId, categoryId } = req.body;
      const newShelf = await Shelves.create({ name, userId, categoryId });
      res.status(201).json(newShelf);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something wrong until creating shelf!' });
    }
  };
  
  async updateShelf(req, res) {
    try {
      const { id } = req.params;
      const { name, userId, categoryId } = req.body;
      const [numRowsAffected] = await Shelves.update({ name, userId, categoryId }, { where: { id } });
    
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