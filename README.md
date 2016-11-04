# TweetMap

http://twitmap.7fh3mzmqid.us-west-2.elasticbeanstalk.com/

TweetMap is a web application which uses Twitter Streaming API to get tweets with geolocation to plot the tweets on a map.
This application makes use of:
- Google Map API: for plotting the tweets on a map
- Elastic Search: for efficient searching of tweets based on keywords stored in JSON format on AWS Elastic Search Service

This application is created using Python Django framework and hosted on AWS BeanStalk.

Steps to run the project:
- Download the project
- Run manage.py file --> python manage.py runserver
