<div class="row" ng-controller="forecastDaily">
    <div class="col-md-6">
        <div style="padding-left: 6rem; padding-right: 6rem;">
            <img class="float-xs-right" alt="Weather icon" ng-src="assets/img/icon/{{ today.art }}" width="128">
            <p>Today, {{ today.d }} {{ today.dd }}</p>
            <h1>{{ today.day }}°C</h1>
            <h2>{{ today.night }}°C</h2>
        </div>
        <hr>
        <canvas id="canvas"></canvas>
    </div>

    <div class="col-md-6">
        <div id="tbl_weatherList">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>##</th>
                    <th>Day</th>
                    <th>Night</th>
                    <th>Humidity</th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="i in list">
                    <td><img alt="{{ i.iconUrl }}"
                             ng-src="assets/img/icon/{{ i.icon }}"
                             show-on-load>
                    </td>
                    <td>{{ i.friendlyDate }}</td>
                    <td>{{ i.temp.day }}°C</td>
                    <td>{{ i.temp.night }}°C</td>
                    <td>{{ i.humidity > 0 ? i.humidity + '%' : 'N/a' }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
