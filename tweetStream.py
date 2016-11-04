import tweepy
import json
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

#Keys
access_token = "Access_Token"
access_token_secret = "Access_Token_Secret"
consumer_key = "Consumer_Key"
consumer_secret = "Consumer_Secret"

#Twitter auth
twitter_auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
twitter_auth.set_access_token(access_token, access_token_secret)

#Twitter API object
twitter_api = tweepy.API(twitter_auth, wait_on_rate_limit_notify=True, retry_count=3, retry_delay=5)

print("######### Twitter Authentication Success ######")

#AWS Keys
AWSElasticPath = "ElasticSearch Node Path"
AWSAccessKey = "Access_Key"
AWSSecretKey = "Secret_Key"
AWSRegion = "us-west-2"

#AWS Auth
awsAuthentication = AWS4Auth(AWSAccessKey, AWSSecretKey, AWSRegion, "es")

print("######### AWS Authientication Success ######")

#Elastic Search
elasticSearch = Elasticsearch(hosts = [{'host': AWSElasticPath, 'port': 443}],
    http_auth = awsAuthentication,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection)

print("######### Elastic initialized ######")


class StreamListener(tweepy.StreamListener):
    def on_data(self, data):
        try:
            tweet = json.loads(data)
            if tweet['coordinates'] is not None:
                tweetText = tweet["text"]
                user_name = tweet["user"]["name"]
                screen_name = tweet["user"]["screen_name"]
                profile_pic = tweet["user"]["profile_image_url"].replace("normal", "bigger")
                link = "www.twitter.com/" + screen_name + "/status/" + str(tweet["id"])
                coordinates = tweet["coordinates"]["coordinates"]

                geo_json_feature = {
                    "geometry": {
                        "type": "Point",
                        "coordinates": coordinates
                    },
                    "properties": {"username": user_name, "screenname": screen_name, "text": tweetText,
                                   "link": link, "profile_img": profile_pic}
                }

                result = elasticSearch.index(index='elasticgeo', doc_type='tweet', id=tweet["id"], body=geo_json_feature)
                print(geo_json_feature)

        except (KeyError, UnicodeDecodeError, Exception) as e:
            pass

    def on_error(self, status_code):
        if status_code == 420:
            print ("Rate Limit")
            return True

def main():
    print("Started")
    stream_listener = StreamListener()
    while True:
        try:
            streamer = tweepy.Stream(twitter_api.auth,listener=stream_listener)
            streamer.filter(locations=[-180, -90, 180, 90], languages=['en'])
        except Exception as e:
            print (e)

if __name__ == '__main__':
    main()