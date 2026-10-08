// Öffentliche Konfiguration (der Publishable Key ist dafür gedacht, in Webseiten zu stehen).
window.TDW = {
  url: 'https://nqkbtfhoixgplmxcpxyn.supabase.co',
  key: 'sb_publishable_C4iTUIUu-CJA4WdyHxjAVw_VAL-cp2F',
  session: '1910',
  participantUrl: 'ki.arminfradler.at',
  quiz: [
    { q: 'Wie viel Prozent der Mitarbeitenden in der österreichischen Erwachsenenbildung haben KI schon genutzt?', o: ['rund 45 %', 'rund 70 %', 'rund 95 %'], a: 2, src: 'Uni Graz / Ö-Cert 2026' },
    { q: 'Seit wann müssen sich Chatbots in der EU als KI zu erkennen geben?', o: ['seit August 2026', 'ab Dezember 2027', 'ab 2030'], a: 0, src: 'AI Act, Art. 50' },
    { q: 'Die Mail der „Förderstelle Apfelland“: echt oder Phishing?', o: ['Echt', 'Phishing'], a: 1, mail: true, src: 'fiktives Beispiel' },
    { q: 'Was ist ein „Harness“?', o: ['ein neues KI-Modell', 'die Arbeitsumgebung rund um das Modell', 'ein Trick für bessere Prompts'], a: 1, src: 'Agent = Modell + Harness' },
    { q: 'Ärzt:innen nach Monaten mit KI-Unterstützung – ohne KI fanden sie danach …', o: ['mehr Polypen', 'gleich viele', 'weniger Polypen'], a: 2, src: 'Lancet Gastro Hep 2025' }
  ],
  usecases: ['Anfragen von Teilnehmenden', 'Anmeldungen & Bestätigungen', 'Protokolle', 'Kursausschreibungen', 'Sachberichte an Fördergeber', 'Feedback auswerten', 'Bedarfsanalyse neue Angebote', 'Social Media'],
  context: ['Stichworte & Zielgruppe', 'Leitbild & Ton', 'Vorgaben des Fördergebers', 'Vorjahresbericht als Beispiel'],
  roles: ['Leitung', 'Bildungsmanagement / Programm', 'Verwaltung', 'Marketing / Kommunikation', 'IT / Digitales', 'Personal', 'Anderes'],
  sizes: ['bis 10', '10 bis 50', 'über 50'],
  usage: ['täglich', 'wöchentlich', 'selten', 'nie'],
  rules: ['ja, schriftlich', 'informell', 'nein', 'weiß nicht'],
  paths: [
    { id: 'regeln', name: 'Regeln', zone: 'Zone links', color: '#2F4B7C', text: 'Leitlinie entwerfen oder die bestehende prüfen.' },
    { id: 'kontext', name: 'Kontext', zone: 'Zone Mitte', color: '#2E6B66', text: 'Eine wiederkehrende Aufgabe: Was braucht die KI, was bleibt menschlich?' },
    { id: 'menschen', name: 'Menschen', zone: 'Zone rechts', color: '#8C3B5A', text: 'Begeisterte, Skeptische, Überforderte mitnehmen.' }
  ],
  moods: ['neugierig', 'zuversichtlich', 'skeptisch', 'besorgt', 'überfordert']
};
