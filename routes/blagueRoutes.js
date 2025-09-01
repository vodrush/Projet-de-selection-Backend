const express = require('express');
const router = express.Router();
const blagueController = require('../controllers/blagueController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Blague:
 *       type: object
 *       required:
 *         - question
 *         - reponse
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré de la blague.
 *         question:
 *           type: string
 *           description: La question de la blague.
 *         reponse:
 *           type: string
 *           description: La réponse de la blague.
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         reponse: "L’Amsterdam"
 */

/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     summary: Récupère la liste de toutes les blagues.
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: La liste des blagues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blague'
 */
router.get('/', blagueController.recupererToutesLesBlagues);

/**
 * @swagger
 * /api/v1/blagues/aleatoire:
 *   get:
 *     summary: Récupère une blague au hasard.
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Une blague aléatoire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blague'
 *       404:
 *         description: Aucune blague trouvée.
 */
router.get('/aleatoire', blagueController.recupererBlagueAleatoire);

/**
 * @swagger
 * /api/v1/blagues/{id}:
 *   get:
 *     summary: Récupère une blague via son ID.
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de la blague.
 *     responses:
 *       200:
 *         description: La description de la blague.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blague'
 *       404:
 *         description: La blague n'a pas été trouvée.
 */
router.get('/:id', blagueController.recupererBlagueParId);

/**
 * @swagger
 * /api/v1/blagues:
 *   post:
 *     summary: Crée une nouvelle blague.
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blague'
 *     responses:
 *       201:
 *         description: La blague a été créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blague'
 *       400:
 *         description: La question et la réponse sont requises.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/', blagueController.ajouterBlague);

module.exports = router;
