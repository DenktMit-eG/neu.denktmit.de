---
title: "Zum Programmierpraktikum in der Entwickler-Agentur: Ein Bericht aus Betreuerperspektive"
layout: post
author: Sven Köppel
language: de
related_image: /assets/blog/2022-09-13-internship.jpg
header_image: /assets/blog/2022-09-13-internship.jpg
header_image_caption: 'Happy times of interns, [free unsplash license](https://unsplash.com/photos/g1Kr4Ozfoac)'
---

Ein Unternehmen aufzubauen bedeutet immer auch, Nachwuchskräfte zu gewinnen. In der
Genossenschaft haben wir uns [ein Jahr nach der Gründung](/2022/06/30/Generalversammlung)
dazu entschlossen, für ein paar Wochen eine Praktikantin aufzunehmen. Es handelt sich
um eine Naturwissenschaftlerin mit Master-Abschluss, die uns in der Firmenzentrale
in Oberursel vor den Toren Frankfurts vor einer Weile besucht hat und großes Interesse
daran hat, professionell zu Programmieren und das Tätigkeitsfeld von freiberuflichen
Software-Entwickler:innen, oft einfach »Freelancer« genannt, kennenzulernen.

Um unseren Aufwand für das bezahlte Praktikum auf die vielen Schultern in der Genossenschaft
zu verteilen, haben wir uns dazu entschlossen, der Praktikantin jede Woche eine andere
Betreuungsperson zuzuweisen. Durch dieses rotierende Prinzip bekam sie viele verschiedene
Perspektiven, wohingegen der zeitliche Aufwand für jeden von uns gedeckelt blieb.

## Die Begleitung im Remote-Praktikumsbetreuung 

In der vergangene Woche im September 2022 hab ich mich bereiterklärt, die Praktikantin
zu betreuen bzw. bei ihrem Lernprojekt zu begleiten. Wir hatten einen intensiven Austausch
zu einem Projekt, mit dem Ziel es in einer 5-Tages-Arbeitswoche zu absolvieren. Tatsächlich
kommt also die Formulierung "Betreuer begleitet Praktikanten" eher hin als die paktikumstypischere
Formulierung "Praktikant begleitet Betreuer". Von meinem Arbeitsalltag mit seinen vielen 
Meetings bekam die Praktikantin nämlich eigentlich nichts mit.

Erschwerend kam hinzu, dass das Praktikum *remote* betreut wurde, ich also in Oberursel
nicht vor Ort war. Ein Grund dafür war das wenige Wochen alte Baby, um welches ich mich (mangels
städtischer Kinderbetreuung und mangels Elternzeit für Menschen in ungewöhnlichen Lebensphasen)
werktags kümmern musste, während meine Partnerin 10-Stunden-Schichten im Krankenhaus absolvierte.
Während das physische Begleiten und "Über die Schulter schauen" in einem Remote-Praktikum
schwieriger abzubilden ist, hat diese Betreuungsform immerhin den Vorteil, dass die Situation es
ebensowenig zulässt, in unprofessionelle Muster zu fallen, Stichwort "Praktikant kocht Kaffee"
oder "Praktikant macht Babysitting".

Wir haben die Betreuung letzte Woche so ausgelegt, dass wir in Anbetracht meines eng getakteten
Terminkalenders täglich mittags eine Stunde und dann abends ab ca. 19 Uhr mehrere Stunden
eine Videotelefonie gemacht haben und dabei intensiv und ohne nennenswerter Ablenkung gearbeitet
haben. So kamen wir in der Woche auf ungefähr zwölf Betreuungsstunden, die in meinem Fall zur
regulären Arbeitswoche dazukamen und im Falle der Praktikantin mehr als die Hälfte ihrer vertraglichen
Wochenarbeitszeit abdeckten.

Tatsächlich hätte ich so ein Pensum mit einer Vor-Ort-Betreuung nur schwer realisieren können.
Erst der schnelle Kontextwechsel, der durch Remote-Arbeit möglich ist, ermöglichte mir zwischen
Standorten und Firmen schneller zu wechseln, als dem Neugeborenen seine Windel. Als großer Freund
von asynchroner Kommunikation (etwa im firmenweiten Slack-Chat) sind synchrone Einheiten
(im Videotelefonat) stets ein Zugeständnis an ein Stück besondere Zeit, die im Tempo des Praktikanten
verbracht wird. Wichtig war mir, dass diese Telefonate nicht zwischen Tür und Angel, auf dem Mobiltelefon
mit schlechtem Empfang stattfanden, sondern stets so, dass beide Beteiligten an einem Schreibtisch
saßen, an einem eingerichteten Computer mit Entwicklungsumgebung, Terminal und allem anderen, was
es zum *Coden* braucht.

## Das Konzept des Programmierens Lernen

Die Praktikantin hatte die letzten Wochen die Grundlagen der Programmiersprache [Python](https://www.python.org/)
unter anderem an [Katas](http://codekata.com/) geübt. Am Montag hatten wir eine Übergabe vom
Betreuer der Vorwoche gemacht, dabei fand ich ein Github-Repository mit einem [Django](https://www.djangoproject.com/)-Demoprojekt vor.
Das Ziel war es, eine Anwendung zu entwickeln, die eine selektive Übersetzung eines
englisch- zu einem deutschsprachigen Text ermölichte, je nach klassifiziertem Lerngrad des Benutzers
(Sprachlern-Level A1, A2, B, C, etc.). Ich schlug vor, dieses Projekt und die Woche wie folgt zu 
strukturieren:

  * Zunächst Aufbau eines [Textkorpus](https://de.wikipedia.org/wiki/Textkorpus) in Form einer
    Wort-Übersetzungstabelle. Das ist eine klassische semi-automatisierbare *Data Science*-Aufgabe,
    die domänenspezifisches Wissen erfordert.
  * Erprobung von Übersetzungsmechanismen im Terminal mit meinem favorisierten REPL-Ansatz, d.h. 
    Entwicklung eines kurzen, freistehenden Programmes von dem man jede Zeile versteht und welches
    den Fokus auf der *Buisnesslogik* und nicht der umfangreichen Verwendung von Bibliotheken und APIs hat.
  * Erstellung einer grafischen Benutzeroberfläche (GUI) für dieses Programm in Form einer
    Webschnittstelle.

Während der Woche haben wir festgestellt, dass Wortlisten sich gut mit [DeepL](https://www.deepl.com/translator)
sowie [Google Translate](https://translate.google.de/) übersetzen lassen. Natürlich sind wir sofort
darauf gestoßen, dass die Übersetzung eines Textes ein quasi beliebig kompliziertes Unterfangen ist
und Ansätze wie [Tokenization zur lexikalischen Analyse](https://en.wikipedia.org/wiki/Lexical_analysis#Tokenization)
sich zwar gut zur kontextfreien Übersetzung einzelner Wörter eignen, es aber keine brauchbaren
fertigen *detokenizer* gibt, welche wieder die originale Textformatierung herstellen. Stattdessen haben
wir den Algorithmus als Quick-and-Dirty regulären Ausdruck mit [word boundaries](https://pcre.org/original/doc/html/pcrepattern.html#SEC11)
realisiert. Damit war dann entgültig klar, dass eine relationale Datenbank uns keinen Mehrwert schaffen
wird, sodass wir statt Django das deutlich einfachere [Flask-Webframework](https://flask.palletsprojects.com/en/2.2.x/)
gewählt haben. Letztlich hätten wir auch auf Flask verzichten können und einen HTTP-Server "from the scratch"
schreiben können, doch diesen Luxus haben wir uns an der Stelle gegönnt. Die Bearbeitung von HTML und CSS
rundeten das Projekt zum Ende der Woche ab, außerdem wurde es zwecks Deploying bei
[PythonAnywhere](https://www.pythonanywhere.com/) hochgeladen, womit die Praktikantin bereits aus Vorwochen Erfahrung
hatte.

## Schwerpunkte

Von Anfang an lag mein Fokus in dieser Woche darauf, Grundlagen zu lernen, so etwa

  * Die interaktive, explorative Benutzung von Python in der Konsole mittels der `help()`-Funktion
    (in [IPython](https://ipython.org/) mit nachgestelltem Fragezeichen `?` erreichbar).
  * Das Erlernen klassischer Ein- und Ausgabe mithilfe von Textdateien (C-Idiom `open()`, `readline()`
    sowie auf CSV-Ebene), die Auseinandersetzung mit Zeichensätzen.
  * Den funktionalen Zugang mittels [List Comprehension](https://pythongeeks.org/list-comprehensions-in-python/)
    sowie den elementaren Datenstrukturen von Python (Strings, Tupel, Listen, Dictionaries) zu erlernen.
  * Den Unterschied zwischen Groß- und Kleinschreibung beim Suchen-und-Ersetzen sowie der Abgrenzung
    zu regulären Ausdrücken zu erlernen. Reguläre Sprachen reihen sich nahtlos in die Thematik zwischen natürlicher
    Sprachverarbeitung und künstlicher, Turing-vollständiger Programmiersprache ein.
  * Grundlegendes Verständnis für objektorientierte Programmierung auch mithilfe des Schreibens eigener Klassen
    zu vermitteln.
  * Grundlegendes Verständnis für hierarschie Dateisystem und das Pfadkonzept zu vermitteln, welches
    sowohl beim lokalen Arbeiten mit Dateien als auch im Kontext von Webservern relevant ist.
  * Die Funktionsweise einer Client-/Server-Anwendung sowie von HTML-Tags und HTML-Formularen zu
    vermitteln, ohne sie von einem Framework wegzuabstrahieren.
  * Praktische Erfahrung im Debugging lokal in der Konsole (Stack Trace) vs. einer IDE (Visual Studio, interaktives Debugging)
    vs. auf dem Server (PythonAnywhere mithilfe von Error Logs) zu vermitteln.
  * Aufmerksamkeit für Sicherheitslücken zu vermitteln, etwa einer *Cross Site Scripting*-Attacke die wir durch
    Replying von unsicheren Benutzereingaben im HTML erzeugt haben.
    
Wie man an vielen Stellen in (diesem Blog)[/blog] merkt, bin ich ein großer Verfechter von einfachen
und prägnanten Programmen die in völligem Bewusstsein Libraries und APIs verwenden. Deswegen haben wir
mithilfe unseres Ansatzes einen "MVP", einen "Minimum Viable Prototype" gebaut, der auf einer lokalen,
vorgefertigten Datenbasis arbeitet. Wir haben beispielsweise mit dem [Python Natural Language Toolkit](https://www.nltk.org/)
experimentiert, waren aber mit den Tokenization-Routinen unglücklich und haben von dieser Abhägigkeit
daher wieder Abstand genommen. Auch von der Benutzung von Tooling welches zum Deploying verwendet werden, etwa
*python virtual environments* oder *Docker* haben wir während der Woche abgesehen.
    
## Verwendete Werkzeuge

In der Regel haben wir einfach nur eine Videotelefoniesoftware (Zoom, Jitsi und vergleichbar) genutzt. Die
Praktikantin hatte im Büro eine Linux-Workstation und privat einen Windows-Laptop, auf beiden waren vergleichbare
Benutzungsumgebungen installiert. Dank *Teamviewer* konnten wir spontan auch interaktiv arbeiten. Ansonsten
haben wir uns mit wechselseitigen Bildschirmfreigaben beholfen. Wichtige Links und Arbeitsanweisungen wurden
per Slack festgehalten.

## Fazit

Für mich als Betreuer war dieses Remote-Praktikum eine interessante Erfahrung. Die Betreuungswoche fiel auf
eine Zeit, bei der ich privat wie beruflich sehr stark eingebunden war, weswegen die intensive Videotelefonie
für mich sehr herausfordern war. Als Vorteile des Remote-Praktikums habe ich empfunden, dass

  * dank der Kombination von synchronem (Telefonie) und asynchronem (Chat) Kontakt eigentlich
    eine kontinuierliches Betreuungsangebot möglich war,
  * ich auch die Zeit der Videokonferenzen prinzipiell gut parallel nutzen konnte und sie dank großer
    zeitlicher Flexibilität auch in den Abendstunden ging -- etwas, was man im Büro wahrscheinlich nicht
    tun würde,
  * verhältnismäßig viele digitale Assets angefallen sind, die es mir jetzt etwa im Nachhinein auch
    einfach machen, die Woche zusammenzufassen.

Als Nachteile ist klar zu nennen, dass

  * der zwischenmenschliche Kontakt auf der Strecke blieb. Ein Praktikum lebt viel davon, die Arbeitsumstände
    im Alltag kennenzulernen, von dem die Pausen zuweilen die wichtigste Zeit zur Konversation sind. Die
    wortwörtliche "gemeinsame Zeit in der Kaffeeküche" oder in einem Restaurant fand nicht statt.
    Als Menschen haben wir uns dadurch eigentlich nicht kennengelernt,
  * der Umweg über Chat "die schnelle Frage zwischendurch" signifikant schwieriger macht. Ich nehme das
    schriftliche "schnelle Anschreiben zwischendurch" als Hürde wahr, die der Praktikant erst überwinden 
    muss. Das findet oft nicht statt, dadurch geht dem Praktikanten wertvolle Zeit verloren,
  * diese Form der Zusammenarbeit sehr anstrengend für alle Beteiligten ist: Stundenlange Videotelefonate
    sind (nicht nur zu später Stunde) ermüdend, die "Zoom fatigue" ist zu Covid-Lockdown-Zeiten einer
    breiten Öffentlichkeit ein Begriff geworden. Normalerweise begrenze ich daher meine Videotelefonate auf
    60 Minuten, das hat aber wegen der kompakten Woche nicht funktioniert.

Für die Praktikantin geht es jetzt übrigens weiter: Nach einer Übergabe am Montag ist sie bereits mitten
in der "nächsten" Woche mit einem weiteren Genossen und Folgeprojekten.
