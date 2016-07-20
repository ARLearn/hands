angular.module('ARLearn').directive('arlMessageEditDataCollection',  function() {
    return {
        replace: true,
        restrict: "E",
        scope: true,
        templateUrl: '/templates/directives/message-edit-data-collection.html'
    };
});

angular.module('ARLearn').directive('arlMessageEditMultipleChoice',  function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "="

        },
        controller: ['$scope', function($scope) {
            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return uuid;
            };

            $scope.add = function() {
                $scope.item.answers.push(
                    { "type": "org.celstec.arlearn2.beans.generalItem.MultipleChoiceAnswerItem",
                        "id": generateUUID(),
                        "answer": "",
                        "isCorrect": false
                    }
                );
            };


        }],
        templateUrl: '/templates/directives/message-edit-multiple-choice.html'
    };
});

angular.module('ARLearn').directive('arlMessageEditMultipleChoiceItem',  function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            answer: "=",
            feedback: "=",
            number: "@"

        },
        templateUrl: '/templates/directives/message-edit-multiple-choice-item.html'
    };
});

angular.module('ARLearn').directive('jsonText', function() {
    return {
        restrict: 'A', // only activate on element attribute
        require: 'ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModelCtrl) {

            var lastValid;

            // push() if faster than unshift(), and avail. in IE8 and earlier (unshift isn't)
            ngModelCtrl.$parsers.push(fromUser);
            ngModelCtrl.$formatters.push(toUser);

            // clear any invalid changes on blur
            element.bind('blur', function() {
                element.val(toUser(scope.$eval(attrs.ngModel)));
            });

            // $watch(attrs.ngModel) wouldn't work if this directive created a new scope;
            // see http://stackoverflow.com/questions/14693052/watch-ngmodel-from-inside-directive-using-isolate-scope how to do it then
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                lastValid = lastValid || newValue;

                if (newValue != oldValue) {
                    ngModelCtrl.$setViewValue(toUser(newValue));

                    // TODO avoid this causing the focus of the input to be lost..
                    ngModelCtrl.$render();
                }
            }, true); // MUST use objectEquality (true) here, for some reason..

            function fromUser(text) {
                // Beware: trim() is not available in old browsers
                if (!text || text.trim() === '') {
                    return {};
                } else {
                    try {
                        lastValid = angular.fromJson(text);
                        ngModelCtrl.$setValidity('invalidJson', true);
                    } catch (e) {
                        ngModelCtrl.$setValidity('invalidJson', false);
                    }
                    return lastValid;
                }
            }

            function toUser(object) {
                // better than JSON.stringify(), because it formats + filters $$hashKey etc.
                return angular.toJson(object, true);
            }
        }
    };
});