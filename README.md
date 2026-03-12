# SuperMarché CM 🇨🇲 — Guide complet

Plateforme e-commerce complète pour supermarchés camerounais.

## Structure

```
supermarche-cm/
├── index.html      ← Tableau de bord gérant
├── boutique.html   ← Boutique publique clients
├── script.js       ← Logique tableau de bord
├── boutique.js     ← Logique boutique
├── style.css       ← Styles tableau de bord
├── boutique.css    ← Styles boutique
├── config.js       ← ⚙️  CONFIGURATION (à modifier)
├── db.js           ← Service base de données Supabase
├── paiement.js     ← Service paiement CinetPay + SMS
└── README.md
```

## ÉTAPE 1 — Mettre en ligne (GitHub Pages)

1. Créez un repo GitHub nommé `supermarche-cm`
2. Uploadez tous les fichiers
3. Settings → Pages → Branch: main
4. Boutique : `https://pseudo.github.io/supermarche-cm/boutique.html`
5. Gérant : `https://pseudo.github.io/supermarche-cm/index.html`

Compte démo : admin@supermarche.cm / Admin123!

---

## ÉTAPE 2 — Base de données Supabase (GRATUIT)

1. Allez sur https://supabase.com → créez un projet
2. Dans SQL Editor, exécutez :

```sql
CREATE TABLE IF NOT EXISTS commandes (
  id TEXT PRIMARY KEY, date TEXT, client TEXT, tel TEXT,
  ville TEXT, adresse TEXT, supermarche TEXT, paiement TEXT,
  statut TEXT DEFAULT 'en_attente', items JSONB,
  sous_total INTEGER DEFAULT 0, livraison INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0, notes TEXT, source TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS produits (
  id SERIAL PRIMARY KEY, nom TEXT, cat TEXT, prix INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0, sm TEXT, img TEXT, seuil INTEGER DEFAULT 10,
  actif BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT NOW()
);
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE produits  ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public all commandes" ON commandes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all produits"  ON produits  FOR ALL USING (true) WITH CHECK (true);
```

3. Settings → API → copiez Project URL et anon key
4. Dans config.js :

```javascript
supabase: {
  url:    'https://VOTRE-ID.supabase.co',
  key:    'eyJhbGci...',
  active: true   // ← mettre true
},
```

---

## ÉTAPE 3 — Paiement Mobile Money (CinetPay)

Prérequis : entreprise enregistrée au Cameroun (RCCM + pièce d'identité)

1. Allez sur https://cinetpay.com → Créer compte marchand
2. Soumettez vos documents (validation 5-15 jours)
3. Mon compte → Intégration → API → copiez API Key et Site ID
4. Dans config.js :

```javascript
cinetpay: {
  apikey:  'VOTRE_API_KEY',
  site_id: 'VOTRE_SITE_ID',
  notify_url: 'https://pseudo.github.io/supermarche-cm/notify.html',
  active:  true   // ← mettre true
},
```

> En attendant validation : mode simulation actif, commandes enregistrées sans paiement réel.

---

## ÉTAPE 4 — SMS automatiques (Africa's Talking)

1. Allez sur https://africastalking.com → créez un compte (crédits gratuits)
2. Settings → API Key → copiez username et API Key
3. Créez un compte Netlify (netlify.com) et importez depuis GitHub
4. Dans Netlify → Environment variables, ajoutez :
   - `AT_API_KEY` = votre clé
   - `AT_USERNAME` = votre username
5. Créez le fichier `netlify/functions/sms.js` :

```javascript
const AT = require('africastalking')({ apiKey: process.env.AT_API_KEY, username: process.env.AT_USERNAME });
exports.handler = async (event) => {
  const { to, message, from } = JSON.parse(event.body);
  await AT.SMS.send({ to, message, from });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```

6. Dans config.js : `africastalking: { active: true, ... }`

---

## ÉTAPE 5 — Personnaliser vos infos

Dans config.js, section boutique :

```javascript
boutique: {
  nom:       'Votre Supermarché',
  telephone: '+237 6XX XXX XXX',
  whatsapp:  '237690000000',
  email:     'vous@email.cm',
  adresse:   'Votre adresse',
}
```

---

## Ce qui fonctionne à chaque étape

| Fonctionnalité | Sans config | + Supabase | + CinetPay | + SMS |
|---|---|---|---|---|
| Boutique client | ✅ | ✅ | ✅ | ✅ |
| Tableau de bord | ✅ | ✅ | ✅ | ✅ |
| Données permanentes | ❌ | ✅ | ✅ | ✅ |
| Vrai paiement MoMo | ❌ | ❌ | ✅ | ✅ |
| SMS confirmation | ❌ | ❌ | ❌ | ✅ |
| Sync multi-appareils | ❌ | ✅ | ✅ | ✅ |
| Notif temps réel | ❌ | ✅ | ✅ | ✅ |
