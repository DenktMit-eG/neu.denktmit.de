---
layout: post
author: Marius Schmidt
language: en
description: The concept of story points as estimates often confuses people. Everything is easy if you treat them as cognitive load. 
related_image: /files/sdm/images/stack-of-black-poker-cards-displaying-jack-queen-and-king.jpg
header_image: /files/sdm/images/stack-of-black-poker-cards-displaying-jack-queen-and-king.jpg
header_image_alt: A stack of three black poker cards displaying jack, queen and king
header_image_caption: Planing poker gamificates your estimation sessions
header_image_attribution: <a href="https://www.pexels.com/de-de/foto/kasino-gluck-schwarz-spiel-4253690/">Raka Miftah</a>, <a href="https://www.pexels.com/de-de/lizenz/">Pexels Lizenz (19.11.2021)</a>, via Pexels
---

## The problem
Most of the projects we do today use an agile software development approach, be it SCRUM or Kanban or the like. Most of the time, the work to be done is estimated based on story points. At first glance, this may seem easy, but at some point your project team could debate what a story point actually represents. Some might argue that story points somehow value time. Others are convinced that they somehow assess the academic complexity of a task. And a third group does not hesitate to point out that they are only ever allowed for user stories and not for bugs or minor technical tasks. After all, almost everyone agrees that the Fibonacci numbers are great candidates for story points. 

In our opinion, story points should estimate the **total cognitive load** to get some well enough defined pile of work done. We derive possible story point values from Fibonacci numbers <= 21, allow an additional 0.5 value and we apply them for everything. The rest of this blog post is, **why** we do it that way.

## Goals of estimating tasks
To prioritize work properly, it is essential to figure out the expected return of invest (ROI) as ratio of expected business value and expected effort. In order monitor the quality of our forecast, we would continuously compare the expected with the actual outcome and try to reduce the deviation. In order to enhance the forecast, we want to it to become as efficient (low-cost, fast and easy), effective (concise, non-misleading insights) and appropriate (only asking for the measures and granularity needed) as possible. 

## Story points are a better fit for human guessing 
Before using story points, we tried to estimate the amount of time to get a certain workload done. One of the pain point was, that we as humans are surprisingly bad and overoptimistic in guessing how long something new is going to take. At the same time we want be accurate in our statements. Treating those estimates as binding cost estimates, in many cases definitely added some pressure. 

As a countermeasure, many developers, including us, designed some fancy Excel sheets to enter their guess work and deliver educated overestimates to compensate for our optimism. That made us feel better and lightened some pressure by moving unused times between work items. The approach was time-consuming because of the fancy guess work. It also did not deliver accurate results because of the intrinsic lack of knowledge in doing something new and the safe-guarding over-estimates. 

As it turned out, story points improve the estimation part of the ROI equation. We humans are surprisingly good at guessing the relative difficulty of tasks we only have partial knowledge of. Most of the time, we can easily say: "This will be A LOT harder than that. Doing ABC is more easy peasy compared to XZY". We do not even need to remember the exact effort of the reference work to make that guess.

Additionally, we are easily overwhelmed with too much choice[^1]. Having choices between hours, days, weeks and maybe even months makes it harder for us to decide. It is a smart move to limit the number of available choices to accelerate a decision process. Using a limited set of possible story points, applies choice architecture[^2] on effort estimation. 

We still have some freedom what number sequence to take. Ideally, the sequence of valid story point values should reflect the fact, that estimates lack more accuracy, the bigger the subject to estimate is. Using the Fibonacci numbers fits this requirement nicely, because consecutive numbers have an increasing gap between them. Of course, you could use another number sequence, but Fibonacci numbers will always be more cool. They have an italian name, a strong relation to the golden ratio and you do not have to explain them yourself[^3]. 

We like to add a 0.5 story point option to be assigned for very small tasks that are often neglected as **to small to be estimated at all**. In doing so, if those tasks come in numbers, they at least show up in the forecast. We limit our story point values to nine options in total to support quick decision-making. We usually consider a story point value of 21 as **too big, should usually be broken up into smaller parts**. Anything that feels bigger than even a 21 is rejected and must be refined first.

## The gain of story points
In summary the two effects improve the efficiency and effectiveness of the estimation process. Since estimating is lot faster with story points, it quickly became a team effort increasing the quality by averaging between independent guesses. Using Planning poker avoids being biased by other opinions. 

This whole team approach results into a better quality of the effort estimates. By monitoring the story points a developer team delivers over time, one finds, that the total amount of story points per sprint usually converges into an expectancy value. In our experience, the ROI forecast derivable from that value is of better quality than the one derived from time estimations. Therefore, we consider story points more appropriate.

## Story points should estimate total cognitive load
Let us focus on why we are estimating at all: We want to know the expected return on invest and everything that improves that forecast is good. We are already convinced, that using story points are pragmatic in delivering a better ROI forecast. However, story points are an abstract concept. Some definition what exactly they represent is needed. Maybe for that reason, there seems to be some fear of not doing story points right.

Keep in mind, that the whole agile development approach should be adapted to what works best for you. We think, story points should have meaning, that feels natural and explaining them should be very easy. Since software is a brain child, we feel comfortable in treating story points as **expected total cognitive load**.

Everything becomes quite clear with this definition. If a task is more difficult than another, it causes more cognitive load. You need to research something new. Some business process might be complex, so you need to meet with the business experts and learn about it. A task is simple, but it contains a lot of repetitive work, and that needs time and focus. It all adds up on the cognitive load.

Doing a task a second time but on an evolved system where it has become a lot easier, results into less cognitive load. Assigning fewer story point is totally fine. The product is more sophisticated now and allows for a higher ROI. 

Some developer has more foreknowledge than the others? Sharing it causes cognitive load. If he is done quicker than the team average: be it so. It will just result into a slightly better actual ROI than expected for the team average and shows good resource allocation.  

Not sure if to assign story points to a bug or task? Well, they also produce cognitive load. So we just assign them story points, because in the end, we want to obtain a more accurate forecast.

Keep the cognitive load buffers clean and happy estimating.

## Links
[^1]: [Choice: Number of options and paradox](https://en.wikipedia.org/wiki/Choice#Number_of_options_and_paradox)
[^2]: [Choice architecture](https://en.wikipedia.org/wiki/Choice_architecture)
[^3]: [Fibonacci-Numbers](https://en.wikipedia.org/wiki/Fibonacci_number)
