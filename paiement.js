// ═══════════════════════════════════════════════════════════
//  SuperMarché CM — paiement.js
//  Intégration paiements CinetPay + SMS Africa's Talking
// ═══════════════════════════════════════════════════════════

var PAIEMENT = (function() {

  // ════════════════════════════════════════
  //  CINETPAY — Paiement Mobile Money
  //  Accepte : MTN, Orange, Airtel, Moov
  // ════════════════════════════════════════

  function initierPaiementCinetPay(commande, onSuccess, onError) {
    if (!SM_CONFIG.cinetpay.active) {
      // Mode simulation si CinetPay non configuré
      simulerPaiement(commande, onSuccess);
      return;
    }

    // Charger le SDK CinetPay si pas encore chargé
    if (typeof CinetPay === 'undefined') {
      var script = document.createElement('script');
      script.src = 'https://cdn.cinetpay.com/seamless/main.js';
      script.onload = function() { lancerCheckoutCinetPay(commande, onSuccess, onError); };
      script.onerror = function() {
        console.error('CinetPay SDK non chargé');
        simulerPaiement(commande, onSuccess);
      };
      document.head.appendChild(script);
    } else {
      lancerCheckoutCinetPay(commande, onSuccess, onError);
    }
  }

  function lancerCheckoutCinetPay(commande, onSuccess, onError) {
    var config = SM_CONFIG.cinetpay;
    var boutique = SM_CONFIG.boutique;

    CinetPay.setConfig({
      apikey:      config.apikey,
      site_id:     config.site_id,
      notify_url:  config.notify_url,
      return_url:  window.location.href,
      mode:        'PRODUCTION'  // Changer en 'TEST' pour les tests
    });

    CinetPay.getCheckout({
      transaction_id:  commande.id,
      amount:          commande.total,
      currency:        boutique.currency,   // XAF
      channels:        'MOBILE_MONEY',       // MTN, Orange, etc.
      description:     'Commande ' + commande.id + ' — ' + boutique.nom,
      customer_name:   commande.client,
      customer_surname: '',
      customer_phone_number: commande.tel,
      customer_email:  commande.email || 'client@supermarche.cm',
      customer_address: commande.adresse || '',
      customer_city:   commande.ville || 'Yaoundé',
      customer_country: boutique.pays,      // CM
      customer_state:  boutique.pays,
      customer_zip_code: '00000',
      metadata:        JSON.stringify({ commande_id: commande.id })
    });

    CinetPay.waitResponse(function(data) {
      if (data.status === 'ACCEPTED') {
        console.log('Paiement accepté :', data);
        if (onSuccess) onSuccess({ transaction_id: data.transaction_id, data: data });
      } else {
        console.warn('Paiement refusé :', data);
        if (onError) onError(data.message || 'Paiement refusé');
      }
    });

    CinetPay.onError(function(data) {
      console.error('Erreur CinetPay :', data);
      if (onError) onError('Erreur de paiement. Veuillez réessayer.');
    });
  }

  // ── Simulation paiement (mode démo sans CinetPay) ──
  function simulerPaiement(commande, onSuccess) {
    console.log('Mode simulation — paiement CinetPay non configuré');
    // Simule un délai de traitement
    setTimeout(function() {
      if (onSuccess) onSuccess({
        transaction_id: 'SIM-' + Date.now(),
        simule: true,
        message: 'Simulation paiement réussie'
      });
    }, 1500);
  }

  // ── Vérifier statut paiement (webhook / polling) ──
  async function verifierStatutPaiement(transactionId) {
    if (!SM_CONFIG.cinetpay.active) return { statut: 'simule' };

    try {
      var response = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apikey:         SM_CONFIG.cinetpay.apikey,
          site_id:        SM_CONFIG.cinetpay.site_id,
          transaction_id: transactionId
        })
      });
      var data = await response.json();
      return data;
    } catch(e) {
      console.error('Erreur vérification paiement:', e);
      return { statut: 'erreur', message: e.message };
    }
  }

  // ════════════════════════════════════════
  //  AFRICA'S TALKING — SMS automatiques
  // ════════════════════════════════════════

  async function envoyerSMS(telephone, message) {
    if (!SM_CONFIG.africastalking.active) {
      console.log('SMS (simulation) → ' + telephone + ' : ' + message);
      return { ok: true, simule: true };
    }

    // Africa's Talking nécessite un backend pour masquer la clé API
    // En production, appelez votre propre endpoint serveur
    try {
      var response = await fetch('/api/sms', {  // Votre endpoint backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to:      telephone,
          message: message,
          from:    SM_CONFIG.africastalking.sender
        })
      });
      var data = await response.json();
      return { ok: true, data: data };
    } catch(e) {
      console.error('Erreur envoi SMS:', e);
      return { ok: false, error: e.message };
    }
  }

  // ── Messages SMS types ──
  function smsConfirmationClient(commande) {
    return (
      'SuperMarché CM\n' +
      'Commande ' + commande.id + ' confirmée !\n' +
      'Montant : ' + commande.total.toLocaleString('fr-FR') + ' FCFA\n' +
      'Livraison : ' + (commande.ville || 'À confirmer') + '\n' +
      'Suivi : +237 683 39 22 68\n' +
      'Merci de nous faire confiance !'
    );
  }

  function smsNouvelleCommandeGerant(commande) {
    return (
      'SuperMarché CM — NOUVELLE COMMANDE\n' +
      'N° : ' + commande.id + '\n' +
      'Client : ' + commande.client + '\n' +
      'Tél : ' + commande.tel + '\n' +
      'Total : ' + commande.total.toLocaleString('fr-FR') + ' FCFA\n' +
      'Paiement : ' + (commande.paiement || 'À définir')
    );
  }

  function smsLivraisonEnRoute(commande) {
    return (
      'SuperMarché CM\n' +
      'Votre commande ' + commande.id + ' est en route !\n' +
      'Livraison prévue dans 30 à 60 min.\n' +
      'Contact livreur : +237 693 59 14 79'
    );
  }

  function smsLivraisonEffectuee(commande) {
    return (
      'SuperMarché CM\n' +
      'Commande ' + commande.id + ' livrée !\n' +
      'Merci de votre confiance.\n' +
      'Notez-nous sur WhatsApp : wa.me/' + SM_CONFIG.boutique.whatsapp
    );
  }

  // ════════════════════════════════════════
  //  WHATSAPP — Notifications automatiques
  // ════════════════════════════════════════

  function whatsappLienClient(commande) {
    // Lien WhatsApp pré-rempli pour le client
    var msg = '🛒 *SuperMarché CM*\n\n';
    msg += 'Bonjour ' + commande.client.split(' ')[0] + ' !\n\n';
    msg += '✅ Votre commande *' + commande.id + '* a été enregistrée.\n\n';
    msg += '*Récapitulatif :*\n';
    (commande.items || []).forEach(function(item) {
      msg += '• ' + item.nom + ' × ' + (item.qte || item.qty) + ' = ' +
        ((item.prix * (item.qte || item.qty)).toLocaleString('fr-FR')) + ' FCFA\n';
    });
    msg += '\n*Total : ' + commande.total.toLocaleString('fr-FR') + ' FCFA*\n';
    msg += '*Livraison :* ' + (commande.ville || 'À confirmer') + '\n';
    msg += '*Paiement :* ' + (commande.paiement || 'À définir') + '\n\n';
    msg += 'Nous vous contacterons très bientôt. Merci !';
    return 'https://wa.me/' + SM_CONFIG.boutique.whatsapp + '?text=' + encodeURIComponent(msg);
  }

  async function envoyerNotifWhatsAppAPI(telephone, message) {
    if (!SM_CONFIG.whatsapp.active) {
      console.log('WhatsApp API (simulation) → ' + telephone);
      return { ok: true, simule: true };
    }

    try {
      var telFormate = telephone.replace(/[^0-9]/g, '');
      if (!telFormate.startsWith('237')) telFormate = '237' + telFormate;

      var response = await fetch(
        'https://graph.facebook.com/v18.0/' + SM_CONFIG.whatsapp.phone_number_id + '/messages',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + SM_CONFIG.whatsapp.token,
            'Content-Type':  'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to:      telFormate,
            type:    'text',
            text:    { body: message }
          })
        }
      );
      var data = await response.json();
      return { ok: true, data: data };
    } catch(e) {
      console.error('Erreur WhatsApp API:', e);
      return { ok: false, error: e.message };
    }
  }

  // ════════════════════════════════════════
  //  FONCTION PRINCIPALE — Traiter une commande
  //  Appelée après validation panier client
  // ════════════════════════════════════════

  async function traiterCommande(commande, modePaiement, onSuccess, onError) {

    // ÉTAPE 1 : Sauvegarder dans la base de données
    var saveResult = await DB.sauvegarderCommande(commande);
    console.log('Commande sauvegardée :', saveResult);

    // ÉTAPE 2 : Notifier le gérant par SMS
    var telGerant = SM_CONFIG.boutique.telephone.replace(/[^0-9]/g, '');
    await envoyerSMS(telGerant, smsNouvelleCommandeGerant(commande));

    // ÉTAPE 3 : Selon le mode de paiement
    if (modePaiement === 'especes') {
      // Espèces → confirmation directe
      commande.statut = 'en_attente';
      await DB.sauvegarderCommande(commande);
      // SMS de confirmation au client
      await envoyerSMS(commande.tel, smsConfirmationClient(commande));
      if (onSuccess) onSuccess({ mode: 'especes', commande: commande });

    } else if (modePaiement === 'mtn' || modePaiement === 'orange') {
      // Mobile Money → paiement CinetPay
      initierPaiementCinetPay(
        commande,
        // Succès paiement
        async function(paiementData) {
          commande.statut = 'confirmee';
          commande.transaction_id = paiementData.transaction_id;
          await DB.mettreAJourStatut(commande.id, 'confirmee');
          // SMS confirmation client
          await envoyerSMS(commande.tel, smsConfirmationClient(commande));
          // Notif WhatsApp API
          await envoyerNotifWhatsAppAPI(commande.tel, smsConfirmationClient(commande));
          if (onSuccess) onSuccess({ mode: modePaiement, commande: commande, paiement: paiementData });
        },
        // Échec paiement
        function(erreur) {
          if (onError) onError(erreur);
        }
      );
    }
  }

  // ── Notifier lors du changement de statut commande ──
  async function notifierChangementStatut(commande, nouveauStatut) {
    var msgs = {
      confirmee: smsConfirmationClient(commande),
      livraison: smsLivraisonEnRoute(commande),
      livree:    smsLivraisonEffectuee(commande)
    };
    if (msgs[nouveauStatut]) {
      await envoyerSMS(commande.tel, msgs[nouveauStatut]);
      await envoyerNotifWhatsAppAPI(commande.tel, msgs[nouveauStatut]);
    }
  }

  // API publique
  return {
    initierPaiement:          initierPaiementCinetPay,
    traiterCommande:          traiterCommande,
    verifierStatut:           verifierStatutPaiement,
    envoyerSMS:               envoyerSMS,
    notifierChangementStatut: notifierChangementStatut,
    whatsappLienClient:       whatsappLienClient,
    // Messages SMS pour usage externe
    sms: {
      confirmationClient:   smsConfirmationClient,
      nouvelleCommande:     smsNouvelleCommandeGerant,
      livraisonEnRoute:     smsLivraisonEnRoute,
      livraisonEffectuee:   smsLivraisonEffectuee
    }
  };

})();
