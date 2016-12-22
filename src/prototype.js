'use strict';

var storage = function storage() {
   var sum = 0;

    function calc(num) {
        sum += Number(num);
    }
    return {
        add: function(num) {
            calc(num);
        },

        get: function() {
            return sum;
        },

        reset: function(num) {
            if(arguments.length) {
                sum = num;
            }
            else sum = 0;
        }
    };
};


var stor1 = storage();

stor1.add(5);
console.log(stor1.get());
stor1.reset(10);
console.log(stor1.get());
stor1.reset();
console.log(stor1.get());
stor1.add(8);
stor1.add(-1);
console.log(stor1.get());
