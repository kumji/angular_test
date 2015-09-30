
module.exports = function(app) {
  app.controller('StudentsController', ['$scope', '$http', function($scope, $http) {
    $scope.students = [];

    $scope.getAll = function() {
      $http.get('/api/students')
        .then(function(res) {
          $scope.students = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createStudent = function(student) {
      $http.post('/api/students', student)
        .then(function(res) {
          $scope.students.push(res.data);
          $scope.newStudent = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateStudent = function(student) {
      student.status = 'pending';
      $http.put('/api/students/' + student._id, student)
        .then(function(res) {
          delete student.status;
          student.editing = false;  
        }, function(res) {
          console.log(res);
          student.status = 'failed';
          studnet.editing = false;
        });
    };

    $scope.removeStudent = function(student) {
      student.status = 'pending';
      $http.delete('/api/students/' + student._id)
        .then(function() {
          $scope.students.splice($scope.students.indexOf(student), 1);
        }, function(res) {
          student.status = 'failed';
          console.log(res);
        });
    };
  }]);
};