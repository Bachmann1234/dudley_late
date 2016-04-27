"use strict";angular.module("dudleyApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("dudleyApp").controller("MainCtrl",["$scope","$http",function(a,b){function c(a){var b=new Date;b.setHours(11,19,0);var c=a.sch_dep_dt,e=a.pre_dt;new Date(1e3*c),new Date(1e3*e);return 1e3*c<=b.getTime()&&1e3*e>b.getTime()?d(a):void 0}function d(a){return a.sch_dep_dt<a.pre_dt?[Math.floor((a.pre_dt-a.sch_dep_dt)/60),(a.pre_dt-a.sch_dep_dt)%60]:void 0}function e(a,b){var c,d=[];for(c=0;c<a.length;c++){var e;for(e=0;e<a[c].stop.length;e++)a[c].stop[e].stop_name===b&&d.push(a[c].stop[e])}return d}b.get("http://realtime.mbta.com/developer/api/v2/predictionsbyroute?api_key=wX9NwuHnZU2ToO7GmGR9uw&route=Red&format=json").then(function(b){var d=b.data,f=d.direction[1].trip;a.line="Harvard - Outbound",a.grace_times=[];var g,h=e(f,a.line);for(g=0;g<h.length;g++){var i=c(h[g]);null!=i&&(console.log(i),a.grace_times.push(i))}if(a.grace_times.sort(function(a,b){return a[0]>b[0]}),0!=a.grace_times.length){var j=a.grace_times[0],k=a.grace_times.pop();a.grace=j[0]+" minutues "+j[1]+" seconds - "+k[0]+" minutes "+k[1]+" seconds"}})}]),angular.module("dudleyApp").controller("AboutCtrl",["$scope","$http",function(a,b){a.route_array=[];var c="http://realtime.mbta.com/developer/api/v2/",d="api_key=wX9NwuHnZU2ToO7GmGR9uw";b.get(c+"routes?"+d+"&format=json").then(function(b){var c,d=b.data.mode;for(c=0;c<d.length;c++){var e,f=d[c];for(e=0;e<f.route.length;e++)a.route_array.push({mode:f.mode_name,route_id:f.route[e].route_id,route_name:f.route[e].route_name})}}),a.modes=["Subway","Commuter Rail","Bus","Boat"],a.directions=["Inbound","Outbound"],a.form={},a.submit=function(){console.log(a.form)}}]),angular.module("dudleyApp").run(["$templateCache",function(a){a.put("views/about.html",'<form class="form-submit form-horizontal" name="myForm" ng-submit="submit()"> <div class="form-group"> <label class="control-label col-lg-3" for="transport_mode">Student</label> <div class="col-lg-4"> <input type="text" placeholder="First Name" class="form-control"> </div> <div class="col-lg-4 col-lg-offset-1"> <input type="text" placeholder="Last Name" class="form-control"> </div> </div> <div class="form-group"> <label class="control-label col-lg-3" for="transport_mode">Transportation Mode</label> <div class="col-lg-9"> <select class="form-control" name="transport_mode" ng-model="form.transport" ng-options="mode as mode for mode in modes"> </select> </div> </div> <div class="form-group"> <label class="control-label col-lg-3" for="transport_line">Transportation Line</label> <div class="col-lg-9"> <select class="form-control" name="transport_line" ng-model="form.transport_line" ng-options="route.route_id as route.route_name for route in route_array | filter : form.transport"> </select> </div> </div> <div class="form-group"> <label class="control-label col-lg-3" for="inbound">Inbound/Outbound</label> <div class="col-lg-9"> <select class="form-control" name="inbound" ng-model="form.inbound" ng-options="direction as direction for direction in directions"> </select> </div> </div> <div class="form-group"> <div class="col-lg-9 col-lg-offset-3"> <button type="submit" class="btn btn-primary pull-right">Submit</button> </div> </div> </form>'),a.put("views/main.html",'<div class="panel panel-default"> <div class="panel-heading"><b>My Students</b> Let me see who might be late today! </div> <div class="panel-body"> <p>Top delayed routes:</p> <p>Buses/Subway on the {{line}} line are expected to arrive {{grace}} late.</p> </div> <table class="table"> <thead> <tr> <th>Student</th> <th>Route Status</th> <th>Est. Walking Time</th> </tr> </thead> <tbody> <tr> <td>Jonny Fey</td> <td><span class="label label-success">On Time</span></td> <td>5 minutes</td> </tr> <tr> <td>Tina Taylor</td> <td><span class="label label-danger">Late</span></td> <td>10 minutes</td> </tr> <tr> <td>Edwin Lee</td> <td><span class="label label-success">On Time</span></td> <td>16 minutes</td> </tr> </tbody> </table> </div>')}]);