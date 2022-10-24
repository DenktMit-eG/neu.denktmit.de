---
layout: post
author: Marius Schmidt
language: en
description: Congrats for having automated acceptance tests. Let us now use them to validate deployments in the wild with some help of Docker and Gauge.
related_image: /files/sdm/images/containerized-train-train-loaded-with-shipping-containers.jpg
header_image: /files/sdm/images/containerized-train-train-loaded-with-shipping-containers.jpg
header_image_alt: Some connected trainwagons each loaded with two shipping containers 
header_image_caption: Release and ship your E2E test containers
header_image_attribution: <a href="https://www.flickr.com/photos/danorth1/1593214595/">Daniel Orth</a>, <a href="https://creativecommons.org/licenses/by-nd/2.0/">CC BY-ND 2.0</a>, via flickr
---

# E2E Testcontainers

Let's start with a short reminder on E2e-Tests. While unit and integration tests verify, that a system under test does
things right, the E2E-Tests verify that a system does the right thing. They are therefore acceptance tests and should
provide an every
increasing [Running tested features (Brought up by Ron Jeffries)](https://ronjeffries.com/xprog/articles/jatrtsmetric/)
metric understandable by business users.

Often those tests are run on the local developers machine and in the CI to pass the quality gates. This is usually
enough for a centrally managed system existing in a single configuration. As soon as we talk about turnkey solutions,
the system under tests might be living on many different environments and installations. Wouldn't it be nice to have a
uniform way to verify, the software is working as expected on those different environments? At least have some smoke
tests running? Well, why not somehow release these E2E-Tests alongside the product and make them self-explanatory to be
used on any environment whenever needed? 

This is, what I propose to achieve with E2E Testcontainers. The rest of this post gives you a hands-on introduction of 
the idea based on [a sample I prepared on Github](https://github.com/DenktMit-eG/de.denktmit.blog.e2e-test-containers). 
Make sure you clone it to your local machine to follow this text. At the end of this post, you will have your own base
image for test containers as well as a fully working sample of some Selenium based browser testing wrapped in a 
self-explanatory and CI friendly container.

## Getting started

You will need to have a fully working Docker installation as well as at least a working Java 11+ JDK to run the full
build. 

By **running the main build.sh** script of this project, you can locally create both the base image and the sample webgui
image. In resemblance to most UNIX command line tools, the test containers are designed to reveal their features
included by just using them.

    ./build.sh

It might take some time until docker pulled everything, but once the process is done, you are ready to go and explore
your freshly baked docker images.

### Exploring a test-container

The most basic thing you can do to a docker image is, to just run it. Run the container for the first time:

    docker run --rm e2e-test-base-image:latest

As a result, you will get some output reading like this

    == cli.sh 2021-11-01T11:11:25Z Exporting config ...
    
    E2E Tests CLI CLI-Version: 1.0.0 Usage: /cli/cli.sh [command]
    
    Commands:
    e2etests Display e2etests Help
    
    *         Help
    
    Description:
    This is the e2e-test-base-image cli, that only contains a small sample setup. The base image is designed to be extended
    by product specific E2E-Test containers, overwriting behavior and usage instructions.

So basically, the container advises us to use the entry script /cli/cli.sh. We'll end up with the message above again

    docker run --rm e2e-test-base-image:latest /cli/cli.sh

But what can we do from here? Well obviously, the script helps us to recognise accidentally wrong input in showing the
help page again for every argument, that does not map onto a command. Try it if you like:

    docker run --rm e2e-test-base-image:latest /cli/cli.sh unknown 
    docker run --rm e2e-test-base-image:latest /cli/cli.sh boring three params 
    docker run --rm e2e-test-base-image:latest /cli/cli.sh *
    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests

Let's get serious, how to use the actual tests? The last line of the former code block with the param e2etests gave us a
different help text. So we are one steps further it seems.

    == cli.sh 2021-11-01T11:18:24Z Exporting config ... 
    == e2etests.sh 2021-11-01T11:18:24Z HELP
    
    Command: e2etests
    
    Usage:
    e2etests run [tags]     Runs all tests e2etests specs Prints defined specs e2etests * Help
    
    Description:
    This command executes Gauge specifications provided in the /tests/specs directory of this container when called with '
    run'. If you run the tests without providing tags, all tests will be run. Otherwise, if you submit a tags specification,
    only the tests that match it are run. For detailed explanation,
    visit https://docs.gauge.org/execution.html#tag-expressions. If all tests succeed, this script returns with exit code 0,
    otherwise with exit code 1.

    Configurable environment variables:
    This is an overview of configurable environment variables. Mandatory variables must be provided as docker env
    variables, otherwise the run command will fail. Optional variables on the other hand might be used if needed. If
    both lists are empty, it means, that your current test container does not need any setup to run the tests :).

    ###################################
    # Mandatory environment variables #
    ###################################
    (none for this sample)
    
    ###################################
    # Optional environment variables  #
    ###################################
    GAUGE_JVM_ARGS
     - arguments provided to the JVM, that is started by the gauge-java test runner. Defaults to
       "-Dlogback.configurationFile=/common/logback.xml" to provide a logging configuration
    GAUGE_LOG_LEVEL: enum
     - The log level of the Gauge spec runner itself. Must be debug, info, warning, error or
       critical (default "info")
    

    Available test tags:
    The available tags and their purpose. For example a tag smoke might only run some quick tests to verify a system is
    ready.

    poems
     - Sample E2E tests about poems. Includes all tests
    smoke
     - Includes a single successful test
    failing
     - Includes a single failing test

    Mount points of interest:
    The mount points of interests describe container paths you might want to mount to your host machine.

    /tests/reports
     - The gauge tests generate a nice XML and HTML reports that end up here
    /tests/logs
     - Logs created by gauge are available in

### Take a look at the specs

Since I built the test containers using the [gauge testing framework](https://gauge.org/), there are specs. Specs are
written in Markdown and describe a certain feature of the system under test in a human readable way. Show the 
containered specs with

    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests specs

The specs command simply outputs the available spec

    == cli.sh 2021-11-01T12:09:30Z Exporting config ... 
    == e2etests.sh 2021-11-01T12:09:30Z PRINT E2E SPECS Rose validity
    =============
    
    End the poem correctly
    ----------------------
    tags: poems, smoke
    
    * A rose is a rose is a "rose"
    
    End the poem incorrectly
    ------------------------
    tags: poems, failing
    
    * A rose is a rose is a "lily flower"

as we can see, we only defined a single feature here. The test is about a short quotation, sometimes considered a poem
in its own by Gertrude Stein. Since the little poem can be read as a statement for validity and identity of things I
found it very fitting. There are three tags across the specs: poems, smoke and failing. The first scenario is an always
succeeding while the second one is always failing. If you ran the the smoke tests only, you end up with succeeding
otherwise with failing tests Run all E2E tests

Since we do not need any additional setup, you can run the tests as easy as

    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests run

After a short time, you should see this output

    == cli.sh 2021-11-01T12:22:14Z Exporting config ... 
    == e2etests.sh 2021-11-01T12:22:14Z RUN E2E TESTS
    
    # Rose validity
    
    ## End the poem correctly
    
    ## End the poem incorrectly
    
            Failed Step: A rose is a rose is a "lily flower"
            Specification: specs/01-SayRose.spec:14
            Error Message: java.lang.AssertionError: The answer 'lily flower' is wrong
            Stacktrace: 
            io.gec.example.RosePoemSteps.poemSuccessful(RosePoemSteps.java:10)
            java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
            java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
            java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
            java.base/java.lang.reflect.Method.invoke(Method.java:566)
            com.thoughtworks.gauge.execution.MethodExecutor.execute(MethodExecutor.java:28)
            com.thoughtworks.gauge.execution.StepExecutionStage.executeStepMethod(StepExecutionStage.java:66)
            com.thoughtworks.gauge.execution.StepExecutionStage.executeStep(StepExecutionStage.java:59)
            com.thoughtworks.gauge.execution.StepExecutionStage.execute(StepExecutionStage.java:41)
            com.thoughtworks.gauge.execution.AbstractExecutionStage.executeNext(AbstractExecutionStage.java:14)
            com.thoughtworks.gauge.execution.HookExecutionStage.execute(HookExecutionStage.java:33)
            com.thoughtworks.gauge.execution.ExecutionPipeline.start(ExecutionPipeline.java:19)
            com.thoughtworks.gauge.processor.ExecuteStepProcessor.process(ExecuteStepProcessor.java:44)
            com.thoughtworks.gauge.RunnerServiceHandler.lambda$executeStep$7(RunnerServiceHandler.java:166)
            java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
            java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
            java.base/java.lang.Thread.run(Thread.java:829)
    
    Successfully generated html-report to => /tests/reports/html-report/index.html
    
    Successfully generated xml-report to => /tests/reports/xml-report
    
    Specifications:    1 executed 0 passed 1 failed 0 skipped Scenarios:    2 executed 1 passed 1 failed 0 skipped
    
    Total time taken: 148ms

### Run the smoke tests only

If you run the smoke tests only, you can do so by adding "smoke" as parameter

    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests run smoke

the tests succeed

    == cli.sh 2021-11-01T12:23:48Z Exporting config ... 
    == e2etests.sh 2021-11-01T12:23:48Z RUN E2E TESTS
    
    # Rose validity
    
    ## End the poem correctly
    
    Successfully generated html-report to => /tests/reports/html-report/index.html
    
    Successfully generated xml-report to => /tests/reports/xml-report
    
    Specifications:    1 executed 1 passed 0 failed 0 skipped Scenarios:    1 executed 1 passed 0 failed 0 skipped
    
    Total time taken: 138ms

### What about CI integration?

We can easily evaluate, if all tests succeeded in e.g. a CI process using by evaluating the return code.

    # Returns 'Smoke tests succeeded'
    
    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests run smoke && echo "Smoke tests succeeded" || echo "Smoke
    tests failed"
    
    # Returns 'All tests failed'
    
    docker run --rm e2e-test-base-image:latest /cli/cli.sh e2etests run && echo "All tests succeeded" || echo "All tests
    failed"

## A more sophisticated example: Webtests using Selenium

Lets see, what the sample Web GUI container has to offer in E2E tests an just run a webtest docker

    run --rm e2e-test-sample-webgui:latest /cli/cli.sh e2etests

The output is different than for the other container

    == cli.sh 2021-11-01T11:27:55Z Exporting config ... 
    == e2etests.sh 2021-11-01T11:27:55Z HELP
    
    Command: e2etests
    
    Usage:
    e2etests run [tags]     Runs all tests e2etests specs Prints defined specs e2etests * Help
    
    Description:
    This command executes Gauge specifications provided in the /tests/specs directory of this container when called with '
    run'. If you run the tests without providing tags, all tests will be run. Otherwise, if you submit a tags specification,
    only the tests that match it are run. For detailed explanation,
    visit https://docs.gauge.org/execution.html#tag-expressions. If all tests succeed, this script returns with exit code 0,
    otherwise with exit code 1.
    
    Configurable environment variables:
    This is an overview of configurable environment variables. Mandatory variables must be provided as docker env
    variables, otherwise the run command will fail. Optional variables on the other hand might be used if needed. If
    both lists are empty, it means, that your current test container does not need any setup to run the tests :).

    ###################################
    # Mandatory environment variables #
    ###################################
    EXPECTED_RESULT_CONTAINS
     - The text snippet expected to be part of the search results
    
    ###################################
    # Optional environment variables  #
    ###################################
    GAUGE_JVM_ARGS
     - arguments provided to the JVM, that is started by the gauge-java test runner. Defaults to
       "-Dlogback.configurationFile=/common/logback.xml" to provide a logging configuration
    GAUGE_LOG_LEVEL: enum
     - The log level of the Gauge spec runner itself. Must be debug, info, warning, error or
       critical (default "info")
    HEADLESS_BROWSER: BOOLEAN
     - Determines if to run a headless browsers. Defaults to true.
    SEARCH_TERM
     - The term to be searched for

    Available test tags:
    The available tags and their purpose. For example a tag smoke might only run some quick tests to verify a system is
    ready.

    search
     - Sample E2E tests. Includes all tests
    smoke
     - Includes a single successful test, in this case
    custom
     - Includes a single failing test

    Mount points of interest:
    The mount points of interests describe container paths you might want to mount to your host machine.

    /tests/reports
     - The gauge tests generate a nice XML and HTML reports that end up here
    /tests/logs
     - Logs created by gauge are available in

### Run the web tests

Okay, we need to setup a mandatory environment variables and might also want to change some optionals. This time, we'd
also like to have a look at the generated reports. To make them more fun, we use a full-fledged browser and disable the
headless mode. This leaves us with nice screenshots when a test fails and makes it easier to track down bugs. So, lets
give it a first try. Lets run a failing webtest

    docker run --rm  \
    -e "SEARCH_TERM=denktmit.de" \
    -e "EXPECTED_RESULT_CONTAINS=denktmit.de is the coolest co-op in the world" \
    -e "HEADLESS_BROWSER=false" \
    -v /home/<youruser>/reports:/tests/reports \
    e2e-test-sample-webgui:latest /cli/cli.sh e2etests run

### Evaluate the results and why the tests are failing

Once the test is completed, we might want to take a look at the HTML reports, we so wisely mounted into our file system.
This is, what the Gauge generated reports look like
![](/files/sdm/images/release-your-e2e-containers-gauge-report-screenshot.png)

Clicking on the screenshot gives you a great inside into what the browser was seeing while running the tests. Obviously
the DenktMit eG is not yet listed as the coolest co-op in the world, but at least we get the information what went wrong
![](/files/sdm/images/release-your-e2e-containers-search-results-screenshot.png)

Obviously, the search term is not giving us the expected result. Let's do a query, this humble presenter knows to work
most of the time.

    docker run --rm  \
    -e "SEARCH_TERM=denktmit.de" \
    -e "EXPECTED_RESULT_CONTAINS=Zwischen Programmierergenossenschaft und Unternehmensberatung" \
    -e "HEADLESS_BROWSER=false" \
    -v /home/<youruser>/reports:/tests/reports \
    e2e-test-sample-webgui:latest /cli/cli.sh e2etests run

This time we have a more satisfying outcome, all the tests were successful. That is the end of this little tutorial,
I hope you enjoyed it. Have fun building and releasing your own test containers.

## Links
* [Build a Custom CLI with Bash](https://medium.com/@brotandgames/build-a-custom-cli-with-bash-e3ce60cfb9a4)
* [Gauge testing framework](https://gauge.org/)
* [Gauge java language bindings](https://github.com/getgauge/gauge-java)
* [DenktMit eG tech blog](https://denktmit.de/outreach.html)