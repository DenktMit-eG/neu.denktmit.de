---
title: "Python ist das BASIC des 21. Jahrhunderts"
layout: post
author: Sven Köppel
language: de
related_image: /assets/blog/2022-04-06-Python.jpg
header_image: /assets/blog/2022-04-06-Python.jpg
header_image_caption: 'A Python: <a href="https://www.flickr.com/photos/michaelransburg/4587016629/in/photolist-7ZkEeB-3oFhn-JRvpw-7Zp8H5-2iTQPtd-2kz86qV-GNtTsG-BGANsT-BEimEY-BnKAa1-ASnc55-BEijpW-BPTuTH-KTMCBL-q7vUfC-63ouQ2-9WTmn4-tucHHL-2gwVBaR-2miJrUb-nUhijp-BGAQne-obMGyp-8mZd64-Bpb9fj-uU4GEL-cDwBE9-35WUU6-HPmB7i-2vqaDs-7ruyxC-6cpoWe-bU5J1k-ES99j-bU5Hkx-bFaY6C-4iE3sp-gthaxj-V3RZ1v-YAuiAz-BG2ywh-6VCiw9-9y8ckL-5juXfB-5juXzi-7wZFN6-5xn8Vp-2142w5R-bzc45S-3L3z39">CC-licensed by Michael Ransburg, Flickr</a>'
---

Viele Menschen lästern gerne. Gerade im Berufsleben ist das eine willkommene Ablenkung,
und kaum ein Lästerthema ist so harmlos und sagt doch so viel aus wie *Programmiersprachen*.
Es ist überhaupt eine der liebsten Pausenbeschäftigungen von Programmierer:innen, über
ihre täglichen Sprachen zu philosophieren. Ganz hervorragend kann man damit die eigene
Überlegenheit demonstrieren und die Anhängerschaft unliebsamer Sprachen degradieren.

## Allgemeinplätze allenthalben

Bei Programmiersprachen geht es manchmal um Trivialitäten wie Semikolons, die Position
von Klammern oder Namenskonventionen. Oder es geht um die Art der *Objektorientierung*
(OOP), die eine Sprache umsetzt. Dieser Begriff trendete eigentlich in den 1990er-Jahren,
als die ersten Hochsprachen mit OOP trendeten und das Konzept gerade aus der Programmierung
grafischer Benutzerschnittstellen (GUIs) aus den Kinderschuhen entwuchs. In diese Phase
fällt der 1994er-Designklassiker der [Gang of Four](https://de.wikipedia.org/wiki/Entwurfsmuster_(Buch)).
Wer heute Advokat für starke typisierte Programmiersprachen ist, hat entweder 30 Jahre lang
geschlafen oder will mit seiner akademischen Ausbildung prahlen. Denn was in den Lehrbüchern
nach einer tollen Idee klingt, muss es in der Praxis noch lange nicht sein. Schöne Beispiele
für solche Extreme ist *LISP*, einer der Väter funktionaler Programmiersprachen
(gerne auch in Form seines Urenkels *Haskell* genommen) oder
die objektorientierte, stark typisierte Programmiersprache *Java*. Während funktionale
Programmierung seit Jahrzehnten im Ausbildungsbetrieb und akademischen Umfeld Erfolge feiert,
ist Java berühmt-berüchtigt für seinen Einsatz im "Enterprise"-Umfeld, und gehasst für seine
Ausführlichkeit, seinen "Boilerplate".

Doch die Zeit ist nicht stehengeblieben. Multiparadigmensprachen, einst erwachsen aus dem
Scriptumfeld, sind seit Jahrzehnten in der Praxis angekommen und werden auch auf
"Enterprise"-Plattformen wie der Java Virtual Machine (JVM) akzeptiert. In der Genossenschaft
ist hier zum Beispiel *Kotlin* sehr populär. Die Übergänge zwischen untypisiertem Script
und "eventually typed" Enterprise-Programming sind hier fließend.

Doch damit genug zu den Allgemeinplätzen.

## BASIC, die Lingua Franca der 70er und 80er-Jahre

Lange bevor die meisten der Mitglieder der Genossenschaft geboren waren, gab es eine
erfolgreiche Hochsprache, die noch auf die Zeit vor den Mikrocomputern zurückdatiert.
Die Rede ist von *BASIC*, der Sprache die durch ihre *GOTO*-Befehle und nummerierten Zeilen
berühmt geworden ist. BASIC hatte eine unglaublich niedrige Einstiegshürde, jeder konnte
damit loslegen, es war auch die Sprache der Wahl um Computern Kindern näher zu bringen.
Ein Basic-Interpreter passt in wenige Kilobyte und war auch später Teil von vielen
DOS-Distributionen früher PC-Heimsysteme oder gar kleinerer Computer.

Und hier kommt mein "bold Statement", meine gar nicht so kühne Behauptung: **Python ist das
BASIC unserer Tage**. Tatsächlich ist kaum eine Scriptsprache heute so verbreitet wie
Python. Quer durch die Kompetenzbereiche, wie Umfragen von [Stackoverflow](https://insights.stackoverflow.com/survey/2021)
oder dem [Chaos Computer Club](https://arxiv.org/pdf/2203.12466.pdf) zeigen, ist Python
die am häufigsten verwendete Programmiersprache. Wie jede erfolgreiche Sprache scheiden sich
die Geister an seinen Designentscheidungen, etwa der Strukturierung durch Einrückung,
dem Ducktyping, dem Umgang mit Namensräumen und Modulen. Das Erfolgsrezept zum Start von
Pythons Aufstieg ist eine Kombination von einfacher Syntax und der großen Standardbibliothek
("Batteries Included"). Mittlerweile gibt es auch in Python viele langsame und große
Legacy-Codes, die unter ihrer schlechten Struktur ächtzen. Aber wie jede große Programmiersprache
wurde auch Python weiterentwickelt, verfügt mittlerweile über ein algebraisches Typensystem
welches nachträgliche Typisierung ("Evventual Typing") ermöglicht. Und wie jede große Sprache
hat es eine Achillesferse, die ihren Erfolg bedroht: Bei Python vor allem die Ausführungsgeschwindigkeit,
die fehlende Multithreading-Fähigkeit (der berühmt-berüchtigte *Global Interpreter Lock*),
die [Installations-Routine](https://xkcd.com/1987/).

## Der Fluch von Legacy und Personal

Eine Community, der ich angehaftet bin und die stark auf Python setzt(e), ist die des wissenschaftlichen
Rechnens. Python hat es durch jahrzehntelange Arbeit einer globalen Community aus Wissenschaftler:innen
geschafft, Profi-Frameworks wie *Matlab* die Pfründe zu stehlen. Moderne Biotechnologie-Codes
entstehen nicht mehr in Matlab, sondern in Python, auf Open Source. Python dient dabei in der
Regel als *Glue Language*, um effizientem Code (der etwa in C++ geschrieben ist) eine benutzerfreundliche
und vor allem einfache API vorzusetzen. Seine wir ehrlich, dabei geht es vor allem darum,
Typisierungs-Boilerplate zu verhindern und die Syntax aufzuhübschen.

Natürlich dreht die Zeit sich aber weiter. So gibt es zum Beispiel die Programmiersprache
[Julia](https://julialang.org/), die in jenem wissenschaftlichen Umfeld als bewusster "Nachfolger"
von Python auftritt und viele "Shortcomings" von Python überwindet. Auf einmal sieht sich eine neue Generation
von Programmierer:innen dem Problem von Legacy-Code begegnet.

Und ein weiteres Problem ist durch den Platzhirsch zementiert: Dank dem
[Matthäus-Effekt](https://de.wikipedia.org/wiki/Matth%C3%A4us-Effekt) gibt es mehr Python-Entwickler als
zu kleineren Programmiersprachen. Wer heute einen neuen Software-Stack entwirft, trifft mit Python keine
grundsätzlich falsche Entscheidung. Und zementiert doch die Skalierungsprobleme von Python in seine
personelle Struktur mit ein. Sprachen wie Go, Kotlin oder Julia versuchen den Wechsel einfach zu gestalten,
sei es mit ähnlicher Syntax oder Adapterbibliotheken. Und doch ist der Wechsel einer Programmiersprache
in einer großen Software ein riskantes Mammutprojekt.

Letztlich bleibt zu sagen: Egal für welches Software-Ökosystem man sich entscheidet, es gibt immer
die Art von Entwickler:innen, die das System derart verbiegen und missbrauchen, dass daraus Spaghetticode
und ein Performance-Grab wird. Wenig verbreitete Sprachen tendieren dazu, eher von Expert:innen genutzt zu
werden, die wissen was sie tun – und die damit ein Scheinargument für die Überlegenheit dieser Sprache
liefern. Wer guten Python-Code lesen will, der schaue sich zB. mal die [Pytudes von Peter Norvig](https://github.com/norvig/pytudes)
an. Eine [Übersicht zu Python-Büchern](https://github.com/pamoroso/free-python-books) hilft dabei, die
nötige Lektüre zu finden, eine Domäne mithilfe von Python zu meistern.
