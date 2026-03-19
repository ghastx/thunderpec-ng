# ThunderPEC-ng — Piano di migrazione

## Fase 0 — Preparazione repository ✅
- [x] Caricare codice legacy su branch `legacy`
- [x] Creare branch `main` per la nuova estensione
- [x] README iniziale
- [x] Documentazione decisioni (`docs/project-notes.md`)

## Fase 1 — Scheletro MailExtension
- [x] Creare `manifest.json` (Manifest V3, target TB 128+)
- [x] Background script (Event Page)
- [x] Struttura cartelle (`_locales/`, `experiments/`, `src/`, `ui/`)
- [x] Menu base "ThunderPEC-ng" (vuoto ma visibile)
- [ ] Testare installazione su Thunderbird

## Fase 2 — Core PEC (logica riutilizzabile)
- [ ] Estrarre e convertire la logica di parsing buste PEC in ES modules
- [ ] Estrarre e convertire il parsing delle notifiche/ricevute PEC
- [ ] Estrarre utility (hashing, verifica)
- [ ] Scrivere test unitari per i moduli estratti

## Fase 3 — Database e storage
- [ ] Definire schema dati per `browser.storage.local`
- [ ] Implementare layer di persistenza (account PEC, stato notifiche)
- [ ] Gestione ciclo di vita Event Page (persist/restore stato)

## Fase 4 — Integrazione messaggi (Experiments)
- [ ] Experiment API per accesso al contenuto MIME delle buste PEC
- [ ] Experiment API per lettura header custom PEC
- [ ] Logica di rilevamento messaggi PEC vs messaggi normali
- [ ] Estrazione e visualizzazione del messaggio originale dalla busta
- [ ] Collegamento automatico notifiche al messaggio originale
- [ ] Vista "Stato del messaggio" (riassunto notifiche)

## Fase 5 — Interfaccia utente
- [ ] Menu ThunderPEC (voci principali)
- [ ] Toolbar nella finestra messaggio
- [ ] Pagina opzioni/preferenze (HTML)
- [ ] Dialog gestione account PEC
- [ ] Filtri rapidi (Messaggi / Notifiche) — potrebbe richiedere Experiment

## Fase 6 — Archiviazione
- [ ] Salvataggio messaggio + ricevute in ZIP
- [ ] Selezione cartella di destinazione

## Fase 7 — Finalizzazione
- [ ] Localizzazione i18n (`_locales/it/`, `_locales/en/`)
- [ ] Test end-to-end su Thunderbird 140 ESR
- [ ] Packaging .xpi per distribuzione
- [ ] Aggiornamento README e documentazione
