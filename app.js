$(document).ready(function(){
    var number = 0;
    var money = 0;
    var numberPlus = 1;
    var autoNumberPlus = 0;
    var autoNumberPrice = 20;
    var numberPrice = 1;
    var menu;

    setInterval(function(){
        number += autoNumberPlus;
        changeInventory();
        changeMarket();
    }, 1000);

    $('#click').click(function(){
        number += numberPlus;
        changeInventory();
        changeMarket(); 
    });

    $("#sell1").click(function(){
        number--;
        money += numberPrice;
        changeInventory();
        changeMarket();
    });

    $("#sell10").click(function(){
        number-= 10;
        money += numberPrice * 10;
        changeInventory();
        changeMarket();
    });

    $("#sellAll").click(function(){
        money += numberPrice * number
        number = 0
        changeInventory();
        changeMarket();
    });

    $("#autoNumber").click(function(){
        if(money < autoNumberPrice
            ){
            $(".messageNoMoney").css("display", "block");
            $(".messageNoMoney").css("text-align", "center");
            $(".messageNoMoney").css("font-size", "20px")
        }else{
            money -= autoNumberPrice;
            autoNumberPlus++;
            $(".messageNoMoney").css("display", "none");
            changeInventory();
            changeMarket();
        }
        
    });

    $("#visit").click(function(){
        menu = switchMenu("marketplace");
        $(".messageNoMoney").css("display", "none");
        changeMarket();
    });

    $("#return").click(function(){
        menu = switchMenu("main");
    });

    function changeInventory(){
        $("#money").html("Money: $" + money);

        if(number == 1){
            $("#number").html("Number: " + number);
        }else{
            $("#number").html("Number: " + number);
        }
    }

    function changeMarket(){
        if(number > 0){
            $("#sellAll").css("display", "block");
        }else{
            $("#sellAll").css("display", "none");
        }
        if(number >= 1){
            $("#sell1").css("display", "block");
        }else{
            $("#sell1").css("display", "none");
        }
        if(number >= 10){
            $("#sell10").css("display", "block");
        }else{
            $("#sell10").css("display", "none");
        }

        if(money >= autoNumberPrice){
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", 1)
        }else{
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", .5);
        }
    }

    function switchMenu(menu){
        $(".menus").children().css("display","none");
        $("." + menu).css("display", "block");
        return menu;
    }
});