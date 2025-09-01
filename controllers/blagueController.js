const Blague = require('../models/blague');
const { Sequelize } = require('sequelize');

exports.recupererToutesLesBlagues = async (req, res) => {
  try {
    const blagues = await Blague.findAll();
    res.status(200).json(blagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recupererBlagueParId = async (req, res) => {
  try {
    const blague = await Blague.findByPk(req.params.id);
    if (blague) {
      res.status(200).json(blague);
    } else {
      res.status(404).json({ message: 'Blague non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recupererBlagueAleatoire = async (req, res) => {
  try {
    const blague = await Blague.findOne({ order: Sequelize.literal('RANDOM()') });
    if (blague) {
      res.status(200).json(blague);
    } else {
      res.status(404).json({ message: 'Aucune blague trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.ajouterBlague = async (req, res) => {
  try {
    const { question, reponse } = req.body;
    if (!question || !reponse) {
      return res.status(400).json({ message: 'La question et la réponse sont requises' });
    }
    const nouvelleBlague = await Blague.create({ question, reponse });
    res.status(201).json(nouvelleBlague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};