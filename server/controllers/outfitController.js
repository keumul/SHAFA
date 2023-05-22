const { Outfits, Users } = require('../models/models');
const { Stuffs } = require('../models/models');
const { OutfitStuff } = require('../models/models');

class outfitController{
async createOutfit(req, res) {
  try {
    const { name, stuffId, userId } = req.body;
    const newOutfit = await Outfits.create({name: name, stuffId: stuffId, userId: userId});
    res.status(201).json({ outfit: newOutfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while creating the outfit!' });
  }
};

async addStuffToOutfit(req, res) { 
  const { outfitId } = req.params;
  const { stuffId } = req.body;
  console.log(outfitId, stuffId);
  const fillOutfit = await OutfitStuff.create({outfitId, stuffId});
  res.status(201).json({ filledStuff: fillOutfit });
}

async getOutfitsByUser(req, res) {
  try {
    const { id } = req.params;
    const uniqueOutfits = await Outfits.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Stuffs,
          attributes: ['id', 'name', 'img'],
          through: { attributes: [] },
        },
      ],
      group: ['outfits.id', 'outfits.name', 'stuffs.id', 'stuffs.name', 'stuffs.img'], 
    });
    if (!uniqueOutfits) {
      return res.status(404).json({ error: 'ERROR: Outfit not found!' });
    }
    res.json({ uniqueOutfits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the outfit!' });
  }
};

async getAllStuffInOutfit(req, res) {
  try {
    // const outfit = await StuffsInOutfits.findAll(
    //   {
    //     include: [
    //       {model: Stuffs},
    //       {model: Outfits}
    //     ]
    //   }
    // );
    // if (!outfit) {
    //   return res.status(404).json({ error: 'ERROR: Outfit not found!' });
    // }
    // res.json({ outfit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Something went wrong while retrieving the outfit!' });
  }
};

async updateOutfit(req, res) {
  try {
    const { id } = req.params;
    const { stuffId, outfitId } = req.body;

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


