# NeetCode Scraper to Notion
This project uses **Puppeteer** to scrape problems from [NeetCode](https://neetcode.io/practice) and sends it to a Notion database via the **Notion API**.

### What It Does
* Scrapes all Leetcode problems listed under the NeetCode 250 tab
* Extracts
  - Problem Name
  - URL
  - Pattern (e.g., Two Pointers, Trees)
  - Difficulty (Easy/Medium/Hard)
* Pushes this data into a Notion Problem Tracker database
* Each problem is linked to its pattern using Notion relations (to another database)

### Notion Setup
1. Patterns Table Database
   * Properties:
      - Pattern (Property Type: Text)
      - Problems (Property Type: Relation, Related to: Problems Log)
      - Any extra you want to add!
2. Problems Log Table Database
   * Properties:
      - Problem Name (Property Type: Title)
      - URL (Property Type: URL)
      - Difficulty (Property Type: Select, Options: Easy, Medium, Hard)
      - Pattern (Property Type: Relation, Related to: Patterns)
    
3. Use Notion's [Getting Started Guide](https://developers.notion.com/docs/getting-started) to get set up to use Notion's API.
Import and initialize a client using an **integration token** or an OAuth **access token**.

### Getting Started
Prerequistes
* Node.js installed
* Notion Integration + API Key
* Pattern and Problem Log database IDs

Create .env file
```
NOTION_KEY=your_notion_secret_key
NOTION_DATABASE_ID=your_problems_database_id
RELATION_DATABASE_ID=your_patterns_database_id
```
Run the scraper
```
node index.js
```

### Extra Stuff I did
I primarily created this in an effort to start using Notion to keep track of my Leetcode. But to also implement the spaced repition, where I redo problems I've reviewed. This is to help make sure I sustain these patterns.

The problem logs database includes the following:
- Reviewed Count (Property Type: text), the amount of times you've reviewed the problem
- Last Reviewed (Property Type: date), the date you reviewed it
- Next Review (Property Type: formula), the next time you will review it
  ```
  if(
  toNumber(prop("Reviewed Count")) <= 1,
  dateAdd(prop("Last Reviewed"), 1, "days"),
  dateAdd(
    prop("Last Reviewed"),
    floor(pow(2.2, toNumber(prop("Reviewed Count")) - 1)),
    "days"
   )
  )
  ```
So, if you've reviewed the problem, _Contains Duplicates_ for the first time, you will input 1 into _Reviewed Count_. Input the date you did it in _Last Reviewed_, this will calculate the next time you will review it. The date will exponentially increase as you review it more.

You can add a Calendar view within the Problem Log to visually see when you'll be reviewing problems. As well as add another Table view. The extra Table view I've named Review Today and filter it for property _Next Review_ for today.
