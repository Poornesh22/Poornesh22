
## Project Description

This project is developed in Next.js a framework of javascript in which frontend and backend is developed at one place. This website is responsive as mentioned in assignment.

## Project Setup

First download and install Node.js in your system. Then

 ## Database (MongoDB)
 First download and install MongoDB in your system and then run this command (npm install mongodb) and create a database ("Portfolio-Analysis") and create a collection in it ("portfolio-data") and then open the mongodb shell and run the following command to add the dummy data .

 1 - db["portfolio-data"].insertOne({name : "daily-updates", values : [
    { "date": "2024-01-01", "update": "NASDAQ rose by 1.2% as tech stocks rebounded." },
    { "date": "2024-01-02", "update": "S&P 500 gained 0.8% on strong retail performance." },
    { "date": "2024-01-03", "update": "Bitcoin dropped 2.5% after regulatory news." },
    { "date": "2024-01-04", "update": "Gold prices rose by 0.7% amid economic uncertainty." },
    { "date": "2024-01-05", "update": "Tesla stock surged 5% after record quarterly sales." },
    { "date": "2024-01-06", "update": "Crude oil prices declined by 1.3% on oversupply concerns." },
    { "date": "2024-01-07", "update": "Dow Jones rose by 0.5% as financial stocks rallied." },
    { "date": "2024-01-08", "update": "Ethereum gained 3.4% after DeFi adoption surged." }
  ]})

  2 - db["portfolio-data"].insertOne({name : "Strategy", values : [
    {
      "strategy_name": "Momentum Strategy",
      "roi": 15.2,
      "cagr": 12.4,
      "drawdown": 8.5,
      "description": "Focuses on stocks with strong upward price trends."
    },
    {
      "strategy_name": "Value Investing",
      "roi": 9.8,
      "cagr": 7.9,
      "drawdown": 6.3,
      "description": "Invests in undervalued stocks with growth potential."
    },
    {
      "strategy_name": "Growth Investing",
      "roi": 18.7,
      "cagr": 14.3,
      "drawdown": 10.4,
      "description": "Focuses on companies expected to grow faster than the market."
    },
    {
      "strategy_name": "Dividend Strategy",
      "roi": 7.4,
      "cagr": 6.5,
      "drawdown": 4.8,
      "description": "Targets stocks with regular and high dividend payouts."
    },
    {
      "strategy_name": "Balanced Portfolio",
      "roi": 10.1,
      "cagr": 8.2,
      "drawdown": 5.9,
      "description": "A mix of equities and bonds for moderate growth."
    }
  ]})

  3 - db["portfolio-data"].insertOne({name : "portfolio", values : [{
    total_value: "123000",
    daily_pl: "2700",
    growth :  [
    { "date": "2024-01-01", "value": 100000 },
    { "date": "2024-02-01", "value": 102500 },
    { "date": "2024-03-01", "value": 104200 },
    { "date": "2024-04-01", "value": 106000 },
    { "date": "2024-05-01", "value": 107800 },
    { "date": "2024-06-01", "value": 110000 },
    { "date": "2024-07-01", "value": 112500 },
    { "date": "2024-08-01", "value": 114000 },
    { "date": "2024-09-01", "value": 116700 },
    { "date": "2024-10-01", "value": 118000 },
    { "date": "2024-11-01", "value": 120300 },
    { "date": "2024-12-01", "value": 123000 }
  ],}]}]

 ## NEXT>>
 Clone the code from my github profile ( https://github.com/Poornesh22/Poornesh22.git ) Run the following commands
 
 1 - git clone https://github.com/Poornesh22/Poornesh22.git     
 
 2 - cd Poornesh22         
 
 3 - git checkout PortDash

 by running above three commands you completely clone this project.

 ## NEXT>>
 Run command:
 1 - npm install

 Now create a file (.env.local) and add this (MONGODB_URI = "mongodb://localhost:27017/") in the file.

 ## Run the project
 Run the command -> npm run dev

 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.




