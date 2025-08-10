const { Categorie, Source, Texte } = require('./models');

async function importer() {
  try {
    // 1. Créer les catégories si elles n'existent pas
    const [categorie, created1] = await Categorie.findOrCreate({
      where: { id: 1 },
      defaults: { nom: 'Données personnelles' }
    });

    // 2. Créer les sources si elles n'existent pas
    const [source, created2] = await Source.findOrCreate({
      where: { id: 1 },
      defaults: { nom: 'Journal Officiel' }
    });

    // 3. Créer le texte
    await Texte.create({
      titre: 'Loi sur la protection des données personnelles',
      numeroOfficiel: 'LOI n° 2020-12',
      datePublication: new Date('2020-03-15'),
      contenu: 'Texte complet de la loi sur la protection des données personnelles...',
      typeTexte: 'Loi',
      categorieId: categorie.id,
      sourceId: source.id,
    });

    console.log('Import réussi !');
  } catch (err) {
    console.error('Erreur d\'import :', err);
  }
}

importer();
