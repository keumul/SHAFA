const Error = require('../errors/error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Stuffs, Users, Shelves, Labels } = require('../models/models')

class StuffController {
async getAllStuffs(req, res) {
    try {
      const stuffs = await Stuffs.findAll(
        {
          include: [
            { model: Users },
            { model: Shelves },
            { model: Labels }
          ],
        }
      );
      res.json({ stuffs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while fetching stuffs!' });
    }
  };
  
  async getStuffByUserId(req, res){
    const { user_id } = req.params;
    try {
      const stuffs = await Stuffs.findAll(
        {
          include: [
            { model: Users },
            { model: Shelves },
            { model: Labels }
          ],
          where : {
            userId: user_id
          }
        }
      );
      res.json({ stuffs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while fetching stuffs!' });
    }
  }

  async createStuff(req, res) {
    try {
      const { name, labelId, userId, shelfId, isAvailable } = req.body;
      const newStuff = await Stuffs.create({ name, labelId, userId, shelfId, isAvailable });
      res.status(201).json({ stuff: newStuff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while creating stuff!' });
    }
  };

 async getStuffById(req, res) {
    try {
      const { id } = req.params;
      const stuff = await Stuffs.findByPk(id);
      if (!stuff) {
        return res.status(404).json({ error: 'ERROR: Stuff not found!' });
      }
      res.json({ stuff: stuff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the stuff!' });
    }
  };
  
 async updateStuff(req, res) {
    try {
      const { id } = req.params;
      const { name, labelId, userId, shelfId, isAvailable } = req.body;
      const [numRowsAffected] = await Stuffs.update(
        { name, labelId, userId, shelfId, isAvailable },
        { where: { id } }
      );
  
      if (numRowsAffected === 0) {
        return res.status(404).json({ error: 'ERROR: Stuff not found!' });
      }
  
      res.status(200).json({ message: 'INFO: Stuff updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while updating stuff!' });
    }
  };
  
  async deleteStuff(req, res) {
    try {
      const { id } = req.params;
      const numRowsAffected = await Stuffs.destroy({ where: { id } });
  
      if (numRowsAffected === 0) {
        return res.status(404).json({ error: 'ERROR: Stuff not found!' });
      }
  
      res.status(200).json({ message: 'INFO: Stuff deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while deleting stuff!' });
    }
  };
}

module.exports = new StuffController()
  