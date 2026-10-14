(function(root){
const groups=[
['Entretien et maintenance',[
'Entretien, réparation et maintenance des équipements, installations, matériel et mobilier',
'Maintenance des équipements électriques, électroniques, scientifiques, médicaux et de télécommunication, véhicules, aéronefs et engins',
'Maintenance et étalonnage des équipements techniques, matériel et logiciel informatique',
'Entretien, réparation et maintenance des équipements informatiques, logiciels et progiciels',
'Entretien des bâtiments','Montage et démontage du matériel hydraulique et électromécanique',
'Entretien, rééquilibrage, étalonnage et réparation des équipements de laboratoires',
'Autres opérations d’installation, de pose, de réparation ou de façon']],
['Transport, stockage et locations',[
'Transport et manutention du matériel, mobilier, produits et documents','Transport du personnel','Autres prestations de transport',
'Mise à quai, transit, manutention, acconage et magasinage','Entreposage et stockage frigorifique et non frigorifique',
'Locations sans option d’achat de biens meubles : équipements, matériels, logiciels, mobilier, véhicules et engins',
'Location de licences d’utilisation de logiciels informatiques','Location de moyens de transport',
'Location de matériel, d’engins et d’équipements','Location d’aéronefs pour traitement des végétaux et lutte contre les parasites',
'Location de camions citernes','Location de salles, de stands et de mobilier d’exposition',
'Magasinage, courtage et autres louages de choses ou de services','Manutention à terre et à flot','Déménagement']],
['Commerce et services aux entreprises',[
'Démarchage commercial','Représentants commerciaux, courtiers, commissionnaires, mandataires, gérants d’immeubles et agents d’affaires',
'Nettoyage, jardinage, gardiennage, surveillance et entretien des espaces verts','Assistance au maître d’ouvrage',
'Collecte et traitement des déchets hospitaliers','Collecte, traitement et blanchissage du linge',
'Contrôle technique du matériel et du mobilier','Gestion des archives',
'Désinsectisation, dératisation et lutte contre les animaux errants et vecteurs de nuisance',
'Facturation, traitement de la paie, secrétariat médical, accueil et assistance',
'Centres d’appels, centres de télémarketing et télé-service','Entretien, dépoussiérage et traitement chimique des archives et livres',
'Contrôle des points de comptage','Outils de gestion technique et de détection de fuites',
'Autres marchés de services courants sans spécifications techniques particulières',
'Cessions et concessions d’exploitation de brevets, droits ou marques','Emploi et mise à disposition de ressources humaines']],
['Digital, communication, formation et événements',[
'Prise de photographie et de film','Prestations innovantes de recherche et développement',
'Achat d’espaces d’annonces et insertions publicitaires','Abonnements aux bases de données',
'Noms de domaine, mots clés, référencement web et acquisition de bases de données','Achat de spectacles',
'Acquisition de données climatiques et météorologiques','Organisation d’expositions et de manifestations culturelles, scientifiques et sportives',
'Formations soumises à la TVA','Assistance technique en logiciels et sites Web','Enquêtes, études de marché et sondages',
'Reprographie et tirage des plans','Impression, tirage, reproduction et photographie',
'Hébergement et infogérance des systèmes d’information','Production ou coproduction de programmes et films, et achat de temps de diffusion',
'Direction, animation et participation aux manifestations et activités culturelles','Publicité, sensibilisation et supports multimédia',
'Études, maîtrise d’œuvre et recherche']],
['Études, expertise et professions',[
'Essais, contrôle qualité des matériaux et essais géotechniques des laboratoires BTP','Études sismiques et géotechniques',
'Levées topographiques','Prestations architecturales','Consultations ou recherches juridiques, scientifiques, techniques ou expertise',
'Audit, assistance et conseil comptable, fiscal et juridique','Contrôle et analyse d’échantillons soumis à des normes obligatoires',
'Essais de génie civil','Contrôle de conformité des matériaux de construction','Étude et analyse des eaux',
'Études sur le choix des terrains et analyse du sol','Évaluation de qualité des réseaux publics de télécommunication',
'Expertise et contrôle technique','Interprétation des mesures d’auscultation des barrages',
'Topographie et bathymétrie des fermes aquacoles','Traduction de documents',
'Audit des constructeurs et revendeurs de véhicules et de conformité des véhicules',
'Audit des réseaux et centres de visite technique','Audit et contrôle des établissements de conduite et de formation autorisés',
'Expertise, audit, assistance, études et conseils','Prestations géotechniques et de laboratoire','Topographie et océanographie',
'Traduction simultanée et traduction d’œuvres littéraires, scientifiques, culturelles ou juridiques',
'Hébergement et développement informatique','Recherche et développement en biotechnologie',
'Recherche et développement en sciences physiques et naturelles','Recherche et développement en sciences humaines et sociales',
'Études de marché et sondages','Activités spécialisées de design']],
['Autres situations',[
'Autres services taxables relevant de l’article 89-I-10°, hors travaux et fournitures de biens',
'Location d’immeuble soumise à la TVA — régime immobilier à vérifier',
'Profession exercée par une personne physique — hors périmètre IS de cet outil',
'Courtier / démarcheur d’assurances — régime spécifique',
'Opérateur télécom ou eau, électricité et assainissement — exclusion spécifique à vérifier',
'Autre prestation / je ne sais pas']]
];
const services=groups.flatMap(([group,list],g)=>list.map((label,i)=>({id:`s${g}_${i}`,group,label,special:g===5&&i>0})));
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
function validDate(x){return typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x}
function eligibility(client,ca,date){
 if(client==='public')return {active:true,start:'2026-01-01',threshold:null};
 if(['bank','insurance'].includes(client))return {active:date>='2026-07-01',start:'2026-07-01',threshold:null};
 const threshold=date>='2028-01-01'?200:date>='2027-01-01'?350:500;
 const lower={under200:0,'200':200,'350':350,'500':500}[ca];
 const start=lower>=500?'2026-07-01':lower>=350?'2027-01-01':lower>=200?'2028-01-01':null;
 return {active:date>='2026-07-01'&&lower>=threshold,start,threshold};
}
function simulate(x){
 const fail=error=>({error});
 if(!['bank','insurance','private','public'].includes(x.client))return fail('Identifiez la catégorie de votre client.');
 if(x.client==='private'&&!['under200','200','350','500'].includes(x.ca))return fail('Renseignez la tranche de CA HT du client au dernier exercice clos.');
 for(const key of ['invoiceDate','paymentDate']){try{if(!validDate(x[key])||x[key]<'2026-01-01'||x[key]>'2028-12-31')return fail('Renseignez des dates valides entre 2026 et 2028.')}catch{return fail('Renseignez des dates valides.')}}
 if(x.paymentDate<x.invoiceDate)return fail('Un règlement antérieur à la facture relève d’un acompte : ce parcours traite un paiement intégral après facturation.');
 const service=services.find(s=>s.id===x.service);if(!service)return fail('Sélectionnez une prestation.');
 if(service.special)return fail('Ce cas nécessite une qualification spécifique. Le simulateur ne détermine pas automatiquement ses retenues.');
 if(!['yes','no'].includes(x.isScope))return fail('Confirmez le champ des rémunérations de l’article 15 bis pour la retenue IS.');
 if(!['payment','earlier'].includes(x.isEvent))return fail('Confirmez la première date d’allocation pour l’IS avec votre client.');
 let isDate=x.paymentDate;if(x.isEvent==='earlier'){try{if(!validDate(x.eventDate)||x.eventDate<'2026-01-01'||x.eventDate>x.paymentDate)return fail('La première date d’allocation IS doit être valide et ne pas dépasser la date de paiement.')}catch{return fail('Renseignez la première date d’allocation IS.')}isDate=x.eventDate}
 if(x.client==='private'&&isDate.slice(0,4)!==x.paymentDate.slice(0,4))return fail('L’allocation IS et le paiement se situent sur deux exercices. Faites vérifier le CA du dernier exercice clos pour chacune des dates avant de calculer.');
 if(x.client==='public'&&!['yes','no'].includes(x.publicScope))return fail('Confirmez si la prestation relève de la liste A applicable au client public.');
 if(!Number.isFinite(x.ht)||x.ht<=0||x.ht>999999999999||![0,10,20].includes(x.vat))return fail('Renseignez un montant HT positif et un régime TVA valide.');
 if(x.client==='private'&&['200','350'].includes(x.ca)&&x.invoiceDate<eligibility(x.client,x.ca,x.paymentDate).start&&x.paymentDate>=eligibility(x.client,x.ca,x.paymentDate).start)return fail('Cette facture est antérieure à un nouveau palier de votre client. La règle transitoire et son CA doivent être confirmés avant de chiffrer la retenue TVA.');
 const vatAmount=round(x.ht*x.vat/100),gross=round(x.ht+vatAmount),pay=eligibility(x.client,x.ca,x.paymentDate),isEligibility=eligibility(x.client,x.ca,isDate);
 const reasons=[];let isRate=isEligibility.active&&x.isScope==='yes'?5:0;
 let vatEligible=pay.active&&x.vat>0&&(x.client!=='public'||x.publicScope==='yes');
 if(x.client!=='public'&&vatEligible&&x.invoiceDate<pay.start){vatEligible=false;reasons.push('Facture établie avant l’entrée en vigueur de l’extension pour ce client : retenue TVA non appliquée dans ce parcours.');}
 let rasRate=vatEligible?(x.client==='public'?75:(x.arf?75:100)):0,exemption=false;
 if(rasRate>0&&gross<=5000){if(!['yes','no'].includes(x.small))return fail('Confirmez le plafond mensuel de 50 000 DH TTC pour cette petite prestation.');if(x.small==='yes'){rasRate=0;exemption=true;reasons.push('Exclusion de retenue TVA : opération ≤ 5 000 DH TTC et plafond mensuel confirmé.');}}
 if(x.client==='private')reasons.push('Seuil du client à la date de règlement : '+pay.threshold+' millions DH HT au dernier exercice clos.');
 if(['bank','insurance'].includes(x.client))reasons.push('Banque / assurance : extension depuis le 1er juillet 2026, sans condition de chiffre d’affaires.');
 if(x.client==='public')reasons.push('Secteur public : 75 % de la TVA sur les services de la liste A, indépendamment de l’attestation.');
 if(isRate)reasons.push('IS : 5 % du HT, rémunération de l’article 15 bis confirmée. Date d’allocation : '+isDate+'.');else reasons.push(x.isScope==='no'?'IS : rémunération déclarée hors champ de l’article 15 bis.':'IS : client hors champ à la première date d’allocation.');
 if(rasRate&&x.client!=='public')reasons.push(x.arf?'TVA : attestation de moins de 6 mois présentée au client, retenue de 75 %.':'TVA : absence d’attestation récente présentée, retenue de 100 %.');
 if(x.vat===0)reasons.push('Aucune TVA facturée : aucune retenue TVA.');
 if(!pay.active)reasons.push('Client hors champ de cette extension à la date de règlement.');
 if(x.paymentDate>='2027-01-01')reasons.push('Projection selon les paliers du CGI 2026. Vérifier les éventuelles modifications législatives de l’année concernée.');
 const is=round(x.ht*isRate/100),ras=round(vatAmount*rasRate/100),treasury=round(is+ras),net=round(gross-treasury);
 return {...x,serviceLabel:service.label,isDate,vatAmount,gross,isRate,rasRate,is,ras,treasury,net,total:round(net+treasury),reasons,exemption,version:'CGI 2026 — vérification 14/10/2026'};
}
root.CosteraRAS={groups,services,simulate,eligibility};if(typeof module!=='undefined')module.exports=root.CosteraRAS;
})(typeof window!=='undefined'?window:globalThis);
