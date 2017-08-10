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
          console.log("this user is connected !");
          console.log(response);
          app.have_to_login = false;
          app.publishToFB();
        } else if(response.status === 'not_authorized') {
          console.log("this user isn't connected !");
          console.log(response);
          app.have_to_login = true;
          app.logMeInWithPermissions();
          app.publishToFB();
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
    title: 'This is a first importance title like - Iolite are not well known',
    message: 'This is a small text about the use of this web app like - iolites have a beautiful color',
    subtitle: 'This is a secondary title like - iolite mines',
    p_subtitle: 'This is a ternary title like - iolite identification',
    a_subtitle: 'This is another ternary title like - iolite chemical composition',
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
    chosen_combo: ''
  },
  methods: {
    // assemble chosen_p & chosen_a
    makeTheCombo: function() {
      accord = this.chosen_a
      pronoun = this.chosen_p.concat(" ")
      new_combo = pronoun + accord
      return this.chosen_combo = new_combo
    },
    // ouvre une fenêtre de login FB pour accorder les permissions nécessaires à l'application
    logMeInWithPermissions: function() {
      FB.login(function(response) {
      }, {scope: 'publish_actions'});
    },
    // publie chosen_combo sur FB
    publishToFB: function() {
      FB.api(
        '/me/feed',
        'POST',
        {"message":app.chosen_combo},
        function(response) {
          // Insert your code here
        }
      );
    }
  }
})
