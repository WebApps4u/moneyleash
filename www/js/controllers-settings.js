
// ACCOUNT PREFERENCES CONTROLLER
moneyleashapp.controller('AccountPreferencesController', function ($scope, $state, $ionicHistory, PickTransactionTypeService) {

    $scope.TransactionTypeList = [
        { text: 'Income', value: 'Income' },
        { text: 'Expense', value: 'Expense' },
        { text: 'Transfer', value: 'Transfer' }];
    $scope.currentItem = { typedisplay: PickTransactionTypeService.typeSelected };
    $scope.itemchanged = function (item) {
        PickTransactionTypeService.updateType(item.value);
        $ionicHistory.goBack();
    };

})

// SETTINGS CONTROLLER
moneyleashapp.controller('SettingsController', function ($scope, $rootScope, $state, $ionicActionSheet, $translate, $ionicHistory) {

    // DUMMY SETTINGS
    $scope.airplaneMode = true;
    $scope.wifi = false;
    $scope.bluetooth = true;
    $scope.personalHotspot = true;
    $scope.checkOpt1 = true;
    $scope.checkOpt2 = true;
    $scope.checkOpt3 = false;
    $scope.radioChoice = 'B';

    // Triggered on a the logOut button click
    $scope.showLogOutMenu = function () {

        // Show the action sheet
        $ionicActionSheet.show({
            destructiveText: 'Logout',
            titleText: 'Are you sure you want to logout?',
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
                $ionicHistory.clearCache();
                $state.go("intro");
            }
        });
    };

    // DELETE ALL DATA
    $scope.deleteAllData = function () {

        // Show the action sheet
        $ionicActionSheet.show({
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