# Webiny CMS using Next js.

The nextjs app fetches the content from webiny cms and displays it and as well as create a cms content.

## Installation


Go to ./nextjs-app
```bash
npm install

npm run dev

or
 
npx next run
```

#### cloudsearch +api gateway(CORS)

Used cloudsearch to browse through the data given

#### lambda + api gateway(CORS) + dynamoDB

When creating the cms content, the data is uploaded to dynamoDb via [lambda function](https://github.com/creazer-I/webiny-nextjs/blob/main/db-cloudsearch-item.py)

## License
[MIT](https://choosealicense.com/licenses/mit/)
