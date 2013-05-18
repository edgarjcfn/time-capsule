OAuth2.adapter('twitter', 
  {
    requestToken : "",

    requestTokenUrl : function() {
      return 'https://api.twitter.com/oauth/request_token/' +
      '?oauth_callback=' + this.redirectURL();
    },

    needsRequestToken : function() {
      return true;
    },

    authorizationCodeURL: function(config) {
      return ('https://api.twitter.com/oauth/authorize?'+
        'oauth_consumer_key={{CLIENT_ID}}')
          .replace('{{CLIENT_ID}}', this.clientId);
          // .replace('{{REDIRECT_URI}}', this.redirectURL)
          // .replace('{{API_SCOPE}}', this.permissions);
    },

    clientSecret : function() {
      return 'ZEp4FuJQogaHcuDPSlNFBfFx2lLUqWWY0cMxZIK1HJY';
    },

    clientId : function() {
      return 'G366GM1w1Fj3W8v30AIAEw';
    },

    redirectURL: function(config) {
      return 'http://www.twitter.com/robots.txt';
    },

    parseAuthorizationCode: function(url) {
      // TODO: error handling (URL may have
      // ?error=asfasfasiof&error_code=43 etc)
      return url.match(/[&\?]code=([^&]+)/)[1];
    },

    accessTokenURL: function() {
      return 'https://api.twitter.com/oauth/access_token';
    },

    accessTokenMethod: function() {
      return 'GET';
    },

    accessTokenParams: function(authorizationCode, config) {
      return {
        code: authorizationCode,
        client_id: this.clientId(),
        client_secret: this.clientSecret(),
        redirect_uri: this.redirectURL(config)
      };
    },

    parseAccessToken: function(response) {
      return {
        accessToken: response.match(/access_token=([^&]*)/)[1],
        expiresIn: response.match(/expires=([^&]*)/)[1]
      };
    }, 

    getLastYearsPosts : function(callback) {

      var oauthData = $.parseJSON(localStorage['oauth2_facebook']);
      var graphAPI = "https://graph.facebook.com/me?access_token=" + oauthData.accessToken;

      // Thank you, datejs :)
      var minDate = Date.parse('1 year ago').add(-12).days().getTime() / 1000;
      var maxDate = Date.parse('1 year ago').add(12).days().getTime() / 1000;

      var userFields = [
        'id',
        'name'
      ]

      var imageFields = [
        'created_time',
        'height',
        'width',
        'name',
        'picture',
        'source',
        'link'
      ];

      var statusFields = [
        'message'
      ];

      $.ajax({
        dataType: "json",
        url: graphAPI,
        data: {
          'fields' :  userFields.join() + ',' +
                      'photos.since('+minDate+').until('+maxDate+').fields('+imageFields.join()+'),' + 
                      'statuses.since('+minDate+').until('+maxDate+').fields('+statusFields.join()+')'
        },
        success : function(response) {
            callback(response);
        }
      });
    },
  }
);
