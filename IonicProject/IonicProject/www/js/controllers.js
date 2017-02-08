angular.module('myApp', [])
.config(function($httpProvider){

})
.controller('MyCtrl',function($scope,$http){
    $http.get('http://localhost:8080/Words/login.jsp').success(function(resp){
      console.log(resp);
    })
})
.controller('DashCtrl', function($scope) {})
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
//计划
 .controller("PlanList", function($scope,$http){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $scope.sites = {
            顺序 : "0",
            乱序 : "1"
         };
         $scope.liberary = {
            四级 : "四级",
            六级 : "六级"
         };
        $scope.cancel=function()
         {
            self.location='index.html';
         }
        $scope.submit=function(){
        var uname= sessionStorage.getItem("user");
        var postData = "?uname="+uname+"&"+"num="+$scope.num+"&"+"lib="+$scope.lib+"&"+"way="+$scope.way;
        var url = "http://15rq136357.iask.in/RemberWords/InsertPlanServlet.do"+postData;
        $http.post(url).success(function(data){
            var b = data;
            if(b=="true"){
                alert("保存成功");
                self.location='remberWords.html';
            }else{
                alert("修改失败");
            }
        }).error(function() {
            alert("请求失败");
        });
         }
      })

//注册
 .controller("RegistForm", function($scope,$http) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $scope.sites = {
        专科 : "专科",
        本科 : "本科",
        研究生 : "研究生",
        博士生 : "博士生"    
    };
     $scope.cancel=function()
         {
            self.location='index.html';
         }     
   $scope.submit=function()
        {
            var pword1 = $scope.ps1;
            var pword2 = $scope.ps2;
            if(pword1==pword2){
                var regex =/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                var address_email = $scope.email;
                if(regex.test(address_email)){
                     var postData = "?uname="+$scope.uname+"&"+"ps1="+$scope.ps1+"&"+"email="+$scope.email+"&"+"education="+$scope.education;
                    var url = "http://15rq136357.iask.in/RemberWords/RegistServlet.do"+ postData;
                    $http.post(url).success(function(data)
                     {
                         var b=""+data;
                         var t="true";
                         if(b==t){
                            self.location='login.html';
                        }else if(b==1){
                        alert("该用户名已注册，请重新输入"); 
                      }else{
                        alert("注册失败");
                      } 
                 }).error(function(){
                     alert("请求失败");
                 });
               }else{
                alert("邮箱格式不正确");
               }
                }else{
                alert("两次密码匹配，请仔细输入");
            }
       }     
})


//登录
.controller("RegistTest", function($scope){
        $scope.registtest=function(){
          self.location='regist.html';
        }
    })
    .controller("LoginForm", function($scope,$http) {
   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $scope.resetInfo=function()
    {
        $scope.uname="";
        $scope.pword="";
    }
   <!--http://oem-20160424dgu:8080/Login/LoginServlet>
    $scope.submit=function()
    {
        var postData = "?uname="+$scope.uname+"&"+"pword="+$scope.pword;
        var url = "http://15rq136357.iask.in/RemberWords/LoginServlet.do"+ postData;
        $http.post(url).success(function(data)
        {
          var b = ""+data;
          var t = "true";
          if(b==t){
            sessionStorage.setItem("user",$scope.uname);
            sessionStorage.setItem("ps",$scope.pword);
             self.location='index.html';
          }else{
            alert("用户名或密码不正确！请重新输入"); 
          } 
        }).error(function() {
          alert("请求失败");
        });
    }
})


//主页
.controller("Example", function($scope,$http) {
   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
   $scope.English="The lake is like an open book, day like the steady gaze of a reader";
   $scope.Chinese="湖泊像一本翻开的书，白昼像一位读者恒久的凝视";
   $scope.advice="让你第一次听就沦陷其中：Vi Fiinder Hjem---Emilie Moldow(丹麦语 英文版)";
    $scope.SearchWord=function()
    {
        sessionStorage.setItem("word",$scope.word);
        self.location='search.html';
    }
    
    $scope.TestUser=function(){
      var value = sessionStorage.getItem("user");
      var value1 = sessionStorage.getItem("t");
      if(value){
        self.location='remberWords.html';
      }else{
        alert("请先登录");
        self.location='login.html';
      }
    }
    $scope.OurInfo=function(){
      var value = sessionStorage.getItem("user");
      if(value){
        self.location='ionic interface_info.html';
      }else{
        alert("请先登录");
        self.location='login.html';
      }
    }
    window.onload=function()
    {
        var url = "http://15rq136357.iask.in/RemberWords/ExampleServlet.do";
        $http.post(url).success(function(data)
        {
          var arrys = data.split('/');
          $scope.English=arrys[0];
          $scope.Chinese=arrys[1];
          $scope.advice=arrys[2];
        }).error(function() {
          alert("请求失败");
        }); 
    }
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
