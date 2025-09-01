const Blague = require('../models/blague');

exports.recupererStatistiques = async (req, res) => {
  try {
    // On compte le nombre total de blagues dans la base de données
    const nombreDeBlagues = await Blague.count();

    // Pour l'exemple, les autres stats sont des valeurs fixes
    const requetesAujourdhui = 3482;
    const uptime = '99,9 %';

    res.status(200).json({
      blaguesEnBdd: nombreDeBlagues,
      requetesAujourdhui: requetesAujourdhui,
      uptime: uptime,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.', error: error.message });
  }
};
