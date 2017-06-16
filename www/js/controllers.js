angular.module('starter.controllers', [])
// /'angularUtils.directives.dirPagination'
.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('TransactionCtrl', function($scope, $stateParams, Chats,$http, $ionicPopup) {
  
  $scope.currentDate = new Date();
  $scope.currentDate2 = new Date();
 
    $scope.datePickerCallback = function (val) {
        if (!val) { 
            console.log('Date not selected');
        } else {
            $scope.start_date = date_conversion(val)
            console.log('Selected date is : ', val);
        }
    };

    $scope.datePickerCallback2 = function (val) {
        if (!val) { 
            console.log('Date not selected');
        } else {
            $scope.trans_end_date = date_conversion(val)
        }
    };

     $scope.showAlert = function(title,msg,action) {
         var alertPopup = $ionicPopup.alert({
           title: title,
           template: '<center>'+msg+'</center>'
         });

         alertPopup.then(function(res) {
           
            switch(action){

            }

         });
    }; 




    $scope.card_num = 8884440700032412
    var trap = function(){
      $trans_card_num = $("#trans_card_num").val();
      $trans_start_date = $("#trans_start_date").val();
      $trans_end_date = $("#trans_end_date").val();



      var new_sdate = new Date($trans_start_date);
      var new_edate = new Date($trans_end_date);
      var timeDiff = Math.abs(new_edate.getTime() - new_sdate.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      var addt = diffDays + 1;
      // else if((Date.parse($trans_end_date) < Date.parse($trans_start_date))) {
      //   $msg = "End date should be greater than Start date";
      //   $return = false;
      // }
      console.log(addt)
      if($trans_card_num == ""){
        $msg = "Please Enter Card Number";
        $return = false;
      }else if($trans_start_date == ""){
        $msg = "Please Enter Start Date";
        $return = false;
      }else if($trans_end_date == ""){
        $msg = "Please Enter End Date";
        $return = false;
      }else if(addt > 32){
        $msg = "Enter date range for 1 month only!";
        $return = false;
      }else{
        $return = true;
      }

      if(!$return){
        $scope.showAlert('Icard Service Portal','<strong style="color:red;">'+$msg+'</strong>','');
      }
      
    }
    var useItems = function(data){
      $scope.datalist = data;
    }

    $scope.submit_transaction = function(){
      trap();
      if($return){
          
          loader('on')
              $data = {
                "cardno": $trans_card_num,
                "sdate": $trans_start_date,
                "edate": $trans_end_date,
              }

              $http({
                url: "http://10.190.2.20/icard_service_portal/content/pages.php?action=display_data",
                method: "POST",
                data: $.param($data),
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                }
              }).success(function(data){
                $scope.datalist = data;
                console.log(data)
                // useItems(data);
                // $scope.$broadcast('scroll.infiniteScrollComplete');
                
                loader('off')
              }).error(function(data){
                console.log(data)
                loader('off')
              })

//              $scope.showAlert('Icard Service Portal','Okay na','');
            }
    }

  


  // $scope.$on('$stateChangeSuccess', function() {
  //   $scope.submit_transaction();
  // });

})
  

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

//     $scope.currentPage = 0;
//     $scope.pageSize = 10;
//     $scope.data = [];
//      $scope.q = '';
//             $scope.data = data;
//                     $scope.getData = function () {

//       return $filter('filter')($scope.data, $scope.q)
//     }
    
//     $scope.numberOfPages=function(){
//         return Math.ceil($scope.getData().length/$scope.pageSize);                
//     }
    
//     for (var i=0; i<65; i++) {
//         $scope.data.push("Item "+i);
//     }
// .filter('startFrom', function() {
//     return function(input, start) {
//         start = +start; //parse to int
//         return input.slice(start);
//     }
// })
