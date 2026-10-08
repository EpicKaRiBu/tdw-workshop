/* Lernpfade: Regeln · Kontext · Menschen
   Jeder Schritt = eine echte Entscheidung der Gruppe. Das Handy hält fest und erzeugt am Ende ein Dokument.
   Angaben zur Organisation bleiben auf dem Gerät. An den Server gehen nur anonyme Entscheidungen (für das Raumbild)
   und – wenn die Gruppe es will – das fertige Dokument für den Abholcode. */
(()=>{
const A=()=>window.TDWAPP;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=s=>document.querySelector(s);

/* ---------------- Steckbriefe der Module ---------------- */
const INFO={
  regeln:{titel:'Regeln & Verantwortung',tun:'Sie treffen vier Grundsatzentscheidungen für Ihr Haus – jede an einem echten Fall, mit Abwägung.',fuer:'Leitung, Geschäftsführung, wer Regeln verantwortet',mit:'Einen Leitlinien-Entwurf für Ihr Haus – oder, wenn Sie schon eine Leitlinie haben, eine Lückenliste.',dauer:'25–35 Minuten'},
  kontext:{titel:'Delegieren mit Kontext',tun:'Sie nehmen eine Aufgabe, die bei Ihnen regelmäßig wiederkommt, und legen fest: Welche Unterlagen braucht die KI, damit das Ergebnis gut wird – und was entscheiden weiterhin Menschen?',fuer:'Bildungsmanagement, Programmplanung, Marketing, Verwaltung',mit:'Ein Kontext-Rezept als Teamstandard – und eine fertige Skill-Datei, die Sie einer KI geben können.',dauer:'25–35 Minuten'},
  menschen:{titel:'Menschen mitnehmen',tun:'Sie schätzen Ihr Team ein, wählen die zwei Hebel, die bei Ihnen am meisten bewirken, und finden Antworten auf typische Einwände.',fuer:'Leitung, Personalverantwortliche, Teamleitungen',mit:'Einen 30-Tage-Plan und einen Gesprächsleitfaden für Ihr Team.',dauer:'20–30 Minuten'}
};

/* ---------------- Inhalte ---------------- */
const REGELN={
  start:{q:'Hat Ihre Organisation schon KI-Regeln?',o:['Nein – wir starten neu','Ja – wir prüfen sie']},
  standort:[
    {k:'suite',q:'Womit arbeiten Sie?',o:['Microsoft 365','Google Workspace','Weder noch']},
    {k:'br',q:'Gibt es einen Betriebsrat?',o:['Ja','Nein']},
    {k:'sens',q:'Arbeiten Sie mit sensiblen Gruppen (z. B. AMS, Basisbildung, Beratung)?',o:['Ja','Nein']}
  ],
  d:[
    {k:'tools',t:'Welche Tools dürfen genutzt werden?',fall:'Eine Kollegin nutzt seit Monaten privat ChatGPT für Kursausschreibungen. Gut gemeint – aber niemand weiß davon.',
      warum:'Private Gratis-Konten haben keinen Auftragsverarbeitungsvertrag (Art. 28 DSGVO), Eingaben können zum Training verwendet werden. Eine Freigabeliste schafft einen legalen Weg und löst Schatten-KI ab, statt sie zu verbieten.',
      o:[['Jedes Tool','Maximale Freiheit, aber keine Kontrolle über Daten und Verträge.'],
         ['Eine Freigabeliste','Ausgewählte Tools mit Vertrag. Neue Tools werden kurz geprüft.'],
         ['Nur ein Firmentool','Einfach und sicher, aber manchmal nicht das beste Werkzeug.']]},
    {k:'daten',t:'Welche Daten dürfen in welches Tool?',fall:'Jemand will die Anwesenheitsliste eines AMS-Kurses sortieren lassen – mit Namen und SV-Nummern.',
      warum:'Personenbezogene Daten brauchen eine Rechtsgrundlage und einen Vertrag mit dem Anbieter. Gesundheitsdaten zählen zu den besonders geschützten Kategorien (Art. 9 DSGVO). Achtung: Pseudonymisierte Daten bleiben personenbezogen (EDSA-Leitlinien 01/2025).',
      o:[['Datenampel','Grün in jedes Tool, Gelb nur in freigegebene, Rot nie in frei zugängliche Tools.'],
         ['Nur Grünes','Am sichersten, aber KI hilft dann bei internen Texten nicht.'],
         ['Gelb nach Anonymisierung überall','Flexibel, verlangt aber echtes Anonymisieren – Namen weglassen reicht oft nicht.']]},
    {k:'verantwortung',t:'Wer prüft und verantwortet KI-Ergebnisse?',fall:'Ein KI-Entwurf eines Sachberichts enthält eine geschönte Zahl. Er geht fast so ans Land.',
      warum:'Verantwortung lässt sich nicht an eine KI abgeben. Wer mehr Vertrauen in die KI hat, prüft nachweislich weniger kritisch (Microsoft/Carnegie Mellon 2025). Eine klare Prüfregel schützt vor falschen Zahlen gegenüber Fördergebern.',
      o:[['Wer nutzt, prüft','Eigenverantwortung, schnell – braucht Vertrauen und Schulung.'],
         ['Vier Augen bei allem nach außen','Sicherer bei Berichten und Öffentlichkeitsarbeit, etwas langsamer.'],
         ['Freigabe durch die Leitung','Höchste Kontrolle, kann zum Engpass werden.']]},
    {k:'heikel',t:'Was gilt bei heiklen Einsätzen?',fall:'Die Leitung möchte 60 Bewerbungen für Kursplätze von KI vorsortieren lassen.',
      warum:'KI bei Zulassung, Bewertung von Lernenden oder Personalauswahl gilt im AI Act als Hochrisiko (Anhang III). Die Pflichten gelten ab Dezember 2027 – die Diskriminierungsrisiken schon heute.',
      o:[['Nie','Keine KI bei Personalauswahl, Kursplatzvergabe oder Bewertung von Menschen.'],
         ['Nur als Unterstützung','KI darf zuarbeiten, entscheiden und begründen muss ein Mensch – dokumentiert.'],
         ['Im Einzelfall nach Prüfung','Leitung und ggf. Betriebsrat prüfen vorab. Ab Dezember 2027 gelten Hochrisiko-Pflichten.']]}
  ],
  opt:[
    {k:'kennz',t:'Kennzeichnen wir KI nach außen?',fall:'Für Social Media entsteht ein KI-Bild „zufriedener Teilnehmender“.',
      warum:'Seit August 2026 (Art. 50 AI Act): Chatbots müssen sich als KI zu erkennen geben, realistische KI-Bilder und Deepfakes sind zu kennzeichnen. Texte, die ein Mensch geprüft und verantwortet, fallen in der Regel nicht darunter.',
      o:[['Immer','Alles, was KI erstellt hat und nach außen geht.'],['Wo nötig','Chatbots, realistische Bilder, Deepfakes (Art. 50) – sonst nicht.'],['Bei Bildern und Chatbots, Texte nach Prüfung nicht','Texte, die ein Mensch geprüft und verantwortet hat, gelten als eigene.']]},
    {k:'agenten',t:'Was dürfen Agenten selbstständig tun?',fall:'Ein Assistent soll Anfragen aus dem Postfach selbstständig beantworten.',
      warum:'Versteckte Anweisungen in Mails oder Webseiten können Agenten umlenken. Gefährlich wird es, wenn ein Agent zugleich fremde Inhalte liest, auf sensible Daten zugreift und nach außen handeln kann.',
      o:[['Nichts ohne Freigabe','Agenten bereiten vor, ein Mensch schickt ab.'],['Lesen und vorbereiten','Handeln nach außen nur mit Freigabe – nie die „gefährliche Dreierkombination“.'],['Routinen nach Freigabe der Leitung','Einzelne, geprüfte Abläufe dürfen laufen.']]}
  ]
};
const CLAUSE={
  tools:['Mitarbeitende dürfen KI-Tools nutzen und tragen dabei Verantwortung für die eingegebenen Daten. Private Gratis-Konten sind nur für öffentliche Inhalte (grün) erlaubt.',
         'Wir nutzen KI-Tools aus einer Freigabeliste. Die Liste führt [Zuständigkeit]. Neue Tools werden vor der Nutzung kurz geprüft (Vertrag, Datenstandort, Training mit Eingaben). Private Gratis-Konten sind für Arbeitsinhalte nicht erlaubt.',
         'Wir nutzen ein gemeinsames KI-Werkzeug: [Tool]. Andere Tools nur nach Rücksprache mit [Zuständigkeit].'],
  daten:['Wir folgen der Datenampel: Öffentliches (grün) darf in jedes Tool. Internes ohne Personenbezug (gelb) nur in freigegebene Tools. Personenbezogene und sensible Daten (rot) – etwa von Teilnehmenden, Gesundheits-, AMS- oder Personaldaten – kommen nie in frei zugängliche KI-Tools. Namen wegzulassen macht Daten nicht anonym.',
         'In KI-Tools kommen nur öffentliche Inhalte. Interne und personenbezogene Daten bleiben draußen.',
         'Interne Inhalte dürfen nach sorgfältiger Anonymisierung in KI-Tools. Personenbezogene und sensible Daten kommen nie in KI-Tools. Im Zweifel gilt ein Inhalt als personenbezogen.'],
  verantwortung:['Wer KI nutzt, prüft das Ergebnis auf Richtigkeit, Vollständigkeit und Ton – und verantwortet es wie eine eigene Arbeit.',
         'Wer KI nutzt, prüft das Ergebnis. Alles, was nach außen geht (Berichte, Öffentlichkeitsarbeit, Schreiben an Fördergeber), liest zusätzlich eine zweite Person.',
         'KI-gestützte Berichte und Texte für die Öffentlichkeit gibt die Leitung frei.'],
  heikel:['KI wird nicht eingesetzt, um über Menschen zu entscheiden – weder bei Personalauswahl noch bei Kursplatzvergabe oder Leistungsbewertung.',
         'Bei Entscheidungen über Menschen darf KI höchstens zuarbeiten. Entscheidung und Begründung trifft ein Mensch und dokumentiert sie.',
         'Einsätze mit Bezug zu Personalauswahl, Kursplatzvergabe oder Bewertung prüfen Leitung [und Betriebsrat] vorab im Einzelfall. Ab Dezember 2027 gelten dafür die Hochrisiko-Pflichten des AI Act.'],
  kennz:['Was KI erstellt hat und nach außen geht, kennzeichnen wir.','Wir kennzeichnen, wo es Pflicht ist: Chatbots geben sich als KI zu erkennen, realistische KI-Bilder und Deepfakes werden markiert (Art. 50 AI Act).','Chatbots und KI-Bilder kennzeichnen wir. Texte, die ein Mensch geprüft und verantwortet hat, gelten als eigene Texte.'],
  agenten:['KI-Agenten bereiten vor. Was nach außen geht oder Daten verändert, gibt ein Mensch frei.','Agenten dürfen lesen und vorbereiten. Nie gleichzeitig: fremde Inhalte verarbeiten, auf sensible Daten zugreifen und nach außen handeln – ohne Freigabe durch einen Menschen.','Einzelne, von der Leitung geprüfte Routinen dürfen selbstständig laufen. Alles andere braucht eine Freigabe.']
};
const KONTEXT={
  aufgaben:['Kursausschreibungen','Programmheft-Texte','Förderanträge','Sachberichte','Newsletter','Social Media','Feedback auswerten','Anfragen von Teilnehmenden','Anmeldebestätigungen','Protokolle','Abrechnungsunterlagen','Bedarfsanalyse / neue Angebote'],
  aufwand:['unter 10 Stunden','10–50 Stunden','50–150 Stunden','über 150 Stunden'],
  bausteine:['Leitbild / Haltung','Stilregeln (Ton, Gendern, Anrede)','Gute Beispiele aus dem eigenen Haus','Vorlage / Gliederung','Vorgaben von Fördergebern','Fachbegriffe / Glossar','Beschreibung der Zielgruppe','Zahlen und Daten zum Anlass'],
  menschlich:['Was betont wird – und was nicht','Der Ton gegenüber Fördergebern','Ehrlichkeit bei Problemen','Ob Zahlen stimmen','Die Freigabe vor dem Versand','Was zur Haltung des Hauses passt'],
  pruefer:['die Person, die nutzt','eine zweite Person im Team','die Bereichsleitung','die Geschäftsführung'],
  beispiel:{aufgabe:'Kursausschreibungen (Bildungswerk Apfelland, erfunden)',kontext:['Leitbild (grün)','Stilregeln: Sie-Form, gendern mit Doppelpunkt, keine Werbesprache (grün)','Drei gelungene Ausschreibungen vom Vorjahr (grün)','Vorlage mit Pflichtangaben: Termin, Ort, Kosten, Förderung (grün)'],menschlich:['Ob der Kurs zur Zielgruppe passt','Preis und Förderhinweis','Freigabe vor Veröffentlichung'],qualitaet:['Alle Pflichtangaben vollständig','Klingt nach uns, nicht nach Werbung','Verständlich für Menschen ohne Vorwissen']}
};
const MENSCHEN={
  gruppen:['Begeistert','Heimlich nutzend','Skeptisch','Überfordert'],
  hebel:[['Erlaubnis mit Geländer','Klare Freigabe statt Grauzone – mit Datenampel.'],['Lernzeit','Feste Zeit zum Ausprobieren, z. B. 1 Stunde pro Woche.'],['Ansprechpersonen','Eine Person pro Bereich, nicht nur die IT.'],['Ein kleiner Erfolg','Ein Anwendungsfall, der sichtbar Zeit spart.'],['Offenes Wort über die Zeit','Was mit gewonnener Zeit passiert – vorher klären.']],
  einwaende:[
    ['„Ersetzt mich das?“',['„Nein. Die KI nimmt dir Arbeit ab – das Urteilen, Beraten und Entscheiden bleibt bei dir. Genau das wird wichtiger.“','„Wir entscheiden gemeinsam, wofür wir die gewonnene Zeit verwenden.“']],
    ['„Dafür hab ich keine Zeit.“',['„Verstehe ich. Deshalb gibt es eine feste Stunde pro Woche dafür – als Arbeitszeit.“','„Fang mit der Aufgabe an, die dich am meisten nervt. Da spart es zuerst Zeit.“']],
    ['„Das ist doch Schummeln.“',['„Nicht, wenn du prüfst und dazu stehst. Unterschrieben wird von dir – wie bei jedem Entwurf.“','„Wir sagen offen, wo wir KI nutzen. Heimlich wäre das Problem.“']],
    ['„Und unsere Daten?“',['„Dafür gibt es die Datenampel: Rotes kommt nie in frei zugängliche Tools.“','„Wir nutzen nur freigegebene Tools mit Vertrag.“']]
  ],
  zeit:[['Dem Team','Für Entlastung und weniger Überstunden.'],['Den Teilnehmenden','Für mehr Beratung und Begleitung.'],['Neuen Vorhaben','Für Angebote, die bisher liegen blieben.'],['Noch offen','Das klären wir im Team.']]
};
function hebelVorschlag(g){
  // g = [begeistert, heimlich, skeptisch, überfordert]
  const max=Math.max(...g);if(!max)return {h:[0,3],grund:'Ohne Einschätzung starten die meisten Teams mit Erlaubnis und einem kleinen Erfolg.'};
  const top=g.indexOf(max);
  return [
    {h:[2,3],grund:'Viele sind begeistert: Machen Sie sie zu Ansprechpersonen und zeigen Sie einen sichtbaren Erfolg.'},
    {h:[0,2],grund:'Viele nutzen KI heimlich: Zuerst ein legaler Weg (Erlaubnis mit Geländer), dann Ansprechpersonen.'},
    {h:[4,3],grund:'Viele sind skeptisch: Offen über die gewonnene Zeit reden und einen kleinen, ehrlichen Erfolg zeigen.'},
    {h:[1,3],grund:'Viele sind überfordert: Zuerst Lernzeit schaffen, dann ein kleiner Erfolg, der Mut macht.'}
  ][top];
}

/* ---------------- Zustand (nur auf dem Gerät) ---------------- */
const key=p=>'pfad.'+p;
const load=p=>A().store.get(key(p))||{step:-1};
const save=(p,s)=>A().store.set(key(p),s);
const room=(q,v)=>A().send(q,v);

/* ---------------- Bausteine der Oberfläche ---------------- */
function color(p){const P=(A().C.paths||[]).find(x=>x.id===p);return P?P.color:'#23201B'}
function head(p,step,total,title){return `<div class="kick" style="color:${color(p)}">${INFO[p].titel} · Schritt ${step} von ${total}</div><h1>${title}</h1>`}
function caseBox(t){return `<div class="card" style="border-left:5px solid var(--pencil)"><p class="s m" style="margin:0 0 4px">Ein Fall dazu:</p><p style="margin:0">${esc(t)}</p></div>`}
function warum(t){return t?`<details class="card" style="margin-top:-4px"><summary style="cursor:pointer;font-weight:600">Warum ist das wichtig?</summary><p class="s" style="margin:8px 0 0">${esc(t)}</p></details>`:''}
function optList(opts,sel){return `<div class="opts">${opts.map((o,i)=>`<button class="opt ${sel===i?'sel':''}" data-i="${i}"><b>${esc(o[0])}</b>${o[1]?`<br><span class="s m">${esc(o[1])}</span>`:''}</button>`).join('')}</div>`}
function nav(back=true,nextLabel='Weiter',disabled=false){return `<button class="go" id="nx" ${disabled?'disabled':''}>${nextLabel}</button>${back?'<button class="opt" id="bk" style="text-align:center;margin-top:10px">Zurück</button>':''}`}
function note(ph,val){return `<textarea id="nt" maxlength="280" placeholder="${esc(ph)}" style="min-height:70px">${esc(val||'')}</textarea><p class="hint">Optional: eigene Ergänzung der Gruppe.</p>`}
function bind(state,p,render){const bk=$('#bk');if(bk)bk.onclick=()=>{state.step=Math.max(-1,state.step-1);save(p,state);render()};return $('#nx')}
function intro(p,s,render){
  const I=INFO[p],m=A().main;
  m.innerHTML=`<div class="kick" style="color:${color(p)}">Modul</div><h1>${I.titel}</h1>
    <div class="card"><p style="margin:0 0 10px"><b>Was Sie tun:</b> ${I.tun}</p><p style="margin:0 0 10px"><b>Für wen:</b> ${I.fuer}</p><p style="margin:0 0 10px"><b>Was Sie mitnehmen:</b> ${I.mit}</p><p class="s m" style="margin:0">Dauer: ${I.dauer} · Gern in Gruppen zu dritt bis fünft. Eine Person tippt, alle reden mit.</p></div>
    <p class="hint">Ihre Angaben zur Organisation bleiben auf diesem Gerät.</p>`+nav(false,'Los geht’s');
  $('#nx').onclick=()=>{s.step=0;save(p,s);render()};
}

/* ---------------- Modul Regeln ---------------- */
function regeln(){
  const p='regeln',s=load(p),m=A().main;
  if(s.step===-1)return intro(p,s,regeln);
  const all=REGELN.d.concat(s.withOpt?REGELN.opt:[]);
  const total=2+all.length;
  if(s.step===0){
    m.innerHTML=head(p,1,total,REGELN.start.q)+`<p class="m s">Es gibt keine richtige Lösung – nur begründete Entscheidungen für Ihr Haus.</p>`+optList(REGELN.start.o.map(x=>[x,'']),s.mode)+nav(true,'Weiter',s.mode==null);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{s.mode=+b.dataset.i;save(p,s);m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',x===b));$('#nx').disabled=false});
    bind(s,p,regeln).onclick=()=>{s.step=1;save(p,s);regeln()};return;
  }
  if(s.step===1){
    s.ort=s.ort||{};
    m.innerHTML=head(p,2,total,'Kurz zu Ihrem Haus')+`<p class="hint">Bleibt nur auf diesem Gerät. Damit passt der Entwurf besser.</p>`+REGELN.standort.map(q=>`<div class="uc"><p>${q.q}</p><div class="tri" data-k="${q.k}" style="grid-template-columns:repeat(${q.o.length},1fr)">${q.o.map((o,i)=>`<button data-v="${i}" class="${s.ort[q.k]===i?'sel':''}">${o}</button>`).join('')}</div></div>`).join('')+nav();
    m.querySelectorAll('.tri').forEach(t=>t.querySelectorAll('button').forEach(b=>b.onclick=()=>{s.ort[t.dataset.k]=+b.dataset.v;t.querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x===b));save(p,s)}));
    bind(s,p,regeln).onclick=()=>{s.step=2;save(p,s);regeln()};return;
  }
  const di=s.step-2;
  if(di<all.length){
    const d=all[di];s.ch=s.ch||{};s.nt=s.nt||{};
    const pruef=s.mode===1;
    m.innerHTML=head(p,s.step+1,total,d.t)+caseBox(d.fall)+warum(d.warum)+
      (pruef?`<p class="s" style="margin:14px 0 6px"><b>Regelt Ihre Leitlinie das schon?</b></p><div class="tri" id="hat">${['ja','teilweise','nein'].map((x,i)=>`<button data-v="${i}" class="${(s.hat||{})[d.k]===i?'sel':''}">${x}</button>`).join('')}</div><p class="s" style="margin:14px 0 0"><b>Wie sollte es geregelt sein?</b></p>`:'')+
      optList(d.o,s.ch[d.k])+note('Eigene Formulierung oder Bedingung …',s.nt[d.k])+
      (di===REGELN.d.length-1&&!s.withOpt?`<button class="opt" id="more" style="text-align:center;margin-bottom:10px">Schnell fertig? Zwei Zusatzfragen: Kennzeichnung und Agenten</button>`:'')+
      nav(true,di===all.length-1?'Entwurf erstellen':'Weiter',s.ch[d.k]==null);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{s.ch[d.k]=+b.dataset.i;save(p,s);room('p1_'+d.k,{i:s.ch[d.k]});m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',x===b));$('#nx').disabled=false});
    if(pruef)$('#hat').querySelectorAll('button').forEach(b=>b.onclick=()=>{s.hat=s.hat||{};s.hat[d.k]=+b.dataset.v;$('#hat').querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x===b));save(p,s)});
    const more=$('#more');if(more)more.onclick=()=>{s.nt[d.k]=$('#nt').value.trim();s.withOpt=true;save(p,s);regeln()};
    bind(s,p,regeln).onclick=()=>{s.nt[d.k]=$('#nt').value.trim();s.step++;save(p,s);regeln()};return;
  }
  result(p,s,regelnDoc(s,all),regeln);
}
function regelnDoc(s,all){
  const ort=s.ort||{},pruef=s.mode===1;
  const tool=['[Microsoft 365 Copilot Chat mit Dienstkonto]','[Gemini im Google-Konto der Organisation]','[Tool]'][ort.suite??2];
  const items=all.filter(d=>s.ch[d.k]!=null).map(d=>{
    let c=CLAUSE[d.k][s.ch[d.k]].replace('[Tool]',tool).replace('[und Betriebsrat]',ort.br===0?'und Betriebsrat':'');
    if(s.nt&&s.nt[d.k])c+=' '+s.nt[d.k];
    return {t:d.t,c,gap:pruef?['geregelt','teilweise geregelt','fehlt'][(s.hat||{})[d.k]??2]:null};
  });
  const extra=['Wir dokumentieren, wer an welcher KI-Schulung oder Lernzeit teilgenommen hat (Nachweis nach Art. 4 AI Act).','Wir überprüfen diese Leitlinie alle sechs Monate – die Technik ändert sich schnell.'];
  const offen=[];
  if(ort.br===0)offen.push('Betriebsrat einbinden (Mitbestimmung bei Systemen, die Daten von Beschäftigten verarbeiten, ArbVG §§ 96, 96a – fachlich prüfen lassen).');
  if(ort.sens===0)offen.push('Für sensible Zielgruppen prüfen, ob zusätzliche Regeln nötig sind (z. B. Beratung, AMS-Daten).');
  offen.push('Zuständigkeit für Freigabeliste und Fragen festlegen.','Mit dem Team besprechen, bevor die Leitlinie gilt.');
  return {kind:'regeln',title:pruef?'Prüfbericht unserer KI-Leitlinie':'Entwurf: Unsere KI-Leitlinie',items,extra,offen};
}

/* ---------------- Modul Kontext ---------------- */
function kontext(){
  const p='kontext',s=load(p),m=A().main,total=6;
  if(s.step===-1)return intro(p,s,kontext);
  if(s.step===0){
    const B=KONTEXT.beispiel,li=a=>a.map(x=>`<li>${esc(x)}</li>`).join('');
    m.innerHTML=head(p,1,total,'So sieht ein Kontext-Rezept aus')+`<p class="m s">Ein Beispiel, damit klar ist, wohin die Reise geht.</p>
      <div class="card"><p style="margin:0 0 6px"><b>Aufgabe:</b> ${esc(B.aufgabe)}</p>
      <p class="s" style="margin:8px 0 2px"><b>Das bekommt die KI</b></p><ul class="s" style="margin:0 0 6px;padding-left:20px">${li(B.kontext)}</ul>
      <p class="s" style="margin:8px 0 2px"><b>Das entscheiden Menschen</b></p><ul class="s" style="margin:0 0 6px;padding-left:20px">${li(B.menschlich)}</ul>
      <p class="s" style="margin:8px 0 2px"><b>Woran wir ein gutes Ergebnis erkennen</b></p><ul class="s" style="margin:0;padding-left:20px">${li(B.qualitaet)}</ul></div>
      <p class="s">Aus so einem Rezept wird mit einem Satz („Mach daraus einen Skill“) eine Arbeitsanleitung für die KI – wie in der Live-Demo.</p>`+nav(true,'Jetzt unsere Aufgabe');
    bind(s,p,kontext).onclick=()=>{s.step=1;save(p,s);kontext()};return;
  }
  if(s.step===1){
    m.innerHTML=head(p,2,total,'Welche Aufgabe nehmen Sie sich vor?')+`<p class="m s">Eine, die bei Ihnen regelmäßig wiederkommt.</p><div class="opts">${KONTEXT.aufgaben.map(a=>`<button class="opt ${s.aufgabe===a?'sel':''}" data-a="${esc(a)}">${esc(a)}</button>`).join('')}</div><input type="text" id="own" maxlength="60" placeholder="… oder eigene Aufgabe" value="${esc(KONTEXT.aufgaben.includes(s.aufgabe)?'':s.aufgabe||'')}"><p class="s" style="margin:16px 0 6px"><b>Wie viel Zeit kostet sie Ihr Haus im Jahr?</b></p><div class="tri" id="auf" style="grid-template-columns:1fr 1fr">${KONTEXT.aufwand.map((x,i)=>`<button data-v="${i}" class="${s.aufwand===i?'sel':''}">${x}</button>`).join('')}</div>`+nav(true,'Weiter',!s.aufgabe);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{s.aufgabe=b.dataset.a;$('#own').value='';m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',x===b));save(p,s);$('#nx').disabled=false});
    $('#own').oninput=e=>{if(e.target.value.trim()){s.aufgabe=e.target.value.trim();m.querySelectorAll('.opts .opt').forEach(x=>x.classList.remove('sel'));$('#nx').disabled=false;save(p,s)}};
    $('#auf').querySelectorAll('button').forEach(b=>b.onclick=()=>{s.aufwand=+b.dataset.v;$('#auf').querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x===b));save(p,s)});
    bind(s,p,kontext).onclick=()=>{room('p2_aufgabe',{text:s.aufgabe});s.step=2;save(p,s);kontext()};return;
  }
  if(s.step===2){
    s.bs=s.bs||{};
    m.innerHTML=head(p,3,total,'Was braucht die KI, um das gut zu machen?')+`<p class="m s">Tippen Sie an, was dazugehört – und welche Farbe es auf der Datenampel hat.</p>`+
      KONTEXT.bausteine.map((b,j)=>`<div class="uc"><p>${esc(b)}</p><div class="tri" data-j="${j}" style="grid-template-columns:repeat(4,1fr)">${['nicht nötig','grün','gelb','rot'].map((l,k)=>`<button data-v="${k}" class="${(s.bs[j]??0)===k?'sel':''}">${l}</button>`).join('')}</div></div>`).join('')+
      `<p class="hint">Rot heißt: bleibt draußen – oder nur in einem Tool mit Vertrag und nach Prüfung.</p>`+nav();
    m.querySelectorAll('.tri').forEach(t=>t.querySelectorAll('button').forEach(b=>b.onclick=()=>{s.bs[t.dataset.j]=+b.dataset.v;t.querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x===b));save(p,s)}));
    bind(s,p,kontext).onclick=()=>{s.step=3;save(p,s);kontext()};return;
  }
  if(s.step===3){
    s.mh=s.mh||[];
    m.innerHTML=head(p,4,total,'Was bleibt menschliche Entscheidung?')+`<p class="m s">Hier zieht Ihre Gruppe die Linie: Was gibt Ihr Haus ab – und was behält es?</p><div class="opts">${KONTEXT.menschlich.map((x,i)=>`<button class="opt ${s.mh.includes(i)?'sel':''}" data-i="${i}">${esc(x)}</button>`).join('')}</div>`+note('Weiteres, das bei Ihnen Menschen entscheiden …',s.mhNote)+nav();
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;s.mh=s.mh.includes(i)?s.mh.filter(x=>x!==i):s.mh.concat(i);b.classList.toggle('sel');save(p,s)});
    bind(s,p,kontext).onclick=()=>{s.mhNote=$('#nt').value.trim();s.step=4;save(p,s);kontext()};return;
  }
  if(s.step===4){
    s.q=s.q||['','',''];
    m.innerHTML=head(p,5,total,'Woran erkennen Sie ein gutes Ergebnis?')+`<p class="m s">Drei Qualitätskriterien – so, wie Sie es einer neuen Kollegin sagen würden.</p>`+[0,1,2].map(i=>`<input type="text" class="qk" data-i="${i}" maxlength="120" placeholder="${['z. B. Hält die Gliederung der Fördervorgaben ein','z. B. Klingt nach uns, nicht nach Werbung','z. B. Keine Zahl ohne Quelle'][i]}" value="${esc(s.q[i])}" style="margin-bottom:10px">`).join('')+nav();
    bind(s,p,kontext).onclick=()=>{s.q=[...m.querySelectorAll('.qk')].map(x=>x.value.trim());s.step=5;save(p,s);kontext()};return;
  }
  if(s.step===5){
    m.innerHTML=head(p,6,total,'Wer prüft, bevor es verwendet wird?')+optList(KONTEXT.pruefer.map(x=>[x,'']),s.pr)+`<div class="card"><p class="s" style="margin:0"><b>Gegenprobe:</b> Zeigen Sie Ihr Rezept kurz einer Gruppe in Ihrer Nähe. Würde es bei denen funktionieren?</p></div>`+nav(true,'Rezept erstellen',s.pr==null);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{s.pr=+b.dataset.i;m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',x===b));save(p,s);$('#nx').disabled=false});
    bind(s,p,kontext).onclick=()=>{s.step=6;save(p,s);kontext()};return;
  }
  result(p,s,kontextDoc(s),kontext);
}
function kontextDoc(s){
  const amp=['','grün','gelb','rot'];
  const bs=KONTEXT.bausteine.map((b,j)=>({b,a:s.bs?.[j]??0})).filter(x=>x.a>0);
  return {kind:'kontext',title:'Kontext-Rezept: '+s.aufgabe,aufgabe:s.aufgabe,aufwand:KONTEXT.aufwand[s.aufwand]??'',
    kontext:bs.filter(x=>x.a<3).map(x=>`${x.b} (${amp[x.a]})`),draussen:bs.filter(x=>x.a===3).map(x=>x.b),
    menschlich:(s.mh||[]).map(i=>KONTEXT.menschlich[i]).concat(s.mhNote?[s.mhNote]:[]),
    qualitaet:(s.q||[]).filter(Boolean),pruefer:KONTEXT.pruefer[s.pr]??''};
}
function skillMd(d){
  const slug=d.aufgabe.toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'aufgabe';
  const L=a=>a.map(x=>'- '+x).join('\n');
  return `---\nname: ${slug}\ndescription: Erstellt Entwürfe für „${d.aufgabe}“ nach den Regeln unseres Hauses. Verwenden, wenn ${d.aufgabe} geschrieben oder überarbeitet werden sollen.\n---\n\n# ${d.aufgabe}\n\n## Unterlagen, die du nutzt\n${L(d.kontext.length?d.kontext:['(Unterlagen ergänzen)'])}\n\n## Was du nie verwendest\n${L(d.draussen.length?d.draussen.concat(['Namen und Daten von Teilnehmenden']):['Namen und Daten von Teilnehmenden'])}\n\n## So gehst du vor\n1. Lies die Unterlagen oben.\n2. Erstelle einen Entwurf. Erfinde keine Zahlen, Namen oder Ergebnisse – fehlt etwas, markiere es mit [FEHLT: …].\n3. Prüfe den Entwurf gegen die Qualitätskriterien.\n4. Schließe mit einer Liste „Bitte prüfen“.\n\n## Qualitätskriterien\n${L(d.qualitaet.length?d.qualitaet:['(ergänzen)'])}\n\n## Das entscheiden Menschen (in „Bitte prüfen“ aufführen)\n${L(d.menschlich.length?d.menschlich:['Freigabe vor Verwendung'])}\n\nVor der Verwendung prüft: ${d.pruefer||'(festlegen)'}.\n`;
}

/* ---------------- Modul Menschen ---------------- */
function menschen(){
  const p='menschen',s=load(p),m=A().main,total=4;
  if(s.step===-1)return intro(p,s,menschen);
  if(s.step===0){
    s.g=s.g||[0,0,0,0];
    m.innerHTML=head(p,1,total,'Wie sieht Ihr Team aus?')+`<p class="m s">Nur Zahlen, keine Namen. Grob geschätzt reicht – daraus leiten wir gleich einen Vorschlag ab.</p>`+
      MENSCHEN.gruppen.map((g,i)=>`<div class="uc" style="display:flex;align-items:center;justify-content:space-between"><p style="margin:0">${g}</p><div style="display:flex;align-items:center;gap:10px"><button class="opt" data-i="${i}" data-d="-1" style="width:48px;min-height:44px;text-align:center;padding:0">–</button><b id="g${i}" style="min-width:28px;text-align:center;font-family:var(--type);font-size:22px">${s.g[i]}</b><button class="opt" data-i="${i}" data-d="1" style="width:48px;min-height:44px;text-align:center;padding:0">+</button></div></div>`).join('')+nav();
    m.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;s.g[i]=Math.max(0,s.g[i]+(+b.dataset.d));$('#g'+i).textContent=s.g[i];save(p,s)});
    bind(s,p,menschen).onclick=()=>{const v=hebelVorschlag(s.g);if(!s.h||!s.hManual){s.h=v.h.slice()}s.step=1;save(p,s);menschen()};return;
  }
  if(s.step===1){
    const v=hebelVorschlag(s.g||[0,0,0,0]);s.h=s.h||v.h.slice();
    m.innerHTML=head(p,2,total,'Welche zwei Hebel ziehen Sie zuerst?')+`<div class="card" style="border-left:5px solid var(--kontext)"><p class="s" style="margin:0"><b>Unser Vorschlag:</b> ${esc(v.grund)}</p></div><p class="s m">Vorausgewählt – Sie können frei ändern.</p><div class="opts">${MENSCHEN.hebel.map((h,i)=>`<button class="opt ${s.h.includes(i)?'sel':''}" data-i="${i}"><b>${esc(h[0])}</b><br><span class="s m">${esc(h[1])}</span></button>`).join('')}</div>`+nav(true,'Weiter',s.h.length!==2);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;s.hManual=true;if(s.h.includes(i))s.h=s.h.filter(x=>x!==i);else if(s.h.length<2)s.h=s.h.concat(i);m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',s.h.includes(+x.dataset.i)));$('#nx').disabled=s.h.length!==2;save(p,s)});
    bind(s,p,menschen).onclick=()=>{s.h.forEach(i=>room('p3_hebel'+i,{i:1}));s.step=2;save(p,s);menschen()};return;
  }
  if(s.step===2){
    s.e=s.e||{};s.eo=s.eo||{};
    m.innerHTML=head(p,3,total,'Was antworten Sie, wenn jemand sagt …')+`<p class="m s">Wählen Sie eine Antwort – oder schreiben Sie Ihre eigene. Ihre eigene Sprache wirkt im Team am besten.</p>`+
      MENSCHEN.einwaende.map((e,i)=>`<div class="card"><p style="font-family:var(--type);margin:0 0 8px">${esc(e[0])}</p><div class="opts" data-i="${i}" style="margin:0 0 8px">${e[1].map((a,j)=>`<button class="opt ${s.e[i]===j&&!s.eo[i]?'sel':''}" data-j="${j}" style="font-size:16px">${esc(a)}</button>`).join('')}</div><input type="text" class="eo" data-i="${i}" maxlength="200" placeholder="… oder unsere eigene Antwort" value="${esc(s.eo[i]||'')}"></div>`).join('')+nav();
    m.querySelectorAll('.card .opts').forEach(o=>o.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{s.e[o.dataset.i]=+b.dataset.j;o.querySelectorAll('.opt').forEach(x=>x.classList.toggle('sel',x===b));save(p,s)}));
    bind(s,p,menschen).onclick=()=>{m.querySelectorAll('.eo').forEach(x=>{s.eo[x.dataset.i]=x.value.trim()});s.step=3;save(p,s);menschen()};return;
  }
  if(s.step===3){
    m.innerHTML=head(p,4,total,'Wem gehört die gewonnene Zeit?')+`<p class="m s">Die Frage, die in jedem Team mitschwingt – auch wenn sie keiner stellt. Besser vorher beantworten.</p>`+optList(MENSCHEN.zeit,s.z)+nav(true,'Plan erstellen',s.z==null);
    m.querySelectorAll('.opts .opt').forEach(b=>b.onclick=()=>{s.z=+b.dataset.i;m.querySelectorAll('.opts .opt').forEach(x=>x.classList.toggle('sel',x===b));save(p,s);room('p3_zeit',{i:s.z});$('#nx').disabled=false});
    bind(s,p,menschen).onclick=()=>{s.step=4;save(p,s);menschen()};return;
  }
  result(p,s,menschenDoc(s),menschen);
}
function menschenDoc(s){
  const H=s.h.map(i=>MENSCHEN.hebel[i][0]);
  const wochen=[
    ['Woche 1','Im Team offen ansprechen: Was nutzen wir schon? Was wünschen wir uns? Die Datenampel vorstellen. Klar sagen: Was bisher war, war bisher.'],
    ['Woche 2',`Ersten Hebel umsetzen: ${H[0]}.`],
    ['Woche 3',`Zweiten Hebel umsetzen: ${H[1]}. Einen gemeinsamen Anwendungsfall ausprobieren.`],
    ['Woche 4','Rückblick in der Teamsitzung: Was hat Zeit gespart? Was war schwierig? Nächsten Schritt festlegen. Teilnahme an Lernzeit oder Schulung dokumentieren (Art. 4).']
  ];
  return {kind:'menschen',title:'30-Tage-Plan: Unser Team und KI',gruppen:MENSCHEN.gruppen.map((g,i)=>`${g}: ${s.g[i]}`),hebel:H,wochen,
    antworten:MENSCHEN.einwaende.map((e,i)=>[e[0],(s.eo&&s.eo[i])||(s.e[i]!=null?e[1][s.e[i]]:'(selbst formulieren)')]),zeit:MENSCHEN.zeit[s.z][0]+' – '+MENSCHEN.zeit[s.z][1]};
}

/* ---------------- Ergebnis, Download, Abholcode ---------------- */
function docHtml(d){
  const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join('');
  let b='';
  if(d.kind==='regeln'){
    b+=d.items.map((x,n)=>`<h3>${n+1}. ${esc(x.t)}${x.gap?` <small>(${esc(x.gap)})</small>`:''}</h3><p>${esc(x.c)}</p>`).join('');
    b+=`<h3>Außerdem</h3><ul>${li(d.extra)}</ul><h3>Noch zu klären</h3><ul>${li(d.offen)}</ul>`;
  }else if(d.kind==='kontext'){
    b+=`<p><b>Aufgabe:</b> ${esc(d.aufgabe)}${d.aufwand?` · <b>Aufwand pro Jahr:</b> ${esc(d.aufwand)}`:''}</p>`;
    b+=`<h3>Das bekommt die KI</h3><ul>${li(d.kontext)}</ul>`;
    if(d.draussen.length)b+=`<h3>Bleibt draußen (rot)</h3><ul>${li(d.draussen)}</ul>`;
    b+=`<h3>Das entscheiden Menschen</h3><ul>${li(d.menschlich)}</ul><h3>Woran wir ein gutes Ergebnis erkennen</h3><ul>${li(d.qualitaet)}</ul><p><b>Prüft vor der Verwendung:</b> ${esc(d.pruefer)}</p>`;
    b+=`<p><i>Dieses Rezept ist der Entwurf eines „Skills“. Die passende Skill-Datei (SKILL.md) können Sie herunterladen und einer KI geben – oder Sie sagen ihr: „Mach daraus einen Skill.“</i></p>`;
  }else{
    b+=`<h3>Unser Team (geschätzt)</h3><ul>${li(d.gruppen)}</ul><h3>Unsere zwei Hebel</h3><ul>${li(d.hebel)}</ul><h3>Die 30 Tage</h3>${d.wochen.map(w=>`<p><b>${esc(w[0])}:</b> ${esc(w[1])}</p>`).join('')}`;
    b+=`<h3>Wenn jemand sagt …</h3>${d.antworten.map(a=>`<p><b>${esc(a[0])}</b><br>${esc(a[1])}</p>`).join('')}<h3>Die gewonnene Zeit gehört</h3><p>${esc(d.zeit)}</p>`;
  }
  return `<h2>${esc(d.title)}</h2>${b}<hr><p><small>Entwurf zur Diskussion in Ihrer Organisation. Orientierung, keine Rechtsberatung – vor Beschluss prüfen lassen. Entstanden im Workshop „KI als Organisationskompetenz“ (Armin Fradler). Stand Oktober 2026.</small></p>`;
}
function saveFile(name,content,type){
  const blob=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}
function download(d){
  const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(d.title)}</title><style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.4}h2{font-size:16pt}h3{font-size:12pt;margin-top:14pt}small{color:#666}</style></head><body>${docHtml(d)}</body></html>`;
  saveFile(d.title.replace(/[^\wäöüÄÖÜß -]/g,'').slice(0,60)+'.doc','﻿'+html,'application/msword');
}
function result(p,s,d,back){
  const m=A().main;
  m.innerHTML=`<div class="kick" style="color:${color(p)}">Ihr Ergebnis</div><div class="card" style="font-size:16px">${docHtml(d)}</div>
    <button class="go" id="code">Abholcode erstellen</button><p class="hint">Damit holen Sie das Dokument später am Laptop ab. Gespeichert wird nur das Dokument – anonym, vier Wochen.</p>
    <div id="codeBox"></div>
    <button class="opt" id="dl" style="text-align:center">Als Word herunterladen</button>
    ${p==='kontext'?'<button class="opt" id="sk" style="text-align:center;margin-top:10px">Skill-Datei (SKILL.md) herunterladen</button>':''}
    <button class="opt" id="bk" style="text-align:center;margin-top:10px">Zurück und ändern</button>
    <p class="hint" style="margin-top:16px">Lust auf ein weiteres Modul? Alle vier gibt es nach dem Workshop auf <b>${esc(A().C.participantUrl)}</b>.</p>`;
  if(s.code)showCode(s.code);
  $('#dl').onclick=()=>download(d);
  const sk=$('#sk');if(sk)sk.onclick=()=>saveFile('SKILL.md',skillMd(d),'text/markdown');
  $('#bk').onclick=()=>{s.step--;save(p,s);back()};
  $('#code').onclick=async()=>{
    if(s.code){showCode(s.code);return}
    const sb=A().sb;if(!sb){A().toast('Keine Verbindung – bitte Word-Download nutzen.');return}
    const {data,error}=await sb.rpc('save_pickup',{p_session:A().SESSION,p_path:p,p_doc:d});
    if(error){A().toast('Das hat nicht geklappt – bitte Word-Download nutzen.');return}
    s.code=data;save(p,s);showCode(data);A().send(p==='regeln'?'p1_done':p==='kontext'?'p2_done':'p3_done',{i:1});
  };
  function showCode(c){$('#codeBox').innerHTML=`<div class="card" style="text-align:center"><p class="s m" style="margin:0">Ihr Abholcode</p><p style="font-family:var(--type);font-size:34px;margin:6px 0">${esc(c)}</p><p class="s" style="margin:0">abholen auf <b>${esc(A().C.participantUrl)}</b> → „Ergebnis abholen“</p></div>`}
}

window.Pfade={render(id){({regeln,kontext,menschen})[id]()},info:INFO};
})();
