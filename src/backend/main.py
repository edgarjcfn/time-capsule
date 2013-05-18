import webapp2

from home import Home
from facebook import Facebook
from twitter import Twitter

application = webapp2.WSGIApplication([
    ('/', Home),
    ('/facebook_auth', Facebook),
    ('/twitter_auth', Twitter),
], debug=True) 
