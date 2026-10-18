// Öffentliche Konfiguration (der Publishable Key ist dafür gedacht, in Webseiten zu stehen).
window.TDW = {
  url: 'https://nqkbtfhoixgplmxcpxyn.supabase.co',
  key: 'sb_publishable_C4iTUIUu-CJA4WdyHxjAVw_VAL-cp2F',
  session: '1910',
  date: '2026-10-19',          // nur an diesem Tag zeigt die Startseite die Mitmach-App, sonst die Werkzeuge
  openFrom: '13:30',           // und erst ab dieser Uhrzeit (Mappen liegen schon morgens auf allen Sesseln)
  openUntil: '16:30',          // danach bleibt in der App nur, wer mitgemacht hat; alle anderen kommen zu den Werkzeugen
  participantUrl: 'mitmachen.arminfradler.at',
  quizKern: [0, 2, 3, 4],     // Reihenfolge der Quizfragen in der Kernfassung (Frage 2 ist Reserve)
  quiz: [
    { q: 'Knapp 5.000 Beschäftigte wurden befragt: Wie viele KI-Nutzende verwenden Tools, die ihr Arbeitgeber gar nicht bereitstellt?', o: ['1 von 10', '3 von 10', '6 von 10'], a: 1, src: 'IW Köln, Kurzbericht 63/2026 (19.9.2026), Befragung März/April 2026, knapp 5.000 Beschäftigte in Deutschland: 29,1 %', note: 'Fast jede:r Dritte. Am meisten dort, wo KI-Kompetenz gefördert wird, aber Werkzeuge fehlen (45 %). Und wie ist es in diesem Raum?' },
    { q: 'Am 6. Oktober 2026 hat OpenAI Ergebnisse zu offenen Forschungsfragen der Mathematik veröffentlicht – erarbeitet von einem KI-Modell, aufgeschrieben wie Fachartikel. Wie viele Manuskripte waren es?', o: ['rund 7', 'rund 70', 'rund 700'], a: 2, src: 'OpenAI, github.com/openai/math (719 Manuskripte, Stand 8.10.2026)', note: 'Noch nicht begutachtet, rund 40 % maschinell nachgeprüft. Die Technik wird schnell besser. Wie schnell Ihr Haus mitgeht, bestimmen Sie.' },
    { q: 'Erfahrene Ärzt:innen fanden bei Darmspiegelungen in 28 von 100 Untersuchungen eine Krebsvorstufe. Dann arbeiteten sie drei Monate mit KI. Und danach ohne KI?', o: ['wieder 28 von 100', '22 von 100', '14 von 100'], a: 1, src: 'Budzyń et al., Lancet Gastroenterology & Hepatology 2025 (28,4 % → 22,4 %)', note: 'Ein Fünftel weniger, nach drei Monaten. Was wir dauerhaft abgeben, verlernen wir. Kein Grund gegen KI – aber einer für bewusste Entscheidungen.' },
    { q: 'Stellen Sie sich vor, das ist Ihre Förderstelle. Was tun Sie, bevor Sie die Bankverbindung bestätigen?', o: ['Absender und Link genau prüfen', 'auf die Mail antworten und nachfragen', 'die Nummer aus der Signatur anrufen', 'die Förderstelle unter der Nummer aus Ihren Unterlagen anrufen'], a: 3, mail: true, src: 'CERT.at, 26.8.2026 · Watchlist Internet, 9.10.2026 · Bundeskriminalamt/OeNB, 9.10.2026 · FIDO Alliance, Mai 2026' },
    { q: 'Was hat sich im Juli 2026 an der Pflicht zur KI-Kompetenz (Art. 4 der EU-KI-Verordnung, „AI Act“) geändert?', o: ['verschärft – Zertifikat wird Pflicht', 'abgeschwächt – Maßnahmen setzen reicht', 'abgeschafft – keine Pflicht mehr'], a: 1, src: 'Verordnung (EU) 2026/1744 (Digital Omnibus), in Kraft seit 27.7.2026 · Beispiel: Kunstuniversität Linz, KI-Richtlinie seit 1.5.2026', note: 'Kein Zertifikat, kein Test, kein bestimmtes Niveau. Maßnahmen setzen reicht; kurz festhalten hilft als Nachweis. Kunstuni Linz: 2 Stunden Schulung, dann Zugang.' }
  ],
  usecases: ['Anfragen von Teilnehmenden', 'Förderantrag gegenlesen lassen', 'Protokolle', 'Kursausschreibungen', 'Sachberichte an Fördergeber', 'Feedback auswerten', 'Lernmaterial anpassen (einfache Sprache)', 'Social Media', 'Vorlagen der Verwaltung (Mahnung, Bestätigung)'],
  context: ['Stichworte & Zielgruppe', 'Leitbild & Ton', 'Vorgaben des Fördergebers', 'Vorjahresbericht als Beispiel'],
  roles: ['Leitung', 'Bildungsmanagement / Programm', 'Verwaltung', 'Marketing / Kommunikation', 'IT / Digitales', 'Personal', 'Fördergeber / öffentliche Hand', 'Anderes'],
  sizes: ['bis 10', '10 bis 50', 'über 50'],
  usage: ['täglich', 'wöchentlich', 'selten', 'nie'],
  rules: ['ja, schriftlich', 'informell', 'nein', 'weiß nicht'],
  paths: [
    { id: 'regeln', name: 'Regeln', zone: 'Zone links', color: '#2F4B7C', text: 'Eine KI-Leitlinie für Ihr Haus entwerfen – oder die bestehende prüfen.' },
    { id: 'kontext', name: 'Kontext', zone: 'Zone Mitte', color: '#2E6B66', text: 'Für eine wiederkehrende Aufgabe festlegen, was die KI braucht und was Menschen entscheiden.' },
    { id: 'menschen', name: 'Menschen', zone: 'Zone rechts', color: '#8C3B5A', text: 'Ihr Team einschätzen und mitnehmen – mit Plan und Antworten auf Einwände.' }
  ],
  moods: ['neugierig', 'zuversichtlich', 'skeptisch', 'besorgt', 'überfordert']
};
