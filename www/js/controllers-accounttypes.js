

// ACCOUNTS CONTROLLER
moneyleashapp.controller('AccountTypesController', function ($scope, $state, $ionicModal, $ionicListDelegate, $ionicActionSheet, AccountsFactory) {

    $scope.inEditMode = false;
    $scope.editIndex = 0;
    $scope.currentItem = {
        name: "",
        icon: "",
    };

    // SORT
    $scope.SortingIsEnabled = false;
    $scope.reorderBtnText = '';
    $scope.enableSorting = function (isEnabled) {
        $scope.SortingIsEnabled = !isEnabled;
        $scope.reorderBtnText = ($scope.SortingIsEnabled ? 'Done' : '');
    };
    $scope.moveItem = function (accounttype, fromIndex, toIndex) {
        $scope.accounttypes.accounttypes.splice(fromIndex, 1);
        $scope.accounttypes.accounttypes.splice(toIndex, 0, accounttype);
    };

    // SWIPE
    $scope.listCanSwipe = true;
    $scope.closeSwipeOptions = function ($event) {
        $event.stopPropagation();
        var options = $event.currentTarget.querySelector('.item-options');
        if (!options.classList.contains('invisible')) {
            $ionicListDelegate.closeOptionButtons();
        } else {
            //Nothing here yet
        }
    };

    // OPEN ACCOUNT SAVE MODAL 
    $ionicModal.fromTemplateUrl('templates/accounttypesave.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })
    $scope.openEntryForm = function (title) {
        $scope.myTitle = title + " Account Type";
        $scope.modal.show();
    }

    // LIST
    $scope.list = function () {
        $scope.accounttypes = AccountsFactory.getAccountTypes();
    }

    // EDIT
    $scope.editItem = function (index) {
        $ionicListDelegate.closeOptionButtons();
        $scope.inEditMode = true;
        $scope.editIndex = index;
        $scope.currentItem = $scope.accounttypes.accounttypes[index];
        $scope.myTitle = "Edit " + $scope.currentItem.name;
        $scope.modal.show();
    };

    // SAVE
    $scope.SaveItem = function () {
        if ($scope.inEditMode) {
            // edit item
            $scope.accounttypes.accounttypes[$scope.editIndex] = $scope.currentItem;
            $scope.inEditMode = false;
        } else {
            // new item
            if ($scope.accounttypes.hasOwnProperty("accounttypes") !== true) {
                $scope.accounttypes.accounttypes = [];
            }
            $scope.accounttypes.accounttypes.push({
                'name': $scope.currentItem.name, 'Icon': $scope.currentItem.Icon
            });
        }
        $scope.currentItem = {};
        $scope.modal.hide();
    }

    // DELETE
    $scope.deleteItem = function (accounttype, index) {
        // Show the action sheet
        $ionicActionSheet.show({
            destructiveText: 'Delete Account',
            titleText: 'Are you sure you want to delete ' + accounttype.name + '? This will permanently delete the account from the app.',
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
                $scope.accounttypes.accounttypes.splice(index, 1);
                return true;
            }
        });
    };
})
