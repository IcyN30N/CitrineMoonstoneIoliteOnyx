var app = new Vue({
  el: '#app',
  created: function() {
    console.log('created main !');

    window.fbAsyncInit = function() {
      FB.init({
        appId            : '1935977786623831',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
      });
      FB.AppEvents.logPageView();

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          app.have_to_login = false;
        } else if(response.status === 'not_authorized') {
          app.have_to_login = true;
        }
      });

    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  data: {
    title: 'PronounsAndAccordsMatter',
    message: 'This is a minimalist web application using the Facebook API so you can share a pronoun and an accord with your facebook friends.',
    call_to_action_choice: 'Choose a pronom/ an accord to start !',
    call_to_action_connect: 'Click on the button below to connect to Facebook and use the app',
    call_to_action_share: 'Just click the button below and share your pronoun(s) and accord(s) with the people you know ;) !',
    p_subtitle: 'Pick your preferred pronoun',
    a_subtitle: 'Pick your preferred accord',
    have_to_login: '',
    pronouns: [
      'iel',
      'ael',
      'elle',
      'ellui',
      'ielle',
      'ø',
      'ol',
      'ul',
      'il',
      'they',
      'ze',
      'he',
      'she',
      'xe',
      'ae',
      'aelle',
      'al'
    ],
    accords: [
      "e",
      "é",
      "ae",
      "s",
      "xe",
      "ø",
      "m"
    ],
    chosen_p: '',
    chosen_a: '',
    soc_net_feedback: ''
  },
  methods: {
    // ouvre une fenêtre de login FB pour accorder les permissions nécessaires à l'application
    logMeInWithPermissions: function() {
      FB.login(function(response) {
      }, {scope: 'publish_actions'});
      app.have_to_login = false;
    },
    // publie le pronom et accord choisi sur FB
    publishToFB: function() {
      if (app.pronouns.includes(app.chosen_p) && app.accords.includes(app.chosen_a)) {
        FB.api(
          '/me/feed',
          'POST',
          {"message":app.chosen_p + " " + app.chosen_a},
          function(response) {
            if (response.id != undefined && response.id != '') {
              console.log(response.id);
              app.soc_net_feedback = "Status has been published successfully :) !";
            } else {
              app.soc_net_feedback = "A problem happened and the status wasn't published :( !";
            }
          }
        );
      }
      else {
        location.reload(true);
      }
    }
  }
})
