OAuth2.adapter('facebook', 
  {
    authorizationCodeURL: function(config) {
      return ('https://www.facebook.com/dialog/oauth?' +
        'client_id={{CLIENT_ID}}&' +
        'redirect_uri={{REDIRECT_URI}}&' +
        'scope={{API_SCOPE}}')
          .replace('{{CLIENT_ID}}', this.clientId)
          .replace('{{REDIRECT_URI}}', this.redirectURL)
          .replace('{{API_SCOPE}}', this.permissions);
    },

    clientSecret : function() {
      return 'fd813c9bac5c49d7e2d02a386176f1a3';
    },

    clientId : function() {
      return '197666783690495';
    },

    redirectURL: function(config) {
      return 'http://desolate-waters-5944.herokuapp.com/login_successful.htm';
    },

    permissions: function() {
      return 'user_status,user_activities,user_education_history,user_relationships,user_work_history,user_photos';
    },

    parseAuthorizationCode: function(url) {
      // TODO: error handling (URL may have
      // ?error=asfasfasiof&error_code=43 etc)
      return url.match(/[&\?]code=([^&]+)/)[1];
    },

    accessTokenURL: function() {
      return 'https://graph.facebook.com/oauth/access_token';
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
