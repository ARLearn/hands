angular.module('ARLearn').controller('GamesGraphController', function ($scope, $sce, $routeParams, GeneralItemService, GameService, config, $uibModal) {

    $scope.nodes = new vis.DataSet([

    ]);
    $scope.edges = new vis.DataSet([

    ]);
    var node = {
        id:0,
        label: 'start run'
    };
    var idGenerator = -1;
    $scope.nodes.add(node);

    function createNodes(dependency, fromId){
        if (dependency.type == 'org.celstec.arlearn2.beans.dependencies.AndDependency'){
            var node = {
                id:idGenerator--,
                label: 'AND',
                color: 'red'
            };
            $scope.nodes.add(node);
            var newEdge = {from: fromId, to: node.id, arrows:'to', label:''};

            $scope.edges.add(newEdge);
            for (var i =0; i< dependency.dependencies.length;i++){
                var dep = dependency.dependencies[i];
                createNodes(dep, node.id);
            }
        } else if (dependency.type == 'org.celstec.arlearn2.beans.dependencies.ActionDependency'){
            var newEdge = {from: fromId, to: dependency.generalItemId, arrows:'to', label:dependency.action};

            $scope.edges.add(newEdge);
        }
    }

    GeneralItemService.loadItems($routeParams.gameId).then(function(data){

        if (data.error) {
            $scope.showNoAccess = true;
        } else {
            $scope.show = true;
        }
        $scope.items = data;



        for (var gameId in data) {

            var node = {
                id:data[gameId].id,
                label: data[gameId].name
            };
            $scope.nodes.add(node);
            if (data[gameId].dependsOn){

                createNodes(data[gameId].dependsOn, data[gameId].id);
                //if (data[gameId].dependsOn.generalItemId){
                //    var newEdge = {from: data[gameId].id, to: data[gameId].dependsOn.generalItemId, arrows:'to', label:data[gameId].dependsOn.action};
                //
                //    $scope.edges.add(newEdge);
                //
                //} else {
                //    createNodes(data[gameId].dependsOn);
                //}
            } else {
                var newEdge = {from: 0, to: data[gameId].id, arrows:'to', label:''};

                $scope.edges.add(newEdge);
            }

        }

    });





    $scope.network_data = {
        nodes: $scope.nodes,
        edges: $scope.edges
    };
    $scope.network_options = {

        physics:{
            stabilization: true
        }

    };

    //$scope.onNodeSelect = function(properties) {
    //    var selected = $scope.task_nodes.get(properties.nodes[0]);
    //    console.log(selected);
    //};


});