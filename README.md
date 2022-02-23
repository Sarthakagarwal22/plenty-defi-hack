# DeFining Art
Our plenty DeFi hackathon project

This project is made for people who love the governance part of blockchains. In this project, we have used an AI model to generate images based on tweets. We get these tweets based on predefined and randomly placed hashtags for every day of an year. We fetch these tweets from twitter developer apis and run some basic filters on them to get text for ai to generate random images on. These images are then stored in IPSF. When a user comes to our website, they connect their wallet, click on get today's AQ to get the AQ equal to the amount of xPLENTY they have in their wallet. They can then scroll through all the images that are part of today's generated images. The user can vote on image they like the most and they think, can fetch maximum amount once its converted into an NFT and listed on NFT selling sites. At the end of the day, we get which image was voted most by all the users and then we mint this image as NFT. Once the NFT is auctions, the earnings are used to buy plenty to burn them.

Website - https://elastic-lamarr-f4a879.netlify.app/
Smart Contract - KT1VVvsMh8pbZhVrjdZpsx6D3w9Jd7LMvkQ4

##Building AI
- Copy the contents of the text 2 image.ipynb file and put them in google collab. Run the 1st block, then 2nd block, then 5th block, then uninstall and re-install openCV-contrib, then restart runtime and then run 3rd block. You will get a ngrok url.

##Deploying Contract
- The contract is working end to end, you can paste it on smartpy or any other website and deploy it

##Building Frontend
- yarn install
- npm start

##Building Backend
- yarn install
- npm start
