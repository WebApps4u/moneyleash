
    moneyleashapp.filter('reverselist', function () {
        function toArray(list) {
            var k, out = [];
            if (list) {
                if (angular.isArray(list)) {
                    out = list;
                }
                else if (typeof (list) === 'object') {
                    for (k in list) {
                        if (list.hasOwnProperty(k)) {
                            out.push(list[k]);
                        }
                    }
                }
            }
            return out;
        }
        return function (items) {
            return toArray(items).slice().reverse();
        };
    })

    moneyleashapp.filter('filtered', function (type) {
        return function (list) {
            var filtered = {};
            angular.forEach(list, function (transaction, id) {
                if (type === 'active') {
                    if (!transaction.iscleared) {
                        filtered[id] = transaction;
                    }
                } else if (type === 'cleared') {
                    if (transaction.iscleared) {
                        filtered[id] = transaction;
                    }
                } else {
                    filtered[id] = transaction;
                }
            });
            return filtered;
        };
    })

    // 
    // http://gonehybrid.com/how-to-group-items-in-ionics-collection-repeat/
    //
    moneyleashapp.filter('groupByMonthYear', function ($parse) {
        var dividers = {};
        return function (input) {
            if (!input || !input.length) return;
            var output = [],
                previousDate,
                currentDate;
            for (var i = 0, ii = input.length; i < ii && (item = input[i]) ; i++) {
                currentDate = moment(item.date);
                if (!previousDate ||
                    currentDate.month() != previousDate.month() ||
                    currentDate.year() != previousDate.year()) {
                    var dividerId = currentDate.format('MMYYYY');
                    if (!dividers[dividerId]) {
                        dividers[dividerId] = {
                            isDivider: true,
                            divider: currentDate.format('MMMM YYYY')
                        };
                    }
                    output.push(dividers[dividerId]);
                }
                output.push(item);
                previousDate = currentDate;
            }
            return output;
        };
    })

    // 
    // http://gonehybrid.com/how-to-group-items-in-ionics-collection-repeat/
    //
    moneyleashapp.filter('groupByDayMonthYear', function ($parse) {
        var dividers = {};
        return function (input) {
            if (!input || !input.length) return;
            var output = [],
				previousDate,
				currentDate;
            for (var i = 0, ii = input.length; i < ii && (item = input[i]) ; i++) {
                currentDate = moment(item.date);
                if (!previousDate || !currentDate.isSame(previousDate)) {
                    var dividerId = moment(currentDate).format('YYYYMMDD') + item.$id;
                    //console.log(dividerId);
                    //console.log(item);
                    if (!dividers[dividerId]) {
                        dividers[dividerId] = {
                            isDivider: true,
                            _id: dividerId,
                            divider: currentDate.format('MMMM DD, YYYY')
                        };
                    }
                    output.push(dividers[dividerId]);
                }
                output.push(item);
                previousDate = currentDate;
            }
            //console.log(output);
            return output;
        };
    })