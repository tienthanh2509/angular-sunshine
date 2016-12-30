"use strict";

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};

/**
 * Convert unix timestamp to datetime string
 *
 * @param UNIX_timestamp
 * @returns {string} Date time
 */
var timeConverter = function (UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    return date + ' ' + month + ' ' + year;
};

/**
 * Helper method to provide the icon resource id according to the weather condition id returned
 * by the OpenWeatherMap call.
 * @param weatherId from OpenWeatherMap API response
 * @return string filename for the corresponding icon. ic_unknown if no relation is found.
 */
var getIconResourceForWeatherCondition = function (weatherId) {
    // Based on weather code data found at:
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId <= 232) {
        return 'ic_storm.png'
    } else if (weatherId >= 300 && weatherId <= 321) {
        return 'ic_light_rain.png'
    } else if (weatherId >= 500 && weatherId <= 504) {
        return 'ic_rain.png'
    } else if (weatherId == 511) {
        return 'ic_snow.png'
    } else if (weatherId >= 520 && weatherId <= 531) {
        return 'ic_rain.png'
    } else if (weatherId >= 600 && weatherId <= 622) {
        return 'ic_snow.png'
    } else if (weatherId >= 701 && weatherId <= 761) {
        return 'ic_fog.png'
    } else if (weatherId == 761 || weatherId == 781) {
        return 'ic_storm.png'
    } else if (weatherId == 800) {
        return 'ic_clear.png'
    } else if (weatherId == 801) {
        return 'ic_light_clouds.png'
    } else if (weatherId >= 802 && weatherId <= 804) {
        return 'ic_cloudy.png'
    }
    return 'ic_unknown.png';
};

/**
 * Helper method to provide the art resource id according to the weather condition id returned
 * by the OpenWeatherMap call.
 * @param weatherId from OpenWeatherMap API response
 * @return string filename for the corresponding icon. art_unknown if no relation is found.
 */
var getArtResourceForWeatherCondition = function (weatherId) {
    // Based on weather code data found at:
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId <= 232) {
        return 'art_storm.png';
    } else if (weatherId >= 300 && weatherId <= 321) {
        return 'art_light_rain.png';
    } else if (weatherId >= 500 && weatherId <= 504) {
        return 'art_rain.png';
    } else if (weatherId == 511) {
        return 'art_snow.png';
    } else if (weatherId >= 520 && weatherId <= 531) {
        return 'art_rain.png';
    } else if (weatherId >= 600 && weatherId <= 622) {
        return 'art_snow.png';
    } else if (weatherId >= 701 && weatherId <= 761) {
        return 'art_fog.png';
    } else if (weatherId == 761 || weatherId == 781) {
        return 'art_storm.png';
    } else if (weatherId == 800) {
        return 'art_clear.png';
    } else if (weatherId == 801) {
        return 'art_light_clouds.png';
    } else if (weatherId >= 802 && weatherId <= 804) {
        return 'art_clouds.png';
    }
    return 'art_unknown.png';
};

/**
 * Cấu hình Chart.JS
 * @type {{responsive: boolean, title: {display: boolean, text: string}, tooltips: {mode: string, intersect: boolean}, hover: {mode: string, intersect: boolean}, scales: {xAxes: [*], yAxes: [*]}}}
 */
var chartOptions = {
    responsive: true,
    title: {
        display: true,
        text: 'Sunshine in "Thu Dau Mot"'
    },
    tooltips: {
        mode: 'index',
        intersect: false
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Day'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: '°C'
            }
        }]
    }
};
var chartConfig = {
    type: 'line',
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // stuff data
        datasets: [
            {
                label: "Day",
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [
                    0, 0, 0, 0, 0, 0, 0 // stuff data
                ],
                fill: false
            },
            {
                label: "Night",
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: [
                    0, 0, 0, 0, 0, 0, 0 // stuff data
                ],
                fill: false
            }
        ]
    },
    options: chartOptions
};

/**
 * Cấu hình AngularJS
 * @type {angular.Module}
 */
var app = angular.module('sunShine', ['ngRoute']);
// Định tuyến
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/", {
            templateUrl: "page/welcome.php",
            controller: "forecastDaily"
        })
        .when("/about", {
            templateUrl: "page/about.php"
        })
        .otherwise('/');
}]);

/**
 * Controller xử lý trạng thái navbar
 */
app.controller('headerNavbar', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

/**
 * Controller hiển thị thông tin thời tiết trong 7 ngày
 */
app.controller('forecastDaily', function ($scope, $http) {
    $http.get("api/forecast/daily.json")
        .then(function (response) {
            // Ngày trong tuần, Sun-Sat ~ 0-6
            var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            // Xử lý dữ liệu lấy được từ server
            angular.forEach(response.data.list, function (value, key) {
                // Chuyển unix timestamp thành datetime
                response.data.list[key].friendlyDate = timeConverter(value.dt);
                response.data.list[key].icon = getIconResourceForWeatherCondition(value.weather[0].id);

                // Cập nhật dữ liệu cho biểu đồ, trục y
                chartConfig.data.datasets[0].data[key] = value.temp.day;
                chartConfig.data.datasets[1].data[key] = value.temp.night;

                // Cập nhật lại thứ, trục x
                var a = new Date(value.dt * 1000);
                // var day = a.getDay();
                // console.log(day);
                chartConfig.data.labels[key] = dayOfWeek[a.getDay()];
            });

            // Data binding
            $scope.list = response.data.list;
            $scope.today = {};
            $scope.today.d = dayOfWeek[new Date(response.data.list[0].dt * 1000).getDay()];
            $scope.today.dd = timeConverter(response.data.list[0].dt);
            $scope.today.day = response.data.list[0].temp.day;
            $scope.today.night = response.data.list[0].temp.night;
            $scope.today.art = getArtResourceForWeatherCondition(response.data.list[0].weather[0].id);

            // Render biểu đồ
            var ctx = document.getElementById("canvas");
            window.myLine = new Chart(ctx, chartConfig);
        });
});
