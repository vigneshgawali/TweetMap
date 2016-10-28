
import json
from datetime import datetime
from requests_aws4auth import AWS4Auth
from elasticsearch import Elasticsearch, RequestsHttpConnection

AWSElasticPath = "search-vgtweetmap-uxatwgtlkma5bxgfyn7fdlza2y.us-west-2.es.amazonaws.com"
AWSAccessKey = "AKIAJEJEZLEJMKV2FOBQ"
AWSSecretKey = "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"
AWSRegion = "us-west-2"

awsAuthentication = AWS4Auth(AWSAccessKey, AWSSecretKey, AWSRegion, "es")

print("######### Authientication Success ######")

#Amazon Elastic Search initialization
es = Elasticsearch(hosts = [{'host': AWSElasticPath, 'port': 443}],
    http_auth = awsAuthentication,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection)

print("######### Elastic initialized ######")

#es = Elasticsearch()

# es.delete_by_query(index='elasticindex',doc_type='tweet', body={"query": {"match_all": {}}})
# print("Records deleted")
#
# file = open('tweetfile10k.json','r')
# count = 0
# result = {}
# for line in file:
#     tweet = json.loads(line)
#
#     tweetText = tweet["text"]
#     user_name = tweet["user"]["name"]
#     screen_name = tweet["user"]["screen_name"]
#     profile_pic = tweet["user"]["profile_image_url"].replace("normal","bigger")
#     link = "www.twitter.com/" + screen_name + "/status/" + str(tweet["id"])
#     coordinates = tweet["coordinates"]["coordinates"]
#
#     geo_json_feature = {"geometry": {"type": "Point", "coordinates": coordinates},
#                         "properties": {"username": user_name, "screenname": screen_name, "text": tweetText,
#                                        "link": link, "profile_img": profile_pic}}
#
#     result = es.index(index='elasticindex', doc_type='tweet', id=tweet["id"], body=geo_json_feature)
#     count+=1
#     if count %100 == 0:
#         print(count)
#         if(count == 3000):
#             break

keyword = ''
if keyword is None or  keyword == '':
    res = es.search(index="elasticindex", body={"size": 10000, "query":{"match_all":{}}})
else:
    query = {"query_string": {"query": keyword } }
    res = es.search(index="elasticindex", body={"size": 10000, "query": query})


print(len(res['hits']['hits']))
for hit in res['hits']['hits']:
    print(hit['_source'])

print("Done!!")