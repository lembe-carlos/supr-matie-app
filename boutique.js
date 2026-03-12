
// ═══════════════ CODE PROMO ═══════════════
var promoAppliquee = null;

function appliquerPromoCode() {
  var code = document.getElementById('promo-input').value.trim().toUpperCase();
  var msgEl = document.getElementById('promo-msg');
  var rowEl = document.getElementById('promo-row');
  var redEl = document.getElementById('promo-reduction');
  if (!code) { showPromoMsg('Entrez un code promo', 'error'); return; }

  // Charger promos depuis localStorage (partagé avec le tableau de bord)
  try {
    var saved = JSON.parse(localStorage.getItem('sm_promos') || 'null');
    if (!saved) { showPromoMsg('Code invalide', 'error'); return; }
    var montant = getTotal();
    var promo = saved.liste.find(function(p){ return p.code===code && p.actif; });
    if (!promo) { showPromoMsg('Code promo invalide ou expiré', 'error'); promoAppliquee=null; updateRecap(); return; }
    if (promo.uses >= promo.max_uses) { showPromoMsg('Ce code a atteint sa limite d’utilisation', 'error'); return; }
    if (montant < promo.min_achat) { showPromoMsg('Achat minimum requis : '+promo.min_achat.toLocaleString('fr-FR')+' FCFA', 'error'); return; }
    if (new Date(promo.expire) < new Date()) { showPromoMsg('Code expiré', 'error'); return; }

    var reduction = 0;
    if (promo.type==='pourcentage') reduction = Math.round(montant * promo.valeur / 100);
    if (promo.type==='montant') reduction = Math.min(promo.valeur, montant);
    if (promo.type==='livraison') reduction = 0;

    promoAppliquee = { code:code, promo:promo, reduction:reduction };

    if (rowEl && reduction>0) { rowEl.style.display='flex'; }
    if (redEl) redEl.textContent = '-'+reduction.toLocaleString('fr-FR')+' FCFA';
    showPromoMsg('<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle"> '+promo.desc, 'success');
    updateTotal();
  } catch(e) { showPromoMsg('Erreur lors de la vérification', 'error'); }
}

function showPromoMsg(msg, type) {
  var el = document.getElementById('promo-msg');
  if (!el) return;
  el.style.display = 'block';
  el.style.color = type==='success' ? '#007A3D' : '#ef4444';
  el.textContent = msg;
}

function updateTotal() {
  var sous = getTotal();
  var ville = document.getElementById('cli-ville') ? document.getElementById('cli-ville').value : '';
  var liv = getLivraisonFrais(ville);
  var promo_liv = promoAppliquee && promoAppliquee.promo.type==='livraison' ? liv : 0;
  var reduction = promoAppliquee ? promoAppliquee.reduction : 0;
  var total = sous + liv - reduction - promo_liv;
  var totEl = document.getElementById('pay-total-val');
  if (totEl) totEl.textContent = total.toLocaleString('fr-FR')+' FCFA';
  var totEl2 = document.getElementById('pay-total-esp');
  if (totEl2) totEl2.textContent = total.toLocaleString('fr-FR')+' FCFA';
}


// ── Charger et appliquer la config depuis localStorage ──
function appliquerConfigBoutique() {
  try {
    var cfg = JSON.parse(localStorage.getItem('sm_config') || 'null');
    if (!cfg) return;

    // Footer
    var set = function(id, txt) { var el = document.getElementById(id); if(el) el.innerHTML = txt; };
    var setHtml = function(id, html) { var el = document.getElementById(id); if(el) el.innerHTML = html; };

    if(cfg.nom)     set('footer-nom', cfg.nom);
    if(cfg.desc)    set('footer-desc', cfg.desc);
    if(cfg.adresse) set('footer-adresse', '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg> ' + cfg.adresse);
    if(cfg.tel)     set('footer-tel', '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z\"></path></svg> ' + cfg.tel);
    if(cfg.email)   set('footer-email', '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EC8A0\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:middle;margin-right:5px\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline></svg> ' + cfg.email);
    if(cfg.annee || cfg.nom) {
      var nom = cfg.nom || 'SuperMarché CM';
      var an  = cfg.annee || '2025';
      set('footer-copy', '© ' + an + ' ' + nom + ' — Tous droits réservés <img src="https://flagcdn.com/w20/cm.png" alt="Cameroun" style="width:20px;height:14px;vertical-align:middle">');
    }

    // Magasins dans footer depuis STORES localStorage
    var stores = JSON.parse(localStorage.getItem('sm_stores') || 'null');
    if (stores && stores.length > 0) {
      var mag = document.getElementById('footer-magasins');
      if (mag) mag.innerHTML = stores.map(function(s){
        return '<a href="#">' + s.nom + '</a>';
      }).join('');
    }

    // Bouton WhatsApp flottant
    if (cfg.wa) {
      var btw = document.getElementById('btw');
      if (btw) btw.innerHTML = '<a href="https://wa.me/'+cfg.wa+'" target="_blank" style="display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none;font-size:13px;font-weight:600"><img src="https://img.icons8.com/ios/24/007A3D/chat.png" alt="message" style="width:20px;height:20px;vertical-align:middle"> Commander via WhatsApp</a>';
    }

    // Numéros marchands dans instructions paiement
    if (cfg.mtn) {
      document.querySelectorAll('.mtn-num').forEach(function(el){ el.textContent = cfg.mtn; });
    }
    if (cfg.orange) {
      document.querySelectorAll('.orange-num').forEach(function(el){ el.textContent = cfg.orange; });
    }

  } catch(e) { console.warn('Config boutique non disponible:', e); }
}


// ── Charger les supermarchés depuis localStorage (sync avec tableau de bord) ──
function chargerStoresBoutique() {
  try {
    var stored = JSON.parse(localStorage.getItem('sm_stores') || 'null');
    if (stored && stored.length > 0) {
      // Mettre à jour le select du supermarché préféré
      var sel = document.getElementById('cli-sm');
      if (sel) {
        sel.innerHTML = stored.map(function(s){
          return '<option value="'+s.nom+'">'+s.nom+'</option>';
        }).join('');
      }
    }
  } catch(e) {}
}

// ═══════════════════════════════════════════════════
//  SuperMarché CM — boutique.js
//  Logique boutique publique client
// ═══════════════════════════════════════════════════

// ── Catalogue produits (synchronisé avec script.js) ──
var PRODUITS = [
  { id:1,  nom:'Riz parfumé 25kg',       cat:'Alimentation', prix:18500, stock:87,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { id:2,  nom:'Huile palme 5L',          cat:'Alimentation', prix:6800,  stock:3,   sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
  { id:3,  nom:'Sucre cristal 1kg',       cat:'Alimentation', prix:850,   stock:15,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1581996322890-f59ee5f254c0?w=400&h=400&fit=crop' },
  { id:4,  nom:'Farine de blé 5kg',       cat:'Alimentation', prix:4200,  stock:42,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { id:5,  nom:'Lait Dano 400g',          cat:'Laitiers',     prix:3200,  stock:8,   sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop' },
  { id:6,  nom:'Yaourt Camlait 500g',     cat:'Laitiers',     prix:1200,  stock:34,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop' },
  { id:7,  nom:'Coca-Cola 1.5L',          cat:'Boissons',     prix:950,   stock:120, sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop' },
  { id:8,  nom:'Eau minérale Supermont',  cat:'Boissons',     prix:400,   stock:200, sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop' },
  { id:9,  nom:'Bière Castel 65cl',       cat:'Boissons',     prix:800,   stock:60,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop' },
  { id:10, nom:'Jus Rani Mangue 1L',      cat:'Boissons',     prix:1500,  stock:45,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop' },
  { id:11, nom:'Savon Omo 1kg',           cat:'Hygiène',      prix:2800,  stock:78,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop' },
  { id:12, nom:'Dentifrice Signal 75ml',  cat:'Hygiène',      prix:950,   stock:55,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1559591935-c0cfe8c7e6b8?w=400&h=400&fit=crop' },
  { id:13, nom:'Pain de mie 500g',        cat:'Boulangerie',  prix:1100,  stock:30,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { id:14, nom:'Croissant beurre x6',     cat:'Boulangerie',  prix:2200,  stock:18,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop' },
  { id:15, nom:'Shampoing Pantene 400ml', cat:'Beauté',       prix:4500,  stock:22,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop' },
  { id:16, nom:'Crème Nivea 400ml',       cat:'Beauté',       prix:3800,  stock:40,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { id:17, nom:'Sel iodé 1kg',            cat:'Alimentation', prix:350,   stock:90,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=400&fit=crop' },
  { id:18, nom:'Poisson fumé 500g',       cat:'Alimentation', prix:4500,  stock:25,  sm:'SuperMarché CM',    img:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400&h=400&fit=crop' },
  { id:19, nom:'Tomates fraîches 1kg',    cat:'Alimentation', prix:800,   stock:50,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=400&fit=crop' },
  { id:20, nom:'Café Nescafé 200g',       cat:'Boissons',     prix:3200,  stock:35,  sm:'SuperMarché CM',   img:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop' },
  // ── Numérique ──
  { id:21, nom:'Crédit MTN Mobile Money 5 000F',    cat:'Numérique',          prix:5000,   stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
  { id:22, nom:'Crédit Orange Money 10 000F',        cat:'Numérique',          prix:10000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
  { id:23, nom:'Abonnement Canal+ 1 mois',           cat:'Numérique',          prix:8500,   stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop' },
  { id:24, nom:'Carte Google Play 5 000F',           cat:'Numérique',          prix:5000,   stock:50,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop' },
  { id:25, nom:'Forfait Internet MTN 10Go',          cat:'Numérique',          prix:3500,   stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
  { id:26, nom:'Forfait Internet Orange 5Go',        cat:'Numérique',          prix:2000,   stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
  { id:27, nom:'Abonnement Netflix 1 mois',          cat:'Numérique',          prix:6000,   stock:30,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=400&fit=crop' },
  { id:28, nom:'Antivirus Kaspersky 1 an',           cat:'Numérique',          prix:12000,  stock:20,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=400&fit=crop' },

  // ── Téléphonie ──
  { id:29, nom:'Samsung Galaxy A14 128Go',           cat:'Téléphonie',         prix:95000,  stock:10,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop' },
  { id:30, nom:'Tecno Spark 20 Pro',                 cat:'Téléphonie',         prix:75000,  stock:15,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop' },
  { id:31, nom:'iPhone 13 128Go',                    cat:'Téléphonie',         prix:450000, stock:5,   sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=400&h=400&fit=crop' },
  { id:32, nom:'Infinix Hot 40i',                    cat:'Téléphonie',         prix:55000,  stock:20,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
  { id:33, nom:'Itel A70 64Go',                      cat:'Téléphonie',         prix:35000,  stock:25,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop' },

  // ── Accessoires ──
  { id:34, nom:'Écouteurs Bluetooth TWS Pro',        cat:'Accessoires',        prix:8500,   stock:40,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop' },
  { id:35, nom:'Chargeur Rapide 65W USB-C',          cat:'Accessoires',        prix:6500,   stock:55,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=400&fit=crop' },
  { id:36, nom:'Coque Silicone Samsung A14',         cat:'Accessoires',        prix:2500,   stock:80,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop' },
  { id:37, nom:'Batterie externe 20 000mAh',         cat:'Accessoires',        prix:15000,  stock:30,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop' },
  { id:38, nom:'Support téléphone voiture',          cat:'Accessoires',        prix:3500,   stock:60,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=400&fit=crop' },
  { id:39, nom:'Câble USB-C 2m tressé',              cat:'Accessoires',        prix:2000,   stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=400&fit=crop' },
  { id:40, nom:'Montre connectée Sport',             cat:'Accessoires',        prix:25000,  stock:18,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },

  // ── Formation Digitale ──
  { id:41, nom:'Formation Création de Site Web',     cat:'Formation Digitale', prix:50000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=400&fit=crop' },
  { id:42, nom:'Formation Marketing Digital',        cat:'Formation Digitale', prix:45000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=400&fit=crop' },
  { id:43, nom:'Formation Graphisme Canva & Photoshop', cat:'Formation Digitale', prix:40000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop' },
  { id:44, nom:'Formation Vente en ligne',           cat:'Formation Digitale', prix:35000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop' },
  { id:45, nom:'Formation Réseaux Sociaux Pro',      cat:'Formation Digitale', prix:30000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop' },
  { id:46, nom:'Formation Excel & Google Sheets',    cat:'Formation Digitale', prix:25000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop' },
  { id:47, nom:'Formation Montage Vidéo',            cat:'Formation Digitale', prix:40000,  stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=400&fit=crop' },
  { id:48, nom:'Pack Complet Digital — 5 formations',cat:'Formation Digitale', prix:150000, stock:999, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop' },

  // ── Condiments & Epices ──
  { id:49, nom:'Cube Maggi x100',              cat:'Condiments & Epices', prix:1500,  stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1550411294-2f2e451e74a0?w=400&h=400&fit=crop' },
  { id:50, nom:'Piment rouge séché 200g',      cat:'Condiments & Epices', prix:800,   stock:80,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=400&fit=crop' },
  { id:51, nom:'Poivre noir moulu 100g',       cat:'Condiments & Epices', prix:600,   stock:60,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop' },
  { id:52, nom:'Gingembre en poudre 100g',     cat:'Condiments & Epices', prix:500,   stock:75,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop' },
  { id:53, nom:'Huile d\'arachide 1L',         cat:'Condiments & Epices', prix:1800,  stock:50,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },

  // ── Bebe & Maternite ──
  { id:54, nom:'Couches Pampers taille 3 x40', cat:'Bebe & Maternite', prix:8500,  stock:45,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop' },
  { id:55, nom:'Lait maternisé Aptamil 400g',  cat:'Bebe & Maternite', prix:7500,  stock:30,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop' },
  { id:56, nom:'Lingettes bébé x80',           cat:'Bebe & Maternite', prix:2000,  stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop' },
  { id:57, nom:'Crème bébé Johnson 200ml',     cat:'Bebe & Maternite', prix:3500,  stock:55,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },

  // ── Articles Menagers ──
  { id:58, nom:'Casserole inox 5L',            cat:'Articles Menagers', prix:12000, stock:20,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },
  { id:59, nom:'Balai brosse avec seau',       cat:'Articles Menagers', prix:4500,  stock:35,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=400&fit=crop' },
  { id:60, nom:'Assiettes creuses x6',         cat:'Articles Menagers', prix:5500,  stock:40,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400&h=400&fit=crop' },
  { id:61, nom:'Marmite aluminium 10L',        cat:'Articles Menagers', prix:9000,  stock:18,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop' },

  // ── Eau & Eau Minerale ──
  { id:62, nom:'Eau minérale Supermont 1.5L',  cat:'Eau & Eau Minerale', prix:400,   stock:500, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop' },
  { id:63, nom:'Eau minérale Tangui 1.5L',     cat:'Eau & Eau Minerale', prix:400,   stock:400, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop' },
  { id:64, nom:'Fontaine eau 20L Supermont',   cat:'Eau & Eau Minerale', prix:2500,  stock:80,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop' },
  { id:65, nom:'Pack eau 6x1.5L Tangui',       cat:'Eau & Eau Minerale', prix:2200,  stock:120, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop' },

  // ── Surgeles & Conserves ──
  { id:66, nom:'Thon en conserve 185g',        cat:'Surgeles & Conserves', prix:1200,  stock:150, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&h=400&fit=crop' },
  { id:67, nom:'Sardines à la tomate x2',      cat:'Surgeles & Conserves', prix:900,   stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop' },
  { id:68, nom:'Petits pois en boite 400g',    cat:'Surgeles & Conserves', prix:700,   stock:90,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop' },
  { id:69, nom:'Poulet surgelé 1kg',           cat:'Surgeles & Conserves', prix:4500,  stock:40,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop' },

  // ── Papeterie & Fournitures ──
  { id:70, nom:'Cahier 200 pages grand format', cat:'Papeterie & Fournitures', prix:1200, stock:100, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop' },
  { id:71, nom:'Stylos bille x10 Bic',         cat:'Papeterie & Fournitures', prix:800,  stock:200, sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop' },
  { id:72, nom:'Règle 30cm + équerre',          cat:'Papeterie & Fournitures', prix:500,  stock:80,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
  { id:73, nom:'Cartable scolaire',             cat:'Papeterie & Fournitures', prix:8500, stock:25,  sm:'SuperMarché CM', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
];

// ── État global ──
var panier   = [];
var catActif = '';
var searchQ  = '';
var step     = 1;
var payMode  = 'mtn';
var cmdNumero = '';

// ── Utilitaire : formater prix ──
function fmt(n){ return Number(n).toLocaleString('fr-FR') + ' FCFA'; }

// ── Statut stock ──
function statutStock(p){
  if(p.stock === 0)  return { lbl:'Rupture',    cls:'rupture', disabled:true };
  if(p.stock < 10)   return { lbl:'Stock limité', cls:'faible',  disabled:false };
  return               { lbl:'Disponible',   cls:'dispo',   disabled:false };
}

// ════════ AFFICHAGE PRODUITS ════════


// ════════ SYSTÈME D'AVIS CLIENTS ════════

function getAvisProduit(prodId) {
  try {
    var avis = JSON.parse(localStorage.getItem('sm_avis') || '[]');
    return avis.filter(function(a){ return a.prodId === prodId; });
  } catch(e) { return []; }
}

function getMoyenneAvis(prodId) {
  var avis = getAvisProduit(prodId);
  if (avis.length === 0) return 0;
  var total = avis.reduce(function(s, a){ return s + a.note; }, 0);
  return Math.round((total / avis.length) * 10) / 10;
}

function etoiles(note) {
  var s = '';
  for (var i = 1; i <= 5; i++) {
    s += '<span style="color:' + (i <= note ? '#F5C000' : '#ddd') + ';font-size:16px">★</span>';
  }
  return s;
}

function ouvrirModalAvis(prodId) {
  var prod = PRODUITS.find(function(p){ return p.id === prodId; });
  if (!prod) return;
  var avis = getAvisProduit(prodId);
  var moy  = getMoyenneAvis(prodId);

  var html = '<div class="bmd-ov" onclick="fermerModalAvis()" style="display:flex">' +
    '<div class="bmd-box" onclick="event.stopPropagation()" style="max-width:480px;width:90%;max-height:90vh;overflow-y:auto;border-radius:20px;padding:24px;background:#fff">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">' +
        '<h3 style="font-size:17px;font-weight:800">Avis sur ' + prod.nom + '</h3>' +
        '<button onclick="fermerModalAvis()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#999">×</button>' +
      '</div>' +
      (avis.length > 0 ?
        '<div style="text-align:center;padding:12px;background:#f8fdf9;border-radius:12px;margin-bottom:16px">' +
          '<div style="font-size:36px;font-weight:900;color:#007A3D">' + moy + '</div>' +
          '<div>' + etoiles(Math.round(moy)) + '</div>' +
          '<div style="font-size:12px;color:#888">' + avis.length + ' avis</div>' +
        '</div>' : '') +
      (CLIENT_COURANT ?
        '<div style="background:#f0faf5;border-radius:14px;padding:16px;margin-bottom:16px">' +
          '<div style="font-size:13px;font-weight:700;margin-bottom:10px">Laisser un avis</div>' +
          '<div style="display:flex;gap:4px;margin-bottom:10px" id="stars-select">' +
            [1,2,3,4,5].map(function(i){
              return '<span onclick="selectEtoile('+i+')" style="font-size:28px;cursor:pointer;color:#ddd" id="star-'+i+'">★</span>';
            }).join('') +
          '</div>' +
          '<textarea id="avis-texte" placeholder="Votre commentaire..." style="width:100%;padding:10px;border:1px solid #ddd;border-radius:10px;font-size:13px;resize:vertical;min-height:70px;font-family:inherit;box-sizing:border-box"></textarea>' +
          '<button onclick="soumettraAvis('+prodId+')" style="margin-top:10px;width:100%;padding:11px;background:#007A3D;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:13px">Publier mon avis</button>' +
        '</div>' :
        '<div style="text-align:center;padding:14px;background:#fff8e1;border-radius:12px;margin-bottom:16px;font-size:13px;color:#856404">Connectez-vous pour laisser un avis</div>'
      ) +
      (avis.length > 0 ?
        '<div>' + avis.slice(0,5).map(function(a){
          return '<div style="border-bottom:1px solid #f0f0f0;padding:12px 0">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
              '<strong style="font-size:13px">' + (a.client || 'Client') + '</strong>' +
              '<span>' + etoiles(a.note) + '</span>' +
            '</div>' +
            '<div style="font-size:12px;color:#555">' + (a.texte || '') + '</div>' +
            '<div style="font-size:11px;color:#bbb;margin-top:4px">' + (a.date || '') + '</div>' +
          '</div>';
        }).join('') + '</div>' :
        '<div style="text-align:center;padding:20px;color:#bbb;font-size:13px">Aucun avis pour ce produit</div>'
      ) +
    '</div>' +
  '</div>';

  var container = document.createElement('div');
  container.id = 'avis-modal';
  container.innerHTML = html;
  document.body.appendChild(container);
  window._noteSelectionnee = 0;
}

function fermerModalAvis() {
  var m = document.getElementById('avis-modal');
  if (m) m.remove();
}

function selectEtoile(n) {
  window._noteSelectionnee = n;
  for (var i = 1; i <= 5; i++) {
    var s = document.getElementById('star-' + i);
    if (s) s.style.color = i <= n ? '#F5C000' : '#ddd';
  }
}

function soumettraAvis(prodId) {
  var note  = window._noteSelectionnee || 0;
  var texte = (document.getElementById('avis-texte') || {}).value || '';
  if (note === 0) { bToast('Sélectionnez une note ⭐', 'warning'); return; }
  if (!CLIENT_COURANT) { bToast('Connectez-vous d\'abord', 'warning'); return; }

  var avis = JSON.parse(localStorage.getItem('sm_avis') || '[]');
  avis.unshift({
    prodId: prodId,
    client: CLIENT_COURANT.prenom || CLIENT_COURANT.nom,
    note:   note,
    texte:  texte,
    date:   new Date().toLocaleDateString('fr-FR'),
    lu:     false
  });
  localStorage.setItem('sm_avis', JSON.stringify(avis));

  // Notifier l'admin
  var notifsAdmin = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');
  var prod = PRODUITS.find(function(p){ return p.id === prodId; });
  notifsAdmin.unshift({
    type: 'avis',
    msg:  '⭐ Nouvel avis ' + note + '/5 sur ' + (prod ? prod.nom : 'un produit') + ' par ' + (CLIENT_COURANT.prenom || CLIENT_COURANT.nom),
    couleur: 'blue',
    date: new Date().toLocaleString('fr-FR'),
    lu:   false
  });
  localStorage.setItem('sm_notifs_admin', JSON.stringify(notifsAdmin));

  fermerModalAvis();
  bToast('Merci pour votre avis ! ⭐', 'success');
}

// ── Chargement produits depuis Supabase (sync avec espace gérant) ──
async function chargerProduitsDepuisSupabase() {
  try {
    var sb = null;
    if (typeof SM_CONFIG !== 'undefined' && SM_CONFIG.supabase && SM_CONFIG.supabase.active
        && typeof window.supabase !== 'undefined') {
      sb = window.supabase.createClient(SM_CONFIG.supabase.url, SM_CONFIG.supabase.key);
    }
    if (sb) {
      var res = await sb.from('produits').select('*').order('created_at', { ascending: true });
      if (res.data && res.data.length > 0) {
        // Convertir format Supabase → format boutique
        PRODUITS = res.data.map(function(p) {
          return {
            id:    p.id,
            nom:   p.nom   || '',
            cat:   p.cat   || 'Alimentation',
            prix:  Number(p.prix)  || 0,
            stock: Number(p.stock) || 0,
            sm:    p.sm    || 'SuperMarché CM',
            img:   p.img   || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
          };
        });
      }
      // Si Supabase vide → garder la liste statique existante
    }
  } catch(e) {
    // En cas d'erreur réseau → garder la liste statique
    console.warn('[Boutique] Supabase indisponible, liste statique utilisée');
  }
  renderProduits();
  renderCategories();
}

// ── Mise à jour dynamique des boutons catégories ──
function renderCategories() {
  var cats = [];
  PRODUITS.forEach(function(p) {
    if (p.cat && cats.indexOf(p.cat) === -1) cats.push(p.cat);
  });
  var container = document.getElementById('bcats');
  if (!container) return;
  // Vider complètement et reconstruire pour éviter les doublons
  container.innerHTML = '<button class="bcat active" onclick="filterCat(\'\'  , this)">Tous</button>';
  cats.forEach(function(cat) {
    var btn = document.createElement('button');
    btn.className = 'bcat';
    btn.setAttribute('data-cat', cat);
    btn.onclick = function(){ filterCat(cat, btn); };
    btn.textContent = cat;
    container.appendChild(btn);
  });
}

function renderProduits(){
  var grid = document.getElementById('bpgrid');
  var prods = PRODUITS.filter(function(p){
    var matchCat  = !catActif || p.cat === catActif;
    var matchSrch = !searchQ  || p.nom.toLowerCase().includes(searchQ.toLowerCase()) || p.cat.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchSrch;
  });

  if(prods.length === 0){
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--mu)"><div style="font-size:48px;margin-bottom:14px"><img src="https://img.icons8.com/ios/24/007A3D/search.png" alt="recherche" style="width:20px;height:20px;vertical-align:middle"></div><div style="font-size:16px;font-weight:700;color:var(--tx);margin-bottom:6px">Aucun produit trouvé</div><div style="font-size:13px">Essayez une autre catégorie ou un autre mot-clé</div></div>';
    return;
  }

  grid.innerHTML = prods.map(function(p){
    var st  = statutStock(p);
    var qte = getPanierQte(p.id);
    return '<div class="bpc" id="bpc-'+p.id+'">' +
      '<div class="bpc-img-wrap">' +
        '<img class="bpc-img" src="'+p.img+'" alt="'+p.nom+'" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop\'">' +
        '<span class="bpc-badge '+st.cls+'">'+st.lbl+'</span>' +
        (p.id % 4 === 0 ? '<span class="bpc-badge promo">-10%</span>' : '') +
      '</div>' +
      '<div class="bpc-body">' +
        '<div class="bpc-cat">'+p.cat+'</div>' +
        '<div class="bpc-nom">'+p.nom+'</div>' +
        '<div class="bpc-sm">'+p.sm+'</div>' +
        '<div class="bpc-prix">'+fmt(p.prix)+' <span>/ unité</span></div>' +
        '<div class="bpc-qrow">' +
          '<button class="bqb" onclick="changeQteBoutique('+p.id+',-1)" '+(qte===0?'disabled':'')+'>−</button>' +
          '<span class="bqv" id="bqv-'+p.id+'">'+qte+'</span>' +
          '<button class="bqb" onclick="changeQteBoutique('+p.id+',1)" '+(st.disabled?'disabled':'')+'>+</button>' +
        '</div>' +
        '<button class="badd-btn '+(qte>0?'added':'')+'" id="badd-'+p.id+'" onclick="addPanier('+p.id+')" '+(st.disabled?'disabled':'')+'>'+
          (st.disabled ? 'Rupture de stock' : (qte>0 ? 'Ajouté au panier <img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">' : 'Ajouter au panier')) +
        '</button>' +
        '<button onclick="ouvrirModalAvis('+p.id+')" style="width:100%;margin-top:6px;padding:7px;background:transparent;border:1.5px solid #e0f2e9;border-radius:9px;color:#007A3D;font-size:12px;font-weight:600;cursor:pointer">' +
          (getMoyenneAvis(p.id) > 0 ? '★ ' + getMoyenneAvis(p.id) + ' · ' + getAvisProduit(p.id).length + ' avis' : '☆ Laisser un avis') +
        '</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── Filtrage catégorie ──
function filterCat(cat, el){
  catActif = cat;
  document.querySelectorAll('.bcat').forEach(function(b){ b.classList.remove('active'); });
  if(el) el.classList.add('active');
  renderProduits();
}

// ── Filtrage recherche ──
function filterSearch(){
  searchQ = document.getElementById('search-input').value;
  renderProduits();
}

// ════════ GESTION PANIER ════════
function getPanierQte(id){
  var item = panier.find(function(x){ return x.id===id; });
  return item ? item.qte : 0;
}

function changeQteBoutique(id, delta){
  var idx = panier.findIndex(function(x){ return x.id===id; });
  if(idx === -1){
    if(delta > 0){
      var p = PRODUITS.find(function(x){ return x.id===id; });
      if(p) panier.push({ id:p.id, nom:p.nom, prix:p.prix, img:p.img, cat:p.cat, sm:p.sm, qte:1 });
    }
  } else {
    panier[idx].qte += delta;
    if(panier[idx].qte <= 0) panier.splice(idx, 1);
  }
  updateCart();
  updateProdCard(id);
}

function addPanier(id){
  var idx = panier.findIndex(function(x){ return x.id===id; });
  if(idx === -1){
    var p = PRODUITS.find(function(x){ return x.id===id; });
    if(p){ panier.push({ id:p.id, nom:p.nom, prix:p.prix, img:p.img, cat:p.cat, sm:p.sm, qte:1 }); }
  } else {
    panier[idx].qte++;
  }
  updateCart();
  updateProdCard(id);
  btoast(PRODUITS.find(function(p){ return p.id===id; }).nom + ' ajouté au panier', 'success');
}

function updateProdCard(id){
  var qte = getPanierQte(id);
  var qv  = document.getElementById('bqv-'+id);
  var btn = document.getElementById('badd-'+id);
  var p   = PRODUITS.find(function(x){ return x.id===id; });
  var st  = statutStock(p);
  if(qv)  qv.textContent = qte;
  if(btn && !st.disabled){
    btn.innerHTML = qte > 0 ? 'Ajouté au panier <img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">' : 'Ajouter au panier';
    btn.className   = 'badd-btn ' + (qte > 0 ? 'added' : '');
  }
}

function updateCart(){
  // Badge header
  var total_qte = panier.reduce(function(s,x){ return s+x.qte; }, 0);
  var total_prix = panier.reduce(function(s,x){ return s+x.prix*x.qte; }, 0);
  document.getElementById('cart-cnt').textContent = total_qte;
  document.getElementById('cart-st').textContent  = fmt(total_prix);
  document.getElementById('cart-tot').textContent = fmt(total_prix);
  document.getElementById('cart-cmd-btn').disabled = panier.length === 0;

  // Liste items panier
  var el = document.getElementById('cart-items');
  if(panier.length === 0){
    el.innerHTML = '<div class="cart-empty"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop" alt=""><h4>Votre panier est vide</h4><p>Ajoutez des produits depuis la boutique</p></div>';
    return;
  }
  el.innerHTML = panier.map(function(item){
    return '<div class="citem">' +
      '<img class="citem-img" src="'+item.img+'" alt="'+item.nom+'" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop\'">' +
      '<div class="citem-inf">' +
        '<div class="citem-nom">'+item.nom+'</div>' +
        '<div class="citem-prix">'+fmt(item.prix)+' / u.</div>' +
        '<div class="citem-qrow">' +
          '<button class="cqb" onclick="changeQteBoutique('+item.id+',-1)">−</button>' +
          '<span class="cqv">'+item.qte+'</span>' +
          '<button class="cqb" onclick="changeQteBoutique('+item.id+',1)">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="citem-tot">'+fmt(item.prix*item.qte)+'</div>' +
      '<div class="citem-del" onclick="retirerItem('+item.id+')"><img src="https://img.icons8.com/ios/18/CE1126/delete-sign.png" alt="fermer" style="width:14px;height:14px;vertical-align:middle"></div>' +
    '</div>';
  }).join('');
}

function retirerItem(id){
  panier = panier.filter(function(x){ return x.id !== id; });
  updateCart();
  updateProdCard(id);
}

function openCart(){
  document.getElementById('cart-ov').classList.add('open');
  updateCart();
}
function closeCart(){
  document.getElementById('cart-ov').classList.remove('open');
}

// ════════ MODAL COMMANDE — ÉTAPES ════════
function openCmdModal(){
  closeCart();
  step = 1;
  renderStep();
  document.getElementById('cmd-ov').classList.add('open');
}
function closeCmdModal(){
  document.getElementById('cmd-ov').classList.remove('open');
}

function renderStep(){
  // Afficher/cacher sections
  document.getElementById('step-1').style.display = step===1 ? 'block' : 'none';
  document.getElementById('step-2').style.display = step===2 ? 'block' : 'none';
  document.getElementById('step-3').style.display = step===3 ? 'block' : 'none';
  document.getElementById('cmd-foot').style.display = step===3 ? 'none' : 'flex';

  // Titres
  var titres = { 1:'Informations de livraison', 2:'Mode de paiement', 3:'Commande confirmée !' };
  document.getElementById('cmd-modal-title').textContent = titres[step];

  // Dots étapes
  for(var i=1; i<=3; i++){
    var dot  = document.getElementById('step-dot-'+i);
    var line = document.getElementById('step-line-'+i);
    dot.className = 'cmd-step-dot ' + (i<step?'done':i===step?'active':'');
    dot.innerHTML = i < step ? '<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">' : i;
    if(line) line.className = 'cmd-step-line ' + (i<step?'done':'');
  }

  // Bouton retour
  var btnRet = document.getElementById('btn-retour');
  if(btnRet) btnRet.style.display = step > 1 ? 'flex' : 'none';

  // Bouton suivant
  var btnSuiv = document.getElementById('btn-suivant');
  if(btnSuiv){
    btnSuiv.textContent = step===2 ? 'Confirmer la commande' : 'Continuer';
  }

  // Montant dans instructions paiement
  if(step === 2){
    var total = getTotal();
    var el1 = document.getElementById('pay-montant');
    var el2 = document.getElementById('pay-montant-esp');
    if(el1) el1.textContent = fmt(total);
    if(el2) el2.textContent = fmt(total);
    buildRecap();
  }
}

function stepNext(){
  if(step === 1){
    // Valider infos client
    var prenom = document.getElementById('cli-prenom').value.trim();
    var nom    = document.getElementById('cli-nom').value.trim();
    var tel    = document.getElementById('cli-tel').value.trim();
    var ville  = document.getElementById('cli-ville').value;
    var adr    = document.getElementById('cli-adresse').value.trim();
    if(!prenom || !nom){ btoast('Entrez votre prénom et nom', 'error'); return; }
    if(!tel){ btoast('Entrez votre numéro de téléphone', 'error'); return; }
    if(!ville){ btoast('Sélectionnez votre ville', 'error'); return; }
    if(!adr && ville !== 'Retrait magasin'){ btoast('Entrez votre adresse de livraison', 'error'); return; }
    step = 2;
    renderStep();
    return;
  }
  if(step === 2){
    // Si Mobile Money, vérifier numéro
    if(payMode !== 'especes'){
      var numWrap = document.getElementById('pay-num-wrap');
      // Vérifier si le champ numéro est visible
      if(numWrap && numWrap.style.display !== 'none'){
        var num = (document.getElementById('pay-num').value || '').trim();
        var numChiffres = num.replace(/[\s\-\+\(\)\.]/g, '');
        if(numChiffres.length < 6){
          var inp = document.getElementById('pay-num');
          if(inp){ inp.style.borderColor='#dc2626'; inp.focus(); }
          btoast('Entrez votre numéro ' + (payMode==='mtn'?'MTN':payMode==='yoomee'?'Yoomee':'Orange') + ' Mobile Money', 'error');
          return;
        }
        var inp2 = document.getElementById('pay-num');
        if(inp2) inp2.style.borderColor='#e6a817';
      }
    }
    confirmerCommande();
    return;
  }
}

function stepBack(){
  if(step > 1){ step--; renderStep(); }
}

// ── Tarif livraison ──
function getTarifLiv(){
  var ville = document.getElementById('cli-ville') ? document.getElementById('cli-ville').value : '';
  if(!ville || ville === 'Retrait magasin') return 0;
  if(ville.includes('Centre') || ville.includes('Akwa')) return 2000;
  if(ville.includes('Banlieue')) return 3500;
  if(ville === 'Bafoussam' || ville === 'Garoua') return 5000;
  return 7500;
}

// Alias — même fonction, deux noms
function getLivraisonFrais(ville){
  if(!ville || ville === 'Retrait magasin') return 0;
  if(ville.includes('Centre') || ville.includes('Akwa')) return 2000;
  if(ville.includes('Banlieue')) return 3500;
  if(ville === 'Bafoussam' || ville === 'Garoua') return 5000;
  return 7500;
}

function getTotal(){
  var sous_total = panier.reduce(function(s,x){ return s+x.prix*x.qte; }, 0);
  var liv = getTarifLiv();
  if(sous_total >= 50000 && (liv === 2000 || liv === 3500)) liv = 0;
  return sous_total + liv;
}

function buildRecap(){
  var sous_total = panier.reduce(function(s,x){ return s+x.prix*x.qte; }, 0);
  var liv = getTarifLiv();
  var gratuit = sous_total >= 50000 && (liv === 2000 || liv === 3500);
  if(gratuit) liv = 0;

  var html = '<h4>Récapitulatif</h4>';
  html += panier.map(function(item){
    return '<div class="recap-item">' +
      '<img src="'+item.img+'" alt="" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop\'">' +
      '<span>'+item.nom+' × '+item.qte+'</span>' +
      '<strong>'+fmt(item.prix*item.qte)+'</strong>' +
    '</div>';
  }).join('');
  html += '<div style="border-top:1px dashed var(--br);padding-top:8px;margin-top:4px">';
  html += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px"><span>Sous-total</span><span>'+fmt(sous_total)+'</span></div>';
  html += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>Livraison</span><span style="color:var(--g);font-weight:700">'+(liv===0?'GRATUITE':fmt(liv))+'</span></div>';
  html += '</div>';
  html += '<div class="recap-total"><span>TOTAL À PAYER</span><span>'+fmt(sous_total+liv)+'</span></div>';
  document.getElementById('recap-items').innerHTML = html;
}

// ── Sélection mode paiement ──
function selectPay(mode){
  payMode = mode;
  ['mtn','orange','yoomee','virement','especes'].forEach(function(m){
    var opt = document.getElementById('opt-'+m);
    var chk = document.getElementById('chk-'+m);
    if(opt) opt.className = 'pay-opt ' + (m===mode?'selected':'');
    if(chk) chk.innerHTML = m===mode ? '<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">' : '';
  });
  var numWrap = document.getElementById('pay-num-wrap');
  var payInst = document.getElementById('pay-instruction');
  var espInst = document.getElementById('especes-instruction');

  if(mode === 'especes'){
    if(numWrap) numWrap.style.display = 'none';
    if(payInst) payInst.style.display = 'none';
    if(espInst) espInst.style.display = 'block';
  } else if(mode === 'virement'){
    if(numWrap) numWrap.style.display = 'none';
    if(espInst) espInst.style.display = 'none';
    if(payInst) {
      payInst.style.display = 'block';
      payInst.innerHTML = '<strong>Virement bancaire :</strong><br>'
        + 'Banque : <strong>Afriland First Bank</strong><br>'
        + 'Titulaire : <strong>SuperMarché CM</strong><br>'
        + 'Numéro de compte : <strong>10005 00001 2345678901 45</strong><br>'
        + 'Banques acceptées : Afriland, SCB, UBA, Ecobank, BICEC<br><br>'
        + 'Envoyez la preuve de virement par WhatsApp au <strong>+237 693 59 14 79</strong>';
    }
  } else {
    if(numWrap) numWrap.style.display = 'block';
    if(payInst) payInst.style.display = 'block';
    if(espInst) espInst.style.display = 'none';
    var lbl = document.getElementById('pay-num-label');
    if(lbl) lbl.textContent = mode==='mtn'
      ? 'NUMÉRO MTN MOBILE MONEY OBLIGATOIRE *'
      : mode==='orange' ? 'NUMÉRO ORANGE MONEY OBLIGATOIRE *'
      : 'NUMÉRO YOOMEE MONEY OBLIGATOIRE *';
    var payInst2 = document.getElementById('pay-instruction');
    if(payInst2) {
      if(mode === 'mtn') {
        payInst2.innerHTML = '<strong>Comment payer MTN Mobile Money :</strong><br>'
          + '1. Composez <strong>*126#</strong> sur votre téléphone MTN<br>'
          + '2. Sélectionnez <strong>"Payer marchand"</strong><br>'
          + '3. Entrez le numéro marchand : <strong class="mtn-num">683 39 22 68</strong><br>'
          + '4. Entrez le montant : <strong id="pay-montant">0 FCFA</strong><br>'
          + '5. Entrez votre code secret et validez<br><br>'
          + 'Vous recevrez un <strong>SMS de confirmation</strong> et notre équipe vous contactera.';
      } else if(mode === 'orange') {
        payInst2.innerHTML = '<strong>Comment payer Orange Money :</strong><br>'
          + '1. Composez <strong>#150#</strong> sur votre téléphone Orange<br>'
          + '2. Sélectionnez <strong>"Paiement marchand"</strong><br>'
          + '3. Entrez le numéro marchand : <strong class="orange-num">693 59 14 79</strong><br>'
          + '4. Entrez le montant : <strong id="pay-montant">0 FCFA</strong><br>'
          + '5. Entrez votre code secret et validez<br><br>'
          + 'Vous recevrez un <strong>SMS de confirmation</strong> et notre équipe vous contactera.';
      } else if(mode === 'yoomee') {
        payInst2.innerHTML = '<strong>Comment payer Yoomee Money :</strong><br>'
          + '1. Ouvrez votre application <strong>Yoomee</strong><br>'
          + '2. Sélectionnez <strong>"Envoyer de l\'argent"</strong><br>'
          + '3. Entrez le numéro : <strong>683 39 22 68</strong><br>'
          + '4. Entrez le montant : <strong id="pay-montant">0 FCFA</strong><br>'
          + '5. Validez avec votre code PIN<br><br>'
          + 'Vous recevrez un <strong>SMS de confirmation</strong>.';
      }
      var elM = document.getElementById('pay-montant');
      var total = getTotal();
      if(elM) elM.textContent = fmt(total);
    }
    // Focus automatique sur le champ numéro
    var inp = document.getElementById('pay-num');
    if(inp) setTimeout(function(){ inp.focus(); inp.scrollIntoView({ behavior:'smooth', block:'center' }); }, 200);
  }
  // Mettre à jour montant
  var el1 = document.getElementById('pay-montant');
  var el2 = document.getElementById('pay-montant-esp');
  var total = getTotal();
  if(el1) el1.textContent = fmt(total);
  if(el2) el2.textContent = fmt(total);
}


// Effacer l'erreur quand l'utilisateur commence à taper
function clearPayNumError() {
  var inp = document.getElementById('pay-num');
  var wrap = document.getElementById('pay-num-wrap');
  if(inp) inp.style.borderColor = '#e6a817';
  if(wrap){ wrap.style.borderColor='#e6a817'; wrap.style.background='#fff3cd'; }
}

// ════════ CONFIRMER COMMANDE ════════
function confirmerCommande(){
  try {
  var prenom   = document.getElementById('cli-prenom').value.trim();
  var nom      = document.getElementById('cli-nom').value.trim();
  var tel      = document.getElementById('cli-tel').value.trim();
  var ville    = document.getElementById('cli-ville').value;
  var adresse  = document.getElementById('cli-adresse').value.trim();
  var smChoice = document.getElementById('cli-sm').value;
  var notes    = document.getElementById('cli-notes').value.trim();
  var payNum   = payMode !== 'especes' ? document.getElementById('pay-num').value.trim() : 'Espèces';

  var sous_total = panier.reduce(function(s,x){ return s+x.prix*x.qte; }, 0);
  var liv_tarif  = getTarifLiv();
  var gratuit    = sous_total >= 50000 && (liv_tarif===2000||liv_tarif===3500);
  if(gratuit) liv_tarif = 0;
  var total = sous_total + liv_tarif;

  // Générer numéro commande
  cmdNumero = '#CM-' + Date.now().toString().slice(-6);
  var maintenant = new Date();
  var dateStr = maintenant.toLocaleDateString('fr-FR') + ' à ' + maintenant.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'});

  // Créer objet commande
var totalFinal = getTotal() + getLivraisonFrais(ville) - (promoAppliquee ? promoAppliquee.reduction : 0);
  var commande = {
    id:          cmdNumero,
    date:        dateStr,
    client:      prenom + ' ' + nom,
    tel:         tel,
    ville:       ville,
    adresse:     adresse,
    supermarche: smChoice,
    paiement:    payMode === 'mtn' ? 'MTN Mobile Money ('+payNum+')' : payMode === 'orange' ? 'Orange Money ('+payNum+')' : payMode === 'yoomee' ? 'Yoomee Money ('+payNum+')' : payMode === 'virement' ? 'Virement bancaire' : 'Espèces à la livraison',
    items:       panier.slice(),
    sous_total:  sous_total,
    livraison:   liv_tarif,
    total:       total,
    statut:      'en_attente',
    notes:       notes,
    source:      'boutique_en_ligne'
  };

  // ── Sauvegarder commande en localStorage ──
  try {
    var cmds = JSON.parse(localStorage.getItem('sm_commandes') || '[]');
    cmds.unshift(commande);
    localStorage.setItem('sm_commandes', JSON.stringify(cmds));
  } catch(e) { console.warn('localStorage:', e); }

  // ── Notifier l'admin ──
  try {
    var notifsAdmin = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');
    notifsAdmin.unshift({
      type:    'nouvelle_commande',
      msg:     '\uD83D\uDED2 Nouvelle commande ' + commande.id + ' — ' + commande.client + ' — ' + commande.total.toLocaleString('fr-FR') + ' FCFA',
      couleur: 'green',
      date:    new Date().toLocaleString('fr-FR'),
      lu:      false
    });
    localStorage.setItem('sm_notifs_admin', JSON.stringify(notifsAdmin));
  } catch(e) {}

  // ── SMS via Railway backend ──
  fetch('https://supermarche-cm-backend-production.up.railway.app/sms/commande', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tel:   commande.tel,
      client: commande.client.split(' ')[0],
      id:    commande.id,
      total: commande.total,
      items: commande.items.map(function(i){ return i.qte + 'x ' + i.nom; }).join(', ')
    })
  }).catch(function(){});

  // ── SMS alerte gérant ──
  fetch('https://supermarche-cm-backend-production.up.railway.app/sms/custom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tel: '237693591479',
      message: '\uD83D\uDED2 Nouvelle commande ' + commande.id + ' — ' + commande.client + ' — ' + commande.total.toLocaleString() + ' FCFA — ' + commande.ville
    })
  }).catch(function(){});

  // ── Points fidélité ──
  if (typeof ajouterPoints === 'function' && commande.tel) {
    ajouterPoints(commande.tel, commande.client, commande.total, commande.id);
  }

    afficherSucces(commande, payMode);
  } catch(e) {
    console.error('Erreur confirmerCommande:', e);
    btoast('Erreur : ' + e.message, 'error');
    var btnSuiv = document.getElementById('btn-suivant');
    if(btnSuiv){ btnSuiv.disabled = false; btnSuiv.textContent = 'Confirmer la commande'; }
  }
}

// ── Afficher écran de succès ──
function afficherSucces(commande, payMode) {
  // Extraire toutes les données depuis l'objet commande
  var prenom   = commande.client ? commande.client.split(' ')[0] : 'Client';
  var nom      = commande.client ? commande.client.split(' ').slice(1).join(' ') : '';
  var tel      = commande.tel || '';
  var ville    = commande.ville || '';
  var adresse  = commande.adresse || '';
  var total    = commande.total || 0;
  var dateStr  = commande.date || new Date().toLocaleDateString('fr-FR');
  var payLabel = payMode==='mtn' ? 'MTN Mobile Money' : payMode==='orange' ? 'Orange Money' : payMode==='yoomee' ? 'Yoomee Money' : payMode==='virement' ? 'Virement bancaire' : 'Espèces à la livraison';
  cmdNumero    = commande.id;

  // ── Afficher écran succès ──
  var elNum = document.getElementById('success-num');
  if (elNum) elNum.textContent = cmdNumero;

  var elDetails = document.getElementById('success-details');
  if (elDetails) {
    elDetails.innerHTML =
      '<strong>Client :</strong> ' + commande.client + '<br>' +
      '<strong>Téléphone :</strong> ' + tel + '<br>' +
      '<strong>Livraison :</strong> ' + ville + (adresse ? ' — ' + adresse : '') + '<br>' +
      '<strong>Paiement :</strong> ' + payLabel + '<br>' +
      '<strong>Total :</strong> <span style="color:var(--g);font-weight:900">' + fmt(total) + '</span><br>' +
      '<strong>Date :</strong> ' + dateStr;
  }

  // ── Lien WhatsApp pré-rempli ──
  var msgWA = 'Bonjour SuperMarché CM !\n\nJe viens de passer la commande *' + cmdNumero + '*\n\n';
  msgWA += '*Client :* ' + commande.client + '\n';
  msgWA += '*Téléphone :* ' + tel + '\n';
  msgWA += '*Livraison :* ' + ville + '\n';
  msgWA += '*Produits :*\n';
  commande.items.forEach(function(item){ msgWA += '  • ' + item.nom + ' × ' + item.qte + ' = ' + fmt(item.prix * item.qte) + '\n'; });
  msgWA += '*Total :* ' + fmt(total) + '\n';
  msgWA += '*Paiement :* ' + payLabel + '\n\nMerci !';

  var lienWA = 'https://wa.me/237683392268?text=' + encodeURIComponent(msgWA);
  var elWA = document.getElementById('wa-confirm');
  if (elWA) elWA.href = lienWA;

  step = 3;
  renderStep();
  btoast('✅ Commande ' + commande.id + ' enregistrée avec succès !', 'success');
}

// ── Réinitialiser boutique après commande ──
function resetBoutique(){
  panier = [];
  updateCart();
  renderProduits();
  closeCmdModal();
  step = 1;
}

// ════════ TOAST ════════
function btoast(msg, type){
  var tw = document.getElementById('btw');
  var t  = document.createElement('div');
  t.className = 'btst ' + (type||'');
  t.innerHTML = (type==='success'?'<img src="https://img.icons8.com/ios/18/007A3D/checkmark.png" alt="ok" style="width:14px;height:14px;vertical-align:middle">':type==='error'?'<img src="https://img.icons8.com/ios/18/CE1126/delete-sign.png" alt="fermer" style="width:14px;height:14px;vertical-align:middle">':'!')+'  '+msg;
  tw.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3500);
}

// ════════ INIT ════════
document.addEventListener('DOMContentLoaded', function(){
  chargerStoresBoutique();
  appliquerConfigBoutique();
  chargerProduitsDepuisSupabase();  // charge Supabase puis appelle renderProduits()
  updateCart();

  // Recalculer livraison si ville change
  var villeEl = document.getElementById('cli-ville');
  if(villeEl){
    villeEl.addEventListener('change', function(){
      var adrWrap = document.getElementById('adresse-wrap');
      if(adrWrap) adrWrap.style.display = this.value==='Retrait magasin' ? 'none' : 'flex';
    });
  }
});

// ═══════════════════════════════════════════════════════
//  COMPTE CLIENT — Connexion, Inscription, Profil
// ═══════════════════════════════════════════════════════

var CLIENT_COURANT = null;

function initCompteClient() {
  try {
    var saved = JSON.parse(localStorage.getItem('sm_client_courant') || 'null');
    if (saved) {
      CLIENT_COURANT = saved;
      mettreAJourBoutonCompte();
    }
  } catch(e) {}
}

function sauvegarderClients(clients) {
  try { localStorage.setItem('sm_clients', JSON.stringify(clients)); } catch(e) {}
}

function getClients() {
  try { return JSON.parse(localStorage.getItem('sm_clients') || '[]'); } catch(e) { return []; }
}

function ouvrirCompteClient() {
  var modal = document.getElementById('modal-compte-client');
  if (modal) modal.style.display = 'flex';
  if (CLIENT_COURANT) {
    afficherVueClient('profil');
  } else {
    afficherVueClient('login');
  }
}

function fermerCompteClient() {
  var modal = document.getElementById('modal-compte-client');
  if (modal) modal.style.display = 'none';
}

function afficherVueClient(vue) {
  var vues = ['login', 'register', 'profil'];
  vues.forEach(function(v) {
    var el = document.getElementById('vue-' + v + '-client');
    if (el) el.style.display = v === vue ? 'block' : 'none';
  });
  var titres = { login: 'Connexion', register: 'Créer un compte', profil: 'Mon Compte' };
  var titre = document.getElementById('modal-compte-titre');
  if (titre) titre.textContent = titres[vue] || 'Mon Compte';

  if (vue === 'profil') chargerProfilClient();
}

function connecterClient() {
  var email = document.getElementById('cli-login-email').value.trim();
  var pwd   = document.getElementById('cli-login-pwd').value.trim();
  var err   = document.getElementById('cli-login-err');

  if (!email || !pwd) {
    err.textContent = 'Veuillez remplir tous les champs.';
    err.style.display = 'block'; return;
  }

  var clients = getClients();
  var client = clients.find(function(c) { return c.email === email && c.pwd === pwd; });

  if (!client) {
    err.textContent = 'Email ou mot de passe incorrect.';
    err.style.display = 'block'; return;
  }

  err.style.display = 'none';
  CLIENT_COURANT = client;
  try { localStorage.setItem('sm_client_courant', JSON.stringify(client)); } catch(e) {}
  mettreAJourBoutonCompte();
  afficherVueClient('profil');
  bToast('Bienvenue ' + client.nom + ' !', 'success');
}

function inscrireClient() {
  var nom     = document.getElementById('cli-reg-nom').value.trim();
  var tel     = document.getElementById('cli-reg-tel').value.trim();
  var email   = document.getElementById('cli-reg-email').value.trim();
  var adresse = document.getElementById('cli-reg-adresse').value.trim();
  var pwd     = document.getElementById('cli-reg-pwd').value.trim();
  var err     = document.getElementById('cli-reg-err');

  if (!nom || !tel || !email || !pwd) {
    err.textContent = 'Veuillez remplir tous les champs obligatoires (*).';
    err.style.display = 'block'; return;
  }
  if (pwd.length < 6) {
    err.textContent = 'Le mot de passe doit faire au moins 6 caractères.';
    err.style.display = 'block'; return;
  }

  var clients = getClients();
  if (clients.find(function(c) { return c.email === email; })) {
    err.textContent = 'Un compte existe déjà avec cet email.';
    err.style.display = 'block'; return;
  }

  var newClient = {
    id:       'CLI-' + Date.now(),
    nom:      nom,
    tel:      tel,
    email:    email,
    adresse:  adresse,
    pwd:      pwd,
    points:   0,
    date:     new Date().toLocaleDateString('fr-FR'),
    commandes: []
  };

  clients.push(newClient);
  sauvegarderClients(clients);

  // ── Notifier l'admin ──
  try {
    var notifs = JSON.parse(localStorage.getItem('sm_notifs_admin') || '[]');
    notifs.unshift({
      type: 'nouveau_client',
      msg: 'Nouveau client inscrit : ' + nom + ' (' + tel + ')',
      email: email,
      date: new Date().toLocaleString('fr-FR'),
      lu: false
    });
    localStorage.setItem('sm_notifs_admin', JSON.stringify(notifs));
  } catch(e) {}

  CLIENT_COURANT = newClient;
  try { localStorage.setItem('sm_client_courant', JSON.stringify(newClient)); } catch(e) {}
  mettreAJourBoutonCompte();
  afficherVueClient('profil');
  bToast('Compte créé avec succès ! Bienvenue ' + nom, 'success');

  // SMS bienvenue
  if (tel) {
    fetch('https://supermarche-cm-backend-production.up.railway.app/sms/custom', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ tel: tel, message: 'Bienvenue '+nom+' sur SuperMarché CM ! 🎉 Profitez de nos offres et livraisons partout au Cameroun. Vos achats = des points fidélité !' })
    }).catch(function(){});
  }
}

function deconnecterClient() {
  CLIENT_COURANT = null;
  try { localStorage.removeItem('sm_client_courant'); } catch(e) {}
  mettreAJourBoutonCompte();
  fermerCompteClient();
  bToast('Vous êtes déconnecté', 'info');
}

function chargerProfilClient() {
  if (!CLIENT_COURANT) return;
  var c = CLIENT_COURANT;

  var avatar = document.getElementById('cli-avatar');
  if (avatar) avatar.textContent = c.nom.charAt(0).toUpperCase();

  var nom = document.getElementById('cli-profil-nom');
  if (nom) nom.textContent = c.nom;

  var email = document.getElementById('cli-profil-email');
  if (email) email.textContent = c.email;

  var tel = document.getElementById('cli-profil-tel');
  if (tel) tel.textContent = c.tel;

  var points = document.getElementById('cli-profil-points');
  if (points) points.textContent = c.points || 0;

  // Commandes du client
  var cmdEl = document.getElementById('cli-mes-commandes');
  if (cmdEl) {
    var mesCmds = [];
    try {
      var toutes = JSON.parse(localStorage.getItem('sm_commandes') || '[]');
      mesCmds = toutes.filter(function(cmd) {
        return cmd.tel === c.tel || cmd.email === c.email;
      }).slice(0, 5);
    } catch(e) {}

    if (mesCmds.length === 0) {
      cmdEl.innerHTML = '<p style="color:#999;font-size:13px;text-align:center;padding:10px">Aucune commande pour l\'instant</p>';
    } else {
      var statutColors = { en_attente:'#f59e0b', confirmee:'#3b82f6', livraison:'#8b5cf6', livree:'#007A3D', annulee:'#ef4444' };
      var statutLabels = { en_attente:'En attente', confirmee:'Confirmée', livraison:'En route', livree:'Livrée', annulee:'Annulée' };
      cmdEl.innerHTML = mesCmds.map(function(cmd) {
        var couleur = statutColors[cmd.statut] || '#999';
        var label   = statutLabels[cmd.statut] || cmd.statut;
        return '<div style="border:1px solid #e5e7eb;border-radius:10px;padding:10px;margin-bottom:8px">'
          + '<div style="display:flex;justify-content:space-between;align-items:center">'
          + '<div>'
          + '<div style="font-weight:700;font-size:13px">' + cmd.id + '</div>'
          + '<div style="font-size:12px;color:#666">' + cmd.date + '</div>'
          + '</div>'
          + '<div style="text-align:right">'
          + '<div style="font-weight:700;color:#007A3D">' + (cmd.total||0).toLocaleString('fr-FR') + ' FCFA</div>'
          + '<span style="background:' + couleur + ';color:#fff;padding:2px 8px;border-radius:20px;font-size:11px">' + label + '</span>'
          + '</div></div></div>';
      }).join('');
    }
  }
}

function mettreAJourBoutonCompte() {
  var btn = document.getElementById('btn-compte-txt');
  if (!btn) return;
  if (CLIENT_COURANT) {
    btn.textContent = CLIENT_COURANT.nom.split(' ')[0];
  } else {
    btn.textContent = 'Mon compte';
  }
}

function bToast(msg, type) {
  var colors = { success:'#007A3D', error:'#ef4444', info:'#3b82f6', warning:'#f59e0b' };
  var div = document.createElement('div');
  div.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:' + (colors[type]||'#333') + ';color:#fff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.2)';
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(function() { div.style.opacity='0'; div.style.transition='opacity 0.3s'; setTimeout(function(){ div.remove(); }, 300); }, 3000);
}

// Fermer modal en cliquant dehors
document.addEventListener('click', function(e) {
  var modal = document.getElementById('modal-compte-client');
  if (modal && e.target === modal) fermerCompteClient();
});

// Init au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCompteClient);
} else {
  initCompteClient();
}
