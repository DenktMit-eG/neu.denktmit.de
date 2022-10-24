---
title: "Was ist Bootstrapping und warum ist es so wichtig?"
layout: post
author: Sven Köppel
language: de
related_image: /assets/blog/2022-08-20-bootstrap.jpg
header_image: /assets/blog/2022-08-20-bootstrap.jpg
header_image_caption: 'Bootstrapping Symbolbild, von <a href="https://medium.com/geekculture/what-is-bootstrapping-and-why-is-so-important-2c051cf07317">erma0x medium post</a>'
---

Das laufende Jahrzehnt fängt großartig an: Wir haben Smartphones und das Internet,
großartige komplizierte Dinge wie Blockchains oder kybernetisch anmutende Anwendungen,
die alle miteinander kommunizieren, geschrieben in Programmiersprachen, die Menschen
bei der Befehligung des Computers unterstützen. Doch wie kommt all die Großartigkeit
in die Welt? Sie steht doch scheinbar »auf den Schultern der Giganten«, wie man
sprichwörtlich sagt: Neuere Roboter wurden durch ältere gebaut, neuere Computer durch
ältere. Es reicht alles zurück in die Zeit der einfacheren Werkzeuge und weniger
komplexen Systeme.

## Bootstrapping erzeugt wünschenswerte Komplexität

Tatsächlich kommt Komplexität nicht ohne Arbeit in die Welt. In der Softwaretechnik
sprechen wir von einem Henne-Ei-Problem: Wenn eine mächtige Plattform oder Technik
in der Lage sein soll, sich selbst zu replizieren bzw. von Grund auf zu erschaffen.
Ein Beispiel sei eine neue "höhere" Programmiersprachen, sei es einmal das in der
Genossenschaft so beliebte *Kotlin*, für die es einen sogenannten Compiler benötigt,
der aus dem typischerweise in Textform vorliegenden Programmcode maschinenlesbare
Anweisungen erzeugt. Es gibt viele Gründe, warum es interessant ist, diesen Compiler
in der neuen Sprache selbst zu schreiben. Einer davon ist, dass es für die an der
neuen Programmiersprache abeitende Menschen interessanter ist, die Funktionen
ihres neuen Zöglings auch zu nutzen, statt eine ältere Programmiersprache zu verwenden.
Wenn eine Sprache diesen evolutionären Schritt geschafft hat, nennt man sie
*selfhosting*, sie ist also ihr eigener Gast.

Die technische Umsetzung dieses Vorhabens ist gar nicht einmal so einfach: In der Regel
werden ältere Compiler einer Sprache verwendet, um neuere zu entwickeln. So ist es
in der Java-Welt üblich, dass sich ohne *Java Development Kit* kein neues
*Java Development Kit* entwickeln lässt. Diese Abhängigkeiten lassen sich zurückverfolgen
bis zu den ältesten Versionen von Java, für die es Compiler in der Sprache *C* gibt.
Eine saubere Methode, solche Ketten zu durchbrechen, zeigen etwa die Sprachen *Go* und
*Zig*, für die es kleine Bootloader oder "Vorstufen-Compiler" gibt, aus denen sich
ein Compiler für eine einfache Version der Programmiersprache übersetzen lässt, aus dem
sich schließlich ein Compiler entwickeln lässt, der alle Funktionen der Sprache
versteht. Die Art und Weise, wie diese kaskadierten Compilerstufen funktionieren, erinnern
an den Prozess des *Bootens* eines Computers, den viele ältere noch von ihrem Personalcomputer
kennen und der heute im Prinzip nur wenig verändert weiterhin anhält, aber in der
mobilen Gegenwart oft nicht mehr so stark in Erscheinung tritt. Dabei starten Prozessoren
sogar meist mit einem einfacheren 16bit-Vorprogrammiersystem (früher von dem BIOS
bespielt) um sich dann in 32bit und danach 64bit "upzugraden". Auch der Linux-Ladeprozess
mit einem *Bootloader*, der defakto selber (im Moment des Bootens) ein Betriebssystem darstellt,
ist noch heutigen Linux-Benutzenden oft ein Begriff. Auch wenn solche Fragestellungen als
"erledigt und abgehakt" und damit eher theoretischer Natur erscheinen, sind sie dennoch
hoch relevant für die Zukunft und erfordern eine regelmäßige Überarbeitung.

## Bootstrapping hilft zur Resilienz und Vertrauen in der Softwaretechnik

Tatsächlich gibt es aber auch viele andere Gründe, warum Systeme *bootstrappable*
sein sollen, sich also an den eigenen Stiefelriemen aus dem imaginären Sumpf der
Trivialität ziehen können sollen. Das Webprojekt [bootstrappable.org](https://bootstrappable.org/)
etwa listet eine ganze Liste von Vorteilen auf und beinhaltet viele interessante
weiterführende Links. Ein wesentlicher Vorteil ist das *Vertrauen*, welches
bootstrap-fähige Systeme genießen können: Sie können mit keinen oder zumindest erheblich
geringeren Abhängigkeiten erzeugt werden. Besonders interessant wird das in
Zusammenhang mit [reproduzierbaren Builds](https://reproducible-builds.org/), welche
eine hundertprozentige Vorhersagbarkeit (Determinismus) von Kompilaten zum Ziel haben.
Diese Zugänge können als Versuch verstanden werden, die Komplexität moderner
Softwaresysteme wieder zu bändigen und *nachhaltiger zu Programmieren*. Über die
enorme Bedeutung der Beherrschung von Komplexität füllt [Alexander Schatten](https://www.schatten.info/) in der 
[iX Spezial 2022 – Green IT](https://shop.heise.de/ix-13-2022/PDF) fast eine gesamte
Ausgabe des Magazins im Alleingang.

