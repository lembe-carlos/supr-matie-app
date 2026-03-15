
// ═══════════════ CONFIGURATION BOUTIQUE ═══════════════
var CFG_DEFAULT = {
  nom:      'SuperMarché CM — NGAPET LEMBE',
  desc:     'La première plateforme de courses en ligne au Cameroun. Produits frais, prix compétitifs, livraison rapide partout au pays.',
  adresse:  'Bepanda, Douala, Cameroun',
  tel:      '+237 683 39 22 68',
  email:    'lembetiny02@gmail.com',
  wa:       '237683392268',
  annee:    '2026',
  devise:   'FCFA',
  mtn:      '683 39 22 68',
  orange:   '693 59 14 79'
};

var CFG = Object.assign({}, CFG_DEFAULT);

function chargerConfig() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_config') || 'null');
    if (saved) CFG = Object.assign({}, CFG_DEFAULT, saved);
  } catch(e) {}
  // Remplir les champs du formulaire
  var champs = ['nom','desc','adresse','tel','email','wa','annee','devise','mtn','orange'];
  champs.forEach(function(k) {
    var el = document.getElementById('cfg-' + k);
    if (el) el.value = CFG[k] || '';
  });
  mettreAJourApercu();
}

function sauvegarderConfig() {
  CFG.nom     = document.getElementById('cfg-nom').value.trim()     || CFG_DEFAULT.nom;
  CFG.desc    = document.getElementById('cfg-desc').value.trim()    || CFG_DEFAULT.desc;
  CFG.adresse = document.getElementById('cfg-adresse').value.trim() || CFG_DEFAULT.adresse;
  CFG.tel     = document.getElementById('cfg-tel').value.trim()     || CFG_DEFAULT.tel;
  CFG.email   = document.getElementById('cfg-email').value.trim()   || CFG_DEFAULT.email;
  CFG.wa      = document.getElementById('cfg-wa').value.trim()      || CFG_DEFAULT.wa;
  CFG.annee   = document.getElementById('cfg-annee').value.trim()   || CFG_DEFAULT.annee;
  CFG.devise  = document.getElementById('cfg-devise').value         || 'FCFA';
  CFG.mtn     = document.getElementById('cfg-mtn').value.trim()     || CFG_DEFAULT.mtn;
  CFG.orange  = document.getElementById('cfg-orange').value.trim()  || CFG_DEFAULT.orange;

  try { localStorage.setItem('sm_config', JSON.stringify(CFG)); } catch(e) {}

  mettreAJourApercu();
  toast('Paramètres sauvegardés ! La boutique est mise à jour.', 'success');
  addNotif('Paramètres boutique mis à jour', 'green');
}

function sauvegarderNotifs() {
  var notifs = {
    rupture: document.getElementById('notif-rupture').checked,
    cmd:     document.getElementById('notif-cmd').checked,
    client:  document.getElementById('notif-client').checked,
    resume:  document.getElementById('notif-resume').checked
  };
  try { localStorage.setItem('sm_notifs', JSON.stringify(notifs)); } catch(e) {}
  toast('Préférences de notifications sauvegardées !', 'success');
}

function mettreAJourApercu() {
  // Mettre à jour l'aperçu en temps réel dans Paramètres
  var getNom  = function() { var el = document.getElementById('cfg-nom');     return el ? el.value || CFG.nom : CFG.nom; };
  var getDesc = function() { var el = document.getElementById('cfg-desc');    return el ? el.value || CFG.desc : CFG.desc; };
  var getAdr  = function() { var el = document.getElementById('cfg-adresse'); return el ? el.value || CFG.adresse : CFG.adresse; };
  var getTel  = function() { var el = document.getElementById('cfg-tel');     return el ? el.value || CFG.tel : CFG.tel; };
  var getEm   = function() { var el = document.getElementById('cfg-email');   return el ? el.value || CFG.email : CFG.email; };
  var getAn   = function() { var el = document.getElementById('cfg-annee');   return el ? el.value || CFG.annee : CFG.annee; };

  var set = function(id, txt) { var el = document.getElementById(id); if(el) el.innerHTML = txt; };
  set('ap-nom',     getNom());
  set('ap-desc',    getDesc());
  set('ap-adresse', '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg> ' + getAdr());
  set('ap-tel',     '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z\"></path></svg> ' + getTel());
  set('ap-email',   '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline></svg> ' + getEm());
  set('ap-copy',    '© ' + getAn() + ' ' + getNom() + ' — Tous droits réservés <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" style=\"vertical-align:middle;margin-right:3px\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"18\" fill=\"#007A3D\"></rect><rect x=\"10\" y=\"3\" width=\"4\" height=\"18\" fill=\"#CE1126\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"18\" fill=\"#FCD116\"></rect></svg>');

  // Magasins dans l'aperçu
  var apMag = document.getElementById('ap-magasins');
  if (apMag) apMag.innerHTML = STORES.map(function(s){ return '<div>' + s.nom + '</div>'; }).join('');
}

// Mise à jour en direct pendant la frappe
function initConfigLivePreview() {
  var champs = ['cfg-nom','cfg-desc','cfg-adresse','cfg-tel','cfg-email','cfg-annee'];
  champs.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', mettreAJourApercu);
  });
}

// ═══════════════ COMPTES ═══════════════

// ═══════════════════════════════════════════════════════
//  SYSTÈME CODES D'INVITATION
// ═══════════════════════════════════════════════════════

// Codes actifs — l'admin peut en ajouter depuis le tableau de bord
var CODES_INVITATION = [];

function initCodesInvitation() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_codes_invitation') || 'null');
    if (saved) {
      CODES_INVITATION = saved;
    } else {
      // Code par défaut créé automatiquement au premier lancement
      CODES_INVITATION = [
        { code: 'SM-GERANT-2026', role: 'Gérant(e)', usages: 0, maxUsages: 10, actif: true, cree: new Date().toLocaleDateString('fr-FR') }
      ];
      saveCodesInvitation();
    }
  } catch(e) { CODES_INVITATION = []; }
}

function saveCodesInvitation() {
  try { localStorage.setItem('sm_codes_invitation', JSON.stringify(CODES_INVITATION)); } catch(e) {}
}

function genererCode() {
  var roles  = ['Gérant(e)', 'Directeur(trice)', 'Propriétaire', 'Admin'];
  var role   = (document.getElementById('inv-role') || {}).value || 'Gérant(e)';
  var max    = parseInt((document.getElementById('inv-max') || {}).value) || 5;
  var chars  = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var suffix = '';
  for (var i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  var code   = 'SM-' + suffix;
  var newCode = {
    code:      code,
    role:      role,
    usages:    0,
    maxUsages: max,
    actif:     true,
    cree:      new Date().toLocaleDateString('fr-FR')
  };
  CODES_INVITATION.push(newCode);
  saveCodesInvitation();
  renderCodesInvitation();
  toast('Code créé : ' + code, 'success');

  // Copier dans le presse-papier
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(function(){
      toast('Code copié : ' + code, 'success');
    });
  }
}

function desactiverCode(index) {
  CODES_INVITATION[index].actif = false;
  saveCodesInvitation();
  renderCodesInvitation();
  toast('Code désactivé', 'success');
}

function supprimerCode(index) {
  if (!confirm('Supprimer ce code ?')) return;
  CODES_INVITATION.splice(index, 1);
  saveCodesInvitation();
  renderCodesInvitation();
}

function renderCodesInvitation() {
  var container = document.getElementById('inv-liste');
  if (!container) return;
  if (CODES_INVITATION.length === 0) {
    container.innerHTML = '<p style="color:#999;text-align:center;padding:12px">Aucun code créé</p>';
    return;
  }
  container.innerHTML = CODES_INVITATION.map(function(c, i) {
    var pct = c.maxUsages > 0 ? Math.round(c.usages / c.maxUsages * 100) : 0;
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:8px;background:' + (c.actif ? '#fff' : '#f9fafb') + '">' +
      '<div>' +
        '<div style="font-family:monospace;font-size:15px;font-weight:800;letter-spacing:2px;color:' + (c.actif ? '#007A3D' : '#999') + '">' + c.code + '</div>' +
        '<div style="font-size:11px;color:#888;margin-top:2px">' + c.role + ' — ' + c.usages + '/' + c.maxUsages + ' utilisations — ' + c.cree + '</div>' +
      '</div>' +
      '<div style="display:flex;gap:6px;align-items:center">' +
        '<span style="font-size:11px;padding:3px 8px;border-radius:20px;background:' + (c.actif ? '#dcfce7' : '#fee2e2') + ';color:' + (c.actif ? '#007A3D' : '#dc2626') + ';font-weight:700">' + (c.actif ? 'Actif' : 'Inactif') + '</span>' +
        (c.actif ? '<button class="btn bd bsm" onclick="desactiverCode(' + i + ')">Désactiver</button>' : '') +
        '<button class="btn bd bsm" onclick="supprimerCode(' + i + ')">✕</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function verifierCodeInvitation(code) {
  initCodesInvitation();
  var c = CODES_INVITATION.find(function(c) {
    return c.code.toUpperCase() === code.toUpperCase() && c.actif && c.usages < c.maxUsages;
  });
  return c || null;
}

// ── Détection automatique du rôle depuis le code ──
function detecterRoleCode(valeur) {
  var code = (valeur || '').trim().toUpperCase();
  var display = document.getElementById('r-role-display');
  var roleInput = document.getElementById('r-role');
  var smWrap = document.getElementById('r-sm-wrap');

  if (code.length < 8) {
    if (display) { display.textContent = 'Entrez votre code d\'invitation ci-dessus'; display.style.color = '#007A3D'; display.style.borderColor = '#d1fae5'; }
    if (roleInput) roleInput.value = '';
    if (smWrap) smWrap.style.display = 'block';
    return;
  }

  var codeValide = verifierCodeInvitation(code);
  if (!codeValide) {
    if (display) { display.textContent = 'Code invalide ou expiré'; display.style.color = '#dc2626'; display.style.borderColor = '#fecaca'; }
    if (roleInput) roleInput.value = '';
    if (smWrap) smWrap.style.display = 'block';
    return;
  }

  var role = codeValide.role;
  var icones = { 'Caissier(e)':'🧾', 'Livreur':'🛵', 'Gérant(e)':'👔', 'Directeur(trice)':'👔', 'Propriétaire':'🏪' };
  var icone = icones[role] || '👤';

  if (display) {
    display.textContent = icone + ' ' + role + ' — Code valide ✓';
    display.style.color = '#007A3D';
    display.style.borderColor = '#6ee7b7';
    display.style.background = '#ecfdf5';
  }
  if (roleInput) roleInput.value = role;

  // Masquer le champ supermarché pour Caissier et Livreur
  var estPersonnel = (role === 'Caissier(e)' || role === 'Livreur');
  if (smWrap) smWrap.style.display = estPersonnel ? 'none' : 'block';
}

function utiliserCode(code) {
  var c = CODES_INVITATION.find(function(c) { return c.code.toUpperCase() === code.toUpperCase(); });
  if (c) { c.usages++; if (c.usages >= c.maxUsages) c.actif = false; saveCodesInvitation(); }
}

// ── URL Backend Railway ──
var BACKEND = 'https://supermarche-cm-backend-production.up.railway.app';


// ── Toggle Sidebar Mobile ──
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  var burger  = document.getElementById('burgerBtn');
  if (!sidebar) return;
  var isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    overlay && overlay.classList.remove('show');
    burger  && burger.classList.remove('open');
  } else {
    sidebar.classList.add('open');
    overlay && overlay.classList.add('show');
    burger  && burger.classList.add('open');
  }
}

// Fermer sidebar quand on navigue sur mobile
function closeSidebarMobile() {
  if (window.innerWidth <= 768) {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    var burger  = document.getElementById('burgerBtn');
    sidebar && sidebar.classList.remove('open');
    overlay && overlay.classList.remove('show');
    burger  && burger.classList.remove('open');
  }
}

var ACCOUNTS = [
  {email:'lembetiny02@gmail.com', pwd:'Douala@2026#Carlos', nom:'NGAPET LEMBE', prenom:'Carlos', role:'administrateur', sm:'SuperMarché CM'}
];
// Recharger les comptes inscrits depuis localStorage
(function() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_accounts') || 'null');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      var adminEmail = 'lembetiny02@gmail.com';
      saved.forEach(function(acc) {
        if (acc.email && acc.email.toLowerCase() !== adminEmail.toLowerCase()) {
          if (!ACCOUNTS.find(function(a){ return a.email.toLowerCase() === acc.email.toLowerCase(); })) {
            ACCOUNTS.push(acc);
          }
        }
      });
    }
  } catch(e) {}
})();
var currentUser = null;

// Démo désactivée pour des raisons de sécurité
function doDemo() { alert("Accès refusé. Veuillez vous connecter avec vos identifiants."); }

// Vider le cache Service Worker et recharger la page
function viderCache() {
  if ('caches' in window) {
    caches.keys().then(function(names) {
      Promise.all(names.map(function(n){ return caches.delete(n); })).then(function(){
        if (navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations().then(function(regs){
            Promise.all(regs.map(function(r){ return r.unregister(); })).then(function(){
              window.location.reload(true);
            });
          });
        } else {
          window.location.reload(true);
        }
      });
    });
  } else {
    window.location.reload(true);
  }
}

function showScreen(name) {
  document.getElementById('screen-login').classList.toggle('hidden', name !== 'login');
  document.getElementById('screen-register').classList.toggle('hidden', name !== 'register');
}

function doLogin() {
  // Nettoyer les espaces avant/après (problème fréquent sur mobile)
  var email = (document.getElementById('l-email').value || '').trim().toLowerCase();
  var pwd   = (document.getElementById('l-pwd').value || '').trim();
  var errEl = document.getElementById('login-err');
  errEl.classList.remove('show');

  if (!email) { showErr(errEl, 'Entrez votre email.'); return; }
  if (!pwd)   { showErr(errEl, 'Entrez votre mot de passe.'); return; }

  // Chercher le compte (insensible à la casse pour l'email)
  var acc = ACCOUNTS.find(function(a){
    return a.email.trim().toLowerCase() === email;
  });

  if (!acc) {
    showErr(errEl, 'Email non reconnu. Vérifiez : ' + ACCOUNTS[0].email);
    return;
  }

  // Vérifier mot de passe (sensible à la casse)
  if (acc.pwd.trim() !== pwd) {
    showErr(errEl, 'Mot de passe incorrect. Vérifiez les majuscules, chiffres et caractères spéciaux.');
    return;
  }

  currentUser = acc;
  loginSuccess(acc);
}


function doRegister() {
  var code   = (val('r-code') || '').trim().toUpperCase();
  var prenom = val('r-prenom'), nom = val('r-nom'), email = val('r-email');
  var tel = val('r-tel'), sm = val('r-sm'), ville = val('r-ville');
  var pwd = val('r-pwd'), pwd2 = val('r-pwd2');
  var cgu = document.getElementById('r-cgu');
  var errEl = document.getElementById('reg-err'), sucEl = document.getElementById('reg-suc');
  errEl.classList.remove('show'); sucEl.classList.remove('show');

  // Vérifier le code d'invitation EN PREMIER
  if (!code) { showErr(errEl, 'Code d\'invitation requis. Contactez l\'administrateur.'); return; }
  var codeValide = verifierCodeInvitation(code);
  if (!codeValide) { showErr(errEl, 'Code invalide, expiré ou déjà utilisé au maximum. Demandez un nouveau code.'); return; }

  if (!prenom || !nom) { showErr(errEl, 'Prénom et nom requis.'); return; }
  if (!email || !email.includes('@')) { showErr(errEl, 'Adresse e-mail invalide.'); return; }

  // Le supermarché est obligatoire seulement pour gérant/directeur/propriétaire
  var estPersonnel = (codeValide.role === 'Caissier(e)' || codeValide.role === 'Livreur');
  if (!estPersonnel && !sm) { showErr(errEl, 'Entrez le nom de votre supermarché.'); return; }
  if (!ville) { showErr(errEl, 'Sélectionnez votre ville.'); return; }
  if (pwd.length < 8) { showErr(errEl, 'Mot de passe trop court (8 caractères minimum).'); return; }
  if (pwd !== pwd2) { showErr(errEl, 'Les mots de passe ne correspondent pas.'); return; }
  if (!cgu || !cgu.checked) { showErr(errEl, "Acceptez les conditions d'utilisation."); return; }
  if (ACCOUNTS.find(function(a){ return a.email.toLowerCase() === email.toLowerCase(); })) { showErr(errEl, 'Un compte existe déjà avec cet e-mail.'); return; }

  // Créer le compte avec le rôle du code
  var smLabel = estPersonnel ? ('Employé — ' + ville) : (sm + ' — ' + ville);
  var newAcc = {email:email, pwd:pwd, nom:nom.toUpperCase(), prenom:prenom, role:codeValide.role, sm:smLabel};
  ACCOUNTS.push(newAcc);

  // Sauvegarder le nouveau compte pour qu'il persiste après rechargement
  try { localStorage.setItem('sm_accounts', JSON.stringify(ACCOUNTS)); } catch(e) {}
  utiliserCode(code);

  // Notifier l'admin
  addNotif('Nouveau gérant inscrit : ' + prenom + ' ' + nom.toUpperCase() + ' (' + codeValide.role + ' — ' + sm + ')', 'blue');

  sucEl.textContent = 'Compte créé avec succès ! Connexion en cours...';
  sucEl.classList.add('show');
  setTimeout(function(){ currentUser = newAcc; loginSuccess(newAcc); }, 1200);
}

function loginSuccess(acc) {
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('screen-register').classList.add('hidden');
  document.getElementById('app').classList.add('show');

  // Assigner le role administrateur si c'est l'email admin
  if (acc.email && acc.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    acc.role = 'administrateur';
  }

  // ── Normaliser le rôle (codes invitations créent des rôles avec accents/majuscules) ──
  var roleMap = {
    'gérant(e)': 'gerant', 'gerant(e)': 'gerant', 'gérant': 'gerant', 'gerant': 'gerant',
    'directeur(trice)': 'gerant', 'directeur': 'gerant',
    'propriétaire': 'gerant', 'proprietaire': 'gerant',
    'admin': 'administrateur', 'administrateur': 'administrateur',
    'caissier(e)': 'caissier', 'caissier': 'caissier', 'caissière': 'caissier',
    'livreur': 'livreur', 'livreuse': 'livreur'
  };
  if (acc.role) {
    var roleNorm = roleMap[acc.role.toLowerCase().trim()];
    if (roleNorm) acc.role = roleNorm;
  }
  if (!acc.role) acc.role = 'gerant';

  // Mettre a jour currentUser avec le role
  currentUser = acc;
  USERS.currentUser = acc;

  // Afficher initiales, nom et email dans la sidebar
  var initials = ((acc.prenom||'')[0]||(acc.nom||'')[0]||acc.email[0]).toUpperCase();
  var ava    = document.getElementById('user-ava');
  var uname  = document.getElementById('user-name');
  var uemail = document.getElementById('user-email');
  if (ava)    ava.textContent    = initials || 'U';
  if (uname)  uname.textContent  = (acc.prenom && acc.nom) ? acc.prenom + ' ' + acc.nom : acc.nom || acc.email.split('@')[0];
  if (uemail) uemail.textContent = acc.email;

  // Afficher le badge de role dans la sidebar
  var roleBadgeEl = document.getElementById('user-role-badge');
  if (roleBadgeEl) roleBadgeEl.innerHTML = getRoleBadge(acc.role);

  toast('Bienvenue ' + (acc.prenom || acc.nom || '') + ' !', 'success');

  // Appliquer les restrictions de navigation selon le role
  setTimeout(function(){
    applyRoleRestrictions();
  }, 100);

  // Charger toutes les donnees dynamiques au login
  setTimeout(function(){
    chargerNotifsClients();
    renderNotifs();
    renderDashboard();
    initEmployes();
    initFournisseurs();
    initCodesInvitation();
    renderVentes();
    chargerProduitsGerant(); // charger les produits depuis Supabase
  }, 600);
}

async function chargerProduitsGerant() {
  try {
    var sb = _sbMain();
    if (!sb) return;
    var res = await sb.from('produits').select('*').order('created_at', { ascending: true });
    if (res.data && res.data.length > 0) {
      PRODS = res.data;
      renderProds();
      renderCat();
      console.log('[Produits] ' + PRODS.length + ' produits charges depuis Supabase');
    }
  } catch(e) { console.warn('[Produits] chargement Supabase:', e); }
}

function doLogout() {
  currentUser = null;
  document.getElementById('app').classList.remove('show');
  document.getElementById('screen-login').classList.remove('hidden');
  document.getElementById('screen-register').classList.add('hidden');
  document.getElementById('l-email').value = '';
  document.getElementById('l-pwd').value = '';
  document.getElementById('login-err').classList.remove('show');
  PANIER = []; updatePanierUI();
  toast('Déconnexion réussie. À bientôt !', 'success');
}

function showErr(el, msg) { el.textContent = msg; el.classList.add('show'); }
function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

function checkPwd(v) {
  var fill = document.getElementById('pw-fill'), lbl = document.getElementById('pw-lbl');
  if (!fill||!lbl) return;
  var score = 0;
  if (v.length >= 8) score++; if (/[A-Z]/.test(v)) score++; if (/[0-9]/.test(v)) score++; if (/[^A-Za-z0-9]/.test(v)) score++;
  var colors = ['#ccc','var(--r)','#F77737','var(--y)','var(--g)'];
  var labels = ['Entrez un mot de passe','Trop court','Faible','Moyen','Fort'];
  fill.style.width = (score/4*100)+'%'; fill.style.background = colors[score]||colors[4];
  lbl.textContent = v.length===0 ? 'Entrez un mot de passe' : (labels[score]||'Très fort');
  lbl.style.color = colors[score]||colors[4];
}

// ═══════════════ NAVIGATION ═══════════════
var TITLES = {
  dashboard:'Tableau de bord', supermarches:'Supermarchés', produits:'Produits & Stock',
  achats:'Achats', commandes:'Commandes', ventes:'Ventes & Caisse',
  employes:'Employés', fournisseurs:'Fournisseurs', rapports:'Rapports',
  ia:'Assistant IA', parametres:'Paramètres',
  reseaux:'Réseaux Sociaux', livraison:'Conditions de Livraison',
  confidentialite:'Politique de Confidentialité', faq:'FAQ & Centre d\'aide'
};

function goPage(p) {
  // Verifier les permissions avant de naviguer
  if (currentUser && typeof hasPermission === 'function') {
    if (!hasPermission(p)) {
      toast('Acces refuse. Vous n\'avez pas les droits pour cette section.', 'error');
      return;
    }
  }
  document.querySelectorAll('.page').forEach(function(x){ x.classList.remove('active'); });
  document.querySelectorAll('.nv').forEach(function(x){ x.classList.remove('active'); });
  var el = document.getElementById('page-'+p); if (el) el.classList.add('active');
  var ttl = document.getElementById('page-title'); if (ttl) ttl.textContent = TITLES[p]||p;
  document.querySelectorAll('.nv').forEach(function(n){
    if (n.getAttribute('onclick')&&n.getAttribute('onclick').indexOf("'"+p+"'")>-1) n.classList.add('active');
  });
  if (p==='supermarches') { renderStores(); refreshAllSMSelects(); }
  if (p==='achats') renderCat();
  if (p==='commandes') renderCmds();
  if (p==='produits') renderProds();
  if (p==='ia') { updateAIStats(); if (AI_MSGS.length===0) showWelcomeMsg(); }
  if (p==='dashboard')   { renderDashboard(); }
  if (p==='employes')    { renderEmployes(); }
  if (p==='fournisseurs'){ renderFournisseurs(); }
  if (p==='rapports')    { renderRapports(); }
  if (p==='invitations') { renderCodesInvitation(); renderGerants(); }
  if (p==='ventes')      { renderVentes(); }
  if (p==='reseaux')     { renderReseaux(); }
  if (p==='faq') renderFaq();
  if (p==='rapports') { var e=document.getElementById('rpt-c'); if(e) e.textContent=CMDS.filter(function(c){return['en_attente','confirmee','livraison'].includes(c.statut);}).length; }
  if (p==='livreurs') {
    if (typeof renderLivreurs === 'function') renderLivreurs();
  }
  if (p==='livraisons-admin')    { renderLivraisons(); }
  if (p==='livraisons-livreur')  { if (typeof renderVueLivreur === 'function') renderVueLivreur(); }
  if (p==='promotions')     { if (typeof renderPromos === 'function') renderPromos(); }
  if (p==='fidelite')       { if (typeof renderFideliteClients === 'function') renderFideliteClients(); }
  if (p==='retours')        { if (typeof renderRetours === 'function') renderRetours(); }
  if (p==='stats-clients')  { if (typeof renderStatsClients === 'function') renderStatsClients(); }
  if (p==='utilisateurs')   { renderUtilisateurs(); }
  if (p==='parametres')     { chargerConfig(); initConfigLivePreview(); }
}


// ── Générer et charger toutes les notifications réelles ──
function chargerNotifsClients() {
  try {
    // 1. Notifications boutique (nouveaux clients, commandes, avis)
    var notifsAdmin = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');
    var nonLues = notifsAdmin.filter(function(n){ return !n.lu; });
    nonLues.forEach(function(n) {
      addNotif(n.msg, n.couleur || 'blue');
      n.lu = true;
    });
    if (nonLues.length > 0) localStorage.setItem('sm_notifs_admin', JSON.stringify(notifsAdmin));

    // 2. Ruptures de stock réelles
    if (typeof PRODS !== 'undefined') {
      PRODS.forEach(function(p) {
        if (p.stock === 0) {
          addNotif('🔴 Rupture de stock : ' + p.nom, 'red');
        } else if (p.stock > 0 && p.stock < 10) {
          addNotif('🟡 Stock critique : ' + p.nom + ' — ' + p.stock + ' unité(s)', 'yellow');
        }
      });
    }

    // 3. Commandes en attente
    if (typeof CMDS !== 'undefined') {
      var enAttente = CMDS.filter(function(c){ return c.statut === 'en_attente'; });
      if (enAttente.length > 0) {
        addNotif('🛒 ' + enAttente.length + ' commande(s) en attente de confirmation', 'yellow');
      }
    }

    // 4. Nouveaux clients boutique
    var clients = JSON.parse(localStorage.getItem('sm_clients') || '[]');
    var totalClients = clients.length;
    if (totalClients > 0) {
      var elClients = document.getElementById('stat-clients');
      if (elClients) elClients.textContent = totalClients;
      // Notifier nouveaux clients (inscrits aujourd\'hui)
      var today = new Date().toLocaleDateString('fr-FR');
      var nouveaux = clients.filter(function(c){ return c.date === today; });
      if (nouveaux.length > 0) {
        addNotif('👤 ' + nouveaux.length + ' nouveau(x) client(s) aujourd\'hui', 'green');
      }
    }

    // 5. Avis clients non lus
    var avis = JSON.parse(localStorage.getItem('sm_avis') || '[]');
    var avisNonLus = avis.filter(function(a){ return !a.lu; });
    if (avisNonLus.length > 0) {
      addNotif('⭐ ' + avisNonLus.length + ' nouvel(s) avis client(s) sur les produits', 'blue');
      // Marquer comme lus
      avis.forEach(function(a){ a.lu = true; });
      localStorage.setItem('sm_avis', JSON.stringify(avis));
    }

    // 6. Points fidélité échangés
    var fidelite = JSON.parse(localStorage.getItem('sm_fidelite') || 'null');
    if (fidelite && fidelite.echanges_recents && fidelite.echanges_recents > 0) {
      addNotif('🎁 ' + fidelite.echanges_recents + ' point(s) fidélité échangé(s)', 'green');
      fidelite.echanges_recents = 0;
      localStorage.setItem('sm_fidelite', JSON.stringify(fidelite));
    }

    // 7. Livreurs disponibles
    if (typeof LIVREURS_DATA !== 'undefined' && LIVREURS_DATA.liste) {
      var dispo = LIVREURS_DATA.liste.filter(function(l){ return l.statut === 'disponible' && l.actif; });
      if (dispo.length === 0 && LIVREURS_DATA.liste.length > 0) {
        addNotif('⚠️ Aucun livreur disponible en ce moment', 'red');
      }
    }

    renderNotifs();
  } catch(e) { console.warn('chargerNotifsClients:', e); }
}


// ── Toggle afficher/masquer mot de passe ──
function togglePwd(inputId, btn) {
  var input = document.getElementById(inputId);
  if (!input) return;
  var isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  var svgOuvert = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  var svgFerme  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

  btn.innerHTML   = isHidden ? svgFerme : svgOuvert;
  btn.style.color = isHidden ? '#007A3D' : '#aaa';

  // Afficher l'indicateur "mot de passe visible" uniquement sur le login
  if (inputId === 'l-pwd') {
    var hint = document.getElementById('pwd-visible-hint');
    if (hint) hint.style.display = isHidden ? 'block' : 'none';
  }
  input.focus();
}

// ═══════════════ TOAST ═══════════════
function toast(msg, type) {
  type = type||'success';
  var icons = {success:'<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">', error:'<img src="https://img.icons8.com/ios/18/CE1126/delete-sign.png" alt="non" style="width:14px;height:14px;vertical-align:middle">', warning:'!'};
  var w = document.getElementById('tw2'); if (!w) return;
  var el = document.createElement('div'); el.className = 'tst '+type;
  el.innerHTML = '<span class="tst-ico">'+icons[type]+'</span> '+msg;
  w.appendChild(el);
  setTimeout(function(){ el.style.opacity='0'; el.style.transform='translateY(14px)'; el.style.transition='all .3s'; setTimeout(function(){ el.remove(); },300); }, 3500);
}

// ═══════════════ MODAL ═══════════════
function openM(id) { document.getElementById(id).classList.add('open'); }
function closeM(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', function(e){ if (e.target&&e.target.classList.contains('mo')) e.target.classList.remove('open'); });

// ═══════════════ NOTIFS ═══════════════
function toggleNotif() { document.getElementById('nov').classList.toggle('open'); document.getElementById('nbg2').classList.toggle('open'); }
function closeNotif() { document.getElementById('nov').classList.remove('open'); document.getElementById('nbg2').classList.remove('open'); }
function markRead() {
  try {
    var notifs = JSON.parse(localStorage.getItem('sm_notifs_live') || '[]');
    notifs.forEach(function(n){ n.lu = true; });
    localStorage.setItem('sm_notifs_live', JSON.stringify(notifs));
    // Aussi marquer notifs clients
    var nc = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');
    nc.forEach(function(n){ n.lu = true; });
    localStorage.setItem('sm_notifs_admin', JSON.stringify(nc));
  } catch(e) {}
  renderNotifs();
  toast('Toutes les notifications lues', 'success');
}
function addNotif(msg, type, icone) {
  // Sauvegarder dans localStorage
  try {
    var notifs = JSON.parse(localStorage.getItem('sm_notifs_live') || '[]');
    notifs.unshift({
      msg:   msg,
      type:  type || 'green',
      icone: icone || '',
      date:  new Date().toISOString(),
      lu:    false
    });
    // Garder max 50 notifications
    if (notifs.length > 50) notifs = notifs.slice(0, 50);
    localStorage.setItem('sm_notifs_live', JSON.stringify(notifs));
  } catch(e) {}
  renderNotifs();
}

function tempsRelatif(dateStr) {
  try {
    var diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60)   return 'À l\'instant';
    if (diff < 3600) return 'Il y a ' + Math.floor(diff/60) + ' min';
    if (diff < 86400)return 'Il y a ' + Math.floor(diff/3600) + 'h';
    return 'Il y a ' + Math.floor(diff/86400) + ' jour(s)';
  } catch(e) { return ''; }
}

function renderNotifs() {
  var nl = document.getElementById('nlist');
  if (!nl) return;

  var typeColors = { green:'#007A3D', red:'#ef4444', yellow:'#f59e0b', blue:'#3b82f6' };
  var typeIcones = {
    green:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007A3D" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    red:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    yellow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    blue:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  };

  try {
    // Fusionner notifs live + notifs clients boutique
    var notifs = JSON.parse(localStorage.getItem('sm_notifs_live') || '[]');
    var notifsClients = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');

    // Ajouter les notifs clients non encore dans live
    notifsClients.forEach(function(nc) {
      var existe = notifs.find(function(n){ return n.msg === nc.msg; });
      if (!existe) {
        notifs.push({ msg: nc.msg, type: 'blue', icone: '', date: new Date(nc.date || Date.now()).toISOString(), lu: nc.lu || false });
      }
    });

    // Trier par date décroissante
    notifs.sort(function(a,b){ return new Date(b.date) - new Date(a.date); });

    var nonLues = notifs.filter(function(n){ return !n.lu; }).length;
    var dot = document.getElementById('ndot');
    if (dot) { dot.style.display = nonLues > 0 ? '' : 'none'; dot.textContent = nonLues > 9 ? '9+' : nonLues; }

    if (notifs.length === 0) {
      nl.innerHTML = '<p style="color:#999;text-align:center;padding:30px;font-size:13px">Aucune notification</p>';
      return;
    }

    nl.innerHTML = notifs.map(function(n, i) {
      var icone = typeIcones[n.type] || typeIcones.green;
      var bg = n.lu ? '' : 'background:#f0faf5;';
      return '<div class="ni' + (n.lu ? '' : ' unread') + '" style="' + bg + 'cursor:pointer" onclick="marquerLue(' + i + ')">'
        + '<div class="nico" style="background:' + (n.lu ? '#f5f5f5' : '#e8f5ef') + ';display:flex;align-items:center;justify-content:center;border-radius:50%;width:40px;height:40px;flex-shrink:0">' + icone + '</div>'
        + '<div class="ntxt"><p style="margin:0;font-size:13px;font-weight:' + (n.lu ? '400' : '600') + ';color:#333">' + n.msg + '</p>'
        + '<span style="font-size:11px;color:#999">' + tempsRelatif(n.date) + '</span></div>'
        + (n.lu ? '' : '<div class="ndtxt" style="width:8px;height:8px;background:#007A3D;border-radius:50%;flex-shrink:0;margin-top:6px"></div>')
        + '</div>';
    }).join('');
  } catch(e) {
    nl.innerHTML = '<p style="color:#999;text-align:center;padding:20px;font-size:13px">Erreur chargement</p>';
  }
}

function marquerLue(index) {
  try {
    var notifs = JSON.parse(localStorage.getItem('sm_notifs_live') || '[]');
    if (notifs[index]) { notifs[index].lu = true; localStorage.setItem('sm_notifs_live', JSON.stringify(notifs)); }
    renderNotifs();
  } catch(e) {}
}

// ═══════════════ DARK MODE ═══════════════
var dark = false;
function toggleDark() {
  dark = !dark;
  var r = document.documentElement.style;
  r.setProperty('--bg', dark?'#0F1A12':'#F5F7F2'); r.setProperty('--tx', dark?'#E8F5EF':'#1A2A1A');
  r.setProperty('--br', dark?'#1E3A24':'#D8E8D8'); r.setProperty('--mu', dark?'#6B9B7B':'#6B7B6B');
  document.querySelectorAll('.cd,.sc,.smi,.acd,.cmdcd,.pp,.np,.ai-chat,.ai-topics,.ai-stats,.mdl,.ls,.faq-item,.dv,.social-card,.ss-card').forEach(function(el){ el.style.background = dark?'#162B1A':''; });
  toast(dark?'Mode sombre activé':'Mode clair activé', 'success');
}

// ═══════════════ MINI-BARS ═══════════════
function makeBars(id, vals, clrFn) {
  var el = document.getElementById(id); if (!el) return;
  var mx = Math.max.apply(null,vals)||1;
  el.innerHTML = vals.map(function(v,i){ var h=Math.round((v/mx)*100); return '<div class="mbar" style="height:'+h+'%;background:'+(clrFn?clrFn(i,v):'var(--g)')+'"></div>'; }).join('');
}

// ═══════════════ DONNÉES PRODUITS (avec vraies images) ═══════════════
// Charger stocks depuis localStorage si disponible
var PRODS = [
  { id:1, nom:'Riz parfumé 25kg', cat:'Alimentation', prix:18500, stock:87, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop' }, { id:2, nom:'Huile palme 5L', cat:'Alimentation', prix:6800, stock:3, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&h=120&fit=crop' }, { id:3, nom:'Sucre cristal 1kg', cat:'Alimentation', prix:850, stock:15, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1581996322890-f59ee5f254c0?w=120&h=120&fit=crop' }, { id:4, nom:'Farine de blé 5kg', cat:'Alimentation', prix:4200, stock:42, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop' }, { id:5, nom:'Lait Dano 400g', cat:'Laitiers', prix:3200, stock:8, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop' }, { id:6, nom:'Yaourt Camlait 500g', cat:'Laitiers', prix:1200, stock:34, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=120&h=120&fit=crop' }, { id:7, nom:'Coca-Cola 1.5L', cat:'Boissons', prix:950, stock:120, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=120&h=120&fit=crop' }, { id:8, nom:'Eau minérale Supermont', cat:'Boissons', prix:400, stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=120&fit=crop' }, { id:9, nom:'Bière Castel 65cl', cat:'Boissons', prix:800, stock:60, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=120&h=120&fit=crop' }, { id:10, nom:'Jus Rani Mangue 1L', cat:'Boissons', prix:1500, stock:45, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=120&h=120&fit=crop' }, { id:11, nom:'Savon Omo 1kg', cat:'Hygiène', prix:2800, stock:78, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=120&h=120&fit=crop' }, { id:12, nom:'Dentifrice Signal 75ml', cat:'Hygiène', prix:950, stock:55, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1559591935-c0cfe8c7e6b8?w=120&h=120&fit=crop' }, { id:13, nom:'Pain de mie 500g', cat:'Boulangerie', prix:1100, stock:30, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop' }, { id:14, nom:'Croissant beurre x6', cat:'Boulangerie', prix:2200, stock:18, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&h=120&fit=crop' }, { id:15, nom:'Shampoing Pantene 400ml', cat:'Beauté', prix:4500, stock:22, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=120&h=120&fit=crop' }, { id:16, nom:'Crème Nivea 400ml', cat:'Beauté', prix:3800, stock:40, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&h=120&fit=crop' }, { id:17, nom:'Sel iodé 1kg', cat:'Alimentation', prix:350, stock:90, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=120&h=120&fit=crop' }, { id:18, nom:'Poisson fumé 500g', cat:'Alimentation', prix:4500, stock:25, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=120&h=120&fit=crop' }, { id:19, nom:'Tomates fraîches 1kg', cat:'Alimentation', prix:800, stock:50, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=120&h=120&fit=crop' }, { id:20, nom:'Café Nescafé 200g', cat:'Boissons', prix:3200, stock:35, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=120&h=120&fit=crop' },
  { id:21, nom:'Crédit MTN Mobile Money 5 000F', cat:'Numérique', prix:5000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=120&fit=crop' }, { id:22, nom:'Crédit Orange Money 10 000F', cat:'Numérique', prix:10000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=120&fit=crop' }, { id:23, nom:'Abonnement Canal+ 1 mois', cat:'Numérique', prix:8500, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=120&h=120&fit=crop' }, { id:24, nom:'Carte Google Play 5 000F', cat:'Numérique', prix:5000, stock:50, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=120&h=120&fit=crop' }, { id:25, nom:'Forfait Internet MTN 10Go', cat:'Numérique', prix:3500, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' }, { id:26, nom:'Forfait Internet Orange 5Go', cat:'Numérique', prix:2000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop' }, { id:27, nom:'Abonnement Netflix 1 mois', cat:'Numérique', prix:6000, stock:30, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=120&h=120&fit=crop' }, { id:28, nom:'Antivirus Kaspersky 1 an', cat:'Numérique', prix:12000, stock:20, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=120&h=120&fit=crop' },
  { id:29, nom:'Samsung Galaxy A14 128Go', cat:'Téléphonie', prix:95000, stock:10, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=120&fit=crop' }, { id:30, nom:'Tecno Spark 20 Pro', cat:'Téléphonie', prix:75000, stock:15, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&h=120&fit=crop' }, { id:31, nom:'iPhone 13 128Go', cat:'Téléphonie', prix:450000, stock:5, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=120&h=120&fit=crop' }, { id:32, nom:'Infinix Hot 40i', cat:'Téléphonie', prix:55000, stock:20, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop' }, { id:33, nom:'Itel A70 64Go', cat:'Téléphonie', prix:35000, stock:25, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=120&h=120&fit=crop' },
  { id:34, nom:'Écouteurs Bluetooth TWS Pro', cat:'Accessoires', prix:8500, stock:40, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=120&fit=crop' }, { id:35, nom:'Chargeur Rapide 65W USB-C', cat:'Accessoires', prix:6500, stock:55, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=120&h=120&fit=crop' }, { id:36, nom:'Coque Silicone Samsung A14', cat:'Accessoires', prix:2500, stock:80, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=120&h=120&fit=crop' }, { id:37, nom:'Batterie externe 20 000mAh', cat:'Accessoires', prix:15000, stock:30, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=120&h=120&fit=crop' }, { id:38, nom:'Support téléphone voiture', cat:'Accessoires', prix:3500, stock:60, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=120&h=120&fit=crop' }, { id:39, nom:'Câble USB-C 2m tressé', cat:'Accessoires', prix:2000, stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=120&h=120&fit=crop' }, { id:40, nom:'Montre connectée Sport', cat:'Accessoires', prix:25000, stock:18, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop' },
  { id:41, nom:'Formation Création de Site Web', cat:'Formation Digitale', prix:50000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=120&h=120&fit=crop' }, { id:42, nom:'Formation Marketing Digital', cat:'Formation Digitale', prix:45000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=120&h=120&fit=crop' }, { id:43, nom:'Formation Graphisme Canva & Photoshop', cat:'Formation Digitale', prix:40000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=120&fit=crop' }, { id:44, nom:'Formation Vente en ligne', cat:'Formation Digitale', prix:35000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=120&fit=crop' }, { id:45, nom:'Formation Réseaux Sociaux Pro', cat:'Formation Digitale', prix:30000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=120&fit=crop' }, { id:46, nom:'Formation Excel & Google Sheets', cat:'Formation Digitale', prix:25000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=120&h=120&fit=crop' }, { id:47, nom:'Formation Montage Vidéo', cat:'Formation Digitale', prix:40000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=120&h=120&fit=crop' }, { id:48, nom:'Pack Complet Digital — 5 formations',cat:'Formation Digitale', prix:150000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=120&fit=crop' },
  { id:49, nom:'Cube Maggi x100', cat:'Condiments & Epices', prix:1500, stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1550411294-2f2e451e74a0?w=120&h=120&fit=crop' }, { id:50, nom:'Piment rouge séché 200g', cat:'Condiments & Epices', prix:800, stock:80, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=120&h=120&fit=crop' }, { id:51, nom:'Poivre noir moulu 100g', cat:'Condiments & Epices', prix:600, stock:60, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&h=120&fit=crop' }, { id:52, nom:'Gingembre en poudre 100g', cat:'Condiments & Epices', prix:500, stock:75, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=120&h=120&fit=crop' }, { id:53, nom:'Huile d\'arachide 1L', cat:'Condiments & Epices', prix:1800, stock:50, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&h=120&fit=crop' },
  { id:54, nom:'Couches Pampers taille 3 x40', cat:'Bebe & Maternite', prix:8500, stock:45, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1584515933487-779824d29309?w=120&h=120&fit=crop' }, { id:55, nom:'Lait maternisé Aptamil 400g', cat:'Bebe & Maternite', prix:7500, stock:30, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1584515933487-779824d29309?w=120&h=120&fit=crop' }, { id:56, nom:'Lingettes bébé x80', cat:'Bebe & Maternite', prix:2000, stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=120&h=120&fit=crop' }, { id:57, nom:'Crème bébé Johnson 200ml', cat:'Bebe & Maternite', prix:3500, stock:55, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&h=120&fit=crop' },
  { id:58, nom:'Casserole inox 5L', cat:'Articles Menagers', prix:12000, stock:20, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop' }, { id:59, nom:'Balai brosse avec seau', cat:'Articles Menagers', prix:4500, stock:35, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=120&h=120&fit=crop' }, { id:60, nom:'Assiettes creuses x6', cat:'Articles Menagers', prix:5500, stock:40, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=120&h=120&fit=crop' }, { id:61, nom:'Marmite aluminium 10L', cat:'Articles Menagers', prix:9000, stock:18, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop' },
  { id:62, nom:'Eau minérale Supermont 1.5L', cat:'Eau & Eau Minerale', prix:400, stock:500, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=120&fit=crop' }, { id:63, nom:'Eau minérale Tangui 1.5L', cat:'Eau & Eau Minerale', prix:400, stock:400, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=120&fit=crop' }, { id:64, nom:'Fontaine eau 20L Supermont', cat:'Eau & Eau Minerale', prix:2500, stock:80, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=120&fit=crop' }, { id:65, nom:'Pack eau 6x1.5L Tangui', cat:'Eau & Eau Minerale', prix:2200, stock:120, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=120&h=120&fit=crop' },
  { id:66, nom:'Thon en conserve 185g', cat:'Surgeles & Conserves', prix:1200, stock:150, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=120&h=120&fit=crop' }, { id:67, nom:'Sardines à la tomate x2', cat:'Surgeles & Conserves', prix:900, stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=120&h=120&fit=crop' }, { id:68, nom:'Petits pois en boite 400g', cat:'Surgeles & Conserves', prix:700, stock:90, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&h=120&fit=crop' }, { id:69, nom:'Poulet surgelé 1kg', cat:'Surgeles & Conserves', prix:4500, stock:40, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=120&h=120&fit=crop' },
  { id:70, nom:'Cahier 200 pages grand format', cat:'Papeterie & Fournitures', prix:1200, stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&h=120&fit=crop' }, { id:71, nom:'Stylos bille x10 Bic', cat:'Papeterie & Fournitures', prix:800, stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=120&h=120&fit=crop' }, { id:72, nom:'Règle 30cm + équerre', cat:'Papeterie & Fournitures', prix:500, stock:80, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=120&h=120&fit=crop' }, { id:73, nom:'Cartable scolaire', cat:'Papeterie & Fournitures', prix:8500, stock:25, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop' },
];
// Restaurer stocks sauvegardés
(function() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_prods') || 'null');
    if (saved && Array.isArray(saved)) {
      saved.forEach(function(sp) {
        var p = PRODS.find(function(x){ return x.id === sp.id; });
        if (p) p.stock = sp.stock;
      });
    }
  } catch(e) {}
})();



var CMDS = [
  {id:'CMD-004',date:'27/02/2025 16:20',client:'Sylvie Ngo Biyong',tel:'+237 656 777 888',sm:'SuperMarché CM',pay:'Virement',statut:'confirmee',type:'achat',items:[{nom:'Eau minérale 1.5L',img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=40&h=40&fit=crop',qty:12,prix:400},{nom:'Savon Omo 1kg',img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=40&h=40&fit=crop',qty:3,prix:1500}],total:9300,notes:''},
];


// ═══════════════ SUPERMARCHÉS ═══════════════
var STORES = [
  { id:1, nom:'SuperMarché CM', ville:'Douala', adresse:'Bepanda Casimando, Douala', gerant:'NGAPET LEMBE Carlos', tel:'+237 693 59 14 79', statut:'ouvert', ca:'0', employes:0, img:'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&h=200&fit=crop' },
];
var smSeq = 5;

// Retourne la liste des noms pour les <select>
function getStoreNames() {
  return STORES.map(function(s){ return s.nom; });
}

// Remplit tous les <select> qui ont l'attribut data-sm-select
function refreshAllSMSelects() {
  var selects = document.querySelectorAll('[data-sm-select]');
  selects.forEach(function(sel) {
    var current = sel.value;
    sel.innerHTML = STORES.map(function(s){
      return '<option value="'+s.nom+'"'+(s.nom===current?' selected':'')+'>'+s.nom+'</option>';
    }).join('');
  });
}

// Calcule le CA réel d'un supermarché depuis les commandes livrées
function calculerCA(nomSM) {
  var total = CMDS.filter(function(c){
    return c.statut === 'livree' && (c.sm === nomSM || c.supermarche === nomSM);
  }).reduce(function(s, c){ return s + (c.total || 0); }, 0);
  if (total === 0) return '0';
  if (total >= 1000000) return (total/1000000).toFixed(1) + 'M';
  if (total >= 1000) return (total/1000).toFixed(0) + 'K';
  return total.toLocaleString('fr-FR');
}

// Rendu de la liste des supermarchés
function renderStores() {
  var list = document.getElementById('sml');
  if (!list) return;
  list.innerHTML = STORES.map(function(s){
    var stCls = s.statut==='ouvert' ? 'bgg' : s.statut==='maintenance' ? 'bgy' : 'bgr';
    var stLbl = s.statut==='ouvert' ? 'Ouvert' : s.statut==='maintenance' ? 'Maintenance' : 'Fermé';
    return '<div class="smi" id="smi-'+s.id+'">' +
      '<img src="'+s.img+'" class="sma" alt="'+s.nom+'">' +
      '<div class="sminf">' +
        '<h4>'+s.nom+'</h4>' +
        '<p>'+s.adresse+' — '+s.gerant+'</p>' +
        '<p style="font-size:11px;color:var(--mu)">'+s.tel+'</p>' +
        '<span class="badge '+stCls+'">'+stLbl+'</span>' +
      '</div>' +
      '<div class="smst">' +
        '<div><div class="smv">'+calculerCA(s.nom)+'</div><div class="smlb">CA FCFA</div></div>' +
        '<div><div class="smv">'+s.employes+'</div><div class="smlb">Employés</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:6px;margin-top:8px">' +
        '<button class="btn bo bsm" onclick="editSM('+s.id+')">Modifier</button>' +
        '<button class="btn bd bsm" onclick="supprimerSM('+s.id+')">Supprimer</button>' +
      '</div>' +
    '</div>';
  }).join('');

  // Mettre à jour le badge nb supermarchés dans le dashboard
  var nb = document.getElementById('nb-sm');
  if (nb) nb.textContent = STORES.length;
}

async function ajouterSM() {
  var nom     = val('sm-n'); if (!nom) { toast('Entrez le nom du supermarché', 'warning'); return; }
  var ville   = document.getElementById('sm-v').value;
  var adresse = val('sm-a') || '';
  var gerant  = val('sm-g') || '';
  var tel     = val('sm-t') || '';
  var statut  = document.getElementById('sm-st').value || 'ouvert';
  var img     = val('sm-img') || 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&h=200&fit=crop';
  var empVal  = parseInt((document.getElementById('sm-emp')||{}).value) || 0;
  var store = { nom:nom, ville:ville, adresse:adresse, gerant:gerant, tel:tel, statut:statut, ca:'0', employes:empVal, img:img, created_at: new Date().toISOString() };
  try {
    var sb = _sbMain();
    if (sb) {
      var res = await sb.from('supermarchés').insert(store).select().single();
      if (res.data) store = res.data;
    } else { store.id = smSeq++; }
  } catch(e) { console.warn('[Stores] ajouter:', e); store.id = smSeq++; }
  STORES.push(store);
  renderStores(); refreshAllSMSelects(); closeM('m-sm');
  toast('Supermarché "' + nom + '" ajouté !', 'success');
  addNotif('Nouveau supermarché : ' + nom, 'green');
  ['sm-n','sm-a','sm-g','sm-t','sm-img'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
}

function editSM(id) {
  var s = STORES.find(function(x){ return x.id===id; }); if (!s) return;
  // Pré-remplir le formulaire
  var n=document.getElementById('sm-n'), v=document.getElementById('sm-v'),
      a=document.getElementById('sm-a'), g=document.getElementById('sm-g'),
      t=document.getElementById('sm-t'), st=document.getElementById('sm-st'),
      img=document.getElementById('sm-img');
  var emp = document.getElementById('sm-emp');
  if(n) n.value=s.nom; if(v) v.value=s.ville; if(a) a.value=s.adresse;
  if(g) g.value=s.gerant; if(t) t.value=s.tel; if(st) st.value=s.statut;
  if(img) img.value=s.img;
  if(emp) emp.value=s.employes||0;
  // Changer le bouton pour "Modifier"
  var btn = document.getElementById('sm-save-btn');
  if (btn) { btn.textContent='Enregistrer modifications'; btn.onclick=function(){ saveSM(id); }; }
  var mh = document.querySelector('#m-sm .mh h3');
  if (mh) mh.textContent = 'Modifier le supermarché';
  openM('m-sm');
}

async function saveSM(id) {
  var s = STORES.find(function(x){ return x.id==id; }); if (!s) return;
  s.nom     = val('sm-n') || s.nom;
  s.ville   = document.getElementById('sm-v').value;
  s.adresse = val('sm-a') || s.adresse;
  s.gerant  = val('sm-g') || s.gerant;
  s.tel     = val('sm-t') || s.tel;
  s.statut  = document.getElementById('sm-st').value;
  s.img     = val('sm-img') || s.img;
  var empEl = document.getElementById('sm-emp');
  if (empEl && empEl.value !== '') s.employes = parseInt(empEl.value) || 0;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('supermarchés').update({ nom:s.nom, ville:s.ville, adresse:s.adresse, gerant:s.gerant, tel:s.tel, statut:s.statut, img:s.img, employes:s.employes }).eq('id', id);
  } catch(e) { console.warn('[Stores] save:', e); }
  renderStores(); refreshAllSMSelects();
renderUsers();
renderPromos();
renderFideliteClients();
renderLivraisons();
if(typeof renderLivreurs==="function") renderLivreurs();
renderRetours();
renderStatsClients();
renderVueLivreur();
applyRoleRestrictions();
initConfigLivePreview(); closeM('m-sm');
  toast('Supermarché modifié !', 'success');
  // Réinitialiser le bouton
  var btn = document.getElementById('sm-save-btn');
  if (btn) { btn.textContent='Ajouter'; btn.onclick=ajouterSM; }
  var mh = document.querySelector('#m-sm .mh h3');
  if (mh) mh.textContent = 'Nouveau supermarché';
}

async function supprimerSM(id) {
  var s = STORES.find(function(x){ return x.id==id; }); if (!s) return;
  if (!confirm('Supprimer "'+s.nom+'" ? Cette action est irréversible.')) return;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('supermarchés').delete().eq('id', id);
  } catch(e) { console.warn('[Stores] supprimer:', e); }
  STORES = STORES.filter(function(x){ return x.id != id; });
  renderStores(); refreshAllSMSelects();
renderUsers();
renderPromos();
renderFideliteClients();
renderLivraisons();
if(typeof renderLivreurs==="function") renderLivreurs();
renderRetours();
renderStatsClients();
renderVueLivreur();
applyRoleRestrictions();
initConfigLivePreview();
  toast('Supermarché supprimé', 'error');
}

async function chargerStoresLocalStorage() {
  try {
    var sb = _sbMain();
    if (sb) {
      var res = await sb.from('supermarchés').select('*').order('created_at', { ascending: true });
      if (res.data && res.data.length > 0) {
        STORES = res.data;
        return;
      }
    }
  } catch(e) { console.warn('[Stores] charger:', e); }
  // fallback localStorage
  try {
    var stored = JSON.parse(localStorage.getItem('sm_stores') || 'null');
    if (stored && stored.length > 0) { STORES = stored; }
  } catch(e) {}
}

var PANIER = [];
var cSeq = 5, cFilter = '';

// ═══════════════ PRODUITS ═══════════════
function fmt(n) { return n.toLocaleString('fr-FR')+' FCFA'; }

function renderProds() {
  var tb = document.getElementById('prod-tbody'); if (!tb) return;
  tb.innerHTML = PRODS.map(function(p){
    var scls = p.stock===0?'bgr':p.stock<10?'bgy':'bgg';
    var slbl = p.stock===0?'Rupture':p.stock<10?'Critique':'En stock';
    var col = p.stock===0?'var(--r)':p.stock<10?'#B8860B':'var(--tx)';
    var btn = '<div style="display:flex;gap:4px">' + (p.stock<10 ? '<button class="btn bp bsm" onclick="reappro('+p.id+')">Réappro</button>' : '') + '<button class="btn bo bsm" onclick="editProd('+p.id+')">Modifier</button><button class="btn bd bsm" onclick="supprimerProd('+p.id+')">Supprimer</button></div>';
    return '<tr><td><div style="display:flex;align-items:center;gap:9px"><img src="'+p.img+'" alt="'+p.nom+'" style="width:36px;height:36px;border-radius:7px;object-fit:cover;flex-shrink:0"> <span>'+p.nom+'</span></div></td><td>'+p.cat+'</td><td>'+p.prix.toLocaleString('fr-FR')+' FCFA</td><td style="font-weight:700;color:'+col+'">'+p.stock+'</td><td>'+p.sm+'</td><td><span class="badge '+scls+'">'+slbl+'</span></td><td>'+btn+'</td></tr>';
  }).join('');
  updateBadgeProd();
}

async function reappro(id) {
  var p = PRODS.find(function(x){ return x.id===id; }); if (!p) return;
  p.stock += 50;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('produits').update({ stock: p.stock }).eq('id', p.id);
  } catch(e) { console.warn('[Reappro] Supabase:', e); }
  toast('Réappro commandé pour '+p.nom, 'success');
  addNotif('Réappro : '+p.nom, 'green');
  renderProds(); renderCat();
}

function updateBadgeProd() {
  var n = PRODS.filter(function(p){ return p.stock<10; }).length;
  var b = document.getElementById('b-prod'); if (b) b.textContent = n;
  var rb = document.getElementById('rupt-badge'); if (rb) rb.textContent = n+' ruptures';
}

async function supprimerProd(id) {
  var p = PRODS.find(function(x){ return x.id == id; });
  if (!p) return;
  if (!confirm('Supprimer le produit "' + (p.nom||'') + '" ?')) return;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('produits').delete().eq('id', p.id);
  } catch(e) { console.warn('[Produits] supprimer:', e); }
  PRODS = PRODS.filter(function(x){ return x.id != id; });
  renderProds(); renderCat();
  addNotif('Produit supprimé : ' + p.nom, 'red');
  toast('Produit "' + p.nom + '" supprimé', 'success');
}

function editProd(id) {
  var p = PRODS.find(function(x){ return x.id == id; });
  if (!p) return;
  var el = function(i){ return document.getElementById(i); };
  if (el('pn'))   el('pn').value   = p.nom   || '';
  if (el('pp'))   el('pp').value   = p.prix  || 0;
  if (el('ps'))   el('ps').value   = p.stock || 0;
  if (el('pimg')) el('pimg').value = p.img   || '';
  if (el('pc'))   el('pc').value   = p.cat   || '';
  if (el('psm'))  el('psm').value  = p.sm    || '';
  var mh = document.querySelector('#m-prod .mh h3');
  if (mh) mh.textContent = 'Modifier le produit';
  var btn = document.querySelector('#m-prod .btng .btn.bp');
  if (btn) { btn.textContent = 'Enregistrer'; btn.onclick = function(){ saveProd(id); }; }
  openM('m-prod');
}

async function saveProd(id) {
  var p = PRODS.find(function(x){ return x.id == id; });
  if (!p) return;
  p.nom   = val('pn')    || p.nom;
  p.prix  = parseFloat((document.getElementById('pp')||{}).value)  || p.prix;
  p.stock = parseInt((document.getElementById('ps')||{}).value)    || p.stock;
  p.img   = val('pimg')  || p.img;
  p.cat   = (document.getElementById('pc') ||{}).value || p.cat;
  p.sm    = (document.getElementById('psm')||{}).value || p.sm;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('produits').update({
      nom: p.nom, prix: p.prix, stock: p.stock,
      img: p.img, cat: p.cat, sm: p.sm
    }).eq('id', p.id);
  } catch(e) { console.warn('[Produits] modifier:', e); }
  renderProds(); renderCat();
  closeM('m-prod');
  var mh = document.querySelector('#m-prod .mh h3');
  if (mh) mh.textContent = 'Nouveau produit';
  var btn = document.querySelector('#m-prod .btng .btn.bp');
  if (btn) { btn.textContent = 'Ajouter'; btn.onclick = ajouterProd; }
  toast('Produit modifié avec succès', 'success');
}

async function ajouterProd() {
  var nom = val('pn'), prix = parseFloat((document.getElementById('pp')||{}).value)||0;
  var stock = parseInt((document.getElementById('ps')||{}).value)||0;
  if (!nom||prix<=0) { toast('Nom et prix requis', 'warning'); return; }
  var imgUrl = val('pimg') || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop';
  var prod = {
    nom: nom,
    img: imgUrl,
    cat: (document.getElementById('pc')||{}).value || '',
    prix: prix,
    stock: stock,
    sm: (document.getElementById('psm')||{}).value || '',
    created_at: new Date().toISOString()
  };
  try {
    var sb = _sbMain();
    if (sb) {
      var res = await sb.from('produits').insert(prod).select().single();
      if (res.data) prod = res.data;
      else prod.id = Date.now();
    } else { prod.id = Date.now(); }
  } catch(e) { console.warn('[Produits] ajouter:', e); prod.id = Date.now(); }
  PRODS.push(prod);
  closeM('m-prod'); renderProds(); renderCat();
  addNotif('Nouveau produit : ' + nom, 'green');
  toast('Produit "'+nom+'" ajouté !', 'success');
  ['pn','pp','ps','psl','pimg'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
}

// ═══════════════ PANIER ═══════════════
function getPanierTotal() { return PANIER.reduce(function(a,item){ var p=PRODS.find(function(x){ return x.id===item.id; }); return a+(p?p.prix*item.qty:0); },0); }
function getPanierCount() { return PANIER.reduce(function(a,i){ return a+i.qty; },0); }
function getPanierItem(id) { return PANIER.find(function(p){ return p.id===id; }); }

function updatePanierUI() {
  var cnt = getPanierCount(), tot = getPanierTotal();
  ['b-pan','pb-cnt','cf-cnt'].forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=cnt; });
  var fmtTot = fmt(tot);
  ['pb-tot','p-st','p-tot','cf-tot'].forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=fmtTot; });
  var cf = document.getElementById('cf'); if (cf) { if (cnt>0) cf.classList.add('show'); else cf.classList.remove('show'); }
}

function addToCart(id, qty) {
  qty = qty||1;
  var prod = PRODS.find(function(p){ return p.id===id; }); if (!prod) return;
  if (prod.stock===0) { toast('Rupture de stock !', 'error'); return; }
  var ex = getPanierItem(id);
  if (ex) { if (ex.qty+qty>prod.stock) { toast('Max : '+prod.stock+' unités', 'warning'); return; } ex.qty+=qty; }
  else PANIER.push({id:id, qty:qty});
  updatePanierUI();
  toast(prod.nom+' ajouté au panier', 'success');
}

function removeFromCart(id) { PANIER = PANIER.filter(function(p){ return p.id!==id; }); updatePanierUI(); renderPanier(); renderCat(); }

function updateCartQty(id, d) {
  var prod=PRODS.find(function(p){ return p.id===id; }), item=getPanierItem(id); if (!item) return;
  var nq = item.qty+d;
  if (nq<=0) { removeFromCart(id); return; }
  if (nq>prod.stock) { toast('Max: '+prod.stock, 'warning'); return; }
  item.qty = nq; updatePanierUI(); renderPanier();
}

function viderPanier() {
  if (PANIER.length===0) return;
  PANIER = []; updatePanierUI(); renderPanier(); renderCat();
  toast('Panier vidé', 'warning');
}

function renderPanier() {
  var b = document.getElementById('pbody'); if (!b) return;
  if (PANIER.length===0) {
    b.innerHTML = '<div class="empty"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop" style="width:70px;height:70px;border-radius:12px;object-fit:cover;margin-bottom:10px"><h3>Panier vide</h3><p>Parcourez le catalogue pour ajouter des produits</p></div>';
    return;
  }
  b.innerHTML = PANIER.map(function(item){
    var p = PRODS.find(function(x){ return x.id===item.id; }); if (!p) return '';
    return '<div class="pit"><img src="'+p.img+'" alt="'+p.nom+'" class="pit-img"><div class="pinf"><div class="pnm">'+p.nom+'</div><div class="pun">'+p.prix.toLocaleString('fr-FR')+' FCFA/u</div></div>'+
      '<div class="pqt"><div class="qb" onclick="updateCartQty('+p.id+',-1)">−</div><span>'+item.qty+'</span><div class="qb" onclick="updateCartQty('+p.id+',1)">+</div></div>'+
      '<div class="ptot">'+(p.prix*item.qty).toLocaleString('fr-FR')+' FCFA</div><div class="prm" onclick="removeFromCart('+p.id+')"><img src="https://img.icons8.com/ios/18/CE1126/delete-sign.png" alt="fermer" style="width:14px;height:14px;vertical-align:middle"></div></div>';
  }).join('');
}

function openPanier() { renderPanier(); document.getElementById('pov').classList.add('open'); }
function closePanier() { document.getElementById('pov').classList.remove('open'); }

// ═══════════════ CATALOGUE ═══════════════
function renderCat() {
  var sm = (document.getElementById('f-sm')||{}).value||'';
  var cat = (document.getElementById('f-cat')||{}).value||'';
  var srch = ((document.getElementById('f-srch')||{}).value||'').toLowerCase();
  var liste = PRODS.filter(function(p){ return (!sm||p.sm===sm)&&(!cat||p.cat===cat)&&(!srch||p.nom.toLowerCase().includes(srch)); });
  var grid = document.getElementById('agrid'); if (!grid) return;
  if (liste.length===0) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" style="width:60px;height:60px;border-radius:10px;object-fit:cover;margin-bottom:10px"><h3>Aucun produit trouvé</h3><p>Modifiez vos critères</p></div>';
    return;
  }
  grid.innerHTML = liste.map(function(p){
    var inCart = getPanierItem(p.id); var qic = inCart?inCart.qty:0;
    var sc = p.stock===0?'var(--r)':p.stock<10?'#B8860B':'#6B7B6B';
    var sl = p.stock===0?'Rupture de stock':p.stock<10?p.stock+' restants en stock':p.stock+' en stock';
    var statusBadge = p.stock===0?'<span class="psbadge red">Rupture</span>':p.stock<10?'<span class="psbadge orange">Stock faible</span>':'<span class="psbadge green">Disponible</span>';
    var btn;
    if (p.stock===0) btn = '<button class="acbtn" disabled>Indisponible</button>';
    else if (inCart) btn = '<div class="qc"><div class="qb" onclick="chQty('+p.id+',-1)">−</div><span class="qv" id="lq'+p.id+'">'+(qic||1)+'</span><div class="qb" onclick="chQty('+p.id+',1)">+</div></div><button class="acbtn rm" onclick="removeFromCart('+p.id+');renderCat()">Retirer ('+qic+')</button>';
    else btn = '<div class="qc"><div class="qb" onclick="chQty('+p.id+',-1)">−</div><span class="qv" id="lq'+p.id+'">1</span><div class="qb" onclick="chQty('+p.id+',1)">+</div></div><button class="acbtn" onclick="addFromCard('+p.id+')">Ajouter au panier</button>';
    return '<div class="acd'+(inCart?' ic':'')+'"><div class="aimg-wrap"><img src="'+p.img+'" alt="'+p.nom+'" class="acd-img" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop\'">'+statusBadge+'</div><div class="anm">'+p.nom+'</div><div class="acat">'+p.cat+'</div><div class="apr">'+p.prix.toLocaleString('fr-FR')+' FCFA</div>'+btn+'</div>';
  }).join('');
}

function chQty(id, d) { var el=document.getElementById('lq'+id); if (!el) return; var p=PRODS.find(function(x){ return x.id===id; }); el.textContent=Math.max(1,Math.min(parseInt(el.textContent)+d,p.stock)); }
function addFromCard(id) { var el=document.getElementById('lq'+id); addToCart(id, el?parseInt(el.textContent):1); renderCat(); }

// ═══════════════ COMMANDES ═══════════════
var ST = {en_attente:{lbl:'En attente',cls:'bgy'}, confirmee:{lbl:'Confirmée',cls:'bgb'}, livraison:{lbl:'En livraison',cls:'bgy'}, livree:{lbl:'Livrée',cls:'bgg'}, annulee:{lbl:'Annulée',cls:'bgr'}};
var TLS = ['En attente','Confirmée','En livraison','Livrée'];
var STS = {en_attente:0, confirmee:1, livraison:2, livree:3, annulee:-1};

function filterCmd(f, btn) {
  cFilter = f;
  document.querySelectorAll('.ft').forEach(function(t){ t.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderCmds();
}

function updateBadgeCmd() {
  var n = CMDS.filter(function(c){ return ['en_attente','confirmee','livraison'].includes(c.statut); }).length;
  var b = document.getElementById('b-cmd'); if (b) b.textContent = n;
}

function renderCmds() {
  var list = document.getElementById('cmd-list'); if (!list) return;
  var fil = cFilter ? CMDS.filter(function(c){ return c.statut===cFilter; }) : CMDS;
  if (fil.length===0) {
    list.innerHTML = '<div class="empty"><h3>Aucune commande</h3><p>Aucune commande dans cette catégorie</p><button class="btn bp" onclick="openM(\'m-cmd\')">Créer une commande</button></div>';
    return;
  }
  list.innerHTML = fil.map(function(cmd){
    var st = ST[cmd.statut], step = STS[cmd.statut];
    var tl = cmd.type==='reservation' ? '<span class="badge bgb" style="margin-left:7px">Réservation</span>' : '';
    var tlh = '';
    if (cmd.statut!=='annulee') {
      tlh = '<div class="tl">';
      TLS.forEach(function(s,i){
        if (i>0) tlh += '<div class="tlln'+(i<=step?' done':'')+'"></div>';
        tlh += '<div class="tls"><div class="tld'+(i<step?' done':i===step?' curr':'')+'">'+( i<step?'<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">':i+1)+'</div><div class="tll">'+s+'</div></div>';
      });
      tlh += '</div>';
    }
    var acts = '';
    if (cmd.statut==='en_attente') acts = '<button class="btn bp bsm" onclick="updSt(\''+cmd.id+'\',\'confirmee\')">Confirmer</button><button class="btn bd bsm" onclick="updSt(\''+cmd.id+'\',\'annulee\')">Annuler</button>';
    else if (cmd.statut==='confirmee') acts = '<button class="btn bp bsm" onclick="updSt(\''+cmd.id+'\',\'livraison\')">Expédier</button><button class="btn bd bsm" onclick="updSt(\''+cmd.id+'\',\'annulee\')">Annuler</button>';
    else if (cmd.statut==='livraison') acts = '<button class="btn bp bsm" onclick="updSt(\''+cmd.id+'\',\'livree\')">Marquer livrée</button>';
    var items = cmd.items.map(function(it){ return '<div class="cmdr"><div style="display:flex;align-items:center;gap:7px"><img src="'+it.img+'" style="width:28px;height:28px;border-radius:5px;object-fit:cover"> <span>'+it.nom+' × '+it.qty+'</span></div><span style="font-weight:700">'+(it.prix*it.qty).toLocaleString('fr-FR')+' FCFA</span></div>'; }).join('');
    if (cmd.notes) items += '<div style="font-size:11px;color:var(--mu);margin-top:4px;font-style:italic">'+cmd.notes+'</div>';
    return '<div class="cmdcd"><div class="cmdh"><div><div class="cmdid">'+cmd.id+' '+tl+'</div><div class="cmdm">'+cmd.date+' — '+cmd.sm+' — '+cmd.pay+'</div><div class="cmdm">'+cmd.client+' — '+cmd.tel+'</div></div><span class="badge '+st.cls+'">'+st.lbl+'</span></div>'+tlh+'<div class="cmdi">'+items+'</div><div class="cmdf"><div class="cmdt">'+cmd.total.toLocaleString('fr-FR')+' FCFA</div><div style="display:flex;gap:6px">'+acts+'<button class="btn bo bsm" onclick="imprimerCommande(\''+cmd.id+'\')">🖨️ Imprimer</button></div></div></div>';
  }).join('');
}

// ── Impression bon de commande PDF ──
function imprimerCommande(id) {
  var cmd = CMDS.find(function(c){ return c.id===id; });
  if (!cmd) return;

  var ST_LABELS = { en_attente:'En attente', confirmee:'Confirmée', livraison:'En livraison', livree:'Livrée', annulee:'Annulée' };
  var ST_COLORS = { en_attente:'#f59e0b', confirmee:'#3b82f6', livraison:'#f59e0b', livree:'#007A3D', annulee:'#ef4444' };
  var statut    = ST_LABELS[cmd.statut] || cmd.statut;
  var couleur   = ST_COLORS[cmd.statut] || '#007A3D';

  var lignesItems = cmd.items.map(function(it, i) {
    return '<tr style="background:' + (i%2===0?'#f9fafb':'#fff') + '">'
      + '<td style="padding:10px 14px;border-bottom:1px solid #f0f0f0">' + it.nom + '</td>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align:center">' + it.qty + '</td>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align:right">' + it.prix.toLocaleString('fr-FR') + ' FCFA</td>'
      + '<td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700">' + (it.prix*it.qty).toLocaleString('fr-FR') + ' FCFA</td>'
      + '</tr>';
  }).join('');

  var sousTtl   = cmd.items.reduce(function(s,it){ return s+it.prix*it.qty; }, 0);
  var livraison = cmd.total - sousTtl;
  var smNom     = (currentUser && currentUser.sm) ? currentUser.sm.split(' — ')[0] : 'SuperMarché CM';
  var smVille   = (currentUser && currentUser.sm) ? (currentUser.sm.split(' — ')[1] || '') : '';

  var html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">'
    + '<title>Bon de commande ' + cmd.id + '</title>'
    + '<style>'
    + '* { margin:0; padding:0; box-sizing:border-box; }'
    + 'body { font-family: Arial, sans-serif; font-size:13px; color:#333; background:#fff; }'
    + '.page { max-width:720px; margin:0 auto; padding:32px; }'
    + '.header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; padding-bottom:20px; border-bottom:3px solid #007A3D; }'
    + '.logo { font-size:24px; font-weight:900; color:#007A3D; letter-spacing:-0.5px; }'
    + '.logo span { color:#CE1126; }'
    + '.badge { display:inline-block; padding:5px 14px; border-radius:20px; font-size:12px; font-weight:700; color:#fff; }'
    + '.infos { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }'
    + '.bloc { background:#f9fafb; border-radius:10px; padding:14px 16px; }'
    + '.bloc h4 { font-size:11px; text-transform:uppercase; letter-spacing:.5px; color:#999; margin-bottom:8px; }'
    + '.bloc p { font-size:13px; color:#333; line-height:1.7; }'
    + '.bloc strong { color:#111; }'
    + 'table { width:100%; border-collapse:collapse; margin-bottom:16px; }'
    + 'thead th { background:#007A3D; color:#fff; padding:10px 14px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:.4px; }'
    + 'thead th:last-child, thead th:nth-child(3), thead th:nth-child(2) { text-align:right; }'
    + 'thead th:nth-child(2) { text-align:center; }'
    + '.totaux { display:flex; justify-content:flex-end; margin-bottom:24px; }'
    + '.totaux-bloc { width:260px; }'
    + '.ligne-tot { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }'
    + '.ligne-final { display:flex; justify-content:space-between; padding:10px 14px; background:#007A3D; border-radius:8px; color:#fff; font-weight:700; font-size:15px; margin-top:6px; }'
    + '.footer { border-top:2px solid #e5e7eb; padding-top:16px; display:flex; justify-content:space-between; align-items:center; }'
    + '.footer p { font-size:11px; color:#999; }'
    + '.merci { text-align:center; margin:20px 0; font-size:15px; color:#007A3D; font-weight:700; }'
    + '.note { background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px 14px; margin-bottom:20px; font-size:12px; color:#92400e; }'
    + '@media print { body { print-color-adjust:exact; -webkit-print-color-adjust:exact; } }'
    + '</style></head><body><div class="page">'

    // EN-TETE
    + '<div class="header">'
    + '<div><div class="logo">Super<span>Marché</span> CM</div>'
    + '<div style="font-size:12px;color:#666;margin-top:4px">' + smNom + (smVille ? ' — ' + smVille : '') + '</div>'
    + '<div style="font-size:11px;color:#999;margin-top:2px">Tel : +237 683 39 22 68</div></div>'
    + '<div style="text-align:right">'
    + '<div style="font-size:20px;font-weight:800;color:#333">BON DE COMMANDE</div>'
    + '<div style="font-size:16px;font-weight:700;color:#007A3D;margin-top:4px">' + cmd.id + '</div>'
    + '<div style="margin-top:8px"><span class="badge" style="background:'+couleur+'">' + statut + '</span></div>'
    + '<div style="font-size:11px;color:#999;margin-top:6px">Émis le ' + cmd.date + '</div>'
    + '</div></div>'

    // INFOS CLIENT + LIVRAISON
    + '<div class="infos">'
    + '<div class="bloc"><h4>Client</h4><p>'
    + '<strong>' + cmd.client + '</strong><br>'
    + 'Tel : ' + cmd.tel + '<br>'
    + (cmd.adresse ? 'Adresse : ' + cmd.adresse + '<br>' : '')
    + (cmd.ville   ? 'Ville : ' + cmd.ville : '')
    + '</p></div>'
    + '<div class="bloc"><h4>Informations commande</h4><p>'
    + 'Mode de paiement : <strong>' + (cmd.pay || '—') + '</strong><br>'
    + 'Type : <strong>' + (cmd.type === 'reservation' ? 'Réservation' : 'Commande standard') + '</strong><br>'
    + 'Supermarché : <strong>' + (cmd.sm || smNom) + '</strong>'
    + '</p></div>'
    + '</div>'

    // NOTE CLIENT
    + (cmd.notes ? '<div class="note">Note : ' + cmd.notes + '</div>' : '')

    // TABLEAU PRODUITS
    + '<table><thead><tr>'
    + '<th>Produit</th><th style="text-align:center">Qté</th><th style="text-align:right">Prix unit.</th><th style="text-align:right">Total</th>'
    + '</tr></thead><tbody>' + lignesItems + '</tbody></table>'

    // TOTAUX
    + '<div class="totaux"><div class="totaux-bloc">'
    + '<div class="ligne-tot"><span>Sous-total</span><span>' + sousTtl.toLocaleString('fr-FR') + ' FCFA</span></div>'
    + '<div class="ligne-tot"><span>Frais de livraison</span><span>' + (livraison > 0 ? livraison.toLocaleString('fr-FR') + ' FCFA' : 'Gratuit') + '</span></div>'
    + '<div class="ligne-final"><span>TOTAL</span><span>' + cmd.total.toLocaleString('fr-FR') + ' FCFA</span></div>'
    + '</div></div>'

    // MERCI + PIED DE PAGE
    + '<div class="merci">Merci pour votre confiance !</div>'
    + '<div class="footer">'
    + '<p>SuperMarché CM — Votre supermarché en ligne au Cameroun<br>WhatsApp : +237 693 59 14 79 | Service client : +237 683 39 22 68</p>'
    + '<p style="text-align:right">Document généré le<br>' + new Date().toLocaleDateString('fr-FR') + '</p>'
    + '</div>'
    + '</div></body></html>';

  // Lancer l'impression via iframe (sans popup)
  lancerImpression(html);
}

function updSt(id, ns) {
  var cmd = CMDS.find(function(c){ return c.id===id; }); if (!cmd) return;
  cmd.statut = ns; updateBadgeCmd(); renderCmds();

  var msgs  = {confirmee:'Commande '+id+' confirmée', livraison:'Commande '+id+' expédiée', livree:'Commande '+id+' livrée', annulee:'Commande '+id+' annulée'};
  var types = {confirmee:'success', livraison:'warning', livree:'success', annulee:'error'};
  toast(msgs[ns], types[ns]);
  addNotif(msgs[ns], types[ns]==='success'?'green':types[ns]==='error'?'red':'yellow');

  // ── Déstockage automatique quand commande livrée ──
  if (ns === 'livree' && cmd.items) {
    cmd.items.forEach(function(item) {
      var prod = PRODS.find(function(p){ return p.nom === item.nom; });
      if (prod && prod.stock > 0) {
        prod.stock = Math.max(0, prod.stock - (item.qty || 1));
        if (prod.stock === 0) {
          addNotif('Rupture de stock : ' + prod.nom, 'red');
          toast('Rupture : ' + prod.nom, 'error');
        } else if (prod.stock < 10) {
          addNotif('Stock critique : ' + prod.nom + ' — ' + prod.stock + ' unité(s)', 'yellow');
        }
      }
    });
    try { localStorage.setItem('sm_prods', JSON.stringify(PRODS)); } catch(e) {}
  }

  renderDashboard();

  // ── SMS automatique via Railway backend ──
  if (cmd.tel && cmd.tel !== '—') {
    var route = '';
    var body  = {};
    if (ns === 'confirmee')  { route = '/sms/commande';    body = { tel: cmd.tel, client: cmd.prenom || cmd.client, id: cmd.id, total: cmd.total, items: cmd.items ? cmd.items.map(function(i){ return i.qty+'x '+i.nom; }).join(', ') : '' }; }
    else if (ns === 'livraison') { route = '/sms/livraison'; body = { tel: cmd.tel, client: cmd.prenom || cmd.client, id: cmd.id }; }
    else if (ns === 'livree')    { route = '/sms/livree';    body = { tel: cmd.tel, client: cmd.prenom || cmd.client, id: cmd.id, total: cmd.total }; }
    else if (ns === 'annulee')   { route = '/sms/annulation'; body = { tel: cmd.tel, client: cmd.prenom || cmd.client, id: cmd.id }; }
    if (route) {
      fetch('https://supermarche-cm-backend-production.up.railway.app' + route, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function(r){ return r.json(); }).then(function(r){
        if (r.ok) toast('SMS envoyé à ' + (cmd.prenom || cmd.client), 'success');
      }).catch(function(e){ console.warn('SMS non envoyé:', e); });
    }
  }
}/ ── Alertes stock dynamiques ──
var alertes = PRODS
  .filter(function(p){ return p.stock < 10; })
  .sort(function(a,b){ return a.stock - b.stock; })
  .slice(0, 5);

var alerteBadge = document.getElementById('dash-alerte-badge');
var alerteList  = document.getElementById('dash-alerte-list');

if (alerteBadge) alerteBadge.textContent = alertes.length + ' alerte' + (alertes.length > 1 ? 's' : '');

if (alerteList) {
  if (alertes.length === 0) {
    alerteList.innerHTML = '<p style="color:#007A3D;font-size:12px;text-align:center;padding:10px">Tous les stocks sont OK !</p>';
  } else {
    alerteList.innerHTML = alertes.map(function(p) {
      var maxStock = 50;
      var pct      = Math.round(p.stock / maxStock * 100);
      var color    = p.stock === 0 ? 'var(--r)' : '#B8860B';
      var barColor = p.stock === 0 ? 'var(--r)' : 'var(--y)';
      var label    = p.stock === 0 ? 'Rupture' : p.stock + ' u.';
      return '<div>'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">'
        + '<img src="' + p.img + '" style="width:22px;height:22px;border-radius:5px;object-fit:cover" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=40&h=40&fit=crop\'">'
        + '<span style="font-size:12px;flex:1">' + p.nom + '</span>'
        + '<span style="color:' + color + ';font-weight:700;font-size:12px">' + label + '</span>'
        + '</div>'
        + '<div class="pb"><div class="pf" style="width:' + pct + '%;background:' + barColor + '"></div></div>'
        + '</div>';
    }).join('');
  }
}

function passerCmd(type) {
  if (PANIER.length===0) { toast('Panier vide !', 'warning'); return; }
  var sm = document.getElementById('p-sm').value;
  var pay = document.getElementById('p-pay').value;
  var client = (document.getElementById('p-cli').value.trim())||'Client Comptoir';
  var tel = (document.getElementById('p-tel').value.trim())||'—';
  var items = PANIER.map(function(item){ var p=PRODS.find(function(x){ return x.id===item.id; }); return {nom:p.nom,img:p.img,qty:item.qty,prix:p.prix}; });
  var total = getPanierTotal();
  var now = new Date();
  var ds = now.toLocaleDateString('fr-FR')+' '+now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  var newCmd = {id:'CMD-00'+cSeq++,date:ds,client:client,tel:tel,sm:sm,pay:pay,statut:'en_attente',type:type,items:items,total:total,notes:''};
  CMDS.unshift(newCmd); viderPanier(); closePanier(); updateBadgeCmd();
  toast((type==='reservation'?'Réservation ':'Commande ')+newCmd.id+' créée !', 'success');
  addNotif(newCmd.id+' — '+client, 'green');
  goPage('commandes');

  // SMS au client + admin
  if (tel && tel !== '—') {
    fetch('https://supermarche-cm-backend-production.up.railway.app/sms/commande', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ tel: tel, client: client, id: newCmd.id, total: total, items: items.map(function(i){ return i.qty+'x '+i.nom; }).join(', ') })
    }).then(function(r){ return r.json(); }).then(function(r){ if(r.ok) toast('📱 SMS confirmation envoyé', 'success'); }).catch(function(){});
  }
  // SMS alerte admin
  fetch('https://supermarche-cm-backend-production.up.railway.app/sms/custom', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ tel: '237693591479', message: '🛒 Nouvelle commande '+newCmd.id+' — '+client+' — '+(total||0).toLocaleString()+' FCFA — '+sm })
  }).catch(function(){});
}

function creerCmdManuelle() {
  var client = val('cc'), produits = val('cprod'), montant = parseFloat((document.getElementById('cmt')||{}).value)||0;
  var type = (document.getElementById('cty')||{}).value||'achat';
  if (!client||!produits||montant<=0) { toast('Remplissez tous les champs', 'warning'); return; }
  var now = new Date();
  var ds = now.toLocaleDateString('fr-FR')+' '+now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  var newCmd = {id:'CMD-00'+cSeq++,date:ds,client:client,tel:val('ctel')||'—',sm:document.getElementById('csm').value,pay:document.getElementById('cpay').value,statut:'en_attente',type:type,items:[{nom:produits,img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=40&h=40&fit=crop',qty:1,prix:montant}],total:montant,notes:val('cnotes')};
  CMDS.unshift(newCmd); updateBadgeCmd(); closeM('m-cmd'); renderCmds();
  toast((type==='reservation'?'Réservation ':'Commande ')+newCmd.id+' créée !', 'success');
  ['cc','ctel','cprod','cmt','cnotes'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
}

// ═══════════════ FORMULAIRES ═══════════════
// ajouterSM moved to STORES section above

// ── Employés : Supabase ──
var EMPLOYES = [];

function _sbMain() {
  if (typeof window.supabase === 'undefined') return null;
  return window.supabase.createClient(SM_CONFIG.supabase.url, SM_CONFIG.supabase.key);
}

async function initEmployes() {
  try {
    var sb = _sbMain(); if (!sb) return;
    var res = await sb.from('employes').select('*').order('created_at', { ascending: false });
    if (res.data) EMPLOYES = res.data;
  } catch(e) { console.warn('[Employes] init:', e); }
  renderEmployes();
}

function renderEmployes() {
  var tb = document.getElementById('emp-tbody');
  if (!tb) return;
  var statEl = document.getElementById('dash-employes');

  if (EMPLOYES.length === 0) {
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;padding:20px">Aucun employé. Cliquez sur "+ Ajouter un employé".</td></tr>';
  } else {
    tb.innerHTML = EMPLOYES.map(function(e, i) {
      var initiale = (e.prenom || e.nom || '?')[0].toUpperCase();
      var couleurs = ['#007A3D','#3b82f6','#f59e0b','#8b5cf6','#ec4899','#14b8a6'];
      var bg = couleurs[i % couleurs.length];
      return '<tr>' +
        '<td><div style="display:flex;align-items:center;gap:8px">' +
        '<div style="width:30px;height:30px;border-radius:50%;background:' + bg + ';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">' + initiale + '</div>' +
        '<span>' + (e.prenom || '') + ' ' + (e.nom || '') + '</span></div></td>' +
        '<td>' + (e.poste || '—') + '</td>' +
        '<td>' + (e.sm || '—') + '</td>' +
        '<td>' + (e.tel || '—') + '</td>' +
        '<td>' + (e.salaire ? Number(e.salaire).toLocaleString('fr-FR') + ' FCFA' : '—') + '</td>' +
        '<td><span class="badge bgg">Actif</span></td>' +
        '<td><button class="btn bd bsm" onclick="supprimerEmp(' + e.id + ')">Retirer</button></td>' +
        '</tr>';
    }).join('');
  }

  // Mettre à jour stat dashboard
  var dashEmp = document.getElementById('dash-employes');
  if (dashEmp) dashEmp.textContent = EMPLOYES.length;
  renderDashboard();
}

async function ajouterEmp() {
  var prenom = val('ep'), nom = val('en');
  if (!prenom || !nom) { toast('Prénom et nom requis', 'warning'); return; }
  var emp = {
    prenom:  prenom,
    nom:     nom,
    poste:   (document.getElementById('epo') || {}).value || '—',
    sm:      (document.getElementById('esm') || {}).value || '—',
    tel:     val('et') || '—',
    salaire: (document.getElementById('esal') || {}).value || 0,
    created_at: new Date().toISOString()
  };
  try {
    var sb = _sbMain();
    if (sb) {
      var res = await sb.from('employes').insert(emp).select().single();
      if (res.data) emp = res.data;
    } else { emp.id = Date.now(); }
  } catch(e) { console.warn('[Employes] ajouter:', e); emp.id = Date.now(); }
  EMPLOYES.unshift(emp);
  renderEmployes();
  addNotif('Nouvel employé : ' + prenom + ' ' + nom + ' (' + emp.poste + ')', 'green');
  closeM('m-emp');
  toast(prenom + ' ' + nom + ' ajouté !', 'success');
  ['ep','en','et','esal'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
}

async function supprimerEmp(id) {
  var e = EMPLOYES.find(function(x){ return x.id == id; }) || EMPLOYES[id];
  if (!e) return;
  if (!confirm('Retirer ' + (e.prenom||'') + ' ' + (e.nom||'') + ' ?')) return;
  try {
    var sb = _sbMain();
    if (sb && e.id) await sb.from('employes').delete().eq('id', e.id);
  } catch(err) { console.warn('[Employes] supprimer:', err); }
  EMPLOYES = EMPLOYES.filter(function(x){ return x.id != e.id; });
  renderEmployes();
  toast('Employé retiré', 'success');
}

// ── Fournisseurs : Supabase ──
var FOURNISSEURS = [];

async function initFournisseurs() {
  try {
    var sb = _sbMain(); if (!sb) return;
    var res = await sb.from('fournisseurs').select('*').order('created_at', { ascending: false });
    if (res.data) FOURNISSEURS = res.data;
  } catch(e) { console.warn('[Fournisseurs] init:', e); }
  renderFournisseurs();
}

function renderFournisseurs() {
  var tb = document.getElementById('four-tbody');
  if (!tb) return;
  if (FOURNISSEURS.length === 0) {
    tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;padding:20px">Aucun fournisseur. Cliquez sur "+ Ajouter fournisseur".</td></tr>';
    return;
  }
  tb.innerHTML = FOURNISSEURS.map(function(f, i) {
    var statut = f.statut || 'actif';
    var badgeCls = statut === 'actif' ? 'bgg' : statut === 'retard' ? 'bgy' : 'bgr';
    var badgeLbl = statut === 'actif' ? 'Actif' : statut === 'retard' ? 'En retard' : 'Inactif';
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:8px">' +
      '<div style="width:30px;height:30px;border-radius:7px;background:#007A3D;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">' + (f.nom||'?')[0].toUpperCase() + '</div>' +
      (f.nom || '—') + '</div></td>' +
      '<td>' + (f.categorie || '—') + '</td>' +
      '<td>' + (f.tel || '—') + '</td>' +
      '<td>' + (f.ville || '—') + '</td>' +
      '<td>' + (f.montant ? Number(f.montant).toLocaleString('fr-FR') + ' FCFA' : '0 FCFA') + '</td>' +
      '<td><span class="badge ' + badgeCls + '">' + badgeLbl + '</span></td>' +
      '<td><div style="display:flex;gap:4px">' +
        '<button class="btn bo bsm" onclick="editFour(' + f.id + ')">Modifier</button>' +
        '<button class="btn bd bsm" onclick="supprimerFour(' + f.id + ')">Retirer</button>' +
      '</div></td>' +
      '</tr>';
  }).join('');
}

async function ajouterFour() {
  var n = val('fn'); if (!n) { toast('Nom requis', 'warning'); return; }
  var four = {
    nom:       n,
    categorie: (document.getElementById('fcat') || {}).value || '—',
    tel:       val('ftel') || '—',
    ville:     (document.getElementById('fville') || {}).value || '—',
    montant:   parseInt(val('fmontant')) || 0,
    statut:    'actif',
    created_at: new Date().toISOString()
  };
  try {
    var sb = _sbMain();
    if (sb) {
      var res = await sb.from('fournisseurs').insert(four).select().single();
      if (res.data) four = res.data;
    } else { four.id = Date.now(); }
  } catch(e) { console.warn('[Fournisseurs] ajouter:', e); four.id = Date.now(); }
  FOURNISSEURS.unshift(four);
  renderFournisseurs();
  addNotif('Nouveau fournisseur : ' + n, 'green');
  closeM('m-four');
  toast('Fournisseur "' + n + '" ajouté !', 'success');
  ['fn','ftel','fmontant'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
}

async function supprimerFour(id) {
  var f = FOURNISSEURS.find(function(x){ return x.id == id; });
  if (!f) return;
  if (!confirm('Supprimer le fournisseur "' + (f.nom||'') + '" ?')) return;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('fournisseurs').delete().eq('id', f.id);
  } catch(e) { console.warn('[Fournisseurs] supprimer:', e); }
  FOURNISSEURS = FOURNISSEURS.filter(function(x){ return x.id != f.id; });
  renderFournisseurs();
  toast('Fournisseur supprimé', 'success');
}

// ── Modifier un fournisseur ──
function editFour(id) {
  var f = FOURNISSEURS.find(function(x){ return x.id == id; });
  if (!f) return;
  // Remplir le formulaire avec les données existantes
  var el = function(i){ return document.getElementById(i); };
  if (el('fn'))      el('fn').value      = f.nom      || '';
  if (el('ftel'))    el('ftel').value    = f.tel      || '';
  if (el('fmontant'))el('fmontant').value= f.montant  || 0;
  if (el('fcat'))    el('fcat').value    = f.categorie|| '';
  if (el('fville'))  el('fville').value  = f.ville    || '';
  // Changer le titre et le bouton
  var mh = document.querySelector('#m-four .mh h3');
  if (mh) mh.textContent = 'Modifier le fournisseur';
  var btn = document.querySelector('#m-four .btng .btn.bp');
  if (btn) { btn.textContent = 'Enregistrer'; btn.onclick = function(){ saveFour(id); }; }
  openM('m-four');
}

async function saveFour(id) {
  var f = FOURNISSEURS.find(function(x){ return x.id == id; });
  if (!f) return;
  f.nom       = val('fn')      || f.nom;
  f.tel       = val('ftel')    || f.tel;
  f.montant   = parseInt(val('fmontant')) || 0;
  f.categorie = (document.getElementById('fcat')   || {}).value || f.categorie;
  f.ville     = (document.getElementById('fville') || {}).value || f.ville;
  try {
    var sb = _sbMain();
    if (sb) await sb.from('fournisseurs').update({
      nom: f.nom, tel: f.tel, montant: f.montant,
      categorie: f.categorie, ville: f.ville
    }).eq('id', f.id);
  } catch(e) { console.warn('[Fournisseurs] modifier:', e); }
  renderFournisseurs();
  closeM('m-four');
  // Remettre le formulaire en mode "Ajouter"
  var mh = document.querySelector('#m-four .mh h3');
  if (mh) mh.textContent = 'Nouveau fournisseur';
  var btn = document.querySelector('#m-four .btng .btn.bp');
  if (btn) { btn.textContent = 'Ajouter'; btn.onclick = ajouterFour; }
  toast('Fournisseur modifié avec succès', 'success');
}

// ═══════════════════════════════════════════════════════
//  VENTES & CAISSE — 100% DYNAMIQUE
// ═══════════════════════════════════════════════════════
function renderVentes() {
  var now   = new Date();
  var today = String(now.getDate()).padStart(2,'0') + '/' + String(now.getMonth()+1).padStart(2,'0');

  // Calculs dynamiques depuis CMDS
  var ventesAujourdhui = 0;
  var ventesHier       = 0;
  var nbTransactions   = 0;
  var nbAttente        = 0;
  var totalPanier      = 0;

  var yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  var hier = String(yesterday.getDate()).padStart(2,'0') + '/' + String(yesterday.getMonth()+1).padStart(2,'0');

  CMDS.forEach(function(cmd) {
    var dateStr = (cmd.date || '').substring(0, 5); // "DD/MM"
    if (cmd.statut === 'livree' || cmd.statut === 'confirmee') {
      nbTransactions++;
      totalPanier += cmd.total || 0;
      if (dateStr === today)  ventesAujourdhui += cmd.total || 0;
      if (dateStr === hier)   ventesHier       += cmd.total || 0;
    }
    if (cmd.statut === 'en_attente') nbAttente++;
  });

  var panierMoyen = nbTransactions > 0 ? Math.round(totalPanier / nbTransactions) : 0;
  var evol = ventesHier > 0 ? Math.round((ventesAujourdhui - ventesHier) / ventesHier * 100) : 0;

  // Formater les valeurs
  function fmt(n) {
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
    if (n >= 1000)    return Math.round(n/1000) + 'K';
    return n.toLocaleString('fr-FR');
  }

  // Mettre à jour les cartes
  var el;
  el = document.getElementById('v-today');       if(el) el.textContent = fmt(ventesAujourdhui) + ' F';
  el = document.getElementById('v-today-sub');   if(el) { el.textContent = (evol >= 0 ? '+' : '') + evol + '% vs hier'; el.className = 'schg ' + (evol >= 0 ? 'sup' : 'sdn'); }
  el = document.getElementById('v-transactions');if(el) el.textContent = nbTransactions;
  el = document.getElementById('v-trans-sub');   if(el) el.textContent = 'livrées / confirmées';
  el = document.getElementById('v-panier');      if(el) el.textContent = fmt(panierMoyen);
  el = document.getElementById('v-attente');     if(el) el.textContent = nbAttente;
  el = document.getElementById('v-attente-sub'); if(el) { el.textContent = nbAttente > 0 ? 'à traiter !' : 'aucune en attente'; el.className = 'schg ' + (nbAttente > 0 ? 'sdn' : 'sup'); }

  // Tableau des commandes filtré
  var filtre = (document.getElementById('v-filtre') || {}).value || 'tout';
  var cmdsFiltrees = filtre === 'tout' ? CMDS : CMDS.filter(function(c){ return c.statut === filtre; });

  var tbody = document.getElementById('v-tbody');
  if (!tbody) return;

  if (cmdsFiltrees.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;padding:20px">Aucune commande</td></tr>';
    return;
  }

  var statutMap = {
    'livree':    ['Livrée',     'bgg'],
    'confirmee': ['Confirmée',  'bgg'],
    'livraison': ['En route',   'bgy'],
    'en_attente':['En attente', 'bgy'],
    'annulee':   ['Annulée',    'bgr']
  };

  tbody.innerHTML = cmdsFiltrees.slice(0, 50).map(function(cmd, i) {
    var s = statutMap[cmd.statut] || [cmd.statut, 'bgy'];
    var dateAff = (cmd.date || '').substring(0, 14);
    var montant = (cmd.total || 0).toLocaleString('fr-FR') + ' FCFA';
    return '<tr>' +
      '<td style="font-weight:700;color:#007A3D">' + cmd.id + '</td>' +
      '<td>' + dateAff + '</td>' +
      '<td>' + (cmd.client || '—') + '</td>' +
      '<td>' + (cmd.sm || '—') + '</td>' +
      '<td style="font-weight:700">' + montant + '</td>' +
      '<td>' + (cmd.pay || '—') + '</td>' +
      '<td><span class="badge ' + s[1] + '">' + s[0] + '</span></td>' +
    '</tr>';
  }).join('');
}

// ═══════════════════════════════════════════════════════
//  RAPPORTS DYNAMIQUES
// ═══════════════════════════════════════════════════════
function renderRapports() {
  var now = new Date();

  // CA mensuel réel
  var caMensuel = 0;
  var nbCmdsMois = 0;
  var caMoisPrec = 0;
  CMDS.forEach(function(cmd) {
    if (cmd.statut === 'livree' || cmd.statut === 'confirmee') {
      try {
        var parts = (cmd.date||'').split('/');
        var mCmd = parseInt(parts[1]) - 1;
        var aCmd = parseInt(parts[2]);
        if (mCmd === now.getMonth() && aCmd === now.getFullYear()) {
          caMensuel += cmd.total || 0; nbCmdsMois++;
        }
        if (mCmd === (now.getMonth() - 1 + 12) % 12) {
          caMoisPrec += cmd.total || 0;
        }
      } catch(e) {}
    }
  });

  var evol = caMoisPrec > 0 ? Math.round((caMensuel - caMoisPrec) / caMoisPrec * 100) : 0;
  var caStr = caMensuel >= 1000000 ? (caMensuel/1000000).toFixed(1)+'M' : Math.round(caMensuel/1000)+'K';

  // Mettre à jour cartes rapports
  var el; 
  el = document.getElementById('ventes-ca-mois'); if(el) el.textContent = caStr + ' F';
  el = document.getElementById('ventes-ca-sub');  if(el) el.textContent = nbCmdsMois + ' commande(s) • ' + (evol >= 0 ? '+' : '') + evol + '% vs mois préc.';
  el = document.getElementById('rpt-c'); if(el) el.textContent = CMDS.filter(function(c){ return ['en_attente','confirmee','livraison'].includes(c.statut); }).length;

  // Marge brute dynamique (estimation 25% sur produits alimentaires, 35% autres)
  var margeEl = document.querySelector('#page-rapports .sval:nth-child(2)');

  // Top catégories dynamiques depuis commandes
  var catVentes = {};
  CMDS.forEach(function(cmd) {
    if (cmd.items) cmd.items.forEach(function(item) {
      var prod = PRODS.find(function(p){ return p.nom === item.nom; });
      var cat = prod ? prod.cat : 'Autre';
      catVentes[cat] = (catVentes[cat] || 0) + (item.prix * item.qty);
    });
  });

  var totalVentes = Object.values(catVentes).reduce(function(a,b){ return a+b; }, 0) || 1;
  var topCats = Object.keys(catVentes)
    .sort(function(a,b){ return catVentes[b] - catVentes[a]; })
    .slice(0, 5);

  var catColors = ['var(--g)', 'var(--r)', 'var(--y)', '#8b5cf6', '#14b8a6'];
  var catContainer = document.getElementById('rpt-top-cats');
  if (catContainer) {
    if (topCats.length === 0) {
      catContainer.innerHTML = '<p style="color:#999;font-size:13px;text-align:center;padding:10px">Aucune vente enregistrée</p>';
    } else {
      catContainer.innerHTML = topCats.map(function(cat, i) {
        var pct = Math.round(catVentes[cat] / totalVentes * 100);
        return '<div>' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">' +
          '<div style="width:20px;height:20px;border-radius:4px;background:' + catColors[i] + '"></div>' +
          '<span style="font-size:12px;flex:1">' + cat + '</span>' +
          '<span style="font-weight:700;font-size:12px">' + pct + '%</span>' +
          '</div>' +
          '<div class="pb"><div class="pf" style="width:' + pct + '%;background:' + catColors[i] + '"></div></div>' +
          '</div>';
      }).join('');
    }
  }

  // Rotation stock dynamique
  var prodsDispo = PRODS.filter(function(p){ return p.stock > 0; }).length;
  var rotationEl = document.getElementById('rpt-rotation');
  if (rotationEl) {
    var rotation = PRODS.length > 0 ? (nbCmdsMois / PRODS.length).toFixed(1) : '0';
    rotationEl.textContent = rotation + 'x';
  }
}


// ── Impression rapport complet ──
function imprimerRapport() {
  var now  = new Date();
  var mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  var smNom   = (currentUser && currentUser.sm) ? currentUser.sm.split(' — ')[0] : 'SuperMarché CM';
  var smVille = (currentUser && currentUser.sm) ? (currentUser.sm.split(' — ')[1] || '') : '';
  var gerantNom = currentUser ? ((currentUser.prenom||'') + ' ' + (currentUser.nom||'')).trim() : 'Gérant';

  // ── Calculs CA mensuel ──
  var caMensuel = 0, nbCmdsMois = 0, caMoisPrec = 0;
  var caParMois = new Array(12).fill(0);
  CMDS.forEach(function(cmd) {
    if (cmd.statut === 'livree' || cmd.statut === 'confirmee') {
      try {
        var parts = (cmd.date||'').split('/');
        var mCmd = parseInt(parts[1]) - 1;
        var aCmd = parseInt(parts[2]);
        if (!isNaN(mCmd)) caParMois[mCmd] = (caParMois[mCmd] || 0) + (cmd.total || 0);
        if (mCmd === now.getMonth() && aCmd === now.getFullYear()) { caMensuel += cmd.total||0; nbCmdsMois++; }
        if (mCmd === (now.getMonth()-1+12)%12) caMoisPrec += cmd.total||0;
      } catch(e){}
    }
  });
  var evol = caMoisPrec > 0 ? Math.round((caMensuel-caMoisPrec)/caMoisPrec*100) : 0;
  var caTotal = CMDS.filter(function(c){ return c.statut==='livree'||c.statut==='confirmee'; }).reduce(function(s,c){ return s+(c.total||0); }, 0);
  var panierMoyen = nbCmdsMois > 0 ? Math.round(caMensuel/nbCmdsMois) : 0;

  // ── Top catégories ──
  var catVentes = {};
  CMDS.forEach(function(cmd) {
    if (cmd.items) cmd.items.forEach(function(it) {
      var prod = PRODS.find(function(p){ return p.nom===it.nom; });
      var cat = prod ? prod.cat : 'Autre';
      catVentes[cat] = (catVentes[cat]||0) + (it.prix*it.qty);
    });
  });
  var totalVentes = Object.values(catVentes).reduce(function(a,b){ return a+b; }, 0) || 1;
  var topCats = Object.keys(catVentes).sort(function(a,b){ return catVentes[b]-catVentes[a]; }).slice(0,5);

  // ── Stock ──
  var prodsRupture  = PRODS.filter(function(p){ return p.stock===0; }).length;
  var prodsCritique = PRODS.filter(function(p){ return p.stock>0 && p.stock<=5; }).length;
  var prodsOk       = PRODS.filter(function(p){ return p.stock>5; }).length;
  var stockTotal    = PRODS.reduce(function(s,p){ return s+(p.stock||0); }, 0);

  // ── Commandes par statut ──
  var nbAttente  = CMDS.filter(function(c){ return c.statut==='en_attente'; }).length;
  var nbConfirm  = CMDS.filter(function(c){ return c.statut==='confirmee'; }).length;
  var nbLivraison= CMDS.filter(function(c){ return c.statut==='livraison'; }).length;
  var nbLivrees  = CMDS.filter(function(c){ return c.statut==='livree'; }).length;
  var nbAnnulees = CMDS.filter(function(c){ return c.statut==='annulee'; }).length;

  // ── Graphique barres CA mensuel (SVG) ──
  var maxCA = Math.max.apply(null, caParMois) || 1;
  var barWidth = 36, barGap = 8, svgW = (barWidth+barGap)*12, svgH = 120;
  var moisCourts = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
  var bars = caParMois.map(function(v, i) {
    var h = Math.max(4, Math.round(v/maxCA*90));
    var y = svgH - h - 20;
    var fill = i === now.getMonth() ? '#007A3D' : '#d1fae5';
    var x = i*(barWidth+barGap);
    return '<rect x="'+x+'" y="'+y+'" width="'+barWidth+'" height="'+h+'" rx="4" fill="'+fill+'"/>'
      + '<text x="'+(x+barWidth/2)+'" y="'+(svgH-4)+'" text-anchor="middle" font-size="9" fill="#999">'+moisCourts[i]+'</text>'
      + (v>0 ? '<text x="'+(x+barWidth/2)+'" y="'+(y-4)+'" text-anchor="middle" font-size="8" fill="#007A3D">'+(v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?Math.round(v/1000)+'K':v)+'</text>' : '');
  }).join('');

  // ── Top produits ──
  var prodVentes = {};
  CMDS.forEach(function(cmd) {
    if (cmd.items) cmd.items.forEach(function(it) {
      prodVentes[it.nom] = (prodVentes[it.nom]||0) + (it.prix*it.qty);
    });
  });
  var topProds = Object.keys(prodVentes).sort(function(a,b){ return prodVentes[b]-prodVentes[a]; }).slice(0,8);

  var catColors = ['#007A3D','#CE1126','#f59e0b','#8b5cf6','#14b8a6'];

  var html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">'
    + '<title>Rapport — ' + smNom + ' — ' + mois[now.getMonth()] + ' ' + now.getFullYear() + '</title>'
    + '<style>'
    + '* { margin:0; padding:0; box-sizing:border-box; }'
    + 'body { font-family:Arial,sans-serif; font-size:13px; color:#333; background:#fff; }'
    + '.page { max-width:800px; margin:0 auto; padding:32px; }'
    + '.header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; padding-bottom:20px; border-bottom:3px solid #007A3D; }'
    + '.logo { font-size:26px; font-weight:900; color:#007A3D; }'
    + '.logo span { color:#CE1126; }'
    + 'h2 { font-size:16px; color:#111; margin:20px 0 12px; border-left:4px solid #007A3D; padding-left:10px; }'
    + '.kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }'
    + '.kpi { background:#f9fafb; border-radius:10px; padding:14px; text-align:center; border-top:3px solid #007A3D; }'
    + '.kpi.rouge { border-top-color:#CE1126; }'
    + '.kpi.orange { border-top-color:#f59e0b; }'
    + '.kpi.bleu { border-top-color:#3b82f6; }'
    + '.kpi-val { font-size:22px; font-weight:800; color:#111; }'
    + '.kpi-lbl { font-size:11px; color:#999; margin-top:3px; }'
    + '.kpi-sub { font-size:11px; color:#007A3D; font-weight:600; margin-top:2px; }'
    + '.twocols { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }'
    + '.bloc { background:#f9fafb; border-radius:10px; padding:16px; }'
    + '.ligne { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid #f0f0f0; font-size:13px; }'
    + '.ligne:last-child { border-bottom:none; }'
    + '.ligne strong { color:#111; }'
    + '.badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; }'
    + '.bar-wrap { margin-bottom:8px; }'
    + '.bar-label { display:flex; justify-content:space-between; font-size:12px; margin-bottom:3px; }'
    + '.bar-bg { background:#e5e7eb; border-radius:4px; height:10px; }'
    + '.bar-fill { border-radius:4px; height:10px; }'
    + 'table { width:100%; border-collapse:collapse; margin-bottom:16px; }'
    + 'thead th { background:#007A3D; color:#fff; padding:9px 12px; text-align:left; font-size:12px; }'
    + 'tbody td { padding:8px 12px; border-bottom:1px solid #f0f0f0; font-size:12px; }'
    + 'tbody tr:nth-child(even) td { background:#f9fafb; }'
    + '.footer { border-top:2px solid #e5e7eb; padding-top:14px; display:flex; justify-content:space-between; align-items:center; margin-top:24px; }'
    + '.footer p { font-size:11px; color:#999; }'
    + '.sign-zone { border:1px dashed #ccc; border-radius:8px; padding:20px; text-align:center; color:#999; font-size:12px; margin-top:20px; }'
    + '@media print { body { print-color-adjust:exact; -webkit-print-color-adjust:exact; } }'
    + '</style></head><body><div class="page">'

    // EN-TETE
    + '<div class="header">'
    + '<div>'
    + '<div class="logo">Super<span>Marché</span> CM</div>'
    + '<div style="font-size:13px;color:#555;margin-top:4px;font-weight:600">' + smNom + (smVille?' — '+smVille:'') + '</div>'
    + '<div style="font-size:11px;color:#999;margin-top:2px">Gérant : ' + gerantNom + '</div>'
    + '</div>'
    + '<div style="text-align:right">'
    + '<div style="font-size:20px;font-weight:800;color:#333">RAPPORT DE GESTION</div>'
    + '<div style="font-size:14px;color:#007A3D;font-weight:700;margin-top:4px">' + mois[now.getMonth()] + ' ' + now.getFullYear() + '</div>'
    + '<div style="font-size:11px;color:#999;margin-top:4px">Généré le ' + now.toLocaleDateString('fr-FR') + ' à ' + now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) + '</div>'
    + '</div></div>'

    // KPIs
    + '<h2>Indicateurs clés du mois</h2>'
    + '<div class="kpis">'
    + '<div class="kpi"><div class="kpi-val">' + (caMensuel>=1000000?(caMensuel/1000000).toFixed(1)+'M':Math.round(caMensuel/1000)+'K') + ' F</div><div class="kpi-lbl">CA ce mois</div><div class="kpi-sub">'+(evol>=0?'+':'')+evol+'% vs mois préc.</div></div>'
    + '<div class="kpi bleu"><div class="kpi-val">' + nbCmdsMois + '</div><div class="kpi-lbl">Commandes livrées</div><div class="kpi-sub">ce mois</div></div>'
    + '<div class="kpi orange"><div class="kpi-val">' + (panierMoyen>=1000?Math.round(panierMoyen/1000)+'K':panierMoyen) + ' F</div><div class="kpi-lbl">Panier moyen</div><div class="kpi-sub">par commande</div></div>'
    + '<div class="kpi rouge"><div class="kpi-val">' + prodsRupture + '</div><div class="kpi-lbl">Ruptures de stock</div><div class="kpi-sub">' + prodsCritique + ' en stock critique</div></div>'
    + '</div>'

    // GRAPHIQUE CA MENSUEL
    + '<h2>Chiffre d\'affaires mensuel</h2>'
    + '<div class="bloc" style="margin-bottom:20px">'
    + '<svg width="100%" viewBox="0 0 '+(svgW)+' '+svgH+'" xmlns="http://www.w3.org/2000/svg">' + bars + '</svg>'
    + '</div>'

    // COMMANDES + STOCK
    + '<div class="twocols">'
    + '<div class="bloc"><div style="font-weight:700;margin-bottom:10px;font-size:14px">Commandes par statut</div>'
    + '<div class="ligne"><span>En attente</span><strong style="color:#f59e0b">'+nbAttente+'</strong></div>'
    + '<div class="ligne"><span>Confirmées</span><strong style="color:#3b82f6">'+nbConfirm+'</strong></div>'
    + '<div class="ligne"><span>En livraison</span><strong style="color:#f59e0b">'+nbLivraison+'</strong></div>'
    + '<div class="ligne"><span>Livrées</span><strong style="color:#007A3D">'+nbLivrees+'</strong></div>'
    + '<div class="ligne"><span>Annulées</span><strong style="color:#ef4444">'+nbAnnulees+'</strong></div>'
    + '<div class="ligne" style="border-top:2px solid #e5e7eb;margin-top:4px;padding-top:8px"><span><strong>Total</strong></span><strong>'+CMDS.length+'</strong></div>'
    + '</div>'
    + '<div class="bloc"><div style="font-weight:700;margin-bottom:10px;font-size:14px">État des stocks</div>'
    + '<div class="ligne"><span>Produits en stock</span><strong style="color:#007A3D">'+prodsOk+'</strong></div>'
    + '<div class="ligne"><span>Stock critique (≤5)</span><strong style="color:#f59e0b">'+prodsCritique+'</strong></div>'
    + '<div class="ligne"><span>Ruptures de stock</span><strong style="color:#ef4444">'+prodsRupture+'</strong></div>'
    + '<div class="ligne"><span>Total produits</span><strong>'+PRODS.length+'</strong></div>'
    + '<div class="ligne"><span>Unités en stock</span><strong>'+stockTotal.toLocaleString('fr-FR')+'</strong></div>'
    + '<div class="ligne" style="border-top:2px solid #e5e7eb;margin-top:4px;padding-top:8px"><span>CA total cumulé</span><strong style="color:#007A3D">'+(caTotal>=1000000?(caTotal/1000000).toFixed(1)+'M':Math.round(caTotal/1000)+'K')+' F</strong></div>'
    + '</div></div>'

    // TOP CATEGORIES
    + (topCats.length > 0 ? '<h2>Top catégories par ventes</h2><div class="bloc" style="margin-bottom:20px">'
    + topCats.map(function(cat, i) {
        var pct = Math.round(catVentes[cat]/totalVentes*100);
        return '<div class="bar-wrap">'
          + '<div class="bar-label"><span>' + cat + '</span><span style="font-weight:700;color:'+catColors[i]+'">' + pct + '% — ' + catVentes[cat].toLocaleString('fr-FR') + ' FCFA</span></div>'
          + '<div class="bar-bg"><div class="bar-fill" style="width:'+pct+'%;background:'+catColors[i]+'"></div></div>'
          + '</div>';
      }).join('')
    + '</div>' : '')

    // TOP PRODUITS
    + (topProds.length > 0 ? '<h2>Top 8 produits les plus vendus</h2>'
    + '<table><thead><tr><th>#</th><th>Produit</th><th style="text-align:right">CA généré</th></tr></thead><tbody>'
    + topProds.map(function(nom, i) {
        return '<tr><td style="color:#007A3D;font-weight:700">' + (i+1) + '</td>'
          + '<td>' + nom + '</td>'
          + '<td style="text-align:right;font-weight:700">' + prodVentes[nom].toLocaleString('fr-FR') + ' FCFA</td></tr>';
      }).join('')
    + '</tbody></table>' : '')

    // ZONE SIGNATURE
    + '<div class="twocols" style="margin-top:20px">'
    + '<div class="sign-zone">Signature du gérant<br><br><br>___________________</div>'
    + '<div class="sign-zone">Cachet du supermarché<br><br><br></div>'
    + '</div>'

    // PIED DE PAGE
    + '<div class="footer">'
    + '<p>SuperMarché CM — Rapport confidentiel<br>Tel : +237 683 39 22 68 | WhatsApp : +237 693 59 14 79</p>'
    + '<p style="text-align:right">Page 1/1<br>' + now.getFullYear() + ' SuperMarché CM</p>'
    + '</div>'
    + '</div></body></html>';

  // Lancer l'impression via iframe (sans popup)
  lancerImpression(html);
}

// ── Impression via iframe (contourne le blocage popups) ──
function lancerImpression(html) {
  // Supprimer l'iframe précédent s'il existe
  var old = document.getElementById('print-iframe');
  if (old) old.parentNode.removeChild(old);

  var iframe = document.createElement('iframe');
  iframe.id = 'print-iframe';
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:0;height:0;border:none;visibility:hidden';
  document.body.appendChild(iframe);

  var doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.onload = function() {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch(e) {
      // Fallback : window.open si iframe échoue (Safari)
      var win = window.open('', '_blank');
      if (win) { win.document.write(html); win.document.close(); win.focus(); setTimeout(function(){ win.print(); }, 400); }
      else { toast('Activez les popups pour imprimer', 'error'); }
    }
    // Nettoyer après impression
    setTimeout(function(){
      if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 3000);
  };
}

// ── Render Utilisateurs ──
function renderUtilisateurs() {
  var tbody = document.getElementById('users-tbody');
  if (!tbody) return;
  var roleColors = {
    'administrateur': '#CE1126', 'Administrateur': '#CE1126',
    'Gérant(e)': '#007A3D', 'Directeur(trice)': '#007A3D', 'Propriétaire': '#007A3D',
    'Caissier(e)': '#1d4ed8',
    'Livreur': '#b45309'
  };
  var users = ACCOUNTS || [];
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;color:#999">Aucun utilisateur enregistré</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(function(u, i) {
    var couleur = roleColors[u.role] || '#6b7280';
    var initiale = ((u.prenom || u.nom || '?')[0]).toUpperCase();
    var isAdmin = u.email && u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    return '<tr style="border-bottom:1px solid #f0f0f0">'
      + '<td style="padding:10px;display:flex;align-items:center;gap:8px">'
      + '<div style="width:32px;height:32px;border-radius:50%;background:'+couleur+';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">'+initiale+'</div>'
      + '<span style="font-weight:600">'+(u.prenom||'')+' '+(u.nom||'')+'</span></td>'
      + '<td style="padding:10px;color:#666;font-size:12px">'+(u.email||'—')+'</td>'
      + '<td style="padding:10px"><span style="background:'+couleur+';color:#fff;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700">'+(isAdmin?'Administrateur':u.role||'—')+'</span></td>'
      + '<td style="padding:10px;font-size:12px;color:#555">'+(u.sm||'—')+'</td>'
      + '<td style="padding:10px"><span style="background:#dcfce7;color:#007A3D;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700">Actif</span></td>'
      + '<td style="padding:10px;font-size:12px;color:#999">'+(u.lastLogin || 'Jamais')+'</td>'
      + '<td style="padding:10px">'
      + (!isAdmin ? '<button class="btn bd bsm" onclick="supprimerUtilisateur('+i+')">Supprimer</button>' : '<span style="color:#999;font-size:11px">Admin</span>')
      + '</td></tr>';
  }).join('');
}

function supprimerUtilisateur(index) {
  if (!confirm('Supprimer cet utilisateur ?')) return;
  ACCOUNTS.splice(index, 1);
  try { localStorage.setItem('sm_accounts', JSON.stringify(ACCOUNTS)); } catch(e) {}
  renderUtilisateurs();
  toast('Utilisateur supprimé', 'success');
}

function renderGerants() {
  var container = document.getElementById('gerants-liste');
  if (!container) return;
  var gerants = ACCOUNTS.filter(function(a){ return a.email !== 'lembetiny02@gmail.com'; });
  if (gerants.length === 0) {
    container.innerHTML = '<p style="color:#999;text-align:center;padding:12px">Aucun gérant inscrit pour l\'instant</p>';
    return;
  }
  container.innerHTML = gerants.map(function(g, i) {
    var initiale = (g.prenom || g.nom || '?')[0].toUpperCase();
    var couleurs = ['#007A3D','#3b82f6','#f59e0b','#8b5cf6','#ec4899'];
    var bg = couleurs[i % couleurs.length];
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:8px">' +
      '<div style="display:flex;align-items:center;gap:12px">' +
        '<div style="width:38px;height:38px;border-radius:50%;background:' + bg + ';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px">' + initiale + '</div>' +
        '<div>' +
          '<div style="font-weight:700;font-size:14px">' + (g.prenom||'') + ' ' + (g.nom||'') + '</div>' +
          '<div style="font-size:12px;color:#888">' + g.email + ' — ' + g.role + '</div>' +
          '<div style="font-size:11px;color:#007A3D">' + (g.sm||'') + '</div>' +
        '</div>' +
      '</div>' +
      '<span style="font-size:11px;padding:3px 10px;border-radius:20px;background:#dcfce7;color:#007A3D;font-weight:700">Actif</span>' +
    '</div>';
  }).join('');
}

// ═══════════════ RÉSEAUX SOCIAUX ═══════════════
function renderReseaux() {
  var clients = [];
  try { clients = JSON.parse(localStorage.getItem('sm_clients') || '[]'); } catch(e) {}
  var cmdLivrees = CMDS.filter(function(c){ return c.statut === 'livree'; }).length;
  var villes = STORES ? [...new Set(STORES.map(function(s){ return s.ville; }))].length : 0;

  var el;
  el = document.getElementById('ss-clients');   if(el) el.textContent = clients.length || '0';
  el = document.getElementById('ss-commandes'); if(el) el.textContent = cmdLivrees || '0';
  el = document.getElementById('ss-villes');    if(el) el.textContent = villes || '0';
}

// ═══════════════ ASSISTANT IA ═══════════════
var AI_MSGS = [];
var AI_THINKING = false;

function getAppContext() {
  // Données RÉELLES calculées en temps réel
  var ruptures   = PRODS.filter(function(p){ return p.stock === 0; });
  var critiques  = PRODS.filter(function(p){ return p.stock > 0 && p.stock < 10; });
  var cmdActives = CMDS.filter(function(c){ return ['en_attente','confirmee','livraison'].includes(c.statut); });
  var cmdAttente = CMDS.filter(function(c){ return c.statut === 'en_attente'; });
  var cmdLivrees = CMDS.filter(function(c){ return c.statut === 'livree'; });

  // CA mensuel réel
  var now = new Date();
  var caMensuel = 0;
  CMDS.forEach(function(cmd) {
    if (cmd.statut === 'livree' || cmd.statut === 'confirmee') {
      try {
        var parts = (cmd.date || '').split('/');
        if (parseInt(parts[1]) - 1 === now.getMonth() && parseInt(parts[2]) === now.getFullYear())
          caMensuel += cmd.total || 0;
      } catch(e) {}
    }
  });
  var caStr = caMensuel >= 1000000
    ? (caMensuel / 1000000).toFixed(1) + ' millions'
    : caMensuel >= 1000
    ? Math.round(caMensuel / 1000) + ' milliers'
    : caMensuel + '';

  // Supermarchés réels
  var smActifs = STORES ? STORES.filter(function(s){ return s.statut !== 'ferme'; }).length : 0;
  var smVilles = STORES ? [...new Set(STORES.map(function(s){ return s.ville; }))].join(', ') : '';

  // Employés réels depuis localStorage
  var employes = [];
  try { employes = JSON.parse(localStorage.getItem('sm_employes') || '[]'); } catch(e) {}

  // Fournisseurs réels depuis localStorage
  var fournisseurs = [];
  try { fournisseurs = JSON.parse(localStorage.getItem('sm_fournisseurs') || '[]'); } catch(e) {}

  // Clients boutique
  var clients = [];
  try { clients = JSON.parse(localStorage.getItem('sm_clients') || '[]'); } catch(e) {}

  // Top produits vendus
  var topProds = {};
  CMDS.forEach(function(cmd) {
    if (cmd.items) cmd.items.forEach(function(item) {
      topProds[item.nom] = (topProds[item.nom] || 0) + (item.qty || 1);
    });
  });
  var topList = Object.keys(topProds).sort(function(a,b){ return topProds[b]-topProds[a]; }).slice(0,3);

  return "Tu es l'Assistant IA de SuperMarché CM, expert en gestion de supermarchés au Cameroun." +
    " Réponds toujours en français, de façon concise avec des recommandations pratiques adaptées au contexte camerounais (FCFA, Mobile Money, marchés locaux)." +
    '\n\n=== DONNÉES RÉELLES EN TEMPS RÉEL ===' +
    '\n📦 STOCKS :' +
    '\n- Total produits catalogue : ' + PRODS.length +
    '\n- Ruptures de stock : ' + ruptures.length + (ruptures.length > 0 ? ' (' + ruptures.map(function(p){ return p.nom; }).join(', ') + ')' : ' ✅') +
    '\n- Stock critique (<10 unités) : ' + critiques.length + (critiques.length > 0 ? ' (' + critiques.map(function(p){ return p.nom + '(' + p.stock + 'u)'; }).join(', ') + ')' : '') +
    '\n\n📊 COMMANDES :' +
    '\n- Actives : ' + cmdActives.length +
    '\n- En attente confirmation : ' + cmdAttente.length +
    '\n- Livrées total : ' + cmdLivrees.length +
    '\n- CA ce mois : ' + caStr + ' FCFA' +
    '\n\n🏪 SUPERMARCHÉS :' +
    '\n- Actifs : ' + smActifs + (smVilles ? ' (' + smVilles + ')' : '') +
    '\n\n👥 ÉQUIPE & CLIENTS :' +
    '\n- Employés enregistrés : ' + (employes.length > 0 ? employes.length : 'non encore ajoutés') +
    '\n- Fournisseurs : ' + (fournisseurs.length > 0 ? fournisseurs.length : 'non encore ajoutés') +
    '\n- Clients boutique inscrits : ' + clients.length +
    (topList.length > 0 ? '\n\n🏆 TOP PRODUITS VENDUS : ' + topList.join(', ') : '') +
    '\n\n💡 Réponds en te basant uniquement sur ces données réelles. Si une donnée est à 0 ou manquante, dis-le et propose des actions concrètes.';
}

function showWelcomeMsg() {
  var msgs = document.getElementById('ai-msgs'); if (!msgs) return;
  var now = new Date();
  var timeStr = now.getHours()+':'+String(now.getMinutes()).padStart(2,'0');
  var el = document.createElement('div'); el.className = 'msg ai';
  el.innerHTML = '<div class="msg-ava ai-ava-sm"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=40&h=40&fit=crop" style="width:100%;height:100%;border-radius:50%;object-fit:cover"></div><div><div class="msg-bub">Bonjour ! Je suis votre <strong>Assistant IA SuperMarché CM</strong>, propulsé par Claude.<br><br>Je connais vos données en temps réel — stocks, ventes, commandes — et peux vous aider à prendre de meilleures décisions. Que souhaitez-vous analyser ?</div><div class="msg-time">'+timeStr+'</div></div>';
  msgs.appendChild(el);
  AI_MSGS.push({role:'assistant', content:'Bonjour ! Je suis votre Assistant IA. Que souhaitez-vous analyser ?'});
}

function askAI(question) {
  goPage('ia');
  setTimeout(function(){ var inp=document.getElementById('ai-inp'); if(inp){ inp.value=question; sendAI(); } }, 200);
}

function clearChat() {
  AI_MSGS = [];
  var msgs = document.getElementById('ai-msgs'); if (msgs) msgs.innerHTML = '';
  showWelcomeMsg();
  toast('Conversation effacée', 'success');
}

function aiKeyDown(e) { if (e.key==='Enter'&&!e.shiftKey) { e.preventDefault(); sendAI(); } }

async function sendAI() {
  var inp = document.getElementById('ai-inp');
  var sendBtn = document.getElementById('ai-send-btn');
  var msgs = document.getElementById('ai-msgs');
  if (!inp||!msgs||AI_THINKING) return;
  var question = inp.value.trim(); if (!question) return;
  inp.value = ''; inp.style.height = '44px';
  AI_THINKING = true; if (sendBtn) sendBtn.disabled = true;
  var now = new Date();
  var timeStr = now.getHours()+':'+String(now.getMinutes()).padStart(2,'0');
  var initials = currentUser ? ((currentUser.prenom||currentUser.nom||'V')[0]).toUpperCase() : 'V';
  var userEl = document.createElement('div'); userEl.className = 'msg user';
  userEl.innerHTML = '<div class="msg-ava" style="background:var(--y);color:var(--gd);font-weight:700;font-size:11px">'+initials+'</div><div><div class="msg-bub">'+question.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div><div class="msg-time">'+timeStr+'</div></div>';
  msgs.appendChild(userEl); msgs.scrollTop = msgs.scrollHeight;
  AI_MSGS.push({role:'user', content:question});
  var typingEl = document.createElement('div'); typingEl.className = 'msg ai';
  typingEl.innerHTML = '<div class="msg-ava ai-ava-sm"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=40&h=40&fit=crop" style="width:100%;height:100%;border-radius:50%;object-fit:cover"></div><div><div class="msg-bub"><div class="tdots"><span></span><span></span><span></span></div></div></div>';
  msgs.appendChild(typingEl); msgs.scrollTop = msgs.scrollHeight;
  try {
    // Appel via notre backend Railway (évite les problèmes CORS)
    var BACKEND_URL = 'https://supermarche-cm-backend-production.up.railway.app';
    var response = await fetch(BACKEND_URL + '/ia/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        messages: AI_MSGS.filter(function(m){ return m.content; }),
        context:  getAppContext()
      })
    });
    var data = await response.json();
    var reply = data.ok ? data.reply : 'Erreur : ' + (data.error || 'Vérifiez que le backend Railway est déployé.');
    typingEl.remove();
    var aiEl = document.createElement('div'); aiEl.className = 'msg ai';
    aiEl.innerHTML = '<div class="msg-ava ai-ava-sm"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=40&h=40&fit=crop" style="width:100%;height:100%;border-radius:50%;object-fit:cover"></div><div><div class="msg-bub">'+reply.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')+'</div><div class="msg-time">'+timeStr+'</div></div>';
    msgs.appendChild(aiEl); msgs.scrollTop = msgs.scrollHeight;
    AI_MSGS.push({role:'assistant', content:reply});
  } catch(err) {
    typingEl.remove();
    var errEl2 = document.createElement('div'); errEl2.className = 'msg ai';
    errEl2.innerHTML = '<div class="msg-ava ai-ava-sm"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=40&h=40&fit=crop" style="width:100%;height:100%;border-radius:50%;object-fit:cover"></div><div><div class="msg-bub">Impossible de contacter l\'IA. Vérifiez votre connexion internet.</div></div>';
    msgs.appendChild(errEl2); msgs.scrollTop = msgs.scrollHeight;
  }
  AI_THINKING = false; if (sendBtn) sendBtn.disabled = false; if (inp) inp.focus();
}


// ═══════════════════════════════════════════════════════
//  TABLEAU DE BORD DYNAMIQUE — renderDashboard()
//  Calcule toutes les stats en temps réel depuis les données
// ═══════════════════════════════════════════════════════
function renderDashboard() {

  // ── 1. Supermarchés actifs ──
  var smActifs = STORES ? STORES.filter(function(s){ return s.statut !== 'ferme'; }).length : 0;
  var smTotal  = STORES ? STORES.length : 0;
  setDash('dash-supermarches', smActifs);
  setDash('dash-supermarches-sub', smTotal + ' au total');

  // ── 2. CA mensuel (somme des commandes livrées ce mois) ──
  var maintenant = new Date();
  var moisCourant = maintenant.getMonth();
  var anneeCourante = maintenant.getFullYear();
  var caMensuel = 0;
  var cmdsMois = 0;
  if (typeof CMDS !== 'undefined') {
    CMDS.forEach(function(cmd) {
      if (cmd.statut === 'livree' || cmd.statut === 'confirmee') {
        try {
          var parts = (cmd.date || '').split('/');
          if (parts.length >= 3) {
            var mCmd = parseInt(parts[1]) - 1;
            var aCmd = parseInt(parts[2]);
            if (mCmd === moisCourant && aCmd === anneeCourante) {
              caMensuel += cmd.total || 0;
              cmdsMois++;
            }
          }
        } catch(e) {}
      }
    });
  }
  var caStr = caMensuel >= 1000000
    ? (caMensuel / 1000000).toFixed(1) + 'M'
    : caMensuel >= 1000
    ? Math.round(caMensuel / 1000) + 'K'
    : caMensuel.toLocaleString('fr-FR');
  setDash('dash-ca', caStr + ' F');
  setDash('dash-ca-sub', cmdsMois + ' commande(s) ce mois');

  // ── 3. Ruptures de stock ──
  var ruptures = 0;
  var critique = 0;
  if (typeof PRODS !== 'undefined') {
    PRODS.forEach(function(p) {
      if (p.stock === 0) ruptures++;
      else if (p.stock < 10) critique++;
    });
  }
  setDash('dash-ruptures', ruptures);
  var ruptSub = document.getElementById('dash-ruptures-sub');
  var ruptVal = document.getElementById('dash-ruptures');
  if (ruptVal) ruptVal.style.color = ruptures > 0 ? '#ef4444' : '#007A3D';
  if (ruptSub) {
    ruptSub.textContent = ruptures > 0 ? 'Attention requise !' : critique + ' stock(s) critique(s)';
    ruptSub.className   = 'schg ' + (ruptures > 0 ? 'sdn' : critique > 0 ? '' : 'sup');
  }

  // ── 4. Commandes actives ──
  var cmdsActives = 0;
  var cmdsAttente = 0;
  if (typeof CMDS !== 'undefined') {
    CMDS.forEach(function(cmd) {
      if (['en_attente','confirmee','livraison'].includes(cmd.statut)) cmdsActives++;
      if (cmd.statut === 'en_attente') cmdsAttente++;
    });
  }
  setDash('dash-commandes', cmdsActives);
  var cmdSub = document.getElementById('dash-commandes-sub');
  if (cmdSub) {
    cmdSub.textContent = cmdsAttente > 0 ? cmdsAttente + ' en attente !' : 'en cours';
    cmdSub.className   = 'schg ' + (cmdsAttente > 0 ? 'sdn' : 'sup');
  }

  // ── 5. Clients inscrits (depuis boutique) ──
  var clients = [];
  try { clients = JSON.parse(localStorage.getItem('sm_clients') || '[]'); } catch(e) {}
  setDash('dash-clients', clients.length);
  setDash('dash-clients-sub', clients.length > 0 ? '+' + clients.length + ' inscrits' : 'aucun encore');

  // ── 6. Total produits en catalogue ──
  var totalProds = typeof PRODS !== 'undefined' ? PRODS.length : 0;
  var dispo = typeof PRODS !== 'undefined' ? PRODS.filter(function(p){ return p.stock > 0; }).length : 0;
  setDash('dash-produits', totalProds);
  setDash('dash-produits-sub', dispo + ' disponibles');

  // ── 7. Mettre à jour les stats mini dans la page IA ──
  updateAIStats();

  // ── 8. Barres graphiques dynamiques (ventes semaine) ──
  renderVentesGraph();
}

function setDash(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function renderVentesGraph() {
  // Calculer ventes des 7 derniers jours
  var jours = [];
  var maintenant = new Date();
  for (var i = 6; i >= 0; i--) {
    var d = new Date(maintenant);
    d.setDate(d.getDate() - i);
    var dd = String(d.getDate()).padStart(2,'0');
    var mm = String(d.getMonth()+1).padStart(2,'0');
    var yyyy = d.getFullYear();
    var dateStr = dd + '/' + mm + '/' + yyyy;
    var total = 0;
    if (typeof CMDS !== 'undefined') {
      CMDS.forEach(function(cmd) {
        if ((cmd.date||'').startsWith(dd+'/'+mm) && (cmd.statut==='livree'||cmd.statut==='confirmee')) {
          total += cmd.total || 0;
        }
      });
    }
    jours.push(Math.round(total / 1000)); // En milliers
  }
  var max = Math.max.apply(null, jours.concat([1]));
  if (typeof makeBars === 'function') {
    makeBars('weekBars', jours, function(i){ return i===6?'var(--y)':'var(--g)'; });
  }
}

function updateAIStats() {
  // Stats dynamiques dans la page IA
  var ruptures = typeof PRODS !== 'undefined' ? PRODS.filter(function(p){ return p.stock===0; }) : [];
  var critiques = typeof PRODS !== 'undefined' ? PRODS.filter(function(p){ return p.stock>0 && p.stock<10; }) : [];
  var cmdActives = typeof CMDS !== 'undefined' ? CMDS.filter(function(c){ return ['en_attente','confirmee','livraison'].includes(c.statut); }) : [];
  var clients = [];
  try { clients = JSON.parse(localStorage.getItem('sm_clients')||'[]'); } catch(e) {}

  // CA mensuel réel
  var maintenant = new Date();
  var caMensuel = 0;
  if (typeof CMDS !== 'undefined') {
    CMDS.forEach(function(cmd) {
      if (cmd.statut==='livree' || cmd.statut==='confirmee') {
        try {
          var parts = (cmd.date||'').split('/');
          if (parseInt(parts[1])-1 === maintenant.getMonth() && parseInt(parts[2]) === maintenant.getFullYear())
            caMensuel += cmd.total||0;
        } catch(e) {}
      }
    });
  }
  var caStr = caMensuel >= 1000000 ? (caMensuel/1000000).toFixed(1)+'M' : Math.round(caMensuel/1000)+'K';

  // Mettre à jour l'interface IA
  var els = {
    'ia-ca': caStr + ' FCFA',
    'ia-clients': clients.length + ' inscrit(s)',
    'ventes-ca-mois': caStr,
    'ventes-ca-sub': cmdActives.length + ' commandes actives'
  };
  Object.keys(els).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = els[id];
  });

  // Mettre à jour le contexte IA
  var nbRuptures = document.getElementById('ai-nb-ruptures');
  var nbCritiques = document.getElementById('ai-nb-critiques');
  var nbCmds = document.getElementById('ai-nb-cmds');
  if (nbRuptures) nbRuptures.textContent = ruptures.length;
  if (nbCritiques) nbCritiques.textContent = critiques.length;
  if (nbCmds) nbCmds.textContent = cmdActives.length;
}

document.addEventListener('input', function(e){
  if (e.target&&e.target.classList.contains('ai-inp')) {
    e.target.style.height='44px'; e.target.style.height=Math.min(e.target.scrollHeight,110)+'px';
  }
});

// ═══════════════ FAQ ═══════════════
var FAQ_DATA = [
  {cat:'compte', q:'Comment créer mon compte SuperMarché CM ?', a:'<p>Cliquez sur <strong>"Créer un compte gratuit"</strong> depuis la page de connexion, remplissez vos informations et choisissez un mot de passe sécurisé. Connexion automatique après validation.</p>'},
  {cat:'compte', q:'Comment me connecter à mon compte ?', a:'<p>Entrez votre <strong>adresse e-mail</strong> et votre <strong>mot de passe</strong>, puis cliquez sur "Se connecter". Pour une démo sans compte, cliquez sur le bouton <strong>"Démo sans inscription"</strong>.</p>'},
  {cat:'compte', q:"J'ai oublié mon mot de passe. Comment le récupérer ?", a:'<p>Cliquez sur "Mot de passe oublié ?" sur la page de connexion. Vous recevrez un lien de réinitialisation par email dans les 5 minutes.</p>'},
  {cat:'compte', q:'Puis-je gérer plusieurs supermarchés avec un seul compte ?', a:'<p>Oui. Depuis votre tableau de bord, administrez plusieurs supermarchés avec leurs propres données. Allez dans <strong>Supermarchés → Ajouter</strong>.</p>'},
  {cat:'commande', q:'Comment passer une commande ?', a:'<p>Via le module <strong>Achats</strong> : parcourez le catalogue avec les vraies photos des produits, ajoutez au panier, confirmez ou réservez. Vous recevez une confirmation par SMS et WhatsApp.</p>'},
  {cat:'commande', q:'Quelle est la différence entre "Achat" et "Réservation" ?', a:'<p><strong>Achat :</strong> paiement immédiat, commande préparée tout de suite.<br><strong>Réservation :</strong> produits mis de côté, paiement à la livraison ou au retrait. Badge bleu dans votre liste.</p>'},
  {cat:'commande', q:'Comment suivre ma commande ?', a:'<p>Page <strong>Commandes</strong>, statuts en temps réel :<br>En attente → Confirmée → En livraison → Livrée</p>'},
  {cat:'commande', q:'Puis-je annuler une commande ?', a:'<ul><li><strong>En attente :</strong> annulation gratuite</li><li><strong>Confirmée :</strong> frais de 1 000 FCFA</li><li><strong>En livraison :</strong> impossible</li></ul>'},
  {cat:'livraison', q:'Quelles sont les zones de livraison ?', a:'<p>8 villes : Yaoundé, Douala (express 2-4h) · Bafoussam, Garoua, Maroua, Ngaoundéré (24h) · Kribi, Limbé (48h). Zones rurales : devis sur demande.</p>'},
  {cat:'livraison', q:'Combien coûte la livraison ?', a:'<ul><li>Zone 1 centre-ville : 2 000 FCFA</li><li>Zone 2 périphérie : 3 500 FCFA</li><li>Zone 3 grandes villes : 5 000 FCFA</li><li>Zone 4 villes secondaires : 7 500 FCFA</li></ul><p style="background:#E8F5EF;padding:8px;border-radius:6px;margin-top:6px"><strong>Gratuit</strong> pour commandes ≥ 50 000 FCFA (zones 1 & 2)</p>'},
  {cat:'livraison', q:'Quels sont les horaires de livraison ?', a:'<ul><li>Lundi — Samedi : 8h à 20h</li><li>Dimanche : 9h à 17h (zones principales)</li><li>Jours fériés : service réduit</li></ul>'},
  {cat:'paiement', q:'Quels modes de paiement acceptez-vous ?', a:'<ul><li>Espèces à la livraison ou en magasin</li><li>MTN Mobile Money</li><li>Orange Money</li><li>Carte bancaire (Visa, Mastercard)</li><li>Virement bancaire (B2B)</li></ul>'},
  {cat:'paiement', q:'Le paiement Mobile Money est-il sécurisé ?', a:'<p>Oui. Nous utilisons les API officielles de MTN Cameroun et Orange Cameroun. Votre numéro n\'est jamais partagé avec des tiers.</p>'},
  {cat:'ia', q:"Comment fonctionne l'Assistant IA ?", a:'<p>Propulsé par <strong>Claude d\'Anthropic</strong>, il connaît vos données en temps réel et peut analyser vos performances, recommander des réapprovisionnements et conseiller sur la gestion.</p>'},
  {cat:'ia', q:'Mes conversations avec l\'IA sont-elles confidentielles ?', a:'<p>Oui : chiffrement HTTPS, suppression automatique après 30 jours, jamais utilisées sans consentement pour entraîner des modèles.</p>'},
  {cat:'stock', q:'Comment gérer les alertes de rupture de stock ?', a:'<p>Le tableau de bord affiche toutes les alertes avec les photos des produits. Dans <strong>Produits & Stock</strong>, cliquez sur <strong>Réappro</strong> pour commander 50 unités supplémentaires.</p>'},
  {cat:'technique', q:"L'application fonctionne-t-elle sur mobile ?", a:'<p>Oui, entièrement responsive sur Android, iOS, tablettes et desktop. Application mobile native prévue au 2ème trimestre 2025.</p>'},
  {cat:'technique', q:"Que faire si l'application est lente ou buggée ?", a:'<p>Rechargez la page (F5), videz le cache navigateur, essayez Chrome. Si le problème persiste : support@supermarche.cm</p>'},
];

var currentFaqCat = 'all';
function filterFaq(cat, btn) {
  currentFaqCat = cat;
  document.querySelectorAll('.faq-cat').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderFaq();
}
function renderFaq() {
  var list = document.getElementById('faq-list'); if (!list) return;
  var filtered = currentFaqCat==='all' ? FAQ_DATA : FAQ_DATA.filter(function(f){ return f.cat===currentFaqCat; });
  var icons = {compte:'<img src="https://img.icons8.com/ios/24/007A3D/user.png" alt="utilisateur" style="width:20px;height:20px;vertical-align:middle">', commande:'<img src="https://img.icons8.com/ios/24/007A3D/clipboard.png" alt="liste" style="width:20px;height:20px;vertical-align:middle">', livraison:'<img src="https://img.icons8.com/ios/24/007A3D/delivery-truck.png" alt="livraison" style="width:20px;height:20px;vertical-align:middle">', paiement:'<img src="https://img.icons8.com/ios/24/007A3D/bank-card.png" alt="paiement" style="width:20px;height:20px;vertical-align:middle">', ia:'<img src="https://img.icons8.com/ios/24/007A3D/robot.png" alt="ia" style="width:20px;height:20px;vertical-align:middle">', stock:'<img src="https://img.icons8.com/ios/24/007A3D/box.png" alt="produit" style="width:20px;height:20px;vertical-align:middle">', technique:'<img src="https://img.icons8.com/ios/24/007A3D/settings.png" alt="parametres" style="width:20px;height:20px;vertical-align:middle">'};
  list.innerHTML = filtered.map(function(f,i){
    return '<div class="faq-item" id="faq-'+i+'"><div class="faq-q" onclick="toggleFaq('+i+')"><span class="ico">'+icons[f.cat]+'</span><span style="flex:1">'+f.q+'</span><span class="arr">&#9660;</span></div><div class="faq-a">'+f.a+'</div></div>';
  }).join('');
}
function toggleFaq(i) {
  var el = document.getElementById('faq-'+i); if (!el) return;
  var isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(e){ e.classList.remove('open'); });
  if (!isOpen) el.classList.add('open');
}

// ═══════════════ SYNC BOUTIQUE EN LIGNE ═══════════════
// Charge les commandes passées depuis la boutique client (boutique.html)
async function syncBoutiqueOrders() {
  // Charger depuis Supabase si actif
  if (typeof DB !== 'undefined' && DB.estActif()) {
    try {
      var cmdsDb = await DB.chargerCommandes();
      if (cmdsDb && cmdsDb.length > 0) {
        cmdsDb.forEach(function(cmd) {
          var exists = CMDS.find(function(c){ return c.id === cmd.id; });
          if (!exists) {
            var items = (cmd.items || []).map(function(it) {
              return { nom:it.nom, img:it.img||'https://images.unsplash.com/photo-1542838132-92c53300491e?w=40&h=40&fit=crop', qty:it.qte||it.qty||1, prix:it.prix };
            });
            CMDS.unshift({ id:cmd.id, date:cmd.date, client:cmd.client, tel:cmd.tel, sm:cmd.supermarche||'SuperMarché CM', pay:cmd.paiement||'Mobile Money', statut:cmd.statut||'en_attente', type:'achat', items:items, total:cmd.total||0, notes:(cmd.notes||'')+(cmd.source==='boutique_en_ligne'?' | <img src="https://img.icons8.com/ios/24/007A3D/globe.png" alt="web" style="width:20px;height:20px;vertical-align:middle"> En ligne':'') });
          }
        });
        updateBadgeCmd(); renderCmds();
        return;
      }
    } catch(e) { console.warn('Supabase sync error:', e); }
  }

  // Fallback localStorage
  try {
    var stored = JSON.parse(localStorage.getItem('sm_commandes') || '[]');
    stored.forEach(function(cmd) {
      // Vérifier que la commande n'est pas déjà dans CMDS
      var exists = CMDS.find(function(c){ return c.id === cmd.id; });
      if (!exists && cmd.source === 'boutique_en_ligne') {
        // Adapter le format boutique -> format gérant
        var items = (cmd.items || []).map(function(it) {
          return {
            nom:   it.nom,
            img:   it.img || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=40&h=40&fit=crop',
            qty:   it.qte || it.qty || 1,
            prix:  it.prix
          };
        });
        CMDS.unshift({
          id:     cmd.id,
          date:   cmd.date,
          client: cmd.client,
          tel:    cmd.tel,
          sm:     cmd.supermarche || cmd.sm || 'SuperMarché CM',
          pay:    cmd.paiement || cmd.pay || 'Mobile Money',
          statut: cmd.statut || 'en_attente',
          type:   'achat',
          items:  items,
          total:  cmd.total,
          notes:  (cmd.notes ? cmd.notes + ' | ' : '') + '<img src="https://img.icons8.com/ios/24/007A3D/globe.png" alt="web" style="width:20px;height:20px;vertical-align:middle"> Commande en ligne' + (cmd.ville ? ' — ' + cmd.ville : '') + (cmd.adresse ? ' — ' + cmd.adresse : '')
        });
      }
    });
  } catch(e) { console.warn('Sync boutique:', e); }
}

// Écouter les nouvelles commandes en temps réel (autre onglet)
window.addEventListener('storage', function(e) {
  if (e.key === 'sm_commandes') {
    syncBoutiqueOrders();
    renderCmds();
    updateBadgeCmd();
    toast('Nouvelle commande en ligne reçue !', 'success');
  }
});

// Écoute temps réel Supabase (nouvelles commandes depuis n'importe où)
if (typeof DB !== 'undefined') {
  DB.ecouterNouvellesCommandes(function(nouvelleCmd) {
    toast('<img src="https://img.icons8.com/ios/24/007A3D/shopping-cart.png" alt="panier" style="width:20px;height:20px;vertical-align:middle"> Nouvelle commande en ligne : ' + nouvelleCmd.id, 'success');
    addNotif('Nouvelle commande : ' + nouvelleCmd.client + ' — ' + (nouvelleCmd.total||0).toLocaleString('fr-FR') + ' FCFA', 'green');
    syncBoutiqueOrders();
  });
}

// Lien rapide vers la boutique dans le dashboard
function openBoutique() {
  window.open('boutique.html', '_blank');
}

// ═══════════════ INIT ═══════════════
chargerStoresLocalStorage();
chargerConfig();
initUsers();
initPromos();
initFidelite();
initLivraisons();
if(typeof initLivreurs==="function") { initLivreurs(); if(typeof LIVREURS_DATA !== "undefined") LIVREURS_DATA._init = true; }
initRetours();
syncBoutiqueOrders();
makeBars('weekBars',[32,48,41,55,70,88,44],function(i){ return i===5?'var(--y)':'var(--g)'; });
makeBars('monthBars',[68,75,82,78,0,0,0,0,0,0,0,0],function(i,v){ return v>0?'var(--g)':'rgba(0,0,0,.08)'; });
renderProds(); renderCat(); renderCmds(); updatePanierUI(); updateBadgeCmd(); updateBadgeProd();
renderFaq();
renderStores(); refreshAllSMSelects();
renderUsers();
renderPromos();
renderFideliteClients();
renderLivraisons();
if(typeof renderLivreurs==="function") renderLivreurs();
renderRetours();
renderStatsClients();
renderVueLivreur();
applyRoleRestrictions();
initConfigLivePreview();
