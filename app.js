// wrap the whole thing in an empty function
(function() {

  // var app = angular.module('application name', [dependencies]);
  var app = angular.module('store', ['store-products']);

  // controller for the whole store
  app.controller('StoreController', function() {
    //var store = this;
    //store.products = [];
    this.products = gems;
  });

  // ETSY API Request
  angular.module('etsy', [])
    .controller('FetchController', ['$scope', '$http',
      function($scope, $http) {

        shop_id = 'fiddlefishstore'
        api_key = '&api_key=3ugcu6nyygcbysomqa2ed2ja';
        fields = '&fields=title,url,price,quantity,description';
        limit = '&limit=100';
        includes = '&includes=MainImage';
        callback = '&callback=JSON_CALLBACK';
        etsyURL = 'https://openapi.etsy.com/v2/shops/'
          +shop_id
          +'/listings/active.js?method=GET'
          +api_key
          +fields
          +limit
          +includes
          +callback    

        $http.jsonp(etsyURL).
          success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            console.log('status:');
            console.log(status);
            console.log('data response:');
            console.log(data);
          }).
          error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
      
  }]);


  // controller for the reviews
  app.controller('ReviewController', function(){
    this.review = {};
    this.addReview = function(product){
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };
  });

  var gems = [
    { 
      name: 'Azurite', 
      price: 2.95, 
      description: 'This little gemmy went to market.',
      canPurchase: true, 
      solOut: false,
      images: [
        'img/javascript.png', 
        'img/jquery.png', 
        'img/coffeescript.png'
      ],
      specs: 'Some specs go here.',
      reviews: [{
          body: 'This gem is so sweeeet!',
          stars: '2',
          author: 'joe@schmoe.com',
        }]
    },
    { 
      name: 'Bloodstone', 
      price: 5.95, 
      description: 'This little gemmy came home.',
      canPurchase: true, 
      solOut: false,
      images: [
        'img/css3.png', 
        'img/less.png', 
        'img/sass.png'
      ],
      specs: 'Spectators n such.',
      reviews: [{
          body: 'YOLO, gem. Nahmean?',
          stars: '4',
          author: 'guy@smiley.com',
        }]
    },
    { 
    name: 'Zircon', 
    price: 3.95, 
    canPurchase: true, 
    description: 'This little gemmy I don\'t know.',
    solOut: false,
    images: [
        'img/ruby.png',
        'img/rails.png',
        'img/rspec.png' 
      ],
      specs: 'More spectaclees.',
      reviews: [{
          body: 'OMG this gem is a GEM.',
          stars: '5',
          author: 'person@email.com',
        }, {
          body: 'Ohhh boy Here we go.',
          stars: '1',
          author: 'dude@wheresmycar.com',
        }]
    }
  ];
})();