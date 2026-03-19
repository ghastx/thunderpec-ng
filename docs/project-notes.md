# ThunderPEC-ng — Note di progetto e decisioni

## Analisi del codice legacy (v1.9.1)

L'estensione originale è una **legacy XUL/XPCOM overlay extension** compatibile con Thunderbird 3.0–60.x. Il codebase comprende circa 700 KB di JavaScript distribuiti su 23+ file, 14 file XUL per l'interfaccia, un database SQLite locale (`thunderpec.sqlite` con tabelle `parameters`, `pec`, `autoarch`, `pecdata`), 2 moduli JSM e localizzazione in italiano e inglese.

Le tecnologie utilizzate (XUL overlays, chrome.manifest, install.rdf, XPCOM diretto tramite `Components.classes`/`Components.interfaces`, `Components.utils.import()`) sono state **completamente rimosse** a partire da Thunderbird 78 (2020). Non è possibile aggiornare il codice esistente: serve una riscrittura.

## Decisioni prese

### Tipo di riscrittura
Riscrittura completa come **MailExtension** (Manifest V3) con uso di **WebExtension Experiments** dove le API native non coprono le necessità.

### Target di compatibilità
**Thunderbird 140 ESR+** (versione ESR corrente a marzo 2026). Manifest V3 scelto per evitare una seconda migrazione futura.

### Perimetro funzionale
Le funzionalità da implementare nella nuova versione sono:

1. **Apertura busta PEC** — Visualizzazione diretta del messaggio originale contenuto nella busta di trasporto
2. **Gestione notifiche** — Collegamento automatico delle ricevute (accettazione, consegna, mancata consegna) al messaggio originale, con vista riassuntiva "Stato del messaggio"
3. **Filtri rapidi** — Separazione messaggi PEC dalle notifiche con filtri dedicati
4. **Archiviazione** — Salvataggio di messaggio e relative ricevute in un file ZIP
5. **Gestione account PEC** — Abilitazione/disabilitazione selettiva per singolo account, con supporto gestori preconfigurati

### Funzionalità escluse
- Ricevute PCT (processo civile telematico)
- Parser FatturaPA (fatturazione elettronica)
- Cerca PA (ricerca indirizzi PEC su DigitPA)
- Trasferimento a PocketPEC
- Supporto QR code
- Gestione P7M

### Licenza
Il codice originale è rilasciato sotto **LGPL-3.0**. La nuova versione mantiene la stessa licenza.

### Repository
- Branch `main`: nuova estensione MailExtension
- Branch `legacy`: codice originale v1.9.1 come riferimento

## Stima della difficoltà

Difficoltà complessiva: **6.5/10** (ridotta dal 7.5 iniziale grazie al perimetro funzionale ristretto).

La parte più critica è la Fase 4 (integrazione messaggi con Experiments), stimata 9/10. Le altre fasi vanno da 3/10 a 6/10.

Tempo stimato: **3–6 mesi** per uno sviluppatore part-time, per arrivare a una versione funzionante con le feature principali.

## Note tecniche

### Codice riutilizzabile (~40-50%)
- Parsing XML delle buste di trasporto PEC
- Parsing delle ricevute e notifiche PEC
- Utility di hashing e verifica
- Logica di collegamento notifiche ai messaggi

### Codice da riscrivere (~50-60%)
- Tutta l'interfaccia utente (da XUL a HTML/CSS/JS)
- Integrazione con Thunderbird (da XPCOM a WebExtension API + Experiments)
- Layer database (da `mozIStorageService` a `browser.storage.local` o IndexedDB)
- Moduli JSM (da `Components.utils.import()` a ES modules)

### WebExtension Experiments necessari
- Accesso al contenuto MIME per estrarre il messaggio dalla busta PEC
- Lettura di header custom specifici della PEC
- Integrazione con il Quick Filter Bar
- Colonna personalizzata PEC nella lista messaggi

### Risorse utili
- [Documentazione sviluppatori Thunderbird](https://developer.thunderbird.net)
- [API WebExtension Thunderbird (MV3)](https://webextension-api.thunderbird.net/en/mv3/)
- [Repo Experiments ufficiale](https://github.com/thunderbird/webext-experiments)
- [Repo webext-support](https://github.com/thunderbird/webext-support)

## Decisioni Fase 1 — Scheletro MailExtension

### Manifest V3
Scelto `manifest_version: 3` con `strict_min_version: "128.0"` (Thunderbird ESR). Il manifest usa `__MSG_extensionName__` per il nome localizzato.

### ID estensione
Nuovo ID `thunderpec-ng@gmail.com`, distinto dal legacy `thunderpec@gmail.com` per evitare conflitti.

### Background script
Event Page non persistente (`src/background.js`). Registra un menu placeholder nel menu Strumenti di Thunderbird tramite `browser.menus` API con contesto `tools_menu`.

### Permessi
- `storage` — per persistenza dati (Fase 3)
- `messagesRead` — per accesso ai messaggi PEC (Fase 4)
- `accountsRead` — per gestione account PEC (Fase 4)
- `menus` — per menu nel menu Strumenti

### Localizzazione
Default locale: italiano (`it`). Supporto inglese (`en`) presente. Usa il formato WebExtension `_locales/<lang>/messages.json`.
