const { Outfits } = require('../models/models');
const { Stuffs } = require('../models/models');
const { StuffsInOutfits } = require('../models/models');

class outfitController{
async createOutfit(req, res) {
  try {
    const newOutfit = await Outfits.create({});
    res.status(201).json({ outfit: newOutfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while creating the outfit!' });
  }
};

async addStuffToOutfit(req, res) {
    try {
        const { outfitId } = req.params;
        const { stuffId } = req.body;
        const fillOutfit = await StuffsInOutfits.create({outfitId, stuffId});
        res.status(201).json({ filledStuff: fillOutfit });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ERROR: Something went wrong with adding stuff to outfit!' });
      }
}

async getAllOutfits(req, res) {
  try {
    const outfits = await Outfits.findAll();
    res.json({ outfits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the outfits!' });
  }
};

async getOutfitById(req, res) {
  try {
    const { id } = req.params;
    const outfit = await Outfits.findByPk(id);
    if (!outfit) {
      return res.status(404).json({ error: 'ERROR: Outfit not found!' });
    }
    res.json({ outfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the outfit!' });
  }
};

async updateOutfit(req, res) {
  try {
    const { id } = req.params;
    const { stuffId, outfitId } = req.body;
    const updatedOutfit = await StuffsInOutfits.update({outfitId, stuffId}, { where: { id } });

    if (updatedOutfit[0] === 0) {
      return res.status(404).json({ error: 'ERROR: Outfit not found!' });
    }

    res.status(200).json({ message: 'INFO: Outfit updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while updating the outfit!' });
  }
};

async deleteOutfit(req, res) {
  try {
    const { id } = req.params;

    const deletedOutfit = await Outfits.destroy({ where: { id } });

    if (deletedOutfit === 0) {
      return res.status(404).json({ error: 'ERROR: Outfit not found!' });
    }

    res.status(200).json({ message: 'INFO: Outfit deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while deleting the outfit!' });
}
};
}

module.exports = new outfitController()


