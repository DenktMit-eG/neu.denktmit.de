---
layout: post
author: Sven Köppel
language: de
description: Daten leben länger! Vor allem als die Systeme, die diese ursprünglich produziert und verarbeitet haben. Ein Plädoyer für Plaintext Format.
title: Plaintext ist Trumpf
related_image: /files/sdm/images/ascii-wohnt-jetzt-hier.png
header_image: /files/sdm/images/ascii-wohnt-jetzt-hier.png
header_image_alt: ASCII Art - ASCII WOHNT JETZT HIER 
header_image_caption: ASCII Art
header_image_attribution: <a href="https://denktmit.de/2021/06/08/plaintext.html">Marius Schmidt</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>, via DenktMit eG
---

In der Softwarearchitektur gibt es einige Weisheiten die zeitlos sind. Dazu gehört
die [Unix-Philosophie](https://blog.finxter.com/the-unix-philosophy/), auch als
*principles of Unix Software design* bekannt. Unix ist eines der erfolgreichsten
Betriebssysteme und direkt oder indirekter Vorgänger aller moderner Desktop- oder
Mobilgerätbetriebssysteme.

In diesem Blogpost möchte ich das Prinzip *Plaintext over XYZ* erläutern, wobei
*XYZ* alles mögliche sein kann: Ganz allgemein binäre Strukturen, spezielle
Dateiformate oder komplizierte Austauschformate. Um das zu verstehen, hole ich etwas
aus, wie man Unix für gewöhnlich bedient.

## Die Unix-Shell

Die Unix-Shell ist eine Kommandozeile, auf der man Zugriff zu vielen hundert
installierten Anwendungen hat. Wenn ich auf einem modernen Linux in der
[Bash](https://www.gnu.org/software/bash/) zweimal die Tabulatortaste drücke,
kriege ich auf meinem Rechner fast 6000 Kommandos angezeigt, die ich benutzen
kann. Ein guter Teil davon implementiert die drei Kernpfeiler der Unix-Philosophie:

* Schreibe Programme die (nur) *eine* Sache machen und die sie dafür sehr gut
  machen.
* Schreibe Programme, die zsuammen arbeiten.
* Schreibe Programme, die Textstreams verarbeiten, denn dies ist eine universelle
  Schnittstelle.

In einem Satz: Unix-Tools sind nach dem Baukastenprinzip gestaltet und verarbeiten
[Plaintext](https://de.wikipedia.org/wiki/Plain_text). Erstaunlich daran ist, dass
viele dieser Tools viele Jahrzehnte alt sind und heute genauso gut funktionieren
wie damals, vor allem weil sie eine klare Schnittstelle darstellen. Zum Beispiel
kann ich die Protokolle meines Kernels nach der Marke meiner Tastatur durchsuchen:

```
% sudo dmesg | grep -B2 Cherry | head -n3
[    9.003189] usb 1-2.1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=0
[    9.003190] usb 1-2.1.4: Product: USB keyboard
[    9.003191] usb 1-2.1.4: Manufacturer: Cherry
```

Dabei habe ich [grep](https://de.wikipedia.org/wiki/Grep) verwendet, welches in
Textstreams sucht und matchende Zeilen ausgibt. Grep ist einfach, es kann nur suchen.
Durch [Pipes](https://de.wikipedia.org/wiki/Pipeline_(Unix)) kann man es mit anderen
Programmen verbinden, z.B. [head](https://de.wikipedia.org/wiki/Head_(Unix)).
Grep ist gut geschrieben, und viele Leute haben sich schon gefragt:
[Why is grep so fast?](https://stackoverflow.com/questions/12629749/how-does-grep-run-so-fast).
In die Optimierung von Grep sind viele Softwareiterationen geflossen, und 
[das Ende der Fahnenstange ist noch nicht erreicht](https://blog.burntsushi.net/ripgrep/).

## Die Logging-Hölle

Tatsächlich ist das gegebene Beispiel ganz hervorragend, weil es auch die Schwächen
von Textformaten anzeigt. Das Systemjournal, welches hier von ``dmesg`` (Kernel
Ringbuffer) ausgegeben wurde, ist zeilenbasiert. Jede Zeile stellt eine Ausgabe
eines ``printk(...)``-Aufrufs im Kernel dar, welche vom Puffer um einen Timestamp
ergänzt wurde (links in den eckigen Klammern, zählt hoch aufgelöst 
die Sekunden seit Systemstart). Alles dahinter ist Konvention, so etwa die Tatsache
dass das ``usb``-Modul sich zu erkennen gibt (sprich per Konvention jeder ``printk``-Aufruf
im USB-Modul in etwa wie ``printk("usb ...")`` aussieht).

Vor einer Weile stieß ich über den interessanten Blogartikel
[The Syslog Hell](https://techblog.bozho.net/the-syslog-hell/), in der der Autor sich
über die vielen Standard beim Syslog-Interface vieler Unix-Betriebssysteme aufregt.
Auf [Hackernews hingegen kommentiert man trocken](https://news.ycombinator.com/item?id=27104469):
»*And yet syslog works to the point where anything sold as an syslog replacement ends up adding
complexity (along with features) rather then an simplification of the core problem.
It's in general a trend for old unix tools to work better in reality then in theory something
thats rare for more modern tools.
Sure it's nice been able to use more modern query tools and have graphing libraries available
but syslog grep and awk does get the job done and dont require a lot of resources to
set up and maintain.*«

Hat diese Person recht? Das mittlerweile im Rahmen von *systemd* weit verbreitete
*journald* erlaubt binäres Journaling und bringt syslog damit gedanklich ins 21.
Jahrhundert. Das obige Beispiel funktioniert mit einem Austauschformat, welches
eine einfache programmatorische Weiterverarbeitung erlaubt -- nämlich
[JSON](https://www.json.org/):

```
% journalctl --since=yesterday --output=json | grep -B 3 Cherry | head -n1 | jq
{
  "__REALTIME_TIMESTAMP": "1623049286198966",
  "_MACHINE_ID": "99[redacted]d5",
  "_KERNEL_DEVICE": "c189:11",
  "_HOSTNAME": "sveto",
  "SYSLOG_FACILITY": "0",
  "_UDEV_SYSNAME": "1-2.1.4",
  "_SOURCE_MONOTONIC_TIMESTAMP": "245529094761",
  "_TRANSPORT": "kernel",
  "PRIORITY": "6",
  "MESSAGE": "usb 1-2.1.4: New USB device found, idVendor=046a, idProduct=b090, bcdDevice= 1.03",
  "__CURSOR": "s=c0[redacted]f0",
  "SYSLOG_IDENTIFIER": "kernel",
  "_BOOT_ID": "5f[redacted]d",
  "_UDEV_DEVNODE": "/dev/bus/usb/001/012",
  "__MONOTONIC_TIMESTAMP": "29696437839",
  "_KERNEL_SUBSYSTEM": "usb"
}
```

## Die schillernde Welt der objektorientierten Shells und -Sprachen

Tatsächlich tun sich Unix-Shells schwer damit, ein Kommando-Ökosystem zur Bearbeitung von
komplexen Datenformaten zu etablieren. Mit JSON ist mittlerweile ein Standard aus dem Web
in die Systemprogrammierung gekommen, der das schrittweise ändert, doch diese Entwicklung
passiert viele Jahre, nachdem Microsoft mit der 
[Windows PowerShell](https://docs.microsoft.com/de-de/powershell/scripting/overview?view=powershell-7.1)
eine moderne Alternative zur [DOS-Befehlszeile](https://de.wikipedia.org/wiki/Cmd.exe)
entwickelt hat. Diese transportiert Objekte zwischen den Kommandos, welche etwa zum
Beispiel mit SQL-Abfragen weiter bearbeitet werden können. Mangels Windows kann ich
an dieser Stelle keine Beispiele zeigen, aber es gibt jede Menge schönes Material, wenn
man nach »[powershell examples](https://duckduckgo.com/?t=ffab&q=powershell+example&ia=web)«
sucht.

Vor ein paar Tagen habe ich über ein
[interessantes ACM-Paper getwittert](https://twitter.com/denktmit/status/1400808910836150273),
welches die Unix-Shell im Zeichen der Zeit interpretiert:
*Greenberg, Kallas, Vasilakis*:
[Unix Shell Programming: The Next 50 Years](https://dl.acm.org/doi/10.1145/3458336.3465294).
Hier werden die beiden experimentellen Shells
[POSH](https://www.usenix.org/conference/atc20/presentation/raghavan) und
[PaSh](https://github.com/andromeda/pash)
erläutert, die interessante Herausforderungen des modernen Manycore-Processings oder der
*data awareness* angehen. Trotzdem habe ich das Gefühl, dass die gängige Praxis des
Shell-Scriptings ist, für leicht komplexere Probleme auf Scriptsprachen wie Ruby, Python
oder Perl auszuweichen. Sie sind etablierter und das Tooling ist besser. Man verlässt
allerdings schnell das Ökosystem der textbasierten Unix-Welt mit ihren *einfachen* und
kurzen Tools. Das rächt sich schnell: Alle drei erwähnten Scriptsprachen leiden unter
einem "Global Interpreter Lock", der ein (effizientes) Multithreading verhindert und
Parallelisierung daher nur per aufwändigem Multiprocessing ermöglicht. Gerade allerdings
Arbeitsverteilung und -Parallelisierung sind Stärken der Shell und damit verbundener
Tools (wie etwa der Job-Managament-Scheduler [Slurm](https://slurm.schedmd.com/)).

## Der Erfolg der textbasierten Standards

Die Softwarearchitektur ist häufig Trends und Wellen unterworfen. In meinen Augen ist
eine Konstante, dass Systeme, die für Menschen und Einfachheit geschrieben wurden, viel
Erfolg hatten. Viele Protokolle, die auf TCP/IP basieren, funktionieren in Plaintext,
darunter FTP, HTTP und SMTP. *Flat File*-Datenbanken leiden nicht unter einem Vendor
Lockin und ermöglichen das Einlesen und Verabeiten mit diversen Tools. Das 
Versionsverwaltungstool *git* ist ein Beispiel für eine sehr erfolgreiche Umsetzung
dieses Konzepts. Git ist so einfach und Datei-/Plaintextbasiert, dass es eine
[Implementierung gibt, die ausschließlich die POSIX-Shell verwendet](https://git.sr.ht/~sircmpwn/shit).
Dadurch werden Git-Repositories noch brauchbar sein, lange nachdem viele proprietäre
Datenbankformate nicht mehr lesbar sind. Und auch die gute alte *CSV-Tabelle* erfreut
sich ähnlich wie das Plaintext-Markup in *Markdown* in manchen Kreisen einer regen
Beliebtheit, als wäre sie nie weg gewesen.

Auf Plaintext zu verzichten, ist oft einer
[premature optimization](https://en.wiktionary.org/wiki/premature_optimization)
geschuldet. Irregeleitete Entwickler:innen sind der Meinung, eine Serialisierung
ihrer Datenstrukturen in einer maschinenlesbaren Form reicht aus. In Folge dessen
lassen sich die Dateien nur noch mit Spezialwerkzeugen bearbeiten, das Debugging ist
aufwändiger als es sein müsste. Unnötige Komplexität ist einer der Killer in Software,
die über kurz und lang auch dessen Autor:in niederstreckt. Für eine Plaintext-Zukunft
der offenen und menschenlesbaren Austauschformate!
