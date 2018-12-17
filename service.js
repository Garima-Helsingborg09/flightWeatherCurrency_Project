var app = angular.module("manmaApp");

app.factory("getWeather", ['$http', function ($http) {
    var weather = {
        inputWeather: function (city) {
            var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' +
            '&appid=6b9fa96839b340590526fdf6c435ef7d';
            console.log(url);
             $http.get(url)
                .then(function (data) {
                    return data;
                })
        }
    }

    return weather;
}]);