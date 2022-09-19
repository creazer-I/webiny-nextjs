# Webiny CMS using Next js.

The nextjs app fetches the content from webiny cms and displays it and as well as create a cms content.

## Installation


Go to ./nextjs-app
```bash
npm install

npm run dev

or
 
npx next dev
```

#### cloudsearch +api gateway(CORS)

Used cloudsearch to browse through the data given 


Follow the docs below to create an api gateway for cloudsearch and also enable cors

1. [Api Gateway for Cloudsearch](https://docs.aws.amazon.com/cloudsearch/latest/developerguide/api-gateway.html)
2. [Enable cors](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors-console.html)

#### lambda + api gateway(CORS) + dynamoDB

When creating the cms content, the data is uploaded to dynamoDb via [lambda function](https://github.com/creazer-I/webiny-nextjs/blob/main/db-cloudsearch-item.py)


Create an api gateway trigger for the above lambda function 

1. [Api gateway for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)
2. [Enable cors](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors-console.html)


### Http Client(AXIOS)
Here I'm using axios http client to GET and POST request

Here's a example of POST request
this sends the title and description for the lambda function as a json body

fetch it from an event  

```
### Here's a example of POST event 
this sends the title and description for the lambda function as a json body.
Then the api gateway triggers ###
  
 axios.post('https://your-post-api-url', {
      title: title.value,
      description: desc.value
    })
```
``` 
### A GET request ###
axios.get('https://restcountries.com/v3.1/all')
```


### Webiny(CMS and Api) 
Here I'm Using [Apollo graphql client](https://www.apollographql.com/docs/react/) to CRUD in web app

```
Graphql query to list out data 
// here I'm listing out casestudy model
// My model contains Image,Title and a description

{
  listCasestudymodels{
    data{
      image
      id
      title
      description
    }
  }
}
```

```
Using Graphql mutations to CRUD

Mutation Format to create

mutation createCaseStudymodel($title :String!,
  $desc: String!){
    createCasestudymodel(data:{
      title: $title
      description : $desc
    }){
      data{
        title
	  description
        createdBy{
          id
          type
        }
      }
    }
  }


// for webiny api playground 

Query Variables
format
{
  "title" : "Hello" ,
  "desc": "world"
  
}

```

end of the world.
