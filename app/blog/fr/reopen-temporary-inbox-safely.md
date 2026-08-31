## Comment rouvrir une boîte temporaire en sécurité sans perdre l'accès

Vous pouvez rouvrir une boîte cleanorapi.com grâce à une URL directe contenant l'adresse complète. Cette fonction est utile après la fermeture d'un onglet, le redémarrage du navigateur ou un changement de page pendant une tâche courte. Rouvrir ne signifie cependant ni restaurer des messages supprimés, ni créer un compte privé, ni conserver le courrier indéfiniment. L'adresse présente dans le lien sert de clé d'accès et les messages reçus sont conservés jusqu'à 24 heures avant leur suppression automatique.

La méthode sûre consiste à vérifier que la tâche est réellement temporaire, conserver le lien dans un emplacement privé, utiliser un appareil de confiance et transférer tout compte devenu précieux vers une adresse durable. N'utilisez pas une boîte temporaire pour des paiements, une récupération importante, du travail, des documents personnels ou des informations irremplaçables.

### Ce qui se passe à l'ouverture du lien

Le format général est :

`https://cleanorapi.com/inbox/adresse-complete@domaine-actuellement-accepte`

Utilisez exactement l'adresse affichée par le site, avec son domaine actuel. cleanorapi.com normalise et valide la valeur. Si le format est correct, le domaine autorisé et le nom non réservé, l'adresse est enregistrée dans la session signée du navigateur, puis la page d'accueil de la boîte s'ouvre.

L'ouverture lance une nouvelle fenêtre de session de 24 heures et remplace l'adresse déjà enregistrée dans cette session. Si vous consultiez une autre boîte dans le même navigateur, sauvegardez d'abord le résultat nécessaire.

Le lien n'est pas à usage unique. Il peut réenregistrer l'adresse dans une autre session. Cette commodité constitue aussi sa limite principale : toute personne connaissant l'adresse complète peut construire la même URL et consulter la même boîte temporaire.

### Rouvrir ne restaure pas les messages supprimés

| Élément | Ce que la réouverture permet | Ce qu'elle ne permet pas |
| --- | --- | --- |
| Session du navigateur | Enregistrer à nouveau l'adresse | Récupérer un cookie supprimé ou prouver le créateur |
| Adresse de la boîte | Revenir à la même destination | Créer un compte privé protégé par mot de passe |
| Messages stockés | Afficher les messages encore conservés | Restaurer les messages supprimés après la rétention |

Les messages sont conservés jusqu'à 24 heures, puis une tâche planifiée retire les données plus anciennes. Une nouvelle session n'annule pas cette suppression. Un favori peut donc ouvrir la bonne adresse après un redémarrage tout en affichant une boîte vide, faute de courrier récent ou parce que l'ancien a déjà été nettoyé.

### Choisir un emplacement de sauvegarde prudent

Garder l'onglet ouvert est pratique pendant une session, mais fragile en cas de fermeture. Un favori privé facilite le retour, mais peut être synchronisé sur d'autres appareils. Une note sécurisée dans un gestionnaire de mots de passe offre davantage de contrôle, à condition de la supprimer ensuite. Une capture est risquée : elle peut rejoindre une sauvegarde photo, un chat ou un partage d'écran.

Pour une tâche personnelle peu risquée, utilisez un favori temporaire dans un profil privé et donnez-lui un nom générique qui ne révèle pas l'adresse. Avec la synchronisation du navigateur, l'URL peut atteindre tous les appareils connectés au même compte.

Dans un test d'équipe légitime, placez le lien uniquement dans un espace à accès contrôlé et précisez qu'il donne accès à toute la boîte. Ne le publiez pas dans un ticket public, un dépôt de code, un événement analytique, un dossier client, un direct ou un enregistrement vidéo.

### Traiter l'adresse comme un identifiant temporaire

La route directe ne contient pas de mot de passe séparé. L'adresse complète suffit pour former le lien ; elle est donc à la fois destination du courrier et identifiant d'accès.

Ne l'affichez pas dans des captures, forums, exemples de code, journaux ou réseaux sociaux. Ne l'utilisez pas pour des données financières, juridiques, médicales, scolaires, professionnelles ou d'identité. Ne transmettez pas toute la boîte à quelqu'un qui a seulement besoin d'un résultat non sensible. Supprimer votre favori local ne révoque pas les copies conservées ailleurs.

Si l'adresse est publiée accidentellement, considérez la boîte comme exposée. Cessez d'y envoyer des informations sensibles et déplacez les comptes importants vers une adresse permanente protégée. En l'absence de mot de passe privé à changer, une adresse révélée ne peut pas redevenir secrète de manière fiable.

### Préférer le même appareil

Le cookie signé peut survivre à un redémarrage normal jusqu'à son expiration. Il peut disparaître après le nettoyage des données, l'utilisation du mode privé, un changement de profil, une réinstallation ou une politique d'effacement agressive.

Copiez l'adresse exacte, conservez son lien dans un endroit privé, gardez la page d'inscription dans un autre onglet, revenez pour actualiser la boîte, puis supprimez le favori à la fin. Si la session est toujours valide, la page d'accueil peut déjà montrer l'adresse. Le lien devient surtout utile si le cookie a disparu, si une autre boîte l'a remplacée ou si vous devez réenregistrer une ancienne adresse.

### Comprendre l'accès depuis un autre appareil

L'ouverture sur un second appareil crée ou met à jour la session propre à cet appareil. Elle ne transfère ni cookie, ni historique, ni message sélectionné, ni état local du premier navigateur. Les deux appareils peuvent voir les messages encore conservés parce qu'ils connaissent la même clé.

Évitez les ordinateurs publics, tablettes partagées, téléphones empruntés, sessions d'assistance distante et navigateurs administrés par une organisation non contrôlée. L'adresse peut rester dans l'historique, les favoris synchronisés, le presse-papiers, les journaux de proxy, les captures et les outils de surveillance.

Si un collaborateur a besoin d'un seul résultat, mieux vaut lui transmettre uniquement l'information non sensible par un canal approprié plutôt que le lien complet. Ne partagez jamais de codes si cela viole les règles ou affaiblit la propriété du compte.

### Dépanner une boîte qui ne se rouvre pas

Si la page renvoie « Not Found », vérifiez l'adresse complète, le symbole `@` et le domaine exact. Le domaine doit encore être accepté, la partie locale valide et les noms réservés sont refusés. Ne modifiez pas manuellement ponctuation, tirets, signes plus ou autres caractères.

Si la redirection réussit mais montre une autre adresse ou une boîte vide :

1. Comparez l'adresse affichée caractère par caractère.
2. Vérifiez si un autre lien a remplacé l'adresse de session.
3. Actualisez une fois et attendez la livraison normale.
4. Confirmez que l'expéditeur a utilisé exactement cette adresse.
5. Demandez-vous si le message dépasse 24 heures.
6. Demandez un seul nouvel envoi si l'ancien est remplaçable.
7. Respectez toute politique qui bloque les domaines temporaires.

Une boîte vide peut indiquer une absence de livraison, une faute d'adresse ou une suppression liée à la rétention. La réouverture seule ne distingue pas toutes ces causes.

### Session renouvelée et courrier conservé sont deux choses différentes

Le lien peut relancer une session de 24 heures, mais ne remet pas à zéro l'âge des messages. La conservation commence à la réception du courrier, pas lors de la dernière ouverture de la boîte.

Un message reçu il y a presque 24 heures peut être supprimé peu après le renouvellement de la session. Effectuez rapidement l'action autorisée et placez tout document durable dans un stockage adapté. Visiter le lien chaque jour ne transforme pas la boîte en archive, en transfert permanent ou en garantie de récupération.

### Savoir quand migrer

Migrez lorsqu'un essai devient payant, qu'un téléchargement comporte une licence, qu'un forum accumule réputation et messages privés, qu'un événement fournit billets ou certificats, qu'une boutique conserve commandes et retours, ou qu'un service stocke fichiers, contacts, invitations et moyens de récupération.

Utilisez les paramètres officiels pour passer à un alias ou à une boîte permanente protégée. Confirmez la nouvelle adresse avant l'expiration temporaire et stockez reçus ou codes de secours ailleurs. Si le service interdit la modification, décidez tôt s'il faut recréer un compte durable.

### Terminer proprement la tâche

Supprimez le favori ou la note, retirez l'adresse des documents partagés et déconnectez-vous du service tiers si nécessaire. Effacer le favori ne supprime pas le compte, n'annule pas un abonnement, ne retire pas un consentement et n'efface pas les copies présentes sur d'autres appareils. Utilisez les contrôles officiels pour ces actions.

N'envoyez pas de nouveaux messages pour « nettoyer » la boîte et ne publiez pas l'adresse. Arrêtez simplement de l'utiliser ; la rétention automatique supprimera les données selon la fenêtre prévue.

### Liste de vérification

1. La tâche est légale, autorisée, courte, peu risquée et remplaçable.
2. La perte de tous les messages n'aurait pas de conséquence grave.
3. Le lien reste sur un appareil ou un espace contrôlé.
4. L'adresse n'apparaît dans aucune capture, journal ou publication publique.
5. Vous savez qu'un autre lien remplace l'adresse de session actuelle.
6. Vous savez qu'une nouvelle session ne restaure pas les messages supprimés.
7. Vous migrerez dès que paiement, identité, récupération ou valeur durable apparaissent.
8. Vous supprimerez l'accès sauvegardé à la fin.

Consultez [Ouvrir une boîte temporaire directement avec une adresse](/fr/blog/direct-email-inbox-link) pour le format, puis le [guide de l'e-mail temporaire 24 heures](/fr/temporary-email-24-hours) pour la rétention.

### Règle finale

Ne rouvrez une boîte temporaire que si vous acceptez de traiter l'adresse complète comme une clé d'accès et de perdre le courrier après la période de conservation. Gardez l'URL privée, utilisez un navigateur de confiance et rappelez-vous qu'une nouvelle session ne rend pas les anciens messages permanents.

Le lien direct est un outil pratique pour une tâche courte et peu risquée, pas une identité ni une archive. Si l'accès doit durer, choisissez une adresse protégée par mot de passe, récupération et contrôle à long terme.