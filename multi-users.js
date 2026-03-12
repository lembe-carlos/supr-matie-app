// ═══════════════════════════════════════════════════════
//  SuperMarché CM — multi-users.js
//  Gestion des roles : Administrateur, Gerant, Caissier, Livreur
// ═══════════════════════════════════════════════════════

// Email de l'administrateur principal — acces total
var ADMIN_EMAIL = 'lembetiny02@gmail.com';

var USERS = {
  comptes: [],
  seq: 1,
  currentUser: null,

  // Permissions par role
  permissions: {

    // Administrateur : acces total sans restriction
    administrateur: [
      'dashboard','supermarches','produits','achats','commandes','ventes',
      'employes','fournisseurs','rapports','ia','reseaux','livraison',
      'confidentialite','faq','parametres','livraisons-admin','promotions',
      'fidelite','utilisateurs','retours','stats-clients','livreurs','invitations'
    ],

    // Gerant : gestion quotidienne — sans Parametres, Utilisateurs, Invitations, Reseaux
    gerant: [
      'dashboard','supermarches','produits','achats','commandes','ventes',
      'employes','fournisseurs','rapports','ia','livraison',
      'confidentialite','faq','livraisons-admin','promotions',
      'fidelite','retours','stats-clients','livreurs'
    ],

    // Caissier : encaissement uniquement
    caissier: [
      'dashboard','achats','commandes','ventes','fidelite'
    ],

    // Livreur : ses livraisons uniquement
    livreur: [
      'livraisons-livreur'
    ]
  }
};

// ── Initialisation ──
function initUsers() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_users') || 'null');
    if (saved && saved.comptes) {
      USERS.comptes = saved.comptes;
      USERS.seq = saved.seq || 1;
    }
    var cu = JSON.parse(sessionStorage.getItem('sm_current_user') || 'null');
    if (cu) USERS.currentUser = cu;
  } catch(e) {}
}

// ── Sauvegarde ──
function saveUsers() {
  try {
    localStorage.setItem('sm_users', JSON.stringify({
      comptes: USERS.comptes,
      seq: USERS.seq
    }));
  } catch(e) {}
}

// ── Determiner le role d'un email ──
function getRoleForEmail(email) {
  if (!email) return null;
  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) return 'administrateur';
  var user = USERS.comptes.find(function(u){
    return u.email.toLowerCase() === email.toLowerCase();
  });
  return user ? user.role : null;
}

// ── Connexion ──
function loginUser(email, pwd) {
  var normalizedEmail = (email || '').trim().toLowerCase();

  // Verifier si c'est l'administrateur
  if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
    // L'admin est dans ACCOUNTS (script.js), on lui assigne le role administrateur
    var adminUser = {
      id: 0,
      nom: 'Administrateur',
      prenom: '',
      email: ADMIN_EMAIL,
      role: 'administrateur',
      sm: 'Tous',
      actif: true,
      derniere_co: new Date().toLocaleString('fr-FR')
    };
    USERS.currentUser = adminUser;
    try { sessionStorage.setItem('sm_current_user', JSON.stringify(adminUser)); } catch(e) {}
    return adminUser;
  }

  // Chercher dans les comptes enregistres
  var user = USERS.comptes.find(function(u){
    return u.email.toLowerCase() === normalizedEmail && u.pwd === pwd && u.actif;
  });
  if (!user) return null;

  user.derniere_co = new Date().toLocaleString('fr-FR');
  USERS.currentUser = user;
  try { sessionStorage.setItem('sm_current_user', JSON.stringify(user)); } catch(e) {}
  saveUsers();
  return user;
}

// ── Deconnexion ──
function logoutUser() {
  USERS.currentUser = null;
  try { sessionStorage.removeItem('sm_current_user'); } catch(e) {}
}

// ── Verifier une permission ──
function hasPermission(page) {
  if (!USERS.currentUser) return false;
  var role = USERS.currentUser.role || 'gerant';
  var perms = USERS.permissions[role] || [];
  return perms.indexOf(page) !== -1;
}

// ── Est-ce l'administrateur ? ──
function isAdmin() {
  return USERS.currentUser &&
    USERS.currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// ── Labels des roles ──
function getRoleLabel(role) {
  var labels = {
    administrateur: 'Administrateur',
    gerant:         'Gerant(e)',
    caissier:       'Caissier(ere)',
    livreur:        'Livreur'
  };
  return labels[role] || role;
}

// ── Badge visuel du role ──
function getRoleBadge(role) {
  var colors = {
    administrateur: '#CE1126',
    gerant:         '#007A3D',
    caissier:       '#1d4ed8',
    livreur:        '#b45309'
  };
  var color = colors[role] || '#666';
  return '<span style="background:' + color + ';color:#fff;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700">'
    + getRoleLabel(role) + '</span>';
}

// ── Appliquer les restrictions visuelles selon le role ──
function applyRoleRestrictions() {
  if (!USERS.currentUser) return;
  var role = USERS.currentUser.role;
  var perms = USERS.permissions[role] || [];

  // Masquer tous les elements de navigation non autorises
  document.querySelectorAll('.nv').forEach(function(el) {
    var onclick = el.getAttribute('onclick') || '';
    // Extraire la page ciblee par cet element de menu
    var match = onclick.match(/goPage\(['"]([^'"]+)['"]\)/);
    if (!match) return;
    var page = match[1];
    if (perms.indexOf(page) === -1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });

  // Livreur : rediriger directement vers ses livraisons
  if (role === 'livreur') {
    goPage('livraisons-livreur');
    return;
  }

  // Caissier : rediriger vers le dashboard
  if (role === 'caissier') {
    goPage('dashboard');
  }

  // Afficher le role dans la sidebar (pied de page)
  var roleEl = document.getElementById('user-role-badge');
  if (roleEl) {
    roleEl.innerHTML = getRoleBadge(role);
  }
}

// ── Bloquer la navigation vers une page non autorisee ──
function goPageSecure(page) {
  if (!USERS.currentUser) return;
  if (!hasPermission(page)) {
    toast('Acces refuse. Vous n\'avez pas les droits pour cette page.', 'error');
    return;
  }
  goPage(page);
}

// ── Affichage du tableau des utilisateurs ──
function renderUsers() {
  var tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  if (USERS.comptes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;padding:20px">Aucun utilisateur enregistre</td></tr>';
    return;
  }

  tbody.innerHTML = USERS.comptes.map(function(u) {
    var isMe = USERS.currentUser && u.id === USERS.currentUser.id;
    return '<tr>'
      + '<td><strong>' + u.nom + '</strong>'
      + (isMe ? ' <span style="color:#007A3D;font-size:11px">(vous)</span>' : '') + '</td>'
      + '<td style="font-size:12px;color:#666">' + u.email + '</td>'
      + '<td>' + getRoleBadge(u.role) + '</td>'
      + '<td style="font-size:12px">' + (u.sm || 'Tous') + '</td>'
      + '<td><span class="badge ' + (u.actif ? 'bgg' : 'bgr') + '">' + (u.actif ? 'Actif' : 'Inactif') + '</span></td>'
      + '<td style="font-size:11px;color:#999">' + (u.derniere_co || 'Jamais') + '</td>'
      + '<td><div style="display:flex;gap:4px">'
      + (!isMe ? '<button class="btn bo bsm" onclick="editUser(' + u.id + ')">Modifier</button>' : '')
      + (!isMe ? '<button class="btn bd bsm" onclick="toggleUser(' + u.id + ')">' + (u.actif ? 'Desactiver' : 'Activer') + '</button>' : '')
      + '</div></td>'
      + '</tr>';
  }).join('');
}

// ── Ajouter un utilisateur ──
function ajouterUser() {
  var nom   = document.getElementById('usr-nom').value.trim();
  var email = document.getElementById('usr-email').value.trim();
  var pwd   = document.getElementById('usr-pwd').value.trim();
  var role  = document.getElementById('usr-role').value;
  var sm    = document.getElementById('usr-sm') ? document.getElementById('usr-sm').value : 'Tous';

  if (!nom || !email || !pwd) {
    toast('Tous les champs obligatoires sont requis', 'warning');
    return;
  }
  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    toast('Cet email est reserve a l\'administrateur', 'error');
    return;
  }
  if (USERS.comptes.find(function(u){ return u.email.toLowerCase() === email.toLowerCase(); })) {
    toast('Un compte existe deja avec cet email', 'error');
    return;
  }

  // Empecher la creation d'un autre administrateur
  if (role === 'administrateur') {
    toast('Le role Administrateur est unique et reserve', 'error');
    return;
  }

  var newUser = {
    id: USERS.seq++,
    nom: nom,
    email: email,
    pwd: pwd,
    role: role,
    sm: sm,
    actif: true,
    derniere_co: null
  };
  USERS.comptes.push(newUser);
  saveUsers();
  renderUsers();
  closeM('m-user');
  toast(nom + ' ajoute comme ' + getRoleLabel(role), 'success');
  ['usr-nom','usr-email','usr-pwd'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// ── Modifier un utilisateur ──
function editUser(id) {
  var u = USERS.comptes.find(function(x){ return x.id === id; });
  if (!u) return;
  document.getElementById('usr-nom').value   = u.nom;
  document.getElementById('usr-email').value = u.email;
  document.getElementById('usr-pwd').value   = u.pwd;
  document.getElementById('usr-role').value  = u.role;
  if (document.getElementById('usr-sm')) document.getElementById('usr-sm').value = u.sm;
  var btn = document.getElementById('usr-save-btn');
  if (btn) { btn.textContent = 'Enregistrer'; btn.onclick = function(){ saveEditUser(id); }; }
  var mh = document.querySelector('#m-user .mh h3');
  if (mh) mh.textContent = 'Modifier l\'utilisateur';
  openM('m-user');
}

// ── Sauvegarder modification ──
function saveEditUser(id) {
  var u = USERS.comptes.find(function(x){ return x.id === id; });
  if (!u) return;
  u.nom   = document.getElementById('usr-nom').value.trim()   || u.nom;
  u.email = document.getElementById('usr-email').value.trim() || u.email;
  u.pwd   = document.getElementById('usr-pwd').value.trim()   || u.pwd;
  u.role  = document.getElementById('usr-role').value;
  u.sm    = document.getElementById('usr-sm') ? document.getElementById('usr-sm').value : u.sm;
  saveUsers();
  renderUsers();
  closeM('m-user');
  toast('Utilisateur modifie avec succes', 'success');
  var btn = document.getElementById('usr-save-btn');
  if (btn) { btn.textContent = 'Ajouter'; btn.onclick = ajouterUser; }
  var mh = document.querySelector('#m-user .mh h3');
  if (mh) mh.textContent = 'Nouvel utilisateur';
}

// ── Activer / Desactiver ──
function toggleUser(id) {
  var u = USERS.comptes.find(function(x){ return x.id === id; });
  if (!u) return;
  u.actif = !u.actif;
  saveUsers();
  renderUsers();
  toast(u.nom + ' ' + (u.actif ? 'active' : 'desactive'), 'success');
}
