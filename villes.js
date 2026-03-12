// Toutes les localités du Cameroun par région et département
var CAMEROUN_VILLES = [
  // ── REGION CENTRE ──
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Bastos' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Biyem-Assi' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Emana' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Essos' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Etoa-Meki' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Melen' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Mendong' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Nkomo' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Nsam' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Obili' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Odza' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Omnisport' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Tsinga' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Mvog-Ada' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Messa' },
  { region:'Centre', departement:'Mfoundi',         ville:'Yaoundé — Nkolbisson' },
  { region:'Centre', departement:'Lekié',           ville:'Monatélé' },
  { region:'Centre', departement:'Lekié',           ville:'Obala' },
  { region:'Centre', departement:'Lekié',           ville:'Saa' },
  { region:'Centre', departement:'Lekié',           ville:'Evodoula' },
  { region:'Centre', departement:'Mbam-et-Inoubou', ville:'Bafia' },
  { region:'Centre', departement:'Mbam-et-Inoubou', ville:'Bokito' },
  { region:'Centre', departement:'Mbam-et-Inoubou', ville:'Ombessa' },
  { region:'Centre', departement:'Mbam-et-Kim',     ville:'Ntui' },
  { region:'Centre', departement:'Mbam-et-Kim',     ville:'Ngambe-Tikar' },
  { region:'Centre', departement:'Méfou-et-Afamba', ville:'Mfou' },
  { region:'Centre', departement:'Méfou-et-Afamba', ville:'Awaé' },
  { region:'Centre', departement:'Méfou-et-Afamba', ville:'Nkolafamba' },
  { region:'Centre', departement:'Méfou-et-Akono',  ville:'Mbalmayo' },
  { region:'Centre', departement:'Méfou-et-Akono',  ville:'Akono' },
  { region:'Centre', departement:'Méfou-et-Akono',  ville:'Ngomedzap' },
  { region:'Centre', departement:'Nyong-et-Kellé',  ville:'Eséka' },
  { region:'Centre', departement:'Nyong-et-Kellé',  ville:'Makak' },
  { region:'Centre', departement:'Nyong-et-Mfoumou',ville:'Akonolinga' },
  { region:'Centre', departement:'Nyong-et-Mfoumou',ville:'Endom' },
  { region:'Centre', departement:'Nyong-et-So\'o',  ville:'Mbankomo' },
  { region:'Centre', departement:'Nyong-et-So\'o',  ville:'Dzeng' },

  // ── REGION LITTORAL ──
  { region:'Littoral', departement:'Wouri',           ville:'Douala' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Akwa' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bali' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bassa' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Beedi' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bepanda' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bonapriso' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bonamoussadi' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bonabéri' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Bonandjo' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Cite des Palmiers' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Deido' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Kotto' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Logbaba' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Makepe' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Ndokotti' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — New Bell' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Nyalla' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — PK 10' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — PK 14' },
  { region:'Littoral', departement:'Wouri',           ville:'Douala — Village' },
  { region:'Littoral', departement:'Moungo',          ville:'Nkongsamba' },
  { region:'Littoral', departement:'Moungo',          ville:'Loum' },
  { region:'Littoral', departement:'Moungo',          ville:'Mbanga' },
  { region:'Littoral', departement:'Moungo',          ville:'Manjo' },
  { region:'Littoral', departement:'Moungo',          ville:'Melong' },
  { region:'Littoral', departement:'Moungo',          ville:'Mombo' },
  { region:'Littoral', departement:'Nkam',            ville:'Yabassi' },
  { region:'Littoral', departement:'Nkam',            ville:'Ndom' },
  { region:'Littoral', departement:'Sanaga-Maritime', ville:'Edéa' },
  { region:'Littoral', departement:'Sanaga-Maritime', ville:'Nyanon' },
  { region:'Littoral', departement:'Sanaga-Maritime', ville:'Dizangue' },

  // ── REGION OUEST ──
  { region:'Ouest', departement:'Mifi',            ville:'Bafoussam' },
  { region:'Ouest', departement:'Mifi',            ville:'Bafoussam — Banengo' },
  { region:'Ouest', departement:'Mifi',            ville:'Bafoussam — Djeleng' },
  { region:'Ouest', departement:'Mifi',            ville:'Bafoussam — Tamdja' },
  { region:'Ouest', departement:'Bamboutos',       ville:'Mbouda' },
  { region:'Ouest', departement:'Bamboutos',       ville:'Babadjou' },
  { region:'Ouest', departement:'Bamboutos',       ville:'Galim' },
  { region:'Ouest', departement:'Haut-Nkam',       ville:'Bafang' },
  { region:'Ouest', departement:'Haut-Nkam',       ville:'Kekem' },
  { region:'Ouest', departement:'Haut-Nkam',       ville:'Bana' },
  { region:'Ouest', departement:'Hauts-Plateaux',  ville:'Baham' },
  { region:'Ouest', departement:'Hauts-Plateaux',  ville:'Bangou' },
  { region:'Ouest', departement:'Koung-Khi',       ville:'Bandjoun' },
  { region:'Ouest', departement:'Koung-Khi',       ville:'Bangangte' },
  { region:'Ouest', departement:'Menoua',          ville:'Dschang' },
  { region:'Ouest', departement:'Menoua',          ville:'Fokoue' },
  { region:'Ouest', departement:'Menoua',          ville:'Santchou' },
  { region:'Ouest', departement:'Nde',             ville:'Bangangté' },
  { region:'Ouest', departement:'Nde',             ville:'Tonga' },
  { region:'Ouest', departement:'Noun',            ville:'Foumban' },
  { region:'Ouest', departement:'Noun',            ville:'Foumbot' },
  { region:'Ouest', departement:'Noun',            ville:'Koutaba' },
  { region:'Ouest', departement:'Noun',            ville:'Malantouen' },

  // ── REGION SUD-OUEST ──
  { region:'Sud-Ouest', departement:'Fako',          ville:'Limbé' },
  { region:'Sud-Ouest', departement:'Fako',          ville:'Buea' },
  { region:'Sud-Ouest', departement:'Fako',          ville:'Tiko' },
  { region:'Sud-Ouest', departement:'Fako',          ville:'Muyuka' },
  { region:'Sud-Ouest', departement:'Kupe-Manenguba',ville:'Bangem' },
  { region:'Sud-Ouest', departement:'Kupe-Manenguba',ville:'Nguti' },
  { region:'Sud-Ouest', departement:'Lebialem',      ville:'Menji' },
  { region:'Sud-Ouest', departement:'Lebialem',      ville:'Wabane' },
  { region:'Sud-Ouest', departement:'Manyu',         ville:'Mamfé' },
  { region:'Sud-Ouest', departement:'Manyu',         ville:'Akwaya' },
  { region:'Sud-Ouest', departement:'Meme',          ville:'Kumba' },
  { region:'Sud-Ouest', departement:'Meme',          ville:'Mbonge' },
  { region:'Sud-Ouest', departement:'Ndian',         ville:'Mundemba' },
  { region:'Sud-Ouest', departement:'Ndian',         ville:'Ekondo-Titi' },

  // ── REGION NORD-OUEST ──
  { region:'Nord-Ouest', departement:'Boyo',        ville:'Fundong' },
  { region:'Nord-Ouest', departement:'Bui',         ville:'Kumbo' },
  { region:'Nord-Ouest', departement:'Bui',         ville:'Nkambe' },
  { region:'Nord-Ouest', departement:'Donga-Mantung',ville:'Nkambe' },
  { region:'Nord-Ouest', departement:'Menchum',     ville:'Wum' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Bamenda' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Bamenda — Commercial Avenue' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Bamenda — Mile 4' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Bamenda — Nkwen' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Santa' },
  { region:'Nord-Ouest', departement:'Mezam',       ville:'Tubah' },
  { region:'Nord-Ouest', departement:'Momo',        ville:'Mbengwi' },
  { region:'Nord-Ouest', departement:'Ngokentunjia',ville:'Ndop' },

  // ── REGION SUD ──
  { region:'Sud', departement:'Dja-et-Lobo',   ville:'Sangmélima' },
  { region:'Sud', departement:'Dja-et-Lobo',   ville:'Bengbis' },
  { region:'Sud', departement:'Mvila',         ville:'Ebolowa' },
  { region:'Sud', departement:'Mvila',         ville:'Ambam' },
  { region:'Sud', departement:'Mvila',         ville:'Ma\'an' },
  { region:'Sud', departement:'Mvila',         ville:'Meyo-centre' },
  { region:'Sud', departement:'Océan',         ville:'Kribi' },
  { region:'Sud', departement:'Océan',         ville:'Campo' },
  { region:'Sud', departement:'Océan',         ville:'Akom II' },
  { region:'Sud', departement:'Vallée-du-Ntem',ville:'Kyé-Ossi' },
  { region:'Sud', departement:'Vallée-du-Ntem',ville:'Olamze' },

  // ── REGION EST ──
  { region:'Est', departement:'Boumba-et-Ngoko',ville:'Moloundou' },
  { region:'Est', departement:'Boumba-et-Ngoko',ville:'Yokadouma' },
  { region:'Est', departement:'Haut-Nyong',     ville:'Abong-Mbang' },
  { region:'Est', departement:'Haut-Nyong',     ville:'Doumé' },
  { region:'Est', departement:'Haut-Nyong',     ville:'Lomié' },
  { region:'Est', departement:'Haut-Nyong',     ville:'Messamena' },
  { region:'Est', departement:'Kadey',          ville:'Batouri' },
  { region:'Est', departement:'Kadey',          ville:'Kette' },
  { region:'Est', departement:'Kadey',          ville:'Ndelele' },
  { region:'Est', departement:'Lom-et-Djerem',  ville:'Bertoua' },
  { region:'Est', departement:'Lom-et-Djerem',  ville:'Bélabo' },
  { region:'Est', departement:'Lom-et-Djerem',  ville:'Diang' },
  { region:'Est', departement:'Lom-et-Djerem',  ville:'Mandjou' },

  // ── REGION NORD ──
  { region:'Nord', departement:'Bénoué',     ville:'Garoua' },
  { region:'Nord', departement:'Bénoué',     ville:'Garoua — Yelwa' },
  { region:'Nord', departement:'Bénoué',     ville:'Bibemi' },
  { region:'Nord', departement:'Bénoué',     ville:'Dembo' },
  { region:'Nord', departement:'Bénoué',     ville:'Lagdo' },
  { region:'Nord', departement:'Faro',       ville:'Poli' },
  { region:'Nord', departement:'Mayo-Louti', ville:'Guider' },
  { region:'Nord', departement:'Mayo-Louti', ville:'Figuil' },
  { region:'Nord', departement:'Mayo-Rey',   ville:'Tcholliré' },
  { region:'Nord', departement:'Mayo-Rey',   ville:'Touboro' },
  { region:'Nord', departement:'Mayo-Rey',   ville:'Rey Bouba' },

  // ── REGION ADAMAOUA ──
  { region:'Adamaoua', departement:'Djérem',       ville:'Tibati' },
  { region:'Adamaoua', departement:'Faro-et-Déo',  ville:'Tignère' },
  { region:'Adamaoua', departement:'Mayo-Banyo',   ville:'Banyo' },
  { region:'Adamaoua', departement:'Mbéré',        ville:'Meiganga' },
  { region:'Adamaoua', departement:'Mbéré',        ville:'Djohong' },
  { region:'Adamaoua', departement:'Vina',         ville:'Ngaoundéré' },
  { region:'Adamaoua', departement:'Vina',         ville:'Ngaoundéré — Baladji' },
  { region:'Adamaoua', departement:'Vina',         ville:'Ngaoundéré — Burkina' },
  { region:'Adamaoua', departement:'Vina',         ville:'Ngaoundéré — Dang' },
  { region:'Adamaoua', departement:'Vina',         ville:'Ngaoundéré — Maképé' },
  { region:'Adamaoua', departement:'Vina',         ville:'Belel' },
  { region:'Adamaoua', departement:'Vina',         ville:'Mbe' },

  // ── REGION EXTREME-NORD ──
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Maroua' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Maroua — Domayo' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Maroua — Kakataré' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Maroua — Ngassa' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Bogo' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Gazawa' },
  { region:'Extreme-Nord', departement:'Diamaré',        ville:'Meri' },
  { region:'Extreme-Nord', departement:'Logone-et-Chari',ville:'Kousseri' },
  { region:'Extreme-Nord', departement:'Logone-et-Chari',ville:'Fotokol' },
  { region:'Extreme-Nord', departement:'Logone-et-Chari',ville:'Goulfey' },
  { region:'Extreme-Nord', departement:'Mayo-Danay',     ville:'Yagoua' },
  { region:'Extreme-Nord', departement:'Mayo-Danay',     ville:'Kaelé' },
  { region:'Extreme-Nord', departement:'Mayo-Danay',     ville:'Maga' },
  { region:'Extreme-Nord', departement:'Mayo-Kani',      ville:'Mora' },
  { region:'Extreme-Nord', departement:'Mayo-Kani',      ville:'Kolofata' },
  { region:'Extreme-Nord', departement:'Mayo-Sava',      ville:'Mora' },
  { region:'Extreme-Nord', departement:'Mayo-Sava',      ville:'Tokombéré' },
  { region:'Extreme-Nord', departement:'Mayo-Tsanaga',   ville:'Mokolo' },
  { region:'Extreme-Nord', departement:'Mayo-Tsanaga',   ville:'Koza' },
  { region:'Extreme-Nord', departement:'Mayo-Tsanaga',   ville:'Mogodé' },
];

// Générer les options HTML groupées par région
function genererOptionsVilles() {
  var regions = {};
  CAMEROUN_VILLES.forEach(function(v){
    if (!regions[v.region]) regions[v.region] = [];
    regions[v.region].push(v);
  });
  var html = '<option value="">Sélectionner votre ville...</option>';
  Object.keys(regions).sort().forEach(function(region){
    html += '<optgroup label="── ' + region + ' ──">';
    regions[region].forEach(function(v){
      html += '<option value="' + v.ville + '">' + v.ville + '</option>';
    });
    html += '</optgroup>';
  });
  return html;
}

// Générer options simples (sans groupes) pour les selects gérant
function genererOptionsVillesSimple() {
  var html = '<option value="">Sélectionner...</option>';
  var regions = {};
  CAMEROUN_VILLES.forEach(function(v){
    if (!regions[v.region]) regions[v.region] = [];
    regions[v.region].push(v);
  });
  Object.keys(regions).sort().forEach(function(region){
    html += '<optgroup label="── ' + region + ' ──">';
    regions[region].forEach(function(v){
      html += '<option value="' + v.ville + '">' + v.ville + '</option>';
    });
    html += '</optgroup>';
  });
  return html;
}

// Injecter les villes dans tous les selects de l'application
function injecterVillesPartout() {
  // Modal fournisseur — ville
  var selVilleFour = document.getElementById('fville');
  if (selVilleFour) selVilleFour.innerHTML = genererOptionsVillesSimple();

  // Boutique — checkout client
  var selVilleClient = document.getElementById('cli-ville');
  if (selVilleClient) selVilleClient.innerHTML = genererOptionsVilles();

  // Inscription gérant
  var selVilleReg = document.getElementById('r-ville');
  if (selVilleReg) selVilleReg.innerHTML = genererOptionsVillesSimple();

  // Modal ajout supermarché
  var selVilleSM = document.getElementById('sm-v');
  if (selVilleSM) selVilleSM.innerHTML = genererOptionsVillesSimple();
}

// Lancer l'injection au chargement
document.addEventListener('DOMContentLoaded', function(){
  injecterVillesPartout();
});
