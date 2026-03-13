# Ultrahuman Ring im ioBroker: Schlaf, HRV & Gesundheitsdaten ins Smart Home integrieren

*Dein Ultrahuman Ring misst rund um die Uhr Schlaf, Herzfrequenz, HRV, SpO2 und Hauttemperatur. Aber was, wenn du diese Daten nicht nur in der App, sondern direkt in deinem Smart Home nutzen könntest? Genau dafür habe ich einen kostenlosen ioBroker Adapter entwickelt – und in diesem Beitrag zeige ich dir alles: Von der Installation über alle 38 verfügbaren Metriken bis hin zu konkreten Automatisierungsideen für dein Zuhause.*

---

## Warum Gesundheitsdaten ins Smart Home gehören

Wearables wie der Ultrahuman Ring sammeln faszinierende Daten über unseren Körper. Schlafqualität, Herzfrequenzvariabilität (HRV), Ruhepuls, Blutsauerstoff – alles wird kontinuierlich gemessen und in der Ultrahuman App aufbereitet. Das Problem: Diese Daten bleiben isoliert in der App. Sie können nicht mit anderen Systemen interagieren.

Dabei schlummert in diesen Gesundheitsdaten enormes Potenzial für dein Smart Home:

- **Was wäre, wenn** dein Haus wüsste, dass du schlecht geschlafen hast – und morgens automatisch sanftes Licht statt grellem Deckenlicht einschaltet?
- **Was wäre, wenn** eine ungewöhnlich hohe Ruheherzfrequenz erkannt wird und du eine Warnung auf dein Handy bekommst, bevor du merkst, dass du krank wirst?
- **Was wäre, wenn** dein Morgen-Briefing über Alexa dir automatisch zusammenfasst, wie deine letzte Nacht war?

Genau das ermöglicht der **ioBroker.ultrahuman Adapter**. Er holt deine Ring-Daten über die offizielle Ultrahuman Partner API und stellt sie als ioBroker-Objekte bereit – nutzbar in Visualisierungen, Scripten und Automatisierungen.

---

## Was ist der Ultrahuman Ring?

Für alle, die den Ring noch nicht kennen: Der **Ultrahuman Ring Air** (bzw. Ring Pro) ist ein Smart Ring aus Titan, der am Finger getragen wird und kontinuierlich biometrische Daten erfasst. Mit nur 2,4 bis 3,6 Gramm ist er im Alltag kaum spürbar.

### Die wichtigsten Eigenschaften:

| Eigenschaft | Details |
|---|---|
| **Gewicht** | 2,4 – 3,6 g (je nach Größe) |
| **Material** | Titanlegierung mit Wolfram-Carbid-Beschichtung |
| **Wasserdicht** | Bis 100 Meter |
| **Akkulaufzeit** | 5 – 6 Tage |
| **Ladezeit** | 1 – 2 Stunden |
| **Sensoren** | PPG (Photoplethysmographie), Temperatur, Beschleunigungsmesser |
| **Konnektivität** | Bluetooth Low Energy 5.3 |
| **Abo-Kosten** | Keine – lebenslanger Zugriff auf alle Funktionen |
| **Preis** | Ab ca. 379 € |

Der letzte Punkt ist besonders interessant: Im Gegensatz zum Oura Ring (ab 5,99 €/Monat) fallen beim Ultrahuman Ring **keine laufenden Kosten** an. Einmal kaufen, für immer nutzen.

### Was der Ring misst:
- **Schlaf**: Phasen (REM, Tiefschlaf, Leichtschlaf), Dauer, Effizienz, Score, Zyklen
- **Herzfrequenz**: Ruhepuls, Nacht-HR, Durchschnitt, Trend
- **HRV** (Herzfrequenzvariabilität): Ein Schlüsselindikator für Erholung und Stress
- **SpO2** (Blutsauerstoff): Je nach Ringmodell
- **Hauttemperatur**: Abweichungen können Krankheiten frühzeitig anzeigen
- **Aktivität**: Schritte, aktive Minuten, Bewegungsindex, VO2 max

---

## Der ioBroker.ultrahuman Adapter

### Überblick

Der Adapter verbindet deinen Ultrahuman Ring mit deinem ioBroker Smart Home System. Er nutzt die **offizielle Ultrahuman Partner API**, um deine Gesundheitsdaten periodisch abzurufen und als ioBroker-Datenpunkte (Objekte) bereitzustellen.

**Eckdaten:**
- **Lizenz**: MIT (Open Source, kostenlos)
- **Sprache**: TypeScript
- **Plattform**: ioBroker
- **GitHub**: [SmarterPapa/ioBroker.ultrahuman](https://github.com/SmarterPapa/ioBroker.ultrahuman)
- **npm**: [iobroker.ultrahuman](https://www.npmjs.com/package/iobroker.ultrahuman)

### Alle 38 verfügbaren Metriken im Detail

Der Adapter erstellt die folgenden Datenpunkte in deinem ioBroker. Alle Werte werden automatisch und periodisch aktualisiert.

#### Schlaf (13 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `sleep.bedtimeStart` | Zeitpunkt des Zubettgehens | ISO 8601 |
| `sleep.bedtimeEnd` | Zeitpunkt des Aufstehens | ISO 8601 |
| `sleep.timeInBed` | Gesamte Zeit im Bett | Minuten |
| `sleep.timeAsleep` | Gesamte Schlafzeit | Minuten |
| `sleep.timeToFallAsleep` | Einschlafzeit | Minuten |
| `sleep.sleepEfficiency` | Schlafeffizienz (Schlafzeit / Zeit im Bett) | % |
| `sleep.sleepScore` | Schlaf-Score (0–100) | – |
| `sleep.sleepQuality` | Qualität: excellent, good, fair, poor | – |
| `sleep.remSleep` | REM-Schlafphase | Minuten |
| `sleep.deepSleep` | Tiefschlafphase | Minuten |
| `sleep.lightSleep` | Leichtschlafphase | Minuten |
| `sleep.restorativeSleep` | Erholsamer Schlaf (REM + Tief) | % |
| `sleep.sleepCycles` | Anzahl vollständiger Schlafzyklen | – |

**Wusstest du?** Ein vollständiger Schlafzyklus dauert etwa 90 Minuten und besteht aus Leichtschlaf, Tiefschlaf und REM-Schlaf. 4–6 Zyklen pro Nacht gelten als optimal. Der Adapter zählt diese Zyklen automatisch.

#### Herzfrequenz (6 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `heart.restingHR` | Ruheherzfrequenz (im Schlaf) | bpm |
| `heart.nightRHR` | Nächtliche Ruheherzfrequenz | bpm |
| `heart.lastReading` | Letzte Messung | bpm |
| `heart.avg` | Durchschnittliche Herzfrequenz | bpm |
| `heart.min` / `heart.max` | Minimum / Maximum | bpm |
| `heart.trend` | Trend (steigend, stabil, fallend) | – |

**Wichtig**: Eine plötzlich erhöhte Ruheherzfrequenz kann ein Frühindikator für eine beginnende Erkrankung sein – noch bevor du Symptome spürst. Der Adapter macht es möglich, genau darauf automatisiert zu reagieren.

#### HRV – Herzfrequenzvariabilität (5 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `hrv.average` | Durchschnittliche HRV | ms |
| `hrv.sleepHRV` | HRV während des Schlafs | ms |
| `hrv.min` / `hrv.max` | Minimum / Maximum | ms |
| `hrv.trend` | Trend | – |

**Was ist HRV?** Die Herzfrequenzvariabilität misst die zeitlichen Abstände zwischen einzelnen Herzschlägen. Eine höhere HRV bedeutet in der Regel, dass dein Körper besser erholt ist und flexibler auf Belastung reagieren kann. Eine niedrige HRV kann auf Stress, Übertraining oder eine beginnende Krankheit hindeuten.

#### SpO2 – Blutsauerstoff (3 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `spo2.avg` | Durchschnittlicher Blutsauerstoff | % |
| `spo2.min` / `spo2.max` | Minimum / Maximum | % |

Normale Werte liegen zwischen 95 % und 100 %. Werte unter 90 % können medizinisch relevant sein.

#### Hauttemperatur (4 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `temperature.lastReading` | Letzte Messung | °C |
| `temperature.avg` | Durchschnitt | °C |
| `temperature.min` / `temperature.max` | Minimum / Maximum | °C |

**Tipp**: Abweichungen der Hauttemperatur nach oben können auf Fieber hindeuten, noch bevor du es selbst bemerkst. Mit ioBroker kannst du bei Abweichungen automatisch eine Benachrichtigung versenden.

#### Aktivität (6 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `activity.steps` | Schritte heute | Schritte |
| `activity.stepsAvg` | Durchschnittliche Schritte | Schritte |
| `activity.activeMinutes` | Aktive Minuten | Minuten |
| `activity.movementIndex` | Bewegungsindex | – |
| `activity.recoveryIndex` | Erholungsindex | – |
| `activity.vo2Max` | Maximale Sauerstoffaufnahme | ml/kg/min |

#### Systemstatus (2 Datenpunkte)

| Datenpunkt | Beschreibung | Einheit |
|---|---|---|
| `info.connection` | API-Verbindungsstatus | boolean |
| `info.lastUpdate` | Letztes erfolgreiches Update | ISO 8601 |

---

## Voraussetzungen: Ultrahuman Partner API Zugang

Der Adapter nutzt die **offizielle Ultrahuman Partner API**. Dafür brauchst du einen API-Schlüssel und einen Access Code direkt von Ultrahuman. Keine Sorge – der Prozess ist einfacher, als er klingt.

### So bekommst du deine Zugangsdaten:

1. **E-Mail an Ultrahuman senden** an `feedback@ultrahuman.com`
2. **API Key und Access Code erhalten** (dauert in der Regel wenige Tage)
3. **Access Code in der App hinterlegen**: Ultrahuman App → Profil → Einstellungen → Partner ID
4. **API Key im Adapter eintragen**

### E-Mail-Vorlage zum Kopieren:

Der Adapter liefert im Admin-Panel eine fertige E-Mail-Vorlage mit, die du nur noch kopieren und absenden musst:

```
Hello Ultrahuman Team,

I would like to request API access for my Ultrahuman Ring account.

My email address: [DEINE E-MAIL HIER]

I need:
• API Token
• Access Code

Reason: I want to use the ioBroker adapter
https://github.com/SmarterPapa/ioBroker.ultrahuman
to integrate my ring data into my smart home.

Thank you in advance!

Best regards
```

**Hinweis:** Falls du dich bei Ultrahuman mit Apple Privacy Relay angemeldet hast, endet deine E-Mail-Adresse auf `@privaterelay.appleid.com`. Du findest die korrekte Adresse in der App unter Profil → Einstellungen (Zahnrad) → Konto.

---

## Installation Schritt für Schritt

### Methode 1: Installation über npm (empfohlen)

Im ioBroker Admin auf **Adapter** → **Von eigenem URL installieren** → **npm** → Adaptername eingeben:

```
iobroker.ultrahuman
```

### Methode 2: Installation von GitHub

Alternativ kannst du den Adapter direkt von GitHub installieren:

```
iobroker url https://github.com/SmarterPapa/ioBroker.ultrahuman
```

### Konfiguration

Nach der Installation öffnest du die Instanzeinstellungen. Der Adapter bietet vier übersichtliche Tabs:

#### Tab 1: Authentifizierung

Hier trägst du deine Zugangsdaten ein:

- **API-Schlüssel**: Der API Key, den du von Ultrahuman erhalten hast
- **Ultrahuman E-Mail**: Die E-Mail-Adresse deines Ultrahuman-Kontos

#### Tab 2: Einstellungen

- **Abfrageintervall**: Wie oft der Adapter neue Daten von der API holt (Standard: 30 Minuten)
- Minimum: 5 Minuten
- Maximum: 1440 Minuten (24 Stunden)
- **Empfehlung**: 30 Minuten ist ein guter Kompromiss. Der Ring synchronisiert seine Daten nicht in Echtzeit, sondern periodisch in die Cloud. Häufigeres Abfragen bringt daher keinen Mehrwert, belastet aber die API.

#### Tab 3: Ideen

Hier findest du direkt im Adapter Inspirationen, was du mit den Gesundheitsdaten machen kannst – von Visualisierungen bis hin zu Automatisierungen (dazu gleich mehr).

#### Tab 4: Über

Informationen zum Adapter, verfügbare Datenpunkte, Links und Lizenzinformationen.

---

## Praxisbeispiele: So nutzt du die Daten im Smart Home

Jetzt wird es spannend. Hier sind konkrete Beispiele, wie du deine Ultrahuman Ring Daten im ioBroker sinnvoll einsetzen kannst.

### Visualisierungen

#### Schlaf-Dashboard mit VIS oder Jarvis

Erstelle ein Dashboard, das dir jeden Morgen auf einen Blick zeigt:
- **Schlaf-Score** als große Zahl mit farblicher Codierung (grün > 80, gelb 60–80, rot < 60)
- **Schlafphasen** als Tortendiagramm (REM, Tief, Leicht)
- **Trend-Grafik** deiner HRV über die letzten 7 Tage
- **Schritte** als Fortschrittsbalken zum Tagesziel

Dafür eignen sich ioBroker Visualisierungslösungen wie **VIS 2**, **Jarvis** oder **iQontrol**.

#### Langzeit-Analyse mit InfluxDB & Grafana

Für richtig tiefe Einblicke: Speichere alle Gesundheitsdaten in **InfluxDB** und visualisiere sie mit **Grafana**. So kannst du Muster erkennen:

- Korreliert dein Schlaf-Score mit dem Wochentag?
- Wie verhält sich deine HRV bei Stress auf der Arbeit vs. im Urlaub?
- Hat das neue Kopfkissen einen messbaren Einfluss auf deinen Tiefschlaf?

### Automatisierungen

#### 1. Sanftes Aufwachlicht bei schlechtem Schlaf

```javascript
on({id: 'ultrahuman.0.sleep.sleepEfficiency', change: 'ne'}, function(obj) {
    if (obj.state.val < 75) {
        // Schlafeffizienz unter 75%: Sanftes Aufwachlicht
        setState('hue.0.Schlafzimmer.Licht.level', 20);
        setState('hue.0.Schlafzimmer.Licht.ct', 500); // Warmweiß
    }
});
```

#### 2. Krankheitswarnung bei hohem Ruhepuls

```javascript
on({id: 'ultrahuman.0.heart.restingHR', change: 'ne'}, function(obj) {
    const rhr = obj.state.val;
    const normalRHR = 58; // Dein normaler Ruhepuls
    
    if (rhr > normalRHR * 1.15) {
        // Ruhepuls 15% über Normal
        sendTo('telegram.0', {
            text: '⚠️ Dein Ruhepuls liegt bei ' + rhr + 
                  ' bpm (normal: ' + normalRHR + 
                  '). Achte heute auf dich!'
        });
    }
});
```

#### 3. Morgen-Briefing via Alexa

```javascript
schedule('0 7 * * *', function() {
    const score = getState('ultrahuman.0.sleep.sleepScore').val;
    const quality = getState('ultrahuman.0.sleep.sleepQuality').val;
    const duration = Math.round(getState('ultrahuman.0.sleep.timeAsleep').val / 60 * 10) / 10;
    const steps = getState('ultrahuman.0.activity.steps').val;
    
    const qualityDE = {
        'excellent': 'ausgezeichnet',
        'good': 'gut',
        'fair': 'mittelmäßig',
        'poor': 'schlecht'
    };
    
    const text = 'Guten Morgen! Dein Schlaf-Score liegt bei ' + score + 
                 '. Du hast ' + duration + ' Stunden geschlafen. ' +
                 'Die Qualität war ' + qualityDE[quality] + '. ' +
                 'Gestern hattest du ' + steps + ' Schritte.';
    
    setState('alexa2.0.Echo-Devices.Schlafzimmer.Commands.speak', text);
});
```

#### 4. Entspannungsmodus bei niedriger HRV

```javascript
on({id: 'ultrahuman.0.hrv.average', change: 'ne'}, function(obj) {
    if (obj.state.val < 30) {
        // Niedrige HRV = hoher Stress
        setState('hue.0.Wohnzimmer.Szene', 'Entspannung');
        setState('sonos.0.Wohnzimmer.favorites_set', 'Entspannungsmusik');
    }
});
```

#### 5. Raumtemperatur nach Hauttemperatur anpassen

```javascript
on({id: 'ultrahuman.0.temperature.lastReading', change: 'ne'}, function(obj) {
    const skinTemp = obj.state.val;
    const avgTemp = getState('ultrahuman.0.temperature.avg').val;
    
    if (skinTemp > avgTemp + 0.5) {
        // Hauttemperatur überdurchschnittlich hoch
        setState('heizung.0.Schlafzimmer.Solltemperatur', 19); // Kühler
    }
});
```

### Benachrichtigungen & Protokollierung

- **Wöchentlicher Gesundheitsbericht** via Telegram oder E-Mail mit Durchschnittswerten
- **Warnung bei SpO2-Abfall** unter einen kritischen Schwellwert
- **Vergleich** von Schlafdaten mit Wetter- oder Kalenderdaten (z.B. "Schlafe ich schlechter nach einem stressigen Arbeitstag?")

---

## Die Admin-Oberfläche im Detail

Der Adapter bringt eine aufgeräumte, responsive Admin-Oberfläche mit vier Tabs mit. Hier ein Überblick:

### Authentifizierung

Der erste Tab führt dich Schritt für Schritt durch die API-Einrichtung. Inklusive einer kopierbaren E-Mail-Vorlage für die Anfrage bei Ultrahuman. Die Zugangsdaten (API-Schlüssel und E-Mail) werden verschlüsselt in der ioBroker-Konfiguration gespeichert.

### Einstellungen

Hier konfigurierst du das Abfrageintervall. Der Adapter erklärt direkt, warum 30 Minuten empfohlen sind und welche Grenzen gelten.

### Ideen

Ein besonderes Feature: Direkt im Adapter findest du Inspirationen für Visualisierungen, Automatisierungen und Benachrichtigungen. So musst du nicht lange überlegen, was du mit den Daten anfangen könntest.

### Über

Alle technischen Infos, Links zum GitHub Repository, Probleme melden und Lizenzinformationen.

---

## Technische Details für Fortgeschrittene

### Architektur

Der Adapter ist in **TypeScript** geschrieben und verwendet die offizielle ioBroker Adapter-Architektur. Die API-Abfragen erfolgen über **Axios** mit ordentlichem Error-Handling und Retry-Logik.

### Datenfluss

```
Ultrahuman Ring → Bluetooth → Ultrahuman App → Ultrahuman Cloud
     → Partner API → ioBroker.ultrahuman Adapter → ioBroker Objekte
         → VIS / Scripts / Automatisierungen
```

Der Ring synchronisiert seine Daten über Bluetooth mit der Ultrahuman App auf deinem Smartphone. Von dort werden sie in die Cloud hochgeladen. Der Adapter holt sie über die REST API ab.

### Datenschutz & Sicherheit

- Der **API-Schlüssel** wird in der ioBroker-Konfiguration **verschlüsselt** gespeichert (`encryptedNative`)
- Alle Daten bleiben auf deinem lokalen ioBroker Server
- Der Adapter sendet **keine Daten** an Dritte
- Vollständig **Open Source** (MIT Lizenz) – du kannst den Code jederzeit inspizieren

### Unterstützte ioBroker-Versionen

- **Node.js**: >= 20
- **ioBroker Admin**: >= 7.6.20
- **@iobroker/adapter-core**: 3.3.2

---

## Häufige Fragen (FAQ)

### Wie lange dauert es, bis ich die API-Zugangsdaten bekomme?

Erfahrungsgemäß antwortet das Ultrahuman Team innerhalb von 1–5 Werktagen.

### Kann ich den Adapter auch mit dem Ultrahuman Ring Pro nutzen?

Ja. Der Adapter funktioniert mit allen Ultrahuman Ring Modellen, die über die Partner API verfügen.

### Was passiert, wenn die API nicht erreichbar ist?

Der Adapter setzt den Verbindungsstatus (`info.connection`) auf `false` und versucht es beim nächsten Intervall erneut. Deine zuletzt abgerufenen Daten bleiben in den Datenpunkten erhalten.

### Werden meine Daten irgendwohin gesendet?

Nein. Die Daten werden ausschließlich von der Ultrahuman Cloud gelesen und lokal in deinem ioBroker gespeichert. Der Adapter ist Open Source – du kannst den Code jederzeit überprüfen.

### Wie oft sollte ich die Daten abfragen?

30 Minuten ist ein guter Standard. Der Ring synchronisiert nicht in Echtzeit, daher bringt häufigeres Polling keinen Mehrwert. Für Schlaf-Daten reicht auch einmal pro Stunde, da diese sich nur einmal am Tag ändern.

### Kann ich die Daten in InfluxDB speichern?

Ja! Aktiviere einfach den ioBroker InfluxDB-Adapter und wähle die gewünschten Ultrahuman-Datenpunkte für die Langzeitspeicherung aus. In Kombination mit Grafana erhältst du professionelle Langzeit-Dashboards.

### Funktioniert der Adapter auch ohne Cloud/Internet?

Nein. Der Adapter benötigt eine Internetverbindung, da die Daten über die Ultrahuman Cloud API abgerufen werden. Der Ring selbst überträgt seine Daten über Bluetooth an die App, die sie in die Cloud synct.

---

## Vergleich: Ultrahuman Ring vs. Oura Ring im ioBroker

Für ioBroker gibt es bereits einen Adapter für den **Oura Ring**. Hier ein Vergleich:

| Merkmal | Ultrahuman Ring | Oura Ring |
|---|---|---|
| **Abo-Kosten** | Keine | Ab 5,99 €/Monat |
| **ioBroker Adapter** | ioBroker.ultrahuman (aktiv entwickelt) | ioBroker.oura (Community) |
| **API-Zugang** | Kostenlos (Partner API) | Personal Access Token |
| **Anzahl Metriken** | 38 Datenpunkte | Ca. 20 Datenpunkte |
| **HRV-Daten** | Ja (avg, sleep, min, max, trend) | Ja (avg) |
| **SpO2** | Ja (je nach Modell) | Ja |
| **Hauttemperatur** | Ja (4 Datenpunkte) | Ja |
| **Aktivitätsdaten** | Ja (VO2 max, Recovery Index) | Ja |

---

## Roadmap & Weiterentwicklung

Der Adapter wird aktiv weiterentwickelt. Geplante Features:

- **Historische Daten**: Rückwirkendes Laden älterer Daten
- **Trend-Berechnung**: Automatische Trend-Analyse über konfigurierbare Zeiträume
- **Widget-Template**: Fertiges VIS-Widget für ein Gesundheits-Dashboard
- **Weitere Metriken**: Sobald Ultrahuman neue API-Endpunkte bereitstellt

Feature-Wünsche? [Erstelle ein Issue auf GitHub!](https://github.com/SmarterPapa/ioBroker.ultrahuman/issues)

---

## Installation zusammengefasst

1. ✅ Ultrahuman Ring besitzen und eingerichtet haben
2. ✅ API-Zugang bei Ultrahuman per E-Mail anfragen
3. ✅ Access Code in der Ultrahuman App unter Profil → Einstellungen → Partner ID eintragen
4. ✅ Adapter in ioBroker installieren (`iobroker.ultrahuman` via npm oder GitHub URL)
5. ✅ API-Schlüssel und E-Mail in den Adaptereinstellungen eintragen
6. ✅ Abfrageintervall setzen (Standard: 30 Minuten)
7. ✅ Fertig! Die Datenpunkte erscheinen unter `ultrahuman.0.*`

---

## Unterstützung

Der Adapter ist kostenlos und Open Source. Wenn er dir gefällt und du die Weiterentwicklung unterstützen möchtest, freue ich mich über einen Kaffee:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/smarterpapa)

Bei Problemen oder Fragen:
- **GitHub Issues**: [github.com/SmarterPapa/ioBroker.ultrahuman/issues](https://github.com/SmarterPapa/ioBroker.ultrahuman/issues)
- **GitHub Repository**: [github.com/SmarterPapa/ioBroker.ultrahuman](https://github.com/SmarterPapa/ioBroker.ultrahuman)

---

*Hast du den Adapter im Einsatz? Welche Automatisierungen hast du damit gebaut? Schreib es gerne in die Kommentare!*
