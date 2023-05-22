const uuid = require('uuid')
const path = require('path')
const { Stuffs, Users, Shelves, Labels, Outfits, OutfitStuff } = require('../models/models')

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

  async getStuffByOutfit(req, res){
    const { outfit_id } = req.params;
    try {
      const stuffs = await OutfitStuff.findAll(
        {
          include: [
            {model: Stuffs},
            {model: Outfits},
          ],
          where : {
            outfitId: outfit_id
          }
        }
      );
      console.log(outfit_id);
      res.json({ stuffs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while fetching stuffs!' });
    }
  }

  async createStuff(req, res) {
    try {
      const { name, labelId, userId, shelfId } = req.body;
      const { img } = req.files;
      let filename = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', filename));

      const newStuff = await Stuffs.create({ name, labelId, userId, shelfId, img: filename });
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
      const { name, labelId, userId, shelfId} = req.body;
      const selectedFile = req.files?.img;
      let img;
  
      if (selectedFile) {
        img = uuid.v4() + '.jpg';
        selectedFile.mv(path.resolve(__dirname, '..', 'static', img));
      }
  
      const [numRowsAffected] = await Stuffs.update(
        { name, labelId, userId, shelfId, img },
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
  