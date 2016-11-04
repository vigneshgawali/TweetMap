import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from requests_aws4auth import AWS4Auth
from django.views.decorators.http import require_GET
from elasticsearch import Elasticsearch, RequestsHttpConnection
from django.contrib.staticfiles.storage import staticfiles_storage

#Setup AWS
AWSElasticPath = "ElasticSearch Node Path"
AWSAccessKey = "Access_Key"
AWSSecretKey = "Secret_Key"
AWSRegion = "us-west-2"

awsAuthentication = AWS4Auth(AWSAccessKey, AWSSecretKey, AWSRegion, "es")

print("######### Authientication Success ######")

#Amazon Elastic Search initialization
elasticSearch = Elasticsearch(hosts = [{'host': AWSElasticPath, 'port': 443}],
    http_auth = awsAuthentication,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection)

print("######### Elastic initialized ######")

# Create your views here.

def home(request):
    return render(request, "CoreApp/index.html");

def map(request):
    return render(request, "CoreApp/home.html")


@require_GET
def keywordSelect(request):

    result_data = {
        "type": "FeatureCollection",
        "features": []
    }

    print("search query: " + str(request.GET['keyword']))
    searchKeyword = str(request.GET['keyword'])

    if searchKeyword is None or searchKeyword == '' or searchKeyword == 'All':
        elasticQuery = {'match_all':{}}
    else:
        elasticQuery = {"query_string": {"query": searchKeyword.lower() } }

    #searchResult = elasticSearch.search(index="elasticindex", body={"size": 3000, "query": elasticQuery})
    searchResult = elasticSearch.search(index="elasticgeo", body={"size": 3000, "query": elasticQuery})

    try:
        for entry in searchResult['hits']['hits']:
            result = entry['_source']
            if 'query' not in str(result):
                result_data['features'].append(result)

    except KeyError:
        print("No Results found")

    print(len(result_data['features']))
    return HttpResponse(json.dumps(result_data), content_type="application/json")


@require_GET
def geoSpatialSearch(request):

    print("Enter Spatial")
    result_data = {
        "type": "FeatureCollection",
        "features": []
    }

    elasticQuery = {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "1000km",
                    "geometry.coordinates" : [float(request.GET['lng']),float(request.GET['lat'])]
                }
            }
        }
    }

    print(request.GET['lat']+" "+request.GET['lng'])

    searchResult = elasticSearch.search(index="elasticgeo", body={"size": 10000, "query": elasticQuery})

    try:
        for entry in searchResult['hits']['hits']:
            result = entry['_source']
            if result is not None and 'query' not in str(result):
                result_data['features'].append(result)

    except KeyError:
        print("No Results found")

    print(len(result_data['features']))
    return HttpResponse(json.dumps(result_data), content_type="application/json")