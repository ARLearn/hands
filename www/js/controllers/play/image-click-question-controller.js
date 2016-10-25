angular.module('ARLearn').controller('ImageClickQuestionController', function ($scope ) {


    //$(function() {
    //    $("#test").click(function(e) {
    //        var offset = $(this).offset();
    //        var relativeX = (e.pageX - offset.left) / $(this).width() *100;
    //        var relativeY = (e.pageY - offset.top) / $(this).height()*100;
    //
    //
    //        $scope.relativeX = relativeX;
    //        //$(".position").html("<b>x "+relativeX+':'+ e.pageX+ ':'+offset.left+"</b><br>"+
    //        //    "<b>y "+relativeY+':'+ e.pageY+ ':'+offset.top+"</b>")
    //    });
    //});

    $scope.click = function(x,y){
        console.log("relx "+x +" y "+y);

        $scope.item.zones.forEach(function(zone){
            console.log(zone);
            console.log(zone.relativeX - zone.radius);
            console.log(zone.relativeX + zone.radius);
            if ((zone.relativeX - zone.radius < x) && (x < zone.relativeX + zone.radius)){
                if ((zone.relativeY - zone.radius < y) && (y < zone.relativeY + zone.radius)){
                    console.log('hurray');
                    $("#test").parent().append("<img id='v1' src='/images/valid.png'>")
                    $('#v1').css({ position: "absolute",
                        top:"200px", left:"200px", width: 50, height: 50, 'z-index':999})
                }

            }
        });
    };




});
