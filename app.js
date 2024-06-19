var app = angular.module('todoApp', []);

app.controller('TodoController', ['$scope', function($scope) {
    // Load todos from local storage
    $scope.loadTodos = function() {
        var todos = localStorage.getItem('todos');
        if (todos) {
            $scope.todos = JSON.parse(todos);
        } else {
            $scope.todos = [];
        }
    };

    // Save todos to local storage
    $scope.saveTodos = function() {
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    // Initialize the todos
    $scope.loadTodos();

    // Add a new todo
    $scope.addTodo = function() {
        if ($scope.newTodo) {
            $scope.todos.push({ text: $scope.newTodo, done: false });
            $scope.newTodo = '';
            $scope.saveTodos();
        }
    };

    // Remove a task
    $scope.removeTask = function(index) {
        $scope.todos.splice(index, 1);
        $scope.saveTodos();
    };

    // Watch for changes in todos to save automatically
    $scope.$watch('todos', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.saveTodos();
        }
    }, true);
}]);