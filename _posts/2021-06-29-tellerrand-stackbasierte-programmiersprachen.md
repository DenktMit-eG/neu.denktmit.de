---
layout: post
author: Sven Köppel
language: de
description: Hard- und Firmware Entwickler nutzen öfter stackbasierten Programmiersprachen. Dieser Blick über den Tellerrand gibt eine Einführung ins Paradigma.  
title: "Der Blick über den Tellerrand, Volume 1: Stackbasierte Programmiersprachen"
related_image: /files/sdm/images/step-by-step-illustration-of-a-lifo-stack.png
header_image: /files/sdm/images/step-by-step-illustration-of-a-lifo-stack.png
header_image_alt: Schrittweise Illustration des Zustands eines LIFO Stacks nach einzelnen pushes und pops
header_image_caption: Push und Pop auf dem LIFO stack
header_image_attribution: <a href="https://commons.wikimedia.org/wiki/File:Lifo_stack.png">Maxtremus</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>, via Wikimedia Commons
---

Dieser Artikel ist Teil einer neuen Serie von Blogartikeln, die ich über
*Programmierparadigmen* schreiben möchte. Sie sollen dazu anregen, einen 
sprichwörtlichen *Blick über den Tellerrand* zu wagen: Raus aus den eigenen Strick-
und Entwurfsmustern für Software, den gewohnten Trampelpfaden der Programmiersprache,
die man für Projekte seit Jahren, vielleicht Jahrzehnten verwendet. Dazu folgt zunächst einmal
eine Einordnung, wie dieser Trampelpfad für die allermeisten von uns aussieht.

## Unser Trampelpfad ist multiparadigmenfähig

Die prototypische moderne Programmiersprache ist gar nicht so dogmatisch, wie man meinen
könnte. Wer heute eine Software schreibt, tut dies meistens in einer Sprache, die mindestens
drei Programmierparadigmen ihr eigen nennt:

1. *Imperatives Programmieren*: Der Programmcode ist eine sequentielle Anordnung von
   Befehlen, die der Computer abarbeitet. Dabei gibt es in der Regel das Konzept von
   *Variablen* im Sinne von Speicherplätzen, mit denen gearbeitet wird. Durch *Subroutinen*
   wird das Programm strukturiert, zu denen gesprungen werden kann. Beliebige Sprungstellen
   ([Goto considered harmful](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf))
   gibt es seit vielen Jahrzehnten nicht mehr in modernen Programmiersprachen.
2. *Objektorientiertes Programmieren*: Datenstrukturen werden mit zugehörigen Subroutinen
   in Form von *Klassen* organisiert. Mit den originären Konzepten vom objektorientierten
   Programmieren (*Message Passing*) hat der Defacto-Standard nicht mehr viel zu tun: Wir
   sind Polymorphie, Typisierung und Reflektion gewohnt. Konzepte wie protypenbasierte
   Klassen, wie sie in JavaScript vorkommen, sind in den verbreiteten "echten" Programmiersprachen
   (das muss an der Stelle so sarkastisch und unkommentiert stehen bleiben) nicht verbreitet.
3. *Funktionales Programmieren*: Anonyme Funktionen (Lambdas) und Funktionen als Objekte
   erlauben es auch, funktionale Aspekte in moderne Programme einzubringen. So lassen sich
   Callbacks, verkettete Funktionsaufrufe, Map/Reduce oder rekursive Algorithmen einfach
   umsetzen. Aus der Welt der funktionalen Programmierung haben wir auch Dinge wie Closures,
   Funktoren, unveränderliche (immutable) Datentypen geerbt.

Ausnahmslos alle populären Programmiersprachen, die man heute vorfindet, folgen diesem Muster.
Lohnt es sich dann überhaupt, etwas anderes zu lernen? Das mentale Programmiermodell muss ja
eigentlich nur ein paar dieser Paradigmen verstehen, um mit Programmcode zurecht zu kommen.
Zunächst also zur Frage: Was ist eigentlich ein Paradigma?

## Zum Programmierparadigma: Eine Denkschule und Rechnerabstraktion

Wer Programmierparadigma verstehen will, der muss ihre historische Entwicklung verfolgen. Sie
war stets eine Abfolge von technischen Möglichkeiten und Anwendungsnötigkeiten. Wer sich auf
die Geschichte von Programmiersprachen macht, entdeckt etwa die berühmte
[Softwarekrise](https://de.wikipedia.org/wiki/Softwarekrise) der 1960er-Jahre, als das erste
mal auf großen Skalen die Komplexität von Software ihre Entwickler:innen blockierte.

In den 1960er-Jahren gab es die ersten *Hochsprachen*, welche die Programmierung von Computern
auf einem abstrakteren Level als mittels Maschinenbefehlen (Assemblerinstruktionen) erlaubten.
In Anbetracht der wenigen Kilobyte von Speicher, über die die Digitalrechner dieser Zeit verfügten,
mutet es doch als ziemlicher Luxus an, diesen Speicher nicht mehr direkt anzusprechen, sondern mit ihm
indirekt zu agieren und einen Compiler die Abbildung des Programmcodes auf die tatsächliche
Maschine durchführen zu lassen. Daran hat sich in den letzten 70 Jahren vergleichsweise wenig
geändert: Auch moderner Code wird zu Maschinencode kompiliert. Die Aufgabe des Compilers ist es
also stets, ein abstrakteres Rechenmodell, welches die Entwickelnden im Kopf haben, auf die echte
*Registermaschine* mit ihren physischen Bausteinen wie CPU-Registern, Arbeitsspeicher oder
nicht-flüchtigem Speicher (traditionell der Festplattenspeicher, heute SSDs) abzubilden. Eine
Aufgabe von *Libraries* ist es, Computerressourcen zu abstrahieren und darüberhinaus also auch
etwa den Zugang zu Speicher- und Netzwerkressourcen in eine sprachliche Form zu bringen, welche
den Entwickelnden erlaubt darauf in geeigneter Form zuzugreifen – also in der Regel vor allem
unkompliziert, mit wenigen Anweisungen und die Komplexität und Verschiedenheit der technischen
Implementierung versteckend. Noch weiter gehen *Frameworks*, die sich von *Libraries* vor allem
darin unterscheiden, dass sie in der Regel den Programmfluss übernehmen und so eine *Inversion
der Kontrolle* zur Folge haben. Das Framework erlaubt so die besonders schnelle und
gleichartige Entwicklung von Standardsoftware nach einem Muster.

Die Gesamtheit von Frameworks, Libraries, Programmiersprachen und *Build-Systemen*, welche den
damit geschriebenen Code zu etwas Ausführbarem umwandeln, führt zu einer Art gedanklichem
Korsett. Das ist keineswegs ausschließlich so negativ gemeint, wie der Begriff meint: Das
*Tooling* stellt sich als eine effektive Methode heraus, gewisse Probleme zu bearbeiten.

Ein typisches Beispiel ist der bahnbrechende Erfolg, den 
[jQuery](https://de.wikipedia.org/wiki/JQuery) zu seiner Entstehungszeit ca. 2006 herum hatte.
Es ist wahrscheinlich nicht untertrieben, diese Library als einen Motor des
[Web 2.0](https://de.wikipedia.org/wiki/Web_2.0) zu bezeichnen. Die Library ermöglichte es,
auf Webseiten typische interaktive Tätigkeiten (z.B. einen Button einzublenden oder einen
Inhalt nachzuladen) in nur wenigen Zeichen Code zu implementieren. Dieser lief fortan auf einer
Großzahl der damals sehr verschiedenen Browser zuverlässig. Die Library bot also nicht nur
eine Abstraktionsstufe zu den Browser-Schnittstellen (Application Interfaces, kurz APIs) 
dieser Zeit, sondern durch ihr objektorientiert-funktionales Programmiermodell, das
querybasierte Arbeiten mit einer *Selektorengine* (welche das DOM-Parsing durch 
CSS-artige Queries erlaubte) und das *Method Chaining* auch eine Möglichkeit sehr prägnanten
Code zu schreiben. Durch die höhere Abstraktionsstufe fiel die mentale Last für Entwickelnde
und komplexere Webanwendungen waren möglich: Es war die Geburtsstunde des *Web 2.0* mit seiner
erhöhten Interaktivität und neuen Anwendungsmodellen, die etwa *User-Generated Content* in
den Vordergrund stellten.

Solche Paradigma sind immer auch *Denktschulen*, weil eine ganze Generation von Entwickelnden
erstmalig nicht mehr mit der vorangegangenen Art, Software zu entwickeln, konfrontiert wird,
sondern nur noch mit der neuen, abstrakteren Art. Ich habe das Beispiel *jQuery* bewusst
gewählt, weil es nun schon 15 Jahre alt ist und tatsächlich mehrere »Entwicklergenerationen«
zurück liegt! Danach kamen noch viel mehr Abstraktionsstufen, die Konzepte wie Virtual DOM,
double data binding, »Reaktivität« und vieles mehr einführten. Die junge Generation von
Entwickelnden kennt daher nur noch begrenzt den Mehrwert von »einfachen« Libraries wie jQuery.
Ihnen fehlt letztlich ein älteres Programmierparadigma, welches sie nur in den Geschichtsbüchern
nachschlagen können.

Doch der Blick lohnt sich: Verschiedene Paradigma sind zur Lösung verschiedener Probleme
geeignet. Auch heute noch gibt es Webseiten, die besser *statisch* als *dynamisch* geschrieben
werden, wo andere Zugänge als die abstrakteren unserer Zeit sich also besser eignen. Genauso
sieht es auch mit anderen Bereichen der Softwaretechnik aus, wo weniger Abstraktion hilfreich
ist. Man denke an den immerwährenden »Kampf« von *interpretiertem* Programmcode zu solchem,
der *kompiliert* wird. Diese Unterscheidung bezeichnet traditionell die Grenze zwischen
einfachen *Scriptsprachen* und komplexeren *Programmiersprachen*. Hier gilt die klassische
Weisheit, dass es für jedes Problem das richtige Werkzeug gibt und mehr Abstraktion, wie sie
die interpretierten Scripte einführen, nicht immer hilfreich ist.

## Here to be dragons: In die Welt der Stacks

Tauchen wir also ein in unseren ersten Blick über den Tellerrand: In die Welt der
*stackorientierten Programmiersprachen*. Jeder, der sich schon einmal mit den Programmiersprachen
C oder C++ beschäftigt hat, kennt die Unterscheidung von *Stack* (engl. Stapel) zu *Heap*
(engl. Haufen): Während der *Stack* typischerweise den Zustand des Programmflusses
speichert ([Aufrufstapel](https://de.wikipedia.org/wiki/Aufrufstapel)) und geeignet ist,
eine endliche und überschaubare Menge von temporären und in ihrer Größe vorhersagbaren Variablen
zu speichern, ist der *Heap* eher für eine große Menge von dynamischen Daten geeignete, die
zur Laufzeit [alloziiert](https://de.wikipedia.org/wiki/Allokation_(Informatik)) werden.
Diese dynamischen Datentypen werden in der Regel über *Pointer* miteinander verknüpft, welche
die eigentliche Dynamik ermöglichen. Gleichzeitig ist die Traversierung solcher Datenstrukturen
langsamer, da eben diese Pointer aufgelöst werden müssen, um die Speicheradressen der
angesprochenen Datenstrukturen herauszufinden. Performanceorientierte Entwickler:innen die
maschinennah arbeiten, versuchen daher oft, dynamische Datenstrukturen auf dem Heap zu vermeiden
und auf dem Stack zu arbeiten, denn ein Sprichwort sagt, der *Stack ist immer warm*, befindet
sich also wegen vielen Aufrufen/Sprüngen stets im Prozessorcache.

Tatsächlich ist diese Einführung in die Stacks leider nur begrenzt hilfreich, um stackorientiertes
Programmieren zu lernen. Wer in einer stackorientierten Programmiersprache arbeitet, dem stellen
sich solche Fragen nämlich gar nicht, da es dort eigentlich *nur* einen Stack gibt und sonst
gar nichts. Sie war eher zur Einordnung gedacht, als Brücke in die Welt der *Stackmaschinen*

## Stackmaschinen, Forth und Real Life-Anwendungen?

Viele Programmierparadigmen wurden im ausgehenden 20. Jahrhundert erfunden und waren in ihrer
Zeit prohibitiv aufwändig zu implementieren oder benötigten ein ganz anderes physisches
Rechenmodell. So ähnlich ist es auch bei den 
[Stackmaschinen](https://en.wikipedia.org/wiki/Stack_machine), die als abstraktes Rechnermodell
ähnlich zu den (uns viel geläufigeren) Registermaschinen oder der mathematisch abstrakten
Turingmaschine arbeiten.

Eine recht populäre Stackprogrammiersprache ist
[Forth](https://en.wikipedia.org/wiki/Forth_(programming_language)). Die verlinkte Wikipedia-Seite
beinhaltet viele Beispiele, wie eine Programmierung mit so einer Sprache aussieht. Solche
Beispiele beschränken sich in der Regel auf gänzlich grundlegende Rechenoperationen, etwa
die Implementierung von arithmetischen Operationen (Grundrechenarten auf Zahlen oder Objekten
der linearen Algebra). Der exotische Beitrag entsteht noch durch Nutzung etwa der
*Reverse Polish Notation* (daran kann man sich gewöhnen), es sieht schlicht und ergreifend
alles komplett anders aus als in einem gewöhnlichen Programm einer heutzutage verbreiteten
Programmiersprache. Wie macht man damit etwas komplizierteres?

Nun, zum einen gibt es natürlich auch hier die Möglichkeit Programme in Subroutinen zu 
organisieren. So gibt es letztlich auch Libraries und Frameworks, z.B.
[das Webframework »1991« für Forth](http://www.1-9-9-1.com/) welches mit seinem Democode doch
eigentlich ganz familiär aussieht für jeden, der Webframeworks kennt:

```
\ Load 1991.
include 1991.fs

\ Define our route handlers.
: handle-/ ( -- addr u )
    \ Any string returned by the handler
    \ will be output to the browser.
    s" Hello, 1991." ;

\ Set up our routes.
/1991 / handle-/

\ Start the server on port 8080.
8080 1991:
```

Auf der Seite des Frameworks finden sich viele Beispiele, wie auch Templateverarbeitung mit
Forth funktionieren kann. Dieser Anwendungsfall zeigt, dass man mit stackorientierten Sprachen
auch »from first Principles« komplexe Anwendungen schreiben kann. Wem dieses Beispiel gefällt
und wer etwas in der Forth-Welt stöbern möchte, kann sich die
[zugehörige Hackernews-Diskussion](https://news.ycombinator.com/item?id=19146767) einmal
anschauen.

Darüber stößt man auch schnell auf andere stackorientierte Sprachen, z.B. die
[Kitten Programming Language](http://kittenlang.org/) welche starke Typisierung mitbringt.
Die Programmierung dieser Sprache sieht überhaupt nicht mehr so sehr nach stackorientiert
aus, sondern bereits ziemlich High-Level. Tatsächlich ist das eine der großen Stärken der 
stackorientierten Welt, dass man mit dem Maschinenmodell leicht große Abstraktionen hinbekommen
kann. So basiert zB. auch die berühmte *embedded Scriptingsprache* 
[Lua](https://www.lua.org/) auf einem Stackmaschinenmodell bzw. auf einer stackorientierten
Programmiersprache, obwohl Lua eine moderne Multiparadigmensprache ist.

Zuguterletzt hier noch einige Materialien für die Leserschaft, die sich weiter am Beispiel von
Forth in der Welt der stackorientierten Sprachen erkundigen möchte: Es gibt eine jährliche
[europäische Forth-Konferenz](http://www.complang.tuwien.ac.at/anton/euroforth/), eine
[Liste von Forth-Webseiten](https://www.forth.com/resources/forth-web-sites/) oder zB.
eine [wissenschaftliche Forth-Library](https://www.taygeta.com/fsl/sciforth.html). Ich denke
die Materialien zeigen, dass Forth weit weg davon ist, in den Programmiereralltag Einklang
zu finden. Wer Forth nur eine Chance geben will, wenn seine IDE eine Unterstützung dafür
bereithält, wird schnell aufgeben müssen. Wo stackorientierte Modelle aber durchaus lebendig
sind, ist sowohl in der Hardware- und Firmware-Szene (hauptsächlich dank ihrer geringen
Anforderungen an die Compiler- und Laufzeitinfrastruktur) sowie als eingebettete Systeme
in größere Anwendungen. Es gibt eine ganz wunderbare Diskussion dazu auf Stack Overflow,
mit der ich hier schließen möchte:
[Forth Interpreter in Java – Will it be efficient?](https://stackoverflow.com/questions/1415910/forth-interpreter-in-java)


