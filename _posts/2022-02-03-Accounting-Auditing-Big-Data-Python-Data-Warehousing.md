---
title: "Big Data Accounting with Python and other tools: An experience report"
layout: post
author: Sven Köppel
language: en
related_image: /assets/blog/2022-02-03-accounting.jpg
header_image: /assets/blog/2022-02-03-accounting.jpg
header_image_caption: "Accounting and computation: Classical computer work (Symbolical picture)"
header_image_attribution: <a href="https://pixabay.com/photos/calculator-calculation-insurance-385506/">Calculator</a>, <a href="https://pixabay.com/service/license/">Pixabay License</a> (Free/no atrribution required)
---

This post is an experience report of a project carried out by two persons at [DenktMit eG](/)
a short while ago. We will illustrate our approaches, with a technical focus, and we
will ensure the anonymity of our client. In fact, this client was contacting us for
helping him auditing a large German company. The initial problem was easily formulated: They used
to analyze accounting journals with *Microsoft Excel*, but this very company subject to be
audited submitted such a large journal that *Excel failed*. This is a somewhat classical initial
problem which results in consulting IT experts.

For me, this is one of the first projects carried out with [DenktMit eG](/), the newly founded
partnership of IT professionals in mid 2021. Given my weird career which involves both a computer
museum and astrophysics, this story will be probably somwhat unsual.

## A history lession of batch processed accounting data
Historically, there is hardly any domain in industry which was winded up as quickly by automated
computation as the financial sector, for instance banking, accounting and auditing.
Beginning with [early 20th century desk calculators](https://technikum29.de/en/computer/electro-mechanical.php),
[punch card computing](https://technikum29.de/en/computer/punchcard.php) was intensively
used for massive (semi) automated processing of accounting data. The single card with 80 characters
(columns in traditional [EBCDIC charset](https://en.wikipedia.org/wiki/EBCDIC)) was ideal for
representing single transactions. On dedicated machines, where typically one machine could
carry out only one job, decks of these cards could be sorted, values could be accumulated,
reports of sub accounts could be made, and many more. With no or orders of hundreds bytes of
random access memory (RAM), many aspects of banking could be covered. This is where terms such as
*batch processing* originate from, and these tasks were, by nature, heavily I/O bound.
Later on, these computers were replaced by more compact successors, a branch generally known
as [commercial computing](https://technikum29.de/en/computer/commercial.php) in distinction to
[scientific computing](https://technikum29.de/en/computer/early-computers.php). In it's 
extreme forms, commercial computing evventually lead to
[mainframe computer architectures](https://en.wikipedia.org/wiki/Mainframe_computer)
whereas scientific computing lead to what we call
[supercomputers](https://en.wikipedia.org/wiki/Supercomputer). The architecture of these two
computers is fundamentally different: A mainframe has a focus on correctness, fault tolerance,
high throughtput and reproducability. In the end, it's still batch processing what drives
banking in general. In contrast, high performance (super)computing has a focus on exploiting parallelity
in order to reduce the *time to solution*. Processing of *big data* is of course also about
[embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) batch 
processing, but the art of supercomputing is to exploit the available ressources to the maximum.
Typically this requires different attemps from traditional serial computing approaches.

## Doing banking with an high performance computing approach

I run a [computer museum that holds a vintage punch card processing center](https://technikum29.de/en/),
and yet I am a [computational scientist](https://svenk.org/research/) who spent good times on
writing codes that can keep millions of CPUs busy in large computer centers, while maintaining 
good efficiency and delivering relevant scientific results.

Over Christmas 2021, I carried out a data processing and analysis project with a client having
trouble auditing one of the largest exchanges in Germany. The client's client has carried out
millions of trades within a year, which results in a huge accounting journal, speaking of
almost 100GB of transactional rows in a single CSV file. Just to give an idea of such data,
this is a classical double-entry accounting journal with a general format such as the following
table, with a shape of roughly 300 million rows and 50 columns:

| Row         | account  | conter account | debit amount | credit amount | date       | receipt | Purpose text        | … |
|-------------|----------|----------------|--------------|---------------|------------|---------|---------------------|---|
| 1           | 1234     | 5678           | 123,45       | 0             | 01.01.2020 | abcdef  | Some free text here | … |
| 1           | 5678     | 1234           | 0            | 123,45        | 01.01.2020 | abcdef  | Some free text here | … |
| …           |          |                |              |               |            |         |                     |   |
| 300,000,000 | 1838123  | 78748132       | 789,01       | 0             | 31.12.2020 | abcdef  | Some free text here | … |
| 300,000,001 | 78748132 | 1838123        | 0            | 789,01        | 31.12.2020 | abcdef  | Some free text here | … |
{: .table }

Traditionally, *big data* is defined as data that cannot fit into a single computer. However,
100GB is something which can clearly be put into memory in a large machine, so this is not
contemprary big data. In data science, we work with much larger data sets.
However, the shape of this single table is disadvantageous for many traditional data processing
attemps (see more below). Millions of rows is also by no means a larg number in a
[relational database managament system (RDBMS)](https://en.wikipedia.org/wiki/Relational_database#RDBMS).
And yet, quickly after launching this project, we were surprised about the difficulty of dealing
with a single table of that size.

As a last excursion into history, it should be said that, mainly due to reasons of trust and
compliance, we carried out the project remotely on a clients workstation dedicated for this job. When it
compes to modern day computing, in the past decades we have percieved *convergence* of
different architectures. Today's supercomputing is in many times putting together a cluster
of commodity personal computers. And instead of dedidacted and expensive mainframes, cheap
cloud computing is applied on standard server architectures. When it comes to hardware, the
line is heavily blurred between the domains of science and commerce. Interestingly, when
it comes to software, the situation is quite different. It might be said that the general
term refering to modern day big data batch processing are
[external memory or out-of-core algorithms](https://en.wikipedia.org/wiki/External_memory_algorithm).
As it is with punched cards, these jobs are I/O bound and the size of the memory plays a
tangential role.

From the perspective of a data scientist, one of the first
jobs when encountering a new data set is to obtain a *feeling* for the data, or as a
matter-of-fact, getting the correct idea of data type and distribution in the individual table
rows and columns. This requires representing the tabular data in a suitable file format and
having tools at hand for in-depth analysis.

## Using astrophysical tools for accounting: Welcome to Vaex.

[Vaex](https://vaex.io/) is the Python library which was chosen by the leaving IT guy at
the client's office at the time we started taking over. Incidentally, this is a data
processing framework originating from big data analysis in astrophysics, the subject where
I carried out my PhD in a few years ago. Despite the library is advertised as a general
purpose tool [on its website](https://vaex.io/), the origins are clearly visible when
inspecting [the vaex API](https://vaex.io/docs/api.html), which has for instance 
(geometric) region based filtering and a focus on geometry based visualization.

Vaex is an instance in a general class of python data processing libraries which tries to
provide a parallel implementation of the [pandas API](https://pandas.pydata.org/) and 
datatypes (which itself is a clone of the 
[data frames](http://www.r-tutor.com/r-introduction/data-frame) type in the 
[R language for statistical computing](https://www.r-project.org/)). Another popular
candidate within this class of libraries is [dask](https://dask.org/), advertising itself
as providing *advanced parallelism for analytics, natively scaling in Python*. The
promise of this libraries: Low learning curve and tight integration with other analytics
code written in Python (such as the legendary [scikit-learn](https://scikit-learn.org/)
machine learning toolbox). From the perspective of the programmer, the extra steps are
typically:

 1. An initial *read in* which transforms the raw data (for instance given in a CSV format)
    to some tailored format such as [Apache arrow](https://arrow.apache.org/) or 
    some custom format ontop of [HDF5](https://arrow.apache.org/). This target format allows
    for memory mapping and optimal distributed access with minimal overhead.
    In case of *dask*, it
    also allows for streaming remote data the initial conversion step can be skipped.
 2. Queries on these data are composed at run-time in form of a delayed *task graph* which is 
    then executed on the available compute ressources (which typically can spawn several
    processors or machines in a client-server fashion, boiling down to classical
    map-reduce approaches of big data).
 3. Query results can be fed to in-memory representations typically falling back to traditional
    pandas dataframes. These dataframes can be processed with numpys
    [SIMD vectorization](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data) but
    not with manycore, which is not that practical for many gigabytes of in-memory tables.

## Considerering Vaex vs. Dask

When it comes to raw performance and time to solution,
my impression is that *nothing beats vaex*. With the given
dataset, stored on a local SSD, it can exploit all 24 cores of the Intel i9 processor with a
decent load on memory and provide answers to complex accumulation and grouoping operations
within fractions of a second.

For my feeling, *vaex* is at least one order of magnitude faster then *dask* with similar
tasks/codes. However, *dask* feels much more mature, versatile and general purpose. There are
many cases where (at least for me), *vaex* did not implement the features according to the 
API. In constrast, dask provided even a web based dashboard for visualizing various metrics.
Given their abstraction over
parallelization strategies, both libraries are quite sensitive to the host setup. Unfortunately,
we had to use Microsoft Windows, were vaex was notoriously instable and unreliable, ending up
in crashes which lacked any stacktrace, providing no chance for debugging and improving.

Just to give some numbers, here are some performance metrics when doing a
[Histogram](https://en.wikipedia.org/wiki/Histogram) (counting unique entries) on a column with
around 300M records:

| Library | Typical Code                                                                  | Runtime |
|---------|-------------------------------------------------------------------------------|---------|
| Vanilla | `for row, column in zip(file, columns): unique_values[k].update(row[column])` | 3 min   |
| Dask    | `unique_data = ddf[column].value_counts().compute()`                          | 2 min   |
| Vaex    | `tab = df.groupby(column, agg=[vaex.agg.count(column)]).to_pandas_df()`       | 7 sec   |
{: .table }

Here, *vanilla* refers to an approach with [batteries included](http://protocolostomy.com/2010/01/22/what-batteries-included-means/),
i.e. using the standard library modules [csv](https://docs.python.org/3/library/csv.html) and
[Counter](https://docs.python.org/3/library/collections.html#collections.Counter) with serial processing
line by line and column by column on the raw CSV file.

Obviously, for more challenging tasks such as writing out particular data or doing more sophisticated
*map reduce* cycles, your milage may greatly vary. Vaex puts quite some effort to optimizing custom
mappers with [just in time compilation](https://vaex.io/docs/tutorial.html#Just-In-Time-compilation)
using [numba](https://numba.pydata.org/), [pythron](https://pythonhosted.org/pythran/) or
[CUDA](https://developer.nvidia.com/cuda-zone).

My conclusion: Try first with vaex, best by avoiding Microsoft Windows as much as possible. If this
does not work well, try Dask.

## Data Warehousing for Data Integration

The decent answer for properly managing this amount and type of data is *data warehousing*. This
term collects the tooling and attempts for managing heterogenous data in a structured manner.
One of the biggest problems of the single large CSV table is the massive amount of duplication.
Think of a table named *name of booking person* and holding 100M lines the name *foo* and 100M
lines the name *bar*, resulting in at least 1.2GB of ASCII data, whereas the information content
in this case is only around 200M booleans or bits. In a relational schema, this colum clearly
screams for a seperate table and a foreign index column.

Setting up a sane SQL schema for this type of data is an obvious task. Most accumulation and filtering
tasks could then be implemented by simple SQL queries, running on a single or distributed database
cluster (such as [PostgreSQL](https://www.postgresql.org/)) in a very classic fashion.

Further considerations would imply in a proper data warehouse (DWH) which defines common schemas for
common data types. A DWH also allows for carefully controlled data duplication and provides various
interfaces such as a [Apache Hadoop](https://hadoop.apache.org/) cluster which allows to interface
with high performance computing frameworks as presented above, without worring about data
representation.

Given the tight timeline of the project in discussion, we carried out all demanded tasks within the
timeline of a few days. We mostly [traded CPU time against memory](https://en.wikipedia.org/wiki/Space%E2%80%93time_tradeoff)
and filled the hard disk with tons of redundant data, differently filtered or splitted. This was
not very clever, but *got the job done*. Interestingly, the open source
[Pentaho Data Integration](https://www.hitachivantara.com/de-de/products/data-management-analytics/pentaho-platform/pentaho-data-integration.html)
platform by HITACHI saved the day for some queries. This is a visual programming toolkit optimized
for streaming dataflows which we abused for batch data processing. It won't win a prize when it
comes to *time to solution* performance, as parallelization is only performed on individual
data processing steps (which means no meaningful parallelization in a serial processing queue).
However, it is stable and tested and in this respect as good as any serial programming attempt
in any suitable programming language.

## Conclusion

This was a short and fun project on a kind of dataset I never worked before with. Despite the
number of analyses asked for were very basic (thinking of histograms, simple statistical analysis
such as [Benford's law](https://en.wikipedia.org/wiki/Benford%27s_law) and data filtering
and searching), the primary client's choice of *Windows and Python* and the strong focus on
*interactive performance* was a real show stopper. This kind of tooling is a particular choice on
superficial goals (such as time to solution) but neglects important basics such as proper data
sanatization and representation.
