const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Blague = require('./models/blague');
const swaggerSetup = require('./config/swagger');
const blagueRoutes = require('./routes/blagueRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Carambar & Co !');
});

app.use('/api/v1/blagues', blagueRoutes);
app.use('/api/v1/stats', statsRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Base de données & tables créées !');

  const blaguesInitiales = [
    { question: 'Quelle est la femelle du hamster ?', reponse: 'L’Amsterdam' },
    { question: 'Que dit un oignon quand il se cogne ?', reponse: 'Aïe' },
    { question: 'Quel est l\'animal le plus heureux ?', reponse: 'Le hibou, parce que sa femme est chouette.' },
    { question: 'Pourquoi le football c\'est rigolo ?', reponse: 'Parce que Thierry en rit' },
    { question: 'Quel est le sport le plus fruité ?', reponse: 'La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.' },
    { question: 'Que se fait un Schtroumpf quand il tombe ?', reponse: 'Un Bleu' },
    { question: 'Quel est le comble pour un marin ?', reponse: 'Avoir le nez qui coule' },
    { question: 'Qu\'est ce que les enfants usent le plus à l\'école ?', reponse: 'Le professeur' },
    { question: 'Quel est le sport le plus silencieux ?', reponse: 'Le para-chuuuut' },
    { question: 'Quel est le comble pour un joueur de bowling ?', reponse: 'C’est de perdre la boule' }
  ];

  Blague.bulkCreate(blaguesInitiales)
    .then(() => {
      console.log('Les blagues initiales ont été ajoutées.');
      app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
      });
    })
    .catch(error => console.log("Erreur lors de l'ajout des blagues initiales:", error));
});
