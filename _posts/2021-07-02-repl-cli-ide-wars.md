---
layout: post
author: Sven Köppel
language: de
description: Nicht jeder Entwickler will immer nur das Eine&#58; Die IDE anschmeissen. Meine Hommage an die Einfachheit einer guten REPL.
title: "Die IDE-Wars"
related_image: /assets/blog/blue-neon-spiral.jpg
header_image: /assets/blog/blue-neon-spiral.jpg
header_image_alt: Blaue Neonspiral die sich zum Fluchtpunkt hin verjüngt
header_image_caption: Eat, Sleep, Exercise, Repeat
header_image_attribution: <a href="https://www.pexels.com/de-de/foto/blaues-spiral-neonlicht-2495173">Frank Cone</a>, <a href="https://www.pexels.com/de-de/lizenz/">Pexels Lizenz (19.11.2021)</a>, via Pexels
---

Heute möchte ich einmal über ein Thema schreiben, welches in der Genossenschaft sehr
intensiv diskutiert wird: Integrierte Entwicklungsumgebungen, kurz *IDEs* (für englisch
*Integrated Development Environments*). Dem gegenüber stehen vor allem die *REPLs*,
englisch für *Read Eval Print Loop*, also ein Arbeitsablauf, der sich auf deutsch
vielleicht mit *LAPS* abkürzen ließe, für Lesen, Ausführen, Ausgeben, Schleife.
Dieses Prinzip erinnert etwas an [Eat Pray Love](https://de.wikipedia.org/wiki/Eat_Pray_Love)
oder [Eat Exercise Sleep Repeat](https://medium.com/study-tips/eat-sleep-exercise-repeat-7a12ba07c84d).
Es handelt sich durchaus um ein Paradigma, ist aber nicht so exotisch, dass er Teil
meiner Blogartikelserie *Blick über den Tellerrand* wäre, welche ich diese Woche
mit einem Text über
[stackbasierte Programmiersprachen](/2021/06/29/tellerrand-stackbasierte-programmiersprachen.html)
angefangen habe.

Tatsächlich wurde ich für diesen Blogartikel motiviert von einem Blogartikel
[REPL vs CLI: IDE wars](https://vlaaad.github.io/clj-vs-cli), der gestern erschien. Dort
geht es vor allem um die [Programmiersprache Clojure](https://clojure.org/) und die
[Clojure-REPL](https://clojure.org/guides/repl/introduction#_what_is_a_repl).
Der [schwedische Autor](https://vlaaad.github.io/about/) verweist auch am Anfang seines
Artikels darauf, dass er nicht der erste ist, der über die Frage, was denn nun alles eine IDE
sein kann, philosophiert.

## Die Liebe zur Entwicklungsumgebung

Softwareentwickler:innen pflegen oft eine Affinität zu Computern, die sich über ihre Arbeit
hinaus auf das Betriebssystem, seine Konfiguration bis hin zur verwendeten Hardware und
physischen Arbeitsumgebung fortsetzt. Wo es früher darum ging, mit welchem Farbschema man
unter Windows 95 am besten entwickeln kann, waren es später Texteditoren und Syntaxhighlighting,
[die verwendete Schriftart](https://duckduckgo.com/?t=ffab&q=best+programming+font&ia=web),
die Anzahl und Ausrichtung der Monitore, Tastaturen, mobile Endgeräte, usw – die Liste lässt
sich fast endlos fortsetzen.

Besondere Vorlieben gibt es selbstverständlich auch zum Software-Ökosystem (oder *Softwarestack*),
mit welchem am liebsten programmiert und entwickelt wird. Dazu gehört nicht nur die
[Lieblingsprogrammiersprache](https://duckduckgo.com/?t=ffab&q=favourite+programming+language&ia=web),
sondern auch die [Lieblings-Frameworks](https://duckduckgo.com/?t=ffab&q=favourite+web+framework&ia=web)
und -Libraries, die [Lieblingsdatenbank](https://duckduckgo.com/?t=ffab&q=favourite+database&ia=web),
und so weiter. Zum Entwickeln gehört ferner das 
[Lieblings-Buildsystem](https://duckduckgo.com/?t=ffab&q=favourite+build+system&ia=web),
welches sich um das Aufrufen des nötigen Compilers (auch da gibt es manchmal Varianten, die
zur Präferenzenbildung einladen) kümmert.

Zum Entwickeln kann aber auch noch mehr gehören: Etwa Werkzeuge, die die Entwickler:in beim Suchen und
Finden von Fehlern unterstützt. Die Rede ist etwa vom [Lieblings-Debugger](https://duckduckgo.com/?t=ffab&q=favourite+debugger&ia=web)
(langsam ein bisschen viel *Lieblings-...*, oder?) oder vom
[Lieblings-Profiler](http://stackoverflow.com/questions/26663/ddg#266969)
(diesmal kein DuckDuckGo-Link!).

## Anatomie und Benutzung einer IDE

Um all diese Werkzeuge irgendwie ansprechen zu können, haben Entwickler:innen irgendwann angefangen,
ein Superwerkzeug zu entwickeln welches alle anderen Werkzeuge integriert. Das Ergebnis war die
*integrierte Entwicklungsumgebung*, die eierlegende Wollmilchsau welche den Anspruch hat, alle
Wünsche zu beantworten und den Entwickler:innen-Alltag komplett abzubilden. Idealerweise läuft
diese Umgebung immer im Hintergrund, startet morgens beim Aufstehen und geht abends zum
Zu-Bett-Gehen wieder aus. Da Entwickler:innen ja auch gerne teure schnelle Computer
kaufen (siehe oben), gehören Entwicklungsumgebungen häufig zu den anspruchsvollsten Programmen,
die ein solcher Computer bewältigen kann. Komplex und langsam werden sie vor allem durch
große speicherintensive Datenbanken und zugehörige Indexierer, welche etwa den Code ständig
im Hintergrund parsen und Cross-Referenzing ermöglichen, die zugehörigen Dokumentationen
zu Code, Sprache und Libraries (oft viele tausend Seiten dicke Bücher) vorhalten und eben
nebenbei auch noch alle obengenannten Tools per Mausklick verfügbar machen. Zu einer modernen
Entwicklungsumgebung für spezielle Plattformen gehört oft noch ein Simulator jener
Plattform (z.B. eines Smartphones). Auch die komplette Entwicklungsgeschichte des Codes wird
per Anschluss an ein Revisionskontrollsystem (z.B. *git*) vorgehalten.

Um all die Funktionen unter einen Hut zu bringen, sehen die Benutzeroberflächen von
Entwicklungsumgebungen aus wie das Cockpit eines Jumbojets. An allen Ecken und Kanten gibt es
Buttons und Menüs, Ausklappfenster und Indikatorzeichen in allen Farben des Regenbogens.
Für den eigentlichen Quellcode, der den Kern der Arbeit der Entwickler:in ausmacht, bleibt
auf dem Bildschirm so wenig Platz übrig. Und auch der Quellcode ist durchzogen von farbigen
Linien, gerade, gewellt oder gestrichelt, um die vielen Anmerkungen, die die IDE vorschlägt,
unterzubringen.

Um mit einer solchen IDE effizient zu arbeiten, muss die Entwickler:in eine enorme
Lernkurve bewältigen. Idealerweise lernt sie zunächst die eigentliche Programmiersprache,
die zu benutzenden Frameworks und Libraries sowie Domänenwissen in der Anwendung, die sie
vorhat zu schreiben. Anschließend muss sie lernen, welche Werkzeuge sie benötigt (z.B. einen
Debugger) und wie sie ihn über die IDE anspricht. Erst nach Bewältigung der Lernkurve
stellt sich der Vorteil einer IDE ein, und zwar zuvorerst die Zeitersparnis, da alle
Werkzeuge zur Hand sind. Viele Vorteile kann eine IDE auch erst ausspielen, wenn der
damit bearbeitete Code sehr groß geworden ist, sodass eine computerunterstützte Navigation
schneller als eine händische vonstatten geht. Nachdem ein solches Wissen aufgebaut wurde,
kann eine IDE sich als sehr mächtiges Werkzeug herausstellen, was die Effizienz der
Entwickler:in erhöht.

## Die Zukunft der IDE: Programmieren mit der künstlichen Intelligenz

Ich beobachte generell die letzten Jahrzehnte eine Tenden zu immer komplexeren Frameworks
und Libraries, die sich eigentlich auch nur mit immer komplexeren Entwicklungsumgebungen
beherrschen lassen. Dabei verschmelzt die Idee, dass der Computer der Entwickler:in beim
Programmieren hilft, mittlerweile mit Ansätzen der künstlichen Intelligenz, den Computer
beim Entwickeln zu unterstützen. Vor wenigen Tagen wurde etwa der
[Github Coplit](https://copilot.github.com/) angekündigt, ein Tool zum Erzeugen von
Textblöcken in *Programmiersprache* auf Basis von von der Entwickler:in in
*natürlicher Sprache* formulierten Kommentaren.

<img src="https://pbs.twimg.com/media/E5D6uw2XIBAkU4u?format=jpg&name=4096x4096"
  style="width:100%;" alt="Github Copilot Screenshot">

Mit Bildern wie dem obigen wurde der *Copilot* angekündigt. 
[In den sozialen Medien](https://twitter.com/nickjshearer/status/1409902649625956361?s=20)
wurde gerade dieser Screenshot zerrissen, weil er die Todsünde vorschlägt, Geldbeträge
als binäre Fließkommazahlen darzustellen (statt als Dezimalzahlen).

## Flink im Geiste: Eat, Sleep, Exercise, Repeat

Nach dieser Exkursion zu den [Frontiers](https://en.wikipedia.org/wiki/Frontier) der
Softwareentwicklung nun zurück zur Kernfrage, was das Softwareentwickeln eigentlich
ausmacht. Die Referenz auf *Eat, Sleep, Exercise, Repeat* war nicht nur anekdotisch
gemeint, sondern gehört auch irgendwie zum Selbstverständnis des Berufes der
Softwareentwickler:in. *Lebenslanges Lernen* setzt man bei den praktizierenden
Informatiker:innen in der Regel voraus, um auf Trends und aktuelle Entwicklungen
Rücksicht zu nehmen. Sowas institutionalisieren wir Entwickler:innen z.B. auch
mit [Coding-Dojos](https://duckduckgo.com/?t=ffab&q=coding+dojo&ia=web). Das
*Exercise* ist also nicht (nur) auf unser körperliches Wohlbefinden gemeint,
sondern auch auf unser geistiges.

*Komplexität* ist der Erzfeind von Entwickler:innen und einer der Tode, die ein
Softwareprojekt sterben kann. Natürlich gehört es zu den wesentlichen Aufgaben bzw.
Kompetenzen von uns als *Denktmitties*, Komplexität zu strukturieren,
organisieren und beherrschbar zu machen. Eine IDE kann dabei eine große Hilfe sein,
vor allem wenn ein *Legacy-Projekt* (also ein Projekt, in dem es viel alten Code
gibt) übernommen wird. Mit viel Erfahrung kann sich eine Entwickler:in dabei auch
eine gewisse *Flinkheit* erhalten, vor allem nachdem eine Einarbeitungszeit
überwunden wurde.

In dieser Einarbeitungszeit geht viel Zeit darauf, herauszufinden welche Aufgabe
bestimmte Code-Abschnitte übernehmen. Eine solche sprichwörtlich »forensische
Studie« (man könnte auch *Leichenschau* sagen, aber das wäre sehr abwertend)
kann bis runter auf die Bedeutung einzelner Code-Zeilen oder Teilen von Zeilen
gehen.

Sehr hilfreich kann es in so einem Zusammenhang sein, einfach einmal Teile von
Code in einer möglicherweise isolierten Umgebung ausführen zu können, um ihre
Wirkung (etwa in Form eines Rückgabewertes) zu untersuchen. Hier kommen wir in
die Welt der *REPLs*, worüber 
[der zugrundeliegende Blogeintrag für Clojure ausführlich spricht](https://vlaaad.github.io/clj-vs-cli).
Besonders bemerkenswert ist ein über diesen Blogeintrag gemachter
[Kommentar auf Hackernews](https://news.ycombinator.com/item?id=27700206):

<blockquote>
There is a significant, qualitative difference between using a language that designed for REPL use and one that isn’t.
<p>Those boundaries you talk of are the crux of the issue. A highly dynamic, completely expression based language is going to enable a much different experience. Homoiconicity also plays an important role here, because you can ispect and parse code within the language, with the same functions and algorithms as everything else.</p>
</blockquote>

Dieser erste Satz ist zu betonen: *Es gibt einen signifikanten qualitativen
Untesrschied dazwischen, eine Sprache zu benutzen, die für die Benutzung
in einer REPL designt wurde und einer die es nicht wurde*.

Beispiele für Sprachen, für die eine REPL primär nicht angedacht war, sind
klassische Programmiersprachen wie Java, C, C++ oder Fortran, aber auch
Scriptsprachen wie Perl oder Ruby bis hin zu JavaScript. Das heißt natürlich
nicht, dass es nicht trotzdem REPLs für diese Sprachen gibt. In jedem Browser
findet sich etwa mittlerweile eine *Entwicklerkonsole*, in der man JavaScript
im Kontext des aktuellen Browserfensters in einer REPL ausführen kann. Auch
für C++ gibt es mittlerweile einen Interpreter
([cling](https://github.com/root-project/cling)) mit einer REPL.

Beide Sprachen sind in ihrer REPL benutzbar, aber nicht besonders gut. Das
liegt eben genau daran, dass die Sprachen nicht zur Benutzung einer REPL
»designt« wurden. Zu dem Design gehört vor allem die frühe Verfügbarkeit
einer REPL und ihrem häufigen Einsatz etwa in Dokumentationen.
Interessant ist an der Stelle auch der Blogartikel
[What makes a good REPL?](http://vvvvalvalval.github.io/posts/what-makes-a-good-repl.html)
Zu den zentralen Punkten gehört etwa, dass eine REPL die Programmiersprache
*zugänglich* macht, in dem sie es erlaubt kleine Bruchstücke gut und
unabhängig testen zu können. Dabei geht es weniger darum, ob die Sprache z.B.
viele mächtige Einzeiler hervorbringt (wie etwa Perl), sondern darum wie die
Libraries (das »Ökosystem«) funktionieren. Gibt es in einer Sprache mit
anwendungsspezifischen Libraries die Möglichkeit, gehaltvolle Einzeiler zu
schreiben? Die REPL steht und fällt mit aussagekräftigen kurzen Statements,
ansonsten verliert sie ihre Praktikabilität.

Ich möchte an dieser Stelle den ebengenannten Blogartikel zitieren:
*What makes a programming language REPL-friendly?* Als Antwort wird
geliefert:

<blockquote>
<ol>
<li><em>Data literals</em>. That is, the values manipulated in the programs have a textual representation which is both readable for humans and executable as code. The most famous form of data literals is the JavaScript object Notation (JSON). Ideally, the programming language should make it idiomatic to write programs in which most of the values can be represented by data literals.
</li>
<li><em>Immutability</em>. When programming in a REPL, you're both holding on to evaluation results and viewing them in a serialized form (text in the output); what's more, since most of the work you're doing is experimental, you want to be able confine the effects of evaluating code (most of the time, to no other effect than showing the result and saving it in memory). This means you'll tend to program with values, not side-effects. As such, programming languages which make it practical to program with immutable data structures are more REPL-friendly.
</li>
<li><em>Top-level definitions</em>. Working at the REPL consists of (re-)defining data and behaviour globally. Some languages provide limited support for this (especially some class-based languages); sometimes they ship with REPLs that 'patch' some additional features to the language for this sole purpose, but in practice this results in an impedance mismatch between the REPL and an existing codebase - you should really be able to seamlessly transfer code from one to the other. More generally, the language should have semantics for re-defining code while the program is running - interactivity should not be an afterthought in language design!
</li>
<li><em>Expressive power</em>. You may think it's a bit silly to mention this one, but it's not a given. For the levels of sophistication we are aiming for, we need our languages to have clear and concise syntax which can express powerful abstractions that we know how to run efficiently, and there is no level of interactivity that can make up for those needs. This is why we don't write most of our programs as Bash scripts.
</li>
</ol>
</blockquote>

*Python* soll als positives Beispiel einer Programmiersprache dienen,
die als REPL-Sprache konzipiert wurde. So wird in der Standardbibliothek der
Kernsprache großer Wert darauf gelegt, dass es für Datenstrukturen sinnvolle textuelle
Repräsentationen gibt. Viele wichtige Libraries nehmen dieses Konzept auf, sodass man
oft die Ausgabe direkt (in die Zwischenablage) kopieren kann und an anderer Stelle
einfügen kann.

## Fazit

Eine REPL kann auch Teil einer IDE sein, die beiden Konzepte schließen sich nicht aus.
Als unabhängiges Tool ist die REPL ein Werkzeug, welches experimentelles und
schnelles Entwickeln unterstützt und dabei eine enge Zusammenarbeit der Entwickler:in
mit dem Code in den Vordergrund rückt. Bewusst habe ich in diesem Artikel nicht die
Ökosysteme um meine sonst gern genannte Programmiersprache *LISP* erwähnt, welche das
Schreiben eines Codes mit seiner Ausführung verschmelzen lassen. Auch habe ich
versucht, nicht wieder das Java-Ökosystem zu zerreißen, wie ich es sonst gerne mache.
Es gibt sicherlich eine Berechtigung für das Schreiben von großen, unübersichtlichen
Codes die sich als Monolith auch nicht einfacher zergliedern lassen, oder von – im
kompletten Gegenteil – einer unüberschaubaren Anzahl von Libraries, deren Zusammenarbeit
sich nicht anders als mit IDEs warten lässt. Meine persönliche Meinung über IDEs vs.
REPLs ist in diesem Text sicher an einigen Stellen durchgescheint, sodass ich mir hier
kein weiteres Urteil erlaube. Mit dem Motto des Textes möchte ich schließen: Vergesst
nicht vor lauter Essen, Trainieren und Wiederholen das Schlafen! :-)
