<!DOCTYPE html>
<html lang="en" ng-app="sunShine">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>AngularJS Quickstart</title>

    <!-- Bootstrap -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <link href="assets/css/app-core.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<nav ng-controller="headerNavbar" class="navbar navbar-light navbar-sticky-top bg-blue" style="margin-bottom: 1rem;">
    <div class="container">
        <a class="navbar-brand" href="#">
            <img src="assets/img/logo.png" width="30" height="30" alt="Logo">
            Sunshine
        </a>

        <ul class="nav navbar-nav float-xs-right">
            <li class="nav-item" ng-class="{ active: isActive('/')}">
                <a class="nav-link" href="#!/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item" ng-class="{ active: isActive('/about')}">
                <a class="nav-link" href="#!/about">About</a>
            </li>
        </ul>
    </div>
</nav>

<div class="container">
    <div ng-view></div>
</div> <!-- /container -->

<footer class="footer">
    <div class="container clearfix">
        <p class="float-xs-left">Designed by
            <a target="_blank" href="https://d13ht01.tk/?utm_source=angular-sunshine&utm_medium=footer&utm_campaign=product">PT Studio</a>.
        </p>
        <p class="float-xs-right">
            Built with <i class="fa fa-heart text-danger"></i> by <a href="http://github.com/tienthanh2509" target="_blank">Tiến Thành</a>
        </p>
    </div>
</footer>

<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-route/angular-route.min.js"></script>
<script src="bower_components/chart.js/dist/Chart.bundle.min.js"></script>

<script src="assets/js/app-core.js"></script>

</body>
</html>
