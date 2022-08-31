# Certifyde

Certifyde is an end to end solution that caters to the needs of both candidates and recruiters. 

For candidates, it offers a way to keep track of their ongoing and completed courses across multiple course platforms i.e coursera, udemy and udacity, and recommends courses based on their interests and previous courses. 

For recruiters,  Certifyde offers a way to view prospective candidates based on area of interest, courses done and also offers a way to contact them. 

The application is developed with a React frontend, and an Amazon Web Services Backend. 

The key AWS components used are S3, API Gateway, Lambda, OpenSearch, DynamoDB, Sagemaker and Simple Email Service. The application mainly deals with two kinds of data, viz. the user data and the course data. 

The user data is used to check for recommendations and for recruiters to contact the user/candidates of Certifyde. 

The recommendations are built on a dataset composed of more than 4300 courses.

## Demo Video

https://www.youtube.com/watch?v=fCCRlZ92HjA

## Cloud Technologies Used
* AWS S3
* AWS API Gateway
* AWS Lambda
* AWS OpenSearch
* AWS DynamoDB
* AWS Sagemaker
* AWS Simple Email Service

## Frontend Technologies
* ReactJS
* HTML
* CSS

## Backend Language
* Python

## Functionalities

Our application can be used by both Recruiters and Candidates. 

The functionalities that can be performed by a candidate is that they can choose their areas of interest, courses completed and ongoing courses. Using these three information we will deliver personalized recommendations to the users. The users can also search for courses of their interest across all platforms. They can also update the status of the courses they are pursuing currently.

The recruiter can enter his or her area of interest and based on that we will match them to potential candidates who are interested in the same area. The recruiters can contact such candidates by just pressing a button on the UI and if the candidate is interested in the opportunity they can carry forward their conversation.

