var app = angular.module("manmaApp");

app.controller('flightCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searchComplete = false;
    $scope.search = function () {

        var src = $scope.src;
        var desti = $scope.desti;
        var seatclass = $scope.seatclass;
        var noofper = $scope.noofper;

        var date = new Date($scope.date);
        var dd = (date.getDate()).toString();     //Accessing DAy,Month Year For the dates
        var mm = (date.getMonth() + 1).toString();
        var yy = (date.getFullYear()).toString();
        var newdate = yy + mm + dd;
        

        sessionStorage.setItem("destination",desti);
    

        getdata(src, desti, newdate, seatclass, noofper);
        $scope.searchComplete = true;
    }
    function getdata(src, desti, newdate, seatclass, noofper) {
        var url = `https://developer.goibibo.com/api/search/?app_id=458906bd&app_key=1be55b0e0a6abb21a6968f9e30a2e3e3&source=${src}&destination=${desti}&dateofdeparture=${newdate}&seatingclass=${seatclass}&adults=${noofper}&counter=0`;

        $http.get(url)
            .then(function (response) {

                $scope.details = response.data.data.onwardflights;
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    $scope.func1 = function () {
        var src1 = $scope.src;
       
        $http.get("airports.json")
            .then(function (responseTXT) {
                for (var i = 0; i < responseTXT.data.length; i++) {
                    if (responseTXT.data[i].city.toUpperCase() === src1.toUpperCase()) {
                        $scope.src = responseTXT.data[i].code;
                        return;
                    }
                }
                })
            .catch(function (err) {
                console.log(err);
            })
    };
    
    $scope.func2 = function () {
        var desti1 = $scope.desti;
       
        $http.get("airports.json")
            .then(function (responseTXT) {
                for (var i = 0; i < responseTXT.data.length; i++) {
                    if (responseTXT.data[i].city.toUpperCase() === desti1.toUpperCase()) {
                        $scope.desti = responseTXT.data[i].code;
                        return;
                    }
                }
                })
            .catch(function (err) {
                console.log(err);
            })
    };
}]);


app.controller("weatherCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.loadComplete = false;
     var city_name=sessionStorage.getItem("destination");
    // var city_name = $storage.destination;

    $http.get("airports.json")
            .then(function (responseTXT) {
                for (var i = 0; i < responseTXT.data.length; i++) {
                    if (responseTXT.data[i].code.toUpperCase() === city_name.toUpperCase()) {
                        $scope.city1 = responseTXT.data[i].city;
                        return;
                    }
                }
                })
            .catch(function (err) {
                console.log(err);
            })

    // console.log(city1);c
    
    $scope.weather = function (city1) {
        
      //  console.log(city);
        var url = 'http://api.apixu.com/v1/forecast.json?key=f29f8d04728047f8aa2125613181611&q=' + city1 + '&days=10';
        //console.log(url);
        $http.get(url)
            .then(function (data) {
                
                $scope.loadComplete = true;
                $scope.city = data.data.location.name;
                $scope.description = data.data.current.condition.text;
                $scope.image = 'http://cdn.apixu.com/weather/64x64/night/122.png';
                $scope.temp_c = data.data.current.temp_c;
                $scope.countryName = data.data.location.country;
                $scope.lat = data.data.location.lat;
                $scope.lon = data.data.location.lon;
                $scope.sunRise = data.data.forecast.forecastday[0].astro.moonrise;
                console.log($scope.sunRise);
                $scope.sunset = data.data.forecast.forecastday[0].astro.sunset;
                console.log($scope.sunset);
                $scope.wind = data.data.current.wind_mph;
                $scope.humidity = data.data.current.humidity;
                $scope.feelsLike = data.data.current.feelslike_c;

                /*---10DAYS FORECAST--*/
                $scope.foreweather = data.data.forecast.forecastday;
                console.log($scope.foreweather);

                sessionStorage.setItem("country",data.data.location.country);

            })

    }

}]);


    // sessionStorage.countryName = "sweden";
app.controller("currencyCtrl", ["$scope", "$http", function ($scope, $http) {
     $scope.country_name =  sessionStorage.getItem("country");
     var countryfrmCode='';
     var countrytoCode='';
        $scope.currency = function () {
            $scope.countryNam = sessionStorage.countryName;
            var url = 'http://data.fixer.io/api/latest?access_key=587c4a2368c099a651b0dda9c3d445d0';
            console.log(url);
            $http.get('http://data.fixer.io/api/latest?access_key=587c4a2368c099a651b0dda9c3d445d0')
                .then(function (data) {
                    {
                        //console.log(data.data.rates);
                        //console.log(data.data);
                    } $scope.fromCurrency = data.data.rates;
                    var curArray = [];
                    var obj = data.data.rates;
                    {
                        //$scope.toCurrencyValue = parseFloat(Object.values(obj));
                        //console.log(fact);
                        //              console.log($scope.amount);
                    } for (let kys in obj) {
                        curArray.push(kys)
                    }
                    $scope.fromC = {
                        model: '',
                        fromCurrency: curArray
                    } //console.log($scope.fromCurrency);
                    $scope.toC = {
                        model: '',
                        toCurrency: curArray
                    }
                });
        }
        $scope.showMe = function () {
            {
                // console.log($scope.amount);
            }
            var result = $scope.fromC.model + "_" + $scope.toC.model;
            var url = "http://free.currencyconverterapi.com/api/v6/convert?q=" + result ;
            $http.get(url)
                .then(function (dataCur) {
                    console.log(dataCur);
                    var something = Object.values(dataCur.data.results);
                    var getValues = something[0]['val'];
                    $scope.toCurrencyValue = $scope.amount * getValues;
                })
            var url1 = "https://free.currencyconverterapi.com/api/v6/countries";
           // console.log(url1);
            $http.get(url1)
                .then(function (data) {
                    var objVal = Object.entries(data.data.results);{
                    // var objArr=objVal[0][1];
                     } console.log(objVal.length);
                    for (let kys = 1; kys <= objVal.length - 1; kys++) {
                        //console.log(objVal[kys][1].id)
                        if (objVal[kys][1].currencyId === $scope.toC.model) {
                            console.log(objVal[kys][1].currencySymbol)
                            console.log(objVal[kys][1].currencyName)
                            $scope.currencyName = objVal[kys][1].currencyName;
                            $scope.currencySymbol = objVal[kys][1].currencySymbol;
                            $scope.countryfrmCode = objVal[kys][1].id;
                            $scope.image = 'assets/img/flag/16/'+$scope.countryfrmCode+'.png';
                        }
                        if (objVal[kys][1].currencyId === $scope.fromC.model) {
                            console.log(objVal[kys][1].currencySymbol)
                            console.log(objVal[kys][1].currencyName)
                            $scope.fromCurrencyName = objVal[kys][1].currencyName;
                            $scope.fromCurrencySymbol = objVal[kys][1].currencySymbol;
                            $scope.countrytoCode = objVal[kys][1].id;
                            $scope.image1 = 'assets/img/flag/16/'+$scope.countrytoCode+'.png';
                           // alert( $scope.image)
                        }
                    }
     
                })
     
              
     
     
        }
     
     }]);
    