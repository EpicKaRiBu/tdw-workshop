// Öffentliche Konfiguration (der Publishable Key ist dafür gedacht, in Webseiten zu stehen).
window.TDW = {
  url: 'https://nqkbtfhoixgplmxcpxyn.supabase.co',
  key: 'sb_publishable_C4iTUIUu-CJA4WdyHxjAVw_VAL-cp2F',
  session: '1910',
  date: '2026-10-19',          // nur an diesem Tag zeigt die Startseite die Mitmach-App, sonst die Werkzeuge
  participantUrl: 'mitmachen.arminfradler.at',
  quiz: [
    { q: 'Wie viele Mitarbeitende in der österreichischen Erwachsenenbildung nutzen KI fast täglich?', o: ['rund 15 %', 'rund 30 %', 'rund 50 %'], a: 2, src: 'Uni Graz / Ö-Cert 2026 (über 300 Befragte)', note: 'Die Hälfte – fast täglich. Und wie viele Häuser haben dafür Regeln? Schauen wir uns diesen Raum an.' },
    { q: 'Am 6. Oktober 2026 hat OpenAI Ergebnisse zu offenen Forschungsfragen der Mathematik veröffentlicht – erarbeitet von einem KI-Modell, aufgeschrieben wie Fachartikel. Wie viele Manuskripte waren es?', o: ['rund 7', 'rund 70', 'rund 700'], a: 2, src: 'OpenAI, github.com/openai/math (719 Manuskripte, Stand 8.10.2026)', note: 'Je rund drei Stunden Rechenzeit. Noch nicht begutachtet, rund 40 % maschinell nachgeprüft. Die Technik-Uhr läuft schnell – die Organisations-Uhr stellen Sie.' },
    { q: 'Ärzt:innen arbeiteten bei Darmspiegelungen monatelang mit KI-Unterstützung. Wie stark sank danach ihre Trefferquote, wenn sie ohne KI arbeiteten?', o: ['kaum messbar', 'um rund ein Fünftel', 'auf die Hälfte'], a: 1, src: 'Budzyń et al., Lancet Gastroenterology & Hepatology 2025 (28,4 % → 22,4 %)', note: 'Was wir dauerhaft abgeben, verlernen wir. Kein Grund gegen KI – aber einer für bewusste Entscheidungen.' },
    { q: 'Diese Mail hat eine KI geschrieben – es ist Phishing. Woran erkennen Sie das sicher?', o: ['an Rechtschreibfehlern', 'an der Absenderadresse', 'am Zeitdruck', 'gar nicht sicher'], a: 3, mail: true, src: 'Heiding, Schneier et al. 2024/2026: KI-Phishing 54 % Klickrate, Vergleichsmails 12 %' },
    { q: 'Was hat sich im Juli 2026 an der Pflicht zur KI-Kompetenz (Art. 4 AI Act) geändert?', o: ['verschärft – mit Zertifikat', 'abgeschwächt – Maßnahmen und Dokumentation reichen', 'abgeschafft'], a: 1, src: 'Verordnung (EU) 2026/1744 (Digital Omnibus), in Kraft seit 27.7.2026', note: 'Kein Zertifikat, kein Test. Aber: Maßnahmen setzen und dokumentieren. Ein interner Nachweis reicht.' }
  ],
  usecases: ['Anfragen von Teilnehmenden', 'Anmeldungen & Bestätigungen', 'Protokolle', 'Kursausschreibungen', 'Sachberichte an Fördergeber', 'Feedback auswerten', 'Bedarfsanalyse neue Angebote', 'Social Media'],
  context: ['Stichworte & Zielgruppe', 'Leitbild & Ton', 'Vorgaben des Fördergebers', 'Vorjahresbericht als Beispiel'],
  roles: ['Leitung', 'Bildungsmanagement / Programm', 'Verwaltung', 'Marketing / Kommunikation', 'IT / Digitales', 'Personal', 'Anderes'],
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
