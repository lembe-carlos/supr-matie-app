// ═══════════════════════════════════════════════════════════
//  SuperMarché CM — config.js
//  Configuration centrale de tous les services externes
//  
//  ⚠️  IMPORTANT : Remplacez les valeurs YOUR_XXX par vos
//  vraies clés API après avoir créé vos comptes.
//  Ne partagez jamais ce fichier publiquement.
// ═══════════════════════════════════════════════════════════

var SM_CONFIG = {

  // ════════════════════════════════════════
  //  1. SUPABASE — Base de données en ligne
  //  
  //  Comment obtenir ces clés :
  //  1. Allez sur https://supabase.com
  //  2. Cliquez "Start your project" (gratuit)
  //  3. Créez un projet nommé "supermarche-cm"
  //  4. Allez dans Settings → API
  //  5. Copiez "Project URL" et "anon public key"
  // ════════════════════════════════════════
  supabase: {
    url:    'https://mtlvkkhjabqgbohkmajn.supabase.co',
    key:    'sb_publishable_Z_sEmjWwXRe4Kq7NOCb90Q_6VoNQ5OO',
    active: true
  },

  // ════════════════════════════════════════
  //  2. CINETPAY — Paiement Mobile Money
  //  Accepte MTN, Orange, Airtel, Moov...
  //  
  //  Comment obtenir ces clés :
  //  1. Allez sur https://cinetpay.com
  //  2. Cliquez "Créer un compte marchand"
  //  3. Fournissez : RCCM, pièce d'identité gérant
  //  4. Après validation, allez dans Mon compte → API
  //  5. Copiez votre API Key et Site ID
  // ════════════════════════════════════════
  cinetpay: {
    apikey:  'YOUR_CINETPAY_APIKEY',    // Ex: 1458387238659a3d4d3bdf7.97167335
    site_id: 'YOUR_CINETPAY_SITE_ID',  // Ex: 105791526
    notify_url: 'YOUR_SITE_URL/notify.php', // URL de votre site pour recevoir confirmations
    active:  false  // Passer à true après validation de votre compte
  },

  // ════════════════════════════════════════
  //  3. AFRICA'S TALKING — SMS automatiques
  //  Envoie SMS de confirmation aux clients
  //  
  //  Comment obtenir ces clés :
  //  1. Allez sur https://africastalking.com
  //  2. Créez un compte (gratuit avec crédits test)
  //  3. Allez dans Settings → API Key
  //  4. Copiez votre username et API Key
  //  Note : En production, passez en mode "Live"
  // ════════════════════════════════════════
  africastalking: {
    username: 'supermarche_cm',
    apikey:   'atsk_571ce8cfdd98ed671bccd446df62c16387d61ed33873d7cf051037a77aff565f3c0e6ce9',
    sender:   'SuperMktCM',
    active:   true
  },

  // ════════════════════════════════════════
  //  4. WHATSAPP BUSINESS — Notifications
  //  
  //  Comment obtenir ces clés :
  //  1. Allez sur https://business.facebook.com
  //  2. Créez une application WhatsApp Business
  //  3. Ajoutez un numéro de téléphone
  //  4. Récupérez le token et phone_number_id
  //  Note : Numéro WhatsApp de secours toujours actif
  // ════════════════════════════════════════
  whatsapp: {
    token:           'YOUR_WA_TOKEN',       // Token Meta Business
    phone_number_id: 'YOUR_PHONE_ID',       // ID du numéro WhatsApp
    numero_contact:  '+237690000000',       // Votre numéro WhatsApp gérant
    active:          false  // Passer à true après configuration Meta
  },

  // ════════════════════════════════════════
  //  5. INFOS BOUTIQUE — Personnalisez ici
  // ════════════════════════════════════════
  boutique: {
    nom:        'SuperMarché CM',
    telephone:  '+237 683 39 22 68',
    email:      'lembetiny02@gmail.com',
    whatsapp:   '237693591479',
    adresse:    'Bepanda Casimando, Douala, Cameroun',
    devise:     'FCFA',
    frais_liv_min: 2000,   // Frais livraison minimum (FCFA)
    gratuit_a:  50000,     // Livraison gratuite au-dessus de ce montant
    // Pays et opérateurs actifs pour CinetPay
    pays:       'CM',      // Code pays Cameroun
    currency:   'XAF',     // Franc CFA
  }
};

// ════════════════════════════════════════
//  SUPABASE — Schéma SQL à exécuter
//  
//  Copiez ce SQL dans Supabase → SQL Editor
//  puis cliquez Run pour créer les tables
// ════════════════════════════════════════
var SM_SQL_SCHEMA = `
-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
  id          TEXT PRIMARY KEY,
  date        TEXT NOT NULL,
  client      TEXT NOT NULL,
  tel         TEXT NOT NULL,
  ville       TEXT,
  adresse     TEXT,
  supermarche TEXT,
  paiement    TEXT,
  statut      TEXT DEFAULT 'en_attente',
  items       JSONB,
  sous_total  INTEGER DEFAULT 0,
  livraison   INTEGER DEFAULT 0,
  total       INTEGER DEFAULT 0,
  notes       TEXT,
  source      TEXT DEFAULT 'boutique_en_ligne',
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Table des produits
CREATE TABLE IF NOT EXISTS produits (
  id      SERIAL PRIMARY KEY,
  nom     TEXT NOT NULL,
  cat     TEXT,
  prix    INTEGER DEFAULT 0,
  stock   INTEGER DEFAULT 0,
  sm      TEXT,
  img     TEXT,
  seuil   INTEGER DEFAULT 10,
  actif   BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id         SERIAL PRIMARY KEY,
  message    TEXT,
  type       TEXT DEFAULT 'info',
  lu         BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activer Row Level Security (recommandé)
ALTER TABLE commandes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE produits    ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Politique : accès public pour lire et insérer (boutique)
CREATE POLICY "Public insert commandes" ON commandes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select commandes" ON commandes FOR SELECT USING (true);
CREATE POLICY "Public update commandes" ON commandes FOR UPDATE USING (true);
CREATE POLICY "Public select produits"  ON produits  FOR SELECT USING (true);
CREATE POLICY "Public all produits"     ON produits  FOR ALL    USING (true);
CREATE POLICY "Public all notifs"       ON notifications FOR ALL USING (true);
`;

console.log('%c SuperMarché CM — Config chargée', 'color:#007A3D;font-weight:bold;font-size:14px');
console.log('Supabase actif :', SM_CONFIG.supabase.active);
console.log('CinetPay actif :', SM_CONFIG.cinetpay.active);
console.log('SMS actif      :', SM_CONFIG.africastalking.active);
