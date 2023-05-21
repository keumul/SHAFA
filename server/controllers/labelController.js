const Error = require('../errors/error');
const { Labels } = require('../models/models')

class labelController {
async getAllLabels(req, res) {
    try {
      const labels = await Labels.findAll();
      res.json({ labels });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while fetching labels!' });
    }
  };
  
async createLabel(req, res){
    try {
      const { description, texture, color, size, brand } = req.body;
      const newLabel = await Labels.create({ description, texture, color, size, brand });
      res.status(201).json({ label: newLabel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while creating label!' });
    }
  };
  
async updateLabel(req, res) {
    try {
      const { id } = req.params;
      const { description, texture, color, size, brand } = req.body;
      const [numRowsAffected] = await Labels.update(
        { description, texture, color, size, brand },
        { where: { id } }
      );
  
      if (numRowsAffected === 0) {
        return res.status(404).json({ error: 'ERROR: Label not found!' });
      }
  
      res.status(200).json({ message: 'INFO: Label updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while updating label!' });
    }
  };
  
  async deleteLabel(req, res) {
    try {
      const { id } = req.params;
      const numRowsAffected = await Labels.destroy({ where: { id } });
  
      if (numRowsAffected === 0) {
        return res.status(404).json({ error: 'ERROR: Label not found!' });
      }
  
      res.status(200).json({ message: 'INFO: Label deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'ERROR: Something went wrong while deleting label!' });
    }
  };
}
  module.exports = new labelController()
  
  