// ═══════════════════════════════════════════════════════
//  SuperMarché CM — stats-clients.js
//  Statistiques clients avancées
// ═══════════════════════════════════════════════════════

var STATS_CLIENTS = {};

function calculerStatsClients() {
  if (typeof CMDS === 'undefined') return;
  var clients = {};
  CMDS.forEach(function(cmd) {
    if (cmd.statut==='annulee') return;
    var tel = cmd.tel || 'inconnu';
    if (!clients[tel]) clients[tel] = { nom:cmd.client, tel:tel, nb_cmd:0, total:0, produits:{}, villes:[], derniere_cmd:'' };
    clients[tel].nb_cmd++;
    clients[tel].total += cmd.total||0;
    clients[tel].derniere_cmd = cmd.date;
    (cmd.items||[]).forEach(function(it){ clients[tel].produits[it.nom] = (clients[tel].produits[it.nom]||0)+1; });
  });
  STATS_CLIENTS = clients;
  return clients;
}

function renderStatsClients() {
  var container = document.getElementById('stats-clients-content');
  if (!container) return;
  calculerStatsClients();
  var liste = Object.values(STATS_CLIENTS).sort(function(a,b){ return b.total-a.total; });

  // KPIs
  var totalClients = liste.length;
  var totalCA = liste.reduce(function(s,c){ return s+c.total; },0);
  var panierMoyen = totalClients>0 ? Math.round(liste.reduce(function(s,c){ return s+c.total/c.nb_cmd; },0)/totalClients) : 0;
  var fideles = liste.filter(function(c){ return c.nb_cmd>=3; }).length;

  container.innerHTML = ''
  + '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px">'
  + kpiCard('Clients uniques', totalClients, '<img src="https://img.icons8.com/ios/24/007A3D/conference-call.png" alt="utilisateurs" style="width:20px;height:20px;vertical-align:middle">')
  + kpiCard('CA total clients', totalCA.toLocaleString('fr-FR')+' FCFA', '<img src="https://img.icons8.com/ios/24/007A3D/money.png" alt="argent" style="width:20px;height:20px;vertical-align:middle">')
  + kpiCard('Panier moyen', panierMoyen.toLocaleString('fr-FR')+' FCFA', '<img src="https://img.icons8.com/ios/24/007A3D/shopping-cart.png" alt="panier" style="width:20px;height:20px;vertical-align:middle">')
  + kpiCard('Clients fidèles (3+)', fideles, '<img src="https://img.icons8.com/ios/24/007A3D/star.png" alt="fidelite" style="width:20px;height:20px;vertical-align:middle">')
  + '</div>'
  + '<h3 style="margin-bottom:10px">Top clients</h3>'
  + '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">'
  + '<thead><tr style="background:#f5f7f2"><th style="padding:8px;text-align:left">Client</th><th style="padding:8px;text-align:right">Commandes</th><th style="padding:8px;text-align:right">Total dépensé</th><th style="padding:8px;text-align:left">Produit favori</th><th style="padding:8px;text-align:left">Dernière commande</th></tr></thead>'
  + '<tbody>'
  + liste.slice(0,20).map(function(c, i){
      var prodFav = Object.entries(c.produits).sort(function(a,b){return b[1]-a[1];})[0];
      return '<tr style="border-bottom:1px solid #f0f0f0">'
        + '<td style="padding:8px"><strong>'+(i===0?'<img src="https://img.icons8.com/ios/24/FFD700/trophy.png" alt="1er" style="width:20px;height:20px;vertical-align:middle"> ':i===1?'<img src="https://img.icons8.com/ios/24/C0C0C0/trophy.png" alt="2e" style="width:20px;height:20px;vertical-align:middle"> ':i===2?'<img src="https://img.icons8.com/ios/24/cd7f32/trophy.png" alt="3e" style="width:20px;height:20px;vertical-align:middle"> ':'')+(c.nom||'Inconnu')+'</strong><br><span style="font-size:11px;color:#999">'+c.tel+'</span></td>'
        + '<td style="padding:8px;text-align:right;font-weight:700">'+c.nb_cmd+'</td>'
        + '<td style="padding:8px;text-align:right;font-weight:700;color:#007A3D">'+c.total.toLocaleString('fr-FR')+' FCFA</td>'
        + '<td style="padding:8px;font-size:12px">'+(prodFav?prodFav[0]+' (×'+prodFav[1]+')':'—')+'</td>'
        + '<td style="padding:8px;font-size:11px;color:#999">'+c.derniere_cmd+'</td>'
      + '</tr>';
    }).join('')
  + '</tbody></table></div>'
  + '<h3 style="margin:20px 0 10px">Produits les plus commandés</h3>'
  + topProduits();
}

function kpiCard(label, val, icon) {
  return '<div class="cd" style="text-align:center"><div style="font-size:24px">'+icon+'</div>'
    + '<div style="font-size:20px;font-weight:800;color:#007A3D">'+val+'</div>'
    + '<div style="font-size:12px;color:#999">'+label+'</div></div>';
}

function topProduits() {
  if (typeof CMDS==='undefined') return '';
  var prods = {};
  CMDS.forEach(function(cmd){
    if(cmd.statut==='annulee') return;
    (cmd.items||[]).forEach(function(it){ prods[it.nom] = (prods[it.nom]||0)+(it.qty||1); });
  });
  var liste = Object.entries(prods).sort(function(a,b){return b[1]-a[1];}).slice(0,8);
  if (!liste.length) return '<p style="color:#999">Pas encore de données</p>';
  var max = liste[0][1];
  return '<div style="display:flex;flex-direction:column;gap:8px">'
    + liste.map(function(p){
        var pct = Math.round(p[1]/max*100);
        return '<div><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="font-size:13px">'+p[0]+'</span><span style="font-weight:700;font-size:13px">'+p[1]+' cmd</span></div>'
          + '<div style="background:#e5e7eb;border-radius:4px;height:8px"><div style="background:#007A3D;width:'+pct+'%;height:8px;border-radius:4px"></div></div></div>';
      }).join('')
    + '</div>';
}
