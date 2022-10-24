---
layout: post
author: Sven Köppel
language: de
description: Sie möchten geschlechtergerecht schreiben. Dieser Artikel zeigt technische Unterstützung und zu überwindende Hürden auf.
title: Gendern im Markup und in Programmiersprachen
related_image: /files/sdm/images/gender-neutral-language-letter-cubes-disply-nonbinary.jpg
header_image: /files/sdm/images/gender-neutral-language-letter-cubes-disply-nonbinary.jpg
header_image_alt: Nahaufnahme von Buchstabenwürfel die das Wort nonbinary formen
header_image_caption: Geschlechtsneutrale Sprache inkludiert alle
header_image_attribution: <a href="https://www.pexels.com/de-de/foto/nahaufnahme-von-buchstabenperlen-3868989/">Sharon McCutcheon</a>, <a href="https://www.pexels.com/de-de/lizenz/">Pexels Lizenz (19.11.2021)</a>, via Pexels
---

[Geschlechtergerechte Sprache](https://de.wikipedia.org/wiki/Geschlechtergerechte_Sprache)
ist in aller Munde. In diesem Blogpost möchte ich die politische Dimension außer Acht lassen
und als gesetzt nehmen, dass in einem (Programmier-)projekt das Gendern von Kund(inn)enseite aus
gewünscht ist. Wie ist damit umzugehen? Welche technische Unterstützung und welche Hürden sind
zu erwarten?

## Eine Momentaufnahme der Internationalisierung und UX

Soziale Strukturen bilden sich in der Software ab, dies ist ein bekanntes
[Anti-Pattern](https://en.wikipedia.org/wiki/Anti-pattern) der Softwareentwicklung. Leider ist
die Männerquote in der IT immer noch
weit über der absoluten Mehrheit. Das zeigt sich in Systemen, die solche Personen schreiben.
Veraltete Libraries sind nicht umbedingt das Problem: So unterstützen
Internationalisiserungs-Bibliotheken wie *gettext* die Sprachgestaltung nicht nur hinsichtlich
Pluralformen, sondern mit *Kontexten* auch hinsichtlich Geschlechtern, vgl. etwa diese
StackOverflow-Frage: [Handling grammatical gender with Gettext](https://stackoverflow.com/questions/6143547/handling-grammatical-gender-with-gettext).
Ein solcher Kontext würde prinzipiell auch nicht-binäre Varianten erlauben. Eine andere
Problematik ergibt sich im User Interfacing (UX): Liberale Positionen sind hier eigentlich
schon lange zur Auffassung gekommen, die Wahl der Anrede (zB. *du*/*sie*, *Herr*/*Frau*, aber auch
*er*/*sie*/*es* bzw. komplett Freiform) der ausfüllenden/anmeldenden Person zu überlassen.
Aus Perspektive einer Softwareschmiede kann man hier nur die Position einer Unternehmensberatung
einnehmen, welche Kund(inn)en darin berät, diese Prinzipien anzuwenden.

## Gendern im Markup-Fließtext

Die eigentliche Problematik beginnt aber beim Umgang mit *User generated Content*, etwa
in seiner freisten Form als Fließtext mit Formatierungsanweisungen (Markup). So habe ich es
vor zwei Jahren einmal bei dem kleinen Zeitungsstartup 
[Perspective Daily](https://perspective-daily.de/) erlebt, welches aus einer progressiven
Autor(innen)schaft bestand, welche seinerzeit das [Gendersternchen](https://de.wikipedia.org/wiki/Gendersternchen)
verwendete --- allerdings in Texten, die mit [Markdown](https://de.wikipedia.org/wiki/Markdown)
ausgezeichnet wurden. Das Ergebnis war technisches Versagen, denn das Sternchen
([Asterisk, ASCII-Zeichen](https://de.wikipedia.org/wiki/Sternchen_(Schriftzeichen)) wird
bei Markdown verwendet, um [Kursivschrift](https://de.wikipedia.org/wiki/Kursivschrift) zu
markieren. Korrekterweise muss die Person, die einen Text in Markdown gendern möchte, dazu
angehalten werden, das Gendersternchen zu [maskieren](https://de.wikipedia.org/wiki/Maskierungszeichen).
Statt ``Programmierer*innen`` müsste die Autorenschaft dann ``Programmierer\*innen``
schreiben, damit es als *Programmierer\*innen* dargestellt wird. Da dies wiederum als der
Autorenschaft nicht zuzumuten galt, habe ich seinerzeit versucht die Problematik zu entschärfen,
in dem ich mit regulären Ausdrücken als Preprocessing das Gendern erkannt und maskiert habe,
hier etwa in Python (siehe [Github Gist](https://gist.github.com/svenk/0e60864a7bbe34a3d3dba07468f67b83)
für weiteren Code):

```
> for x in ["Gender*nnen","foo *bar* baz", "foo *bar*baz", "Und *das* ist wirklich Mensch*nnen *und* toll."]:
>      print(re.sub(r"(^|\s)(\w+)\*([^.\s]*\w+)($|\s)", r"\1\2\*\3\4", x))

Gender\*nnen
foo *bar* baz
foo *bar*baz
Und *das* ist wirklich Mensch\*nnen *und* toll.
```

An den Testbeispielen sieht man, dass der vorgeschlagene reguläre Ausdruck einigermaßen
zu klappen scheint, aber die Praxis lehrt, dass der eine oder andere Randfall dann doch
unberücksichtigt bleibt. Aus Sicht der Programmierenden handelt es sich um ein klassisches
Problem der Kontextwechsel; über dieses Problem hat ein Kollege von mir schon vor über
10 Jahren einen Artikel im Zusammenhang mit SQL-Injections geschrieben, damals noch bei
SELFHTML: [Programmiertechnik/Kontextwechsel](https://wiki.selfhtml.org/wiki/Programmiertechnik/Kontextwechsel).

## Kontextwechsel und Orthogonalität als grundlegendes Problem in der angewandten Informatik

Die Grundproblematik ist also, dass eine Markupsprache wie Markdown davon ausgeht, dass
der Asterisk (also das Sternchen) im Fließtext selten vorkommt. Nur mit dieser Annahme
ist es sinnvoll, den Asterisk als Markup-Zeichen zu verwenden. Das zugrundeliegende
Konzept kann auch mit der [Orthogonalität](https://de.wikipedia.org/wiki/Orthogonalit%C3%A4t_(Informatik))
in der Informatik verglichen werden: Markup-Sprache und zugrundeliegende Sprache stehen
orthogonal aufeinander, weil sie wenig gemeinsame Zeichen teilen. Steueranweisungen und
menschliche Sprache stehen orthogonal aufeinander. Es gibt hier natürlich eine einfache
Lösung, etwa den Wechsel der Auszeichnungssprache, z.B. von Markdown zu
[reStructuredText](https://docutils.sourceforge.io/docs/user/rst/cheatsheet.html) oder
etwa dem [MediaWiki-Markup](https://www.mediawiki.org/wiki/Help:Formatting), in welchem
Kursiv- und Dickschrift mit ``''einfachen'' Anführungsstrichen`` ausgezeichnet werden.
Generell sind diese Markupschriften als vereinfachte Formen von Sprachen wie
[HTML](https://en.wikipedia.org/wiki/HTML) oder XML entstanden, welches den Kontextwechsel
stets mit eckigen Klammern vornimmt. Grundsätzlich lässt sich Markup nicht losgelöst
vom Inhalt betrachten. Eine solche Kodierung lässt sich nur ermöglichen, wenn man
maschinennähere Textrepräsentationen erwägt, bei welchen es keine Vermischung mehr
von Inhalt und Formatierungsanweisungen gibt. Im Grunde genommen sind Benutzer:innen
derartiges von [Wortprozessoren](https://en.wikipedia.org/wiki/Word_processor)
gewohnt, die von der internen Textrepräsentation abstrahieren und ein
*WYSIWYG*-Interface anbieten, was kurz steht für *What You See Is What You Get*.

Solche *WYSIWYG*-Benutzerschnittstellen haben in den letzten Jahren etwas an Boden
verloren. Der schnelle technische Fortschritt hat da sicher beigetragen, Anforderungen
haben sich mehr an den Entwickeldnen als an den Benutzenden orientiert. Das kleine
Zeitungs-Startup, von dem ich oben schrieb, verwendete eine Markupsprache, damit sie
ihr Zeitungsportal schneller "gelauncht" bekamen. Und soziale Netzwerke wie Twitter
verwenden Markup --- und dazu zählt konzeptionell auch der berühmte 
[Hashtag](https://de.wikipedia.org/wiki/Hashtag) --- vermascht mit anderem
[Plaintext](https://de.wikipedia.org/wiki/Plain_text) zwecks schneller Bearbeitung
von Tweets. Eine Notiz hier nur am Rande: Tatsächlich wurden Hashtags von den Benutzenden
der Plattform selbst erfunden und eingeführt, die Plattform hat sich diese erfolgreiche
Technik letztlich zu eigen gemacht. Diese Erfindung wäre nicht anders als mit einer
Auszeichnungssprache, die "ontop" des menschlichen Textes erfunden wurde, möglich gewesen,
da Benutzende nicht in die Programmierung der proprietären Anwendung eingreifen können.

## Doppelpunkt, Auslassungszeichen oder Sternchen?

Vor dem dargelegten Hintergrund von Vermaschung konstruierter (technischer)
Programmiersprache und menschlicher Sprache ist es doch seltsam, dass der Doppelpunkt
als Genderzeichen (wie in ``Programmierer:innen``) eingeführt wurde, just um technischen
Limitationen zu umgehen: Es wurde nämlich beobachtet, dass der Doppelpunkt von
[Sprachsyntheseprogrammen (Text-to-Speech)](https://de.wikipedia.org/wiki/Plain_text)
zu einer kurzen Pause führte, welcher ähnlich wie der
[Glottisschlag](https://de.wikipedia.org/wiki/Glottaler_Plosiv) interpretiert wurde.
Es dauert nicht lange, um Beispiele zu finden, wo der Doppelpunkt hingegen wieder
negativ mit der Technik interferiert, etwa innerhalb der verbreiteten
Auszeichnungssprache [YAML](https://de.wikipedia.org/wiki/YAML), in der es (angelehnt
an viele Programmiersprachen) zur Trennung von Schlüssel und Wert bei der Definition
einer Tabelle/Abbildung/Dictionary dient. Die Lösung ist hier, da ein strukturgebender
Kontext vorliegt, allerdings einfacher, da der Wert (Textstring) einfach durch
Anführungsstriche maskiert wird. Aus ``schlüssel:wert`` kann nämlich equivalent
``"schlüssel":"wert"`` werden, sodass ``"Programmierer:innen sind":"auch Anwender:innen"``
valides YAML ist.

So entsteht eine kleine Matrix, welche Genderform mit welcher Markupsprache einfach
zu benutzen ("kompatibel") ist:

|Paarform | Markdown | RST | LaTeX  | HTML   | YAML |
      --- |     ---  | ---              | ---    | ---    | ----
|``Lehrer(innen)``| ✅ | ✅  | ✅ | ✅ | ✅ |
|``Lehrerinnen/Lehrer`` | ✅ | ✅  | 🟡 (Quirky) | ✅ | ✅ |
|``Lehrer*innen``| ❌ | ✅  | ✅ | ✅ | ✅ |
|``Lehrer_innen``| ✅ | ✅  | ❌ | ✅ | ✅ |
|``Lehrer:innen``| ✅ | ✅  | ✅ | ✅ | ❌ |
{: .table }

Die Tabelle zeigt, dass manche Sprachen wie *reStructuredText* (RST) oder HTML mit fast
jeder Variante klarkommen, wohingegen es in anderen Sprachen häufig Probleme gibt, die
eine Maskierung (Escaping) nötig machen. Nur die in natürlichen Sprachen recht häufigen
runden Klammern stellen in keiner der verglichenen Sprachen ein Problem dar.


## Abgünde des Parsings

Die Probleme mit Markierungszeichen für Sprachformen gehen aber über bloße Darstellungsfehler
hinaus:
Das Gendern von Texten kann die AnwenderInnen zur regelrechten
Verzweiflung bringen. Das Zeitungs-Startup benutzte intern auch das freie Textsatzprogramm
[LaTeX](https://de.wikipedia.org/wiki/LaTeX). LaTeX ist heute der defakto-Standard zum
Schreiben von wissenschaftlichen Aufsätzen, vor allem in dem naturwissenschaftlich-technischen
Bereich. Es ist außerdem Defakto-Standard für die Repräsentation von komplizierten
mathematischen Formeln sowie ihrer Darstellung (Rendering). Latex-Code ist auf dem
Kontinuum zwischen Programmiersprachen und Markup-Sprachen noch ein Stück näher an der
Maschine, als es vielleicht YAML ist. Im Grunde genommen ist ein Latex-Code ein ausführbares
Computerprogramm, welches von dem Interpreter in eine andere Darstellung, etwa ein
PDF-Dokument umgewandelt ist. Es ist damit mit der Seitenbeschreibungssprache
[Postscript](https://en.wikipedia.org/wiki/PostScript) vergleichbar, die wiederum die
Grundlage für das PDF-Format darstellt. An dieser Stelle möchte ich gerne das [Hello-World-Beispiel
über Postscript aus Wikipedia](https://en.wikipedia.org/wiki/PostScript#%22Hello_world%22)
zitieren:

```
 %!PS
 /Courier
 20 selectfont
 72 500 moveto
 (Hello world!) show
 showpage
```

Dieser Code liest sich wie ein Buch zeile für zeile von links nach rechts. Postscript ist
eine stackorientierte Programmiersprache, weswegen zunächst alle erwähnten Dinge auf einen
virtuellen "Stapel" gelegt werden, wo sie von Anweisungen, die Postscript versteht, dann
"heruntergeholt" werden. So landet auch die Zeichenkette ``Hello world!`` auf dem Stapel,
ehe sie von ``show`` zur Anzeige gebracht wird. Wieder haben wir es mit einem Escape-Problem
zu tun, es wäre gar nicht einfach ``Hello (cruel) world`` zu schreiben, ohne mit den runden
Klammern von Postscript ins Gehege zu kommen. Der binäre Zugang, der allerdings in keiner
praktikablen Programmiersprache gewählt wird, wäre an so einer Stelle im Übrigen die
Definition des Strings als *fixed length string*, sodass der String selber von keinem
Compiler auf Escape-Sequenzen interpretiert werden muss. Auf diese Weise funktionieren die
allermeisten Netzwerkprotokolle und auch die meisten Stringinterpretationen auf Maschinenebene.
Wer sich darüber etwas informieren möchte, findet mit der
[Abstract Syntax Notation One (ASN.1)](https://en.wikipedia.org/wiki/ASN.1) einen guten
Startpunkt.

Was passiert nun, wenn man bei Latex mit Unterstrich gendert? Probieren wir es mit einem
[minimally](http://tug.ctan.org/info/dickimaw/dickimaw-minexample.pdf)
not [working example](https://tex.meta.stackexchange.com/questions/228/ive-just-been-asked-to-write-a-minimal-working-example-mwe-what-is-that)
aus:

```
\documentclass{article}
\begin{document}
DenktMit Programmier_innen sind Gött_innen in schwarz.
\end{document}
```

Dieses Dokument mit ``pdflatex`` kompliert gibt bei mir folgende Ausgabe:

```
sven@localhost /tmp/foo % pdflatex gender.tex
This is pdfTeX, Version 3.14159265-2.6-1.40.21 (TeX Live 2020/Arch Linux) (preloaded format=pdflatex)
 restricted \write18 enabled.
entering extended mode
(./gender.txt
LaTeX2e <2020-10-01> patch level 2
L3 programming layer <2020-12-03> xparse <2020-03-03>
(/usr/share/texmf-dist/tex/latex/base/article.cls
Document Class: article 2020/04/10 v1.4m Standard LaTeX document class
(/usr/share/texmf-dist/tex/latex/base/size10.clo))
(/usr/share/texmf-dist/tex/latex/l3backend/l3backend-pdftex.def)
No file gender.aux.
! Missing $ inserted.
<inserted text> 
                $
l.3 DenktMit Programmier_
                         innen sind Gött_innen in schwarz.
? 
```

PDFLatex ist abgestürzt. Das tut es bei Syntaxfehlern immer, und hier liegt ein
solcher Syntaxfehler vor. Der Unterstrich ist ein
[reserviertes Zeichen](http://latexref.xyz/Reserved-characters.html) und
damit Teil der Menge ``# $ % & { } _ ~ ^ \ ``. Latex ist eine alte Software mit
vielen *Quirks*, man sagt nur Latex könne Latex parsen. Je nach Kontext ist der
Unterstrich doch wieder zulässig, etwa in einer Mathematikumgebung (die ihrerseits
mit einem Dollarzeichen ``$`` eingeleitet wird), oder in einer URL (aber
nur, wenn [Hyperref](https://ctan.org/pkg/hyperref) das richtig versteht).
Sobald ein Texcode geringfügig komplizierter wird als das hier gezeigte,
sind die Fehlermeldungen schnell kryptisch und die Fehlerursachen nicht mehr
so schnell zu finden, wenn man nicht ein paar Jahre Latex-Erfahrung angesammelt
hat. Wo Markdown einfach still und "resistent" ein Markup erstellt, welches so
nicht gedacht war, stoppt Latex die Ausführung komplett. Für Benutzende ist
das frustrierend.

## Quo vadis, Programmiersprache?

Eine Programmiersprache, die sich an den Bedürfnissen der echten Sprache anpasst,
ist mir bislang noch nicht begegnet. Es ist eher ein Trial-and-Error, ein
gegenseitiges Austarieren zwischen wirtschaftlichem Einsatz von programmierenden
und benutzendem Personal. Immerhin haben Sprachdebatten und Neuentwicklungen bei
Programmiersprachen eine Gemeinsamkeit: Beide sind geführt vom Geist der
Veränderung. Sprache, egal ob natürlich oder künstlich, ist ein menschgemachtes
Konstrukt und ein Konsens. Als Entwickler maße ich es mir nicht an, über den
Inhalt meiner datenverarbeitenden Systeme zu werten.

## Disclaimer

Zuguterletzt gebe ich doch noch meine Meinung zu diesem strittigen Thema ab.
Sie ist wahrscheinlich auch schon hier und da durchgeblitzt. Als typischer
"alter weißer Mann" und Partner und Vater von Frau(en) versuche ich, mir die systemische
Geschlechterdiskriminierung (etwa gegenüber Frauen) und meine "Vormachtposition"
gelegentlich zu vergegenwärtigen. Ich lehne das generische Maskulinum ab
und halte das "Genus vs. Sexus"-Argument für einen Vorwand, sich mit der
sprachlichen und gesellschaftlichen Wirklichkeit nicht auseinandersetzen zu müssen.
Ich experimentiere gerne gleichermaßen mit Programmiersprachen und mit natürlicher
Sprache. Da ich mir wünschen würde, dass ich etwa vom deutschen Staat 
nicht mit meinem Geschlecht angesprochen werde, halte ich in diesen Zusammenhängen
eine Sprachvorschrift in Behörden oder Firmen für angemessen. Leider argumentieren
sowohl Befürworter:innen als auch Gegner_innen sehr offensiv und extrem, an einem
Konsens ist oft wenig Interesse. Mehr gemäßigte Mitte und Empathie würde der
Debattenkultur gut tun.
