
var moneyleashapp = angular.module('moneyleash.controllers', [])

var url = "https://brilliant-inferno-1044.firebaseio.com";
var fireRef = new Firebase(url);
var fbAuth;

moneyleashapp.constant('FIREBASE_URL', 'https://brilliant-inferno-1044.firebaseio.com')

// APP CONTROLLER : SIDE MENU
moneyleashapp.controller('AppCtrl', function ($scope) {
    $scope.showMenuIcon = true;
})

// INTRO CONTROLLER
moneyleashapp.controller('IntroController', function ($scope, $state) {
    $scope.goToLogIn = function () {
        $state.go('login');
    };
    $scope.goToSignUp = function () {
        $state.go('signup');
    };
})

// LOGIN CONTROLLER
moneyleashapp.controller("LoginController", function ($scope, $rootScope, $firebaseAuth, $state, $ionicPopup) {

    $scope.user = {};
    
    $scope.goToSignUp = function () {
        $state.go('signup');
    };

    $scope.doLogIn = function (user) {

        $rootScope.show('Logging In...');

        fbAuth = $firebaseAuth(fireRef);
        fbAuth.$authWithPassword({
            email: user.email,
            password: user.password
        }).then(function (authData) {
            $state.go('dashboard');
        }).catch(function(error) {
            var alertPopup = $ionicPopup.alert({
                title: 'Oops!',
                template: 'We could not log you in. Please verify that your email and password are correct.'
            });
            alertPopup.then(function (res) {
                //console.log('all is well');
            });
        });
    }
})

//SIGN UP CONTROLLER
moneyleashapp.controller('SignupController', function ($scope, $state) {
    $scope.user = {};

    $scope.user.email = "john@doe.com";

    $scope.doSignUp = function () {
        $state.go('dashboard');
    };

    $scope.goToLogIn = function () {
        $state.go('login');
    };
})

// FORGOT PASSWORD CONTROLLER
moneyleashapp.controller('ForgotPasswordCtrl', function ($scope, $state) {
    $scope.recoverPassword = function () {
        $state.go('accounts');
    };

    $scope.goToLogIn = function () {
        $state.go('login');
    };

    $scope.goToSignUp = function () {
        $state.go('signup');
    };

    $scope.user = {};
})

// DASHBOARD CONTROLLER
moneyleashapp.controller('DashboardCtrl', function ($scope) {
    
})

// ACCOUNTS CONTROLLER
moneyleashapp.controller('AccountsController', function ($scope, $state, $firebaseObject, $firebaseAuth, $ionicModal, $ionicListDelegate, $ionicActionSheet, AccountsFactory, FIREBASE_URL) {

    $scope.account = {
        name: "",
        startbalance: "",
        opendate: "",
        type: ""
    };

    // SORT
    $scope.SortingIsEnabled = false;
    $scope.enableSorting = function (isEnabled) {
        $scope.SortingIsEnabled = !isEnabled;
    };
    $scope.sortThisAccount = function (account, fromIndex, toIndex) {
        $scope.data.accounts.splice(fromIndex, 1);
        $scope.data.accounts.splice(toIndex, 0, account);
    };

    // SWIPE
    $scope.listCanSwipe = true;
    $scope.closeSwipeOptions = function ($event) {
        $event.stopPropagation();
        var options = $event.currentTarget.querySelector('.item-options');
        if (!options.classList.contains('invisible')) {
            $ionicListDelegate.closeOptionButtons();
        } else {
            $state.go('account');
        }
    };

    // EDIT
    $scope.editAccount = function (accountid) {
        fbAuth = fireRef.getAuth();
        if (fbAuth) {
            var test = new Firebase(FIREBASE_URL + '/users/' + fbAuth.uid + '/accounts/' + accountid);
            alert(test.AccountName.$value);
            //$scope.openAccountSave = function () {
            //    $scope.myTitle = "Edit " + $scope.account.name;
            //    $scope.modal.show();
            //}            
        }
    };

    // LIST
    $scope.list = function () {
        fbAuth = fireRef.getAuth();
        if (fbAuth) {
            var syncObject = $firebaseObject(fireRef.child("users/" + fbAuth.uid));
            syncObject.$bindTo($scope, "data");
        }
    }

    // SAVE
    $scope.SaveAccount = function (account) {
        if ($scope.data.hasOwnProperty("accounts") !== true) {
            $scope.data.accounts = [];
        }
        $scope.data.accounts.push({ 'AccountName': account.name, 'StartBalance': account.startbalance, 'OpenDate': account.opendate, 'AccountType': account.type });
        $scope.modal.hide();
    }

    // ACCOUNT SAVE - MODAL 
    $ionicModal.fromTemplateUrl('templates/accountsave.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })

    $scope.openAccountSave = function (title) {
        $scope.myTitle = title + " Account";
        $scope.account.name = "";
        $scope.account.startbalance = "";
        $scope.account.opendate = "";
        $scope.account.type = "";
        $scope.modal.show();
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    // DELETE
    $scope.deleteAccount = function (account, index) {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            destructiveText: 'Delete Account',
            titleText: 'Are you sure you want to delete ' + account.AccountName + '? This will permanently delete the account from the app.',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                //Called when one of the non-destructive buttons is clicked,
                //with the index of the button that was clicked and the button object.
                //Return true to close the action sheet, or false to keep it opened.
                return true;
            },
            destructiveButtonClicked: function () {
                //Called when the destructive button is clicked.
                //Return true to close the action sheet, or false to keep it opened.
                var ref = new Firebase(url);
                var authData = ref.getAuth();
                if (authData) {
                    $scope.data.accounts.splice(index, 1);
                }
                return true;
            }
        });
    };
})

// RECURRING LIST CONTROLLER
moneyleashapp.controller('RecurringListCtrl', function ($scope) {
    
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true

    $scope.recurringlist = [
        { title: 'Recurring1', id: 1 },
        { title: 'Recurring2', id: 2 },
        { title: 'Recurring3', id: 3 },
    ];

    $scope.addRecurringItem = function() {
        $scope.recurringlist.push({title: 'New Recurring', id: 4})
    }
})

// SETTINGS CONTROLLER
moneyleashapp.controller('SettingsController', function ($scope, $ionicActionSheet, $state) {

    $scope.airplaneMode = true;
    $scope.wifi = false;
    $scope.bluetooth = true;
    $scope.personalHotspot = true;

    $scope.checkOpt1 = true;
    $scope.checkOpt2 = true;
    $scope.checkOpt3 = false;

    $scope.radioChoice = 'B';

    $scope.showAccountTypes = function () {
        $state.go('accounttypes');
    };

    // Triggered on a the logOut button click
    $scope.showLogOutMenu = function () {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            //Here you can add some more buttons
            // buttons: [
            // { text: '<b>Share</b> This' },
            // { text: 'Move' }
            // ],
            destructiveText: 'Logout',
            titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                //Called when one of the non-destructive buttons is clicked,
                //with the index of the button that was clicked and the button object.
                //Return true to close the action sheet, or false to keep it opened.
                return true;
            },
            destructiveButtonClicked: function () {
                //Called when the destructive button is clicked.
                //Return true to close the action sheet, or false to keep it opened.
                $state.go('intro');
            }
        });
    };

    // DELETE ALL DATA
    $scope.deleteAllData = function () {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            //Here you can add some more buttons
            // buttons: [
            // { text: '<b>Share</b> This' },
            // { text: 'Move' }
            // ],
            destructiveText: 'Delete All Data',
            titleText: 'Are you sure you want to delete ALL your DATA?',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                //Called when one of the non-destructive buttons is clicked,
                //with the index of the button that was clicked and the button object.
                //Return true to close the action sheet, or false to keep it opened.
                return true;
            },
            destructiveButtonClicked: function () {
                //Called when the destructive button is clicked.
                //Return true to close the action sheet, or false to keep it opened.
                //if (fbAuth) {
                //    var accountPath = fireRef.child("users/" + fbAuth.uid);
                //    //var accountRef = new Firebase(accountPath);
                //    alert(accountPath);
                //    //accountRef.remove();
                //} else {
                //    alert("else part");
                //}
                //$state.go('login');
            }
        });
    };
})

// IMAGE PICKER CONTROLLER
moneyleashapp.controller('ImagePickerCtrl', function ($scope, $rootScope, $cordovaCamera) {

    $scope.images = [];

    $scope.selImages = function () {

        window.imagePicker.getPictures(
			function (results) {
			    for (var i = 0; i < results.length; i++) {
			        console.log('Image URI: ' + results[i]);
			        $scope.images.push(results[i]);
			    }
			    if (!$scope.$$phase) {
			        $scope.$apply();
			    }
			}, function (error) {
			    console.log('Error: ' + error);
			}
		);
    };

    $scope.removeImage = function (image) {
        $scope.images = _.without($scope.images, image);
    };

    $scope.shareImage = function (image) {
        window.plugins.socialsharing.share(null, null, image);
    };

    $scope.shareAll = function () {
        window.plugins.socialsharing.share(null, null, $scope.images);
    };
})