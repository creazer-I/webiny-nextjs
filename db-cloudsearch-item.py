import json
import boto3
import os
import random

def lambda_handler(event, context):
    load = json.loads(event['body'])
    uid = str(random.randrange(19999999, 100000000))
    titles = load['title']
    desc = load['description']
  
    client = boto3.client('dynamodb')

    response = client.put_item(
    Item={
        'id': {
            'S' : uid
        },
        'title': {
            'S': titles,
        },
        'description': {
            'S': desc,
        }
    },
    ReturnConsumedCapacity='TOTAL',
    TableName='cloudsearchDb',
)
    
    print(response)


    
