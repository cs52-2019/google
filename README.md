<p align="center">
  <img src="https://github.com/cs52-2019/google/blob/master/temp_logo.png" alt="Google Earth Engine and the Accountability Counsel"/>
</p>

# Google Earth Engine and the Accountability Counsel
CS 52: CS+Social Good Studio, Winter-Spring 2019

Sofia Avila, Alexandra Camargo, Claire Huang, and Tyler Vo

## Our Partner Organizations
[The Accountability Counsel](https://www.accountabilitycounsel.org/) (AC) is a group of lawyers and statisticians who help vulnerable communities around the world build and file cases against multinational corporations that threaten their environmental, economic, and social well-being. 

[Google Earth Engine](https://earthengine.google.com/) provides an extensive catalog of time-series satellite imagery and geospatial datasets across the globe. We were lucky enough to be partnered with Earth Engine engineers who have been helping us identify datasets and providing technical implementation guidance.

## The Challenge
Satellite imagery data can be very valuable for accountability metrics like tracking the growth of large-scale construction projects or keeping an eye on air and water pollution levels. However, the current process of collecting, analyzing, and sharing quantitative satellite imagery data over time for specific cases is a very manual and time-consuming process for lawyers at AC. 

## Our Solution
Our goal is to provide an intuitive web interface for the Accountability Counsel to view and analyze time series satellite imagery data. In particular, we hope to provide value in these four AC-specific goals:
1. Simplify the powerful but overwhelming Earth Engine interface 
2. Automatically identify salient events (eg. large changes in the quantity tracked) over time
3. Offer more flexible options for specifying what location(s) to track
4. Make findings easily shareable so the work can be cross-checked

## Quick Links
[Interactive Figma prototype](https://www.figma.com/proto/JHZ6CaGjb9IBcORsEWrL4nFR/web?node-id=0%3A1&scaling=min-zoom)

[CS51 presentation](https://docs.google.com/presentation/d/1LnlvJOncs7SnwMAQpzZ96tvWfnK6VdE5UDYbA1yWgUA/edit?usp=sharing)

## Who We Are
Member | Email | Bio
--- | --- | ---
Sofia Avila | sofiaaj@stanford.edu | Symbolic Systems, 2021
Alexandra Camargo | acamarg2@stanford.edu | Human Biology & Computer Science, 2020
Claire Huang | chuang20@stanford.edu | Computer Science, 2020 
Tyler Vo | tylervo@stanford.edu | Computer Science, 2021

## Our Development Timeline
Week | Milestone | Status
--- | --- | --- 
2 | Framework rough draft; Django tutorials. Discuss rough ideas for necessary frontend pages/components and database schema. Begin setting them up as scaffolding in code. | :construction: In progress
3 | New Case. Front-end: Develop front-end of new case showcasing description + ability to add new analyses. Back-end: Create new case object based on parameters. 
4 | New Analyses Front-End: Analysis attributes input form. Visuaalize Earth Engine data. 
5 | New Analyses Back-End: Retrieve initial data and historical data of object. Transform data for visualization. 
6 | New Analyses Back-End: Creating an updater method to update these case analayses. 
7 | Analysis details back-end: Retrieve analysis object info. 
8 | Analysis details front-end: Interactive time series data display. 
9 | User testing, meet with AC and Google partners. 
10 | Prepare for showcase! | |

## Acknowledgements
We are grateful for the help and support from our instructors and organization partners.
* The Accountability Counsel: Samer Araabi and Marisa Lenci
* Google Earth Engine: Marisa Leung, Sai Cheemalapati, Russell Quong, and Christopher Brown
* CS + SG: Grace O'Brien and the teaching team
