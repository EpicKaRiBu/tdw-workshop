/* Word-Export (.docx) ohne fremde Bibliothek, ohne Netz.
   DocxExport.fromHtml(titel, html) → Blob. Versteht das kleine HTML aus pfade.js:
   h1–h6, p, ul, ol, li, b/strong, i/em, small, br, pre, hr; dazu a (nur Text), code, table/tr/td/th und div
   (Klasse „sig“ = Unterschriftszeilen, „sub“/„fn“ = kleine graue Zeile, wie im Schulungsnachweis).
   Warum .docx: Das alte HTML-als-.doc öffnet nur Word am PC. Echtes .docx öffnen auch Handys
   (Word, Google Docs, iOS-Vorschau, Samsung/Android-Viewer) und LibreOffice. */
(()=>{
const MIME='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
const HEAD='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
/* A4, Ränder 2,5 cm (unten 2 cm); TW = Textbreite in Twips (1 cm = 567) */
const PAGE='<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1418" w:right="1418" w:bottom="1134" w:left="1418" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr>';
const TW=11906-2*1418;
const INK='23201B',GREY='6E6556',LINE='CBBDA3',PENCIL='C0392B';
/* XML-Text: escapen, Steuerzeichen entfernen (sonst ungültiges XML) */
const x=s=>String(s??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g,'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BLOCK=/^(H[1-6]|P|UL|OL|LI|PRE|HR|TABLE|DIV|SECTION|ARTICLE|HEADER|FOOTER|MAIN|BLOCKQUOTE|DETAILS|SUMMARY|FIGURE)$/;

/* ---------------- Inline: Text und Auszeichnungen → Runs ---------------- */
function segs(n,f,a){
  if(n.nodeType===3){a.push({...f,t:n.data});return a}
  if(n.nodeType!==1)return a;
  const T=n.tagName,g={...f};
  if(/^(STYLE|SCRIPT|TEMPLATE|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(T))return a;
  if(T==='BR'){a.push({br:1});return a}
  if(T==='B'||T==='STRONG')g.b=1;
  if(T==='I'||T==='EM')g.i=1;
  if(T==='SMALL')g.s=1;
  if(T==='U')g.u=1;
  if(T==='CODE'||T==='KBD'||T==='TT')g.m=1;
  for(const c of n.childNodes)segs(c,g,a);
  return a;
}
function run(p){
  let pr='';
  if(p.s)pr+='<w:rStyle w:val="Klein"/>';
  if(p.m)pr+='<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>';
  if(p.b)pr+='<w:b/><w:bCs/>';
  if(p.i)pr+='<w:i/><w:iCs/>';
  if(p.c)pr+=`<w:color w:val="${p.c}"/>`;
  if(p.u)pr+='<w:u w:val="single"/>';
  return `<w:r>${pr?`<w:rPr>${pr}</w:rPr>`:''}<w:t xml:space="preserve">${x(p.t)}</w:t></w:r>`;
}
/* Leerraum wie im Browser zusammenfassen (geschütztes Leerzeichen bleibt), dann Runs schreiben */
function runs(nodes,base){
  const all=[];nodes.forEach(n=>segs(n,{},all));
  const out=[];let sp=true;
  for(const s of all){
    if(s.br){const l=out[out.length-1];if(l&&!l.br)l.t=l.t.replace(/ $/,'');out.push(s);sp=true;continue}
    let t=s.t.replace(/[ \t\n\r\f]+/g,' ');if(sp)t=t.replace(/^ /,'');
    if(!t)continue;sp=t.endsWith(' ');out.push({...base,...s,t});
  }
  const l=out[out.length-1];if(l&&l.br)out.pop();else if(l)l.t=l.t.replace(/ $/,'');
  const txt=out.filter(p=>!p.br&&p.t);
  return {xml:out.map(p=>p.br?'<w:r><w:br/></w:r>':run(p)).join(''),empty:!txt.length,small:txt.length>0&&txt.every(p=>p.s)};
}
const P=(r,st,pp='')=>`<w:p>${st||pp?`<w:pPr>${st?`<w:pStyle w:val="${st}"/>`:''}${pp}</w:pPr>`:''}${r}</w:p>`;

/* ---------------- Blöcke ---------------- */
let H,nums;  // H: Überschrift → Formatvorlage; nums: je <ol> eine eigene Zählung
function body(el,out,ctx){
  let inl=[];
  const flush=()=>{const r=runs(inl,ctx.base);inl=[];if(!r.empty)out.push(P(r.xml,r.small?'Hinweis':ctx.st,ctx.pp))};
  for(const n of el.childNodes){
    if(n.nodeType===1&&BLOCK.test(n.tagName)){flush();block(n,out,ctx)}else inl.push(n);
  }
  flush();
}
function block(n,out,ctx){
  const T=n.tagName;
  if(/^H[1-6]$/.test(T)){const r=runs([...n.childNodes]);if(!r.empty)out.push(P(r.xml,H.get(n)));return}
  if(T==='P'){const r=runs([...n.childNodes],ctx.base);if(r.empty)return;
    const k=/\b(sub|fn)\b/.exec(n.className);  // Klassen aus nachweis.html: Unterzeile, Fußnote
    out.push(P(r.xml,r.small||k?'Hinweis':ctx.st,k&&k[1]==='fn'?'<w:spacing w:before="360"/>':ctx.pp));return}
  if(T==='HR'){out.push(P('','Trennlinie'));return}
  if(T==='PRE'){
    /* Zeilen bleiben erhalten: ein Absatz mit Zeilenumbrüchen, Leerzeichen und Tabs bleiben */
    const L=n.textContent.replace(/\r\n?/g,'\n').replace(/\n$/,'').split('\n');
    out.push(P(L.map((t,i)=>(i?'<w:r><w:br/></w:r>':'')+t.split('\t').map(u=>u?`<w:r><w:t xml:space="preserve">${x(u)}</w:t></w:r>`:'').join('<w:r><w:tab/></w:r>')).join(''),'Code'));return}
  if(T==='UL'||T==='OL'){list(n,out,0);return}
  if(T==='LI'){list({tagName:'UL',children:[n]},out,0);return}
  if(T==='TABLE'){table(n,out);return}
  if(T==='DIV'&&/\bsig\b/.test(n.className)){sig(n,out);return}
  body(n,out,ctx);
}
function list(n,out,lvl){
  const L=Math.min(lvl,2),id=n.tagName==='OL'?(nums.push(1),nums.length+1):1;
  for(const li of n.children){
    if(li.tagName!=='LI'){block(li,out,{});continue}
    let first=true,inl=[];
    const flush=(force)=>{const r=runs(inl);inl=[];if(r.empty&&!(force&&first))return;
      out.push(P(r.xml,'ListParagraph',first?`<w:numPr><w:ilvl w:val="${L}"/><w:numId w:val="${id}"/></w:numPr>`:`<w:ind w:left="${567*(L+1)}"/>`));first=false};
    for(const c of li.childNodes){
      if(c.nodeType===1&&(c.tagName==='UL'||c.tagName==='OL')){flush(true);list(c,out,lvl+1)}
      else if(c.nodeType===1&&BLOCK.test(c.tagName)){flush(false);inl=[...c.childNodes];flush(true)}
      else inl.push(c);
    }
    if(inl.length||first)flush(true);
  }
}
/* Tabelle: Linien nur zwischen den Zeilen; zwei Spalten = Beschriftung (grau, 34 %) und Wert */
function table(t,out){
  const rows=[...t.rows];if(!rows.length)return;
  const n=Math.max(...rows.map(r=>r.cells.length)),lab=n===2;
  const w=lab?[Math.round(TW*.34),TW-Math.round(TW*.34)]:Array(n).fill(Math.floor(TW/n));
  if(/<w:tbl>/.test(out[out.length-1]||''))out.push(P('',null,'<w:spacing w:after="0"/>'));
  const b=`w:val="single" w:sz="4" w:space="0" w:color="DDDDDD"`;
  let s=`<w:tbl><w:tblPr><w:tblW w:w="${TW}" w:type="dxa"/><w:tblBorders><w:bottom ${b}/><w:insideH ${b}/></w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="85" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="85" w:type="dxa"/></w:tblCellMar><w:tblLook w:val="0000"/></w:tblPr><w:tblGrid>${w.map(v=>`<w:gridCol w:w="${v}"/>`).join('')}</w:tblGrid>`;
  for(const r of rows){
    s+='<w:tr><w:trPr><w:cantSplit/></w:trPr>';
    for(let i=0;i<n;i++){
      const c=r.cells[i],o=[];
      if(c)body(c,o,{pp:'<w:spacing w:after="0"/>',base:{b:c.tagName==='TH'?1:0,c:lab&&i===0?'555555':null}});
      s+=`<w:tc><w:tcPr><w:tcW w:w="${w[i]}" w:type="dxa"/></w:tcPr>${o.join('')||'<w:p/>'}</w:tc>`;
    }
    s+='</w:tr>';
  }
  out.push(s+'</w:tbl>');
}
/* Unterschriftszeilen: Platz zum Unterschreiben, darunter Linie und kleine Beschriftung */
function sig(d,out){
  const c=[...d.children],n=c.length,gap=567,cw=Math.floor((TW-gap*(n-1))/n);
  if(!n)return body(d,out,{});
  const grid=c.flatMap((_,i)=>i?[gap,cw]:[cw]);
  const top='<w:tcBorders><w:top w:val="single" w:sz="6" w:space="0" w:color="444444"/></w:tcBorders>';
  out.push(P('',null,'<w:spacing w:before="560" w:after="0"/>'));
  out.push(`<w:tbl><w:tblPr><w:tblW w:w="${TW}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar><w:tblLook w:val="0000"/></w:tblPr><w:tblGrid>${grid.map(v=>`<w:gridCol w:w="${v}"/>`).join('')}</w:tblGrid><w:tr><w:trPr><w:cantSplit/></w:trPr>`+
    c.map((e,i)=>(i?`<w:tc><w:tcPr><w:tcW w:w="${gap}" w:type="dxa"/></w:tcPr><w:p/></w:tc>`:'')+`<w:tc><w:tcPr><w:tcW w:w="${cw}" w:type="dxa"/>${top}</w:tcPr>${P(runs([...e.childNodes]).xml,'Hinweis','<w:spacing w:before="60" w:after="0"/>')}</w:tc>`).join('')+'</w:tr></w:tbl>');
}

/* ---------------- Paketteile ---------------- */
const rels=a=>HEAD+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${a.map(([id,t,f])=>`<Relationship Id="${id}" Type="${t.startsWith('http')?t:'http://schemas.openxmlformats.org/officeDocument/2006/relationships/'+t}" Target="${f}"/>`).join('')}</Relationships>`;
const CT=t=>`application/vnd.openxmlformats-officedocument.wordprocessingml.${t}+xml`;
const TYPES=HEAD+`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="${CT('document.main')}"/><Override PartName="/word/styles.xml" ContentType="${CT('styles')}"/><Override PartName="/word/numbering.xml" ContentType="${CT('numbering')}"/><Override PartName="/word/settings.xml" ContentType="${CT('settings')}"/><Override PartName="/word/fontTable.xml" ContentType="${CT('fontTable')}"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
const sz=v=>`<w:sz w:val="${v}"/><w:szCs w:val="${v}"/>`;
const st=(type,id,name,body,extra='')=>`<w:style w:type="${type}" w:styleId="${id}"><w:name w:val="${name}"/>${type==='paragraph'&&id!=='Normal'?'<w:basedOn w:val="Normal"/>':''}${extra}<w:qFormat/>${body}</w:style>`;
/* Formatvorlagen: Calibri 11 pt, Titel mit rotem Strich (wie der Rotstift der App), Überschriften fett */
const STYLES=HEAD+`<w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Arial"/>${sz(22)}<w:lang w:val="de-AT" w:eastAsia="en-US" w:bidi="ar-SA"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>`+
  st('paragraph','Normal','Normal',`<w:rPr><w:color w:val="${INK}"/></w:rPr>`).replace('<w:style ','<w:style w:default="1" ')+
  '<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/></w:style>'+
  '<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:semiHidden/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>'+
  st('paragraph','Title','Title',`<w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="6" w:color="${PENCIL}"/></w:pBdr><w:spacing w:before="0" w:after="240" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr>${sz(40)}</w:rPr>`,'<w:next w:val="Normal"/>')+
  [[1,28,300,80],[2,24,240,60],[3,22,200,40]].map(([l,s,b,a])=>st('paragraph','Heading'+l,'heading '+l,`<w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="${b}" w:after="${a}"/><w:outlineLvl w:val="${l-1}"/></w:pPr><w:rPr><w:b/><w:bCs/>${sz(s)}</w:rPr>`,'<w:next w:val="Normal"/><w:uiPriority w:val="9"/>')).join('')+
  st('paragraph','ListParagraph','List Paragraph','<w:pPr><w:spacing w:after="80"/><w:ind w:left="567"/></w:pPr>')+
  st('paragraph','Code','Code',`<w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="DDDDDD"/><w:left w:val="single" w:sz="4" w:space="4" w:color="DDDDDD"/><w:bottom w:val="single" w:sz="4" w:space="4" w:color="DDDDDD"/><w:right w:val="single" w:sz="4" w:space="4" w:color="DDDDDD"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="FAF7F0"/><w:spacing w:before="60" w:after="200" w:line="240" w:lineRule="auto"/><w:ind w:left="113" w:right="113"/></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>${sz(19)}</w:rPr>`)+
  st('paragraph','Trennlinie','Trennlinie',`<w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="${LINE}"/></w:pBdr><w:spacing w:before="240" w:after="160" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr>${sz(8)}</w:rPr>`)+
  st('paragraph','Hinweis','Hinweis',`<w:pPr><w:spacing w:after="80" w:line="252" w:lineRule="auto"/></w:pPr><w:rPr><w:color w:val="${GREY}"/>${sz(18)}</w:rPr>`)+
  st('character','Klein','Klein',`<w:rPr><w:b w:val="0"/><w:bCs w:val="0"/><w:color w:val="${GREY}"/>${sz(18)}</w:rPr>`,'<w:basedOn w:val="DefaultParagraphFont"/>')+
  '</w:styles>';
/* Aufzählung (•, –, ·) und Nummerierung (1., a), i.); Einzug 1 cm je Ebene */
const lvl=(i,fmt,txt)=>`<w:lvl w:ilvl="${i}"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${txt}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${567*(i+1)}" w:hanging="340"/></w:pPr></w:lvl>`;
const numbering=()=>HEAD+`<w:numbering ${NS}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>${lvl(0,'bullet','•')}${lvl(1,'bullet','–')}${lvl(2,'bullet','·')}</w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>${lvl(0,'decimal','%1.')}${lvl(1,'lowerLetter','%2)')}${lvl(2,'lowerRoman','%3.')}</w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>`+
  nums.map((_,i)=>`<w:num w:numId="${i+2}"><w:abstractNumId w:val="1"/>${[0,1,2].map(l=>`<w:lvlOverride w:ilvl="${l}"><w:startOverride w:val="1"/></w:lvlOverride>`).join('')}</w:num>`).join('')+'</w:numbering>';
const SETTINGS=HEAD+`<w:settings ${NS}><w:defaultTabStop w:val="709"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`;
/* Schriftliste: hilft Handy-Viewern beim Ersatz (Calibri → serifenlos, Consolas → Festbreite) */
const FONTS=HEAD+`<w:fonts ${NS}><w:font w:name="Calibri"><w:altName w:val="Arial"/><w:panose1 w:val="020F0502020204030204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font><w:font w:name="Arial"><w:panose1 w:val="020B0604020202020204"/><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/></w:font><w:font w:name="Consolas"><w:altName w:val="Courier New"/><w:panose1 w:val="020B0609020204030204"/><w:charset w:val="00"/><w:family w:val="modern"/><w:pitch w:val="fixed"/></w:font></w:fonts>`;
const core=title=>{const t=new Date().toISOString().replace(/\.\d+Z$/,'Z');
  return HEAD+`<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${x(title)}</dc:title><dc:language>de-AT</dc:language><dcterms:created xsi:type="dcterms:W3CDTF">${t}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${t}</dcterms:modified></cp:coreProperties>`};

/* ---------------- ZIP (ohne Kompression, UTF-8-Namen, CRC32) – wie makeZip in pfade.js ---------------- */
function zip(files){
  const enc=new TextEncoder(),T=new Uint32Array(256);
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;T[n]=c>>>0}
  const crc=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=T[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
  const D=new Date(),dd=((D.getFullYear()-1980)<<9)|((D.getMonth()+1)<<5)|D.getDate(),tt=(D.getHours()<<11)|(D.getMinutes()<<5)|(D.getSeconds()>>1);
  const put=(v,a)=>{const d=new DataView(new ArrayBuffer(v.reduce((s,[,,l])=>s+l,0)));v.forEach(([o,x,l])=>l===4?d.setUint32(o,x,true):d.setUint16(o,x,true));a.push(new Uint8Array(d.buffer))};
  const parts=[],cen=[];let off=0;
  for(const [name,text] of files){
    const nb=enc.encode(name),db=enc.encode(text),c=crc(db);
    put([[0,0x04034b50,4],[4,20,2],[6,0x0800,2],[8,0,2],[10,tt,2],[12,dd,2],[14,c,4],[18,db.length,4],[22,db.length,4],[26,nb.length,2],[28,0,2]],parts);parts.push(nb,db);
    put([[0,0x02014b50,4],[4,20,2],[6,20,2],[8,0x0800,2],[10,0,2],[12,tt,2],[14,dd,2],[16,c,4],[20,db.length,4],[24,db.length,4],[28,nb.length,2],[30,0,2],[32,0,2],[34,0,2],[36,0,2],[38,0,4],[42,off,4]],cen);cen.push(nb);
    off+=30+nb.length+db.length;
  }
  const cs=cen.reduce((a,b)=>a+b.length,0);
  put([[0,0x06054b50,4],[4,0,2],[6,0,2],[8,files.length,2],[10,files.length,2],[12,cs,4],[16,off,4],[20,0,2]],cen);
  return new Blob([...parts,...cen],{type:MIME});
}

/* ---------------- Einstieg ---------------- */
function fromHtml(title,html){
  const doc=new DOMParser().parseFromString(String(html??''),'text/html');
  /* Erste h1/h2 = Titel; die übrigen Überschriftsebenen der Reihe nach → Überschrift 1, 2, 3 */
  const hs=[...doc.body.querySelectorAll('h1,h2,h3,h4,h5,h6')],first=hs[0]&&/^H[12]$/.test(hs[0].tagName)?hs[0]:null;
  const lv=[...new Set(hs.filter(h=>h!==first).map(h=>+h.tagName[1]))].sort();
  H=new Map(hs.map(h=>[h,h===first?'Title':'Heading'+Math.min(3,lv.indexOf(+h.tagName[1])+1)]));nums=[];
  const out=[];body(doc.body,out,{});
  if(!out.length||/^<w:tbl>/.test(out[out.length-1]))out.push('<w:p/>');
  const t=String(title||(first&&first.textContent)||'Dokument').trim();
  return zip([
    ['[Content_Types].xml',TYPES],
    ['_rels/.rels',rels([['rId1','officeDocument','word/document.xml'],['rId2','http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties','docProps/core.xml']])],
    ['docProps/core.xml',core(t)],
    ['word/_rels/document.xml.rels',rels([['rId1','styles','styles.xml'],['rId2','numbering','numbering.xml'],['rId3','settings','settings.xml'],['rId4','fontTable','fontTable.xml']])],
    ['word/document.xml',HEAD+`<w:document ${NS}><w:body>${out.join('')}${PAGE}</w:body></w:document>`],
    ['word/styles.xml',STYLES],['word/numbering.xml',numbering()],['word/settings.xml',SETTINGS],['word/fontTable.xml',FONTS]
  ]);
}
window.DocxExport={fromHtml,type:MIME};
})();
