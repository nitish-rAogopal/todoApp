var app = angular.module('todoApp', []);

app.controller('TodoController', ['$scope', function($scope) {
    // Initialize error message
    $scope.errorMessage = '';

    // Load todos from local storage
    $scope.loadTodos = function() {
        try {
            var todos = localStorage.getItem('todos');
            if (todos) {
                $scope.todos = JSON.parse(todos);
            } else {
                $scope.todos = [];
            }
        } catch (error) {
            $scope.errorMessage = 'Error loading tasks from local storage';
            console.error('Error loading tasks from local storage:', error);
        }
    };

    // Save todos to local storage
    $scope.saveTodos = function() {
        try {
            localStorage.setItem('todos', JSON.stringify($scope.todos));
            $scope.errorMessage = '';
        } catch (error) {
            $scope.errorMessage = 'Error saving tasks to local storage';
            console.error('Error saving tasks to local storage:', error);
        }
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
