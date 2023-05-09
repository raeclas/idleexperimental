$(document).ready(function(){
    var number = 0;
    var money = 0;
    var numberPlus = 1;
    var autoNumber = 0;
    var autoNumberPlus = 0;
    var autoNumberIncrementPrice = 500;
    var autoNumberIncrementCount = 0;
    var autoNumberPrice = 20;
    var numberPrice = 1;
    var menu;

    setInterval(function(){
        number += autoNumberPlus;
        changeInventory();
        changeMarket();
        document.title = number + " - Number Go Up"
    }, 1000);

    $('#click').click(function(){
        number += numberPlus;
        changeInventory();
        changeMarket(); 
    });

    $("#sellAll").click(function(){
        money += numberPrice * number
        number = 0
        changeInventory();
        changeMarket();
    });

    $("#saveGame").click(function(){
        saveGame();
    });

    $("#addAutoNumberPlus1").click(function(){
        if (money < autoNumberIncrementPrice){
            $(".messageNoMoney").css("display", "block");
        }else{
            autoNumberIncrementCount ++
            money -= autoNumberIncrementPrice
            autoNumberPlus = autoNumberPlus * (autoNumberIncrementCount)
            autoNumberIncrementPrice = math.round(autoNumberIncrementPrice*1.15)
            
        }
    });

    $("#autoNumber").click(function(){
        if(money < autoNumberPrice){
            $(".messageNoMoney").css("display", "block");
            $(".messageNoMoney").css("text-align", "center");
            $(".messageNoMoney").css("font-size", "20px")
        }else{
            money -= autoNumberPrice;
            autoNumberPlus++;
            autoNumber++;
            autoNumberPrice = 1.1 * autoNumberPrice;
            autoNumberPrice = Math.round(autoNumberPrice);
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
        $("#autoNumber").html("Buy [1] Auto Number ($" + autoNumberPrice + ")" + "<br>" + "["+autoNumber+"]");
        $("#addAutoNumberPlus1").html("Increase Auto Number increment by 1 ($" + autoNumberIncrementPrice + ")" + "<br>" + "["+autoNumberIncrementCount+"]");
    }

    window.onload = function() {
        loadGame();
        changeInventory();
        changeMarket();
    };

    function changeMarket(){
        if(number > 0){
            $("#sellAll").css("display", "block");
        }else{
            $("#sellAll").css("display", "none");
        }

        if(money >= autoNumberPrice){
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", 1)
        }else{
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", .5);
        }
        if (money>= autoNumberIncrementPrice){
            $("#addAutoNumberPlus1").css("opacity", 1)
        }else{
            $("#addAutoNumberPlus1").css("opacity", 0.5);
        }
    }

    function switchMenu(menu){
        $(".menus").children().css("display","none");
        $("." + menu).css("display", "block");
        return menu;
    }

    function saveGame(){
        console.log("Saving game...");
        var gameSave = {
            number: number,
            money: money,
            numberPlus: numberPlus,
            autoNumberPlus: autoNumberPlus,
            autoNumberPrice: autoNumberPrice,
            numberPrice: numberPrice,
            autoNumber: autoNumber,
            autoNumberIncrementPrice: autoNumberIncrementPrice
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }

    function loadGame(){
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (typeof savedGame.number !== "undefined") number = savedGame.number;
        if (typeof savedGame.money !== "undefined") money = savedGame.money;
        if (typeof savedGame.numberPlus !== "undefined") numberPlus = savedGame.numberPlus;
        if (typeof savedGame.autoNumberPlus !== "undefined") autoNumberPlus = savedGame.autoNumberPlus;
        if (typeof savedGame.autoNumberPrice !== "undefined") autoNumberPrice = savedGame.autoNumberPrice;
        if (typeof savedGame.NumberPrice !== "undefined") NumberPrice = savedGame.NumberPrice;
        if (typeof savedGame.autoNumber !== "undefined") autoNumber = savedGame.autoNumber;
        if (typeof savedGame.autoNumberIncrementPrice !== "undefined") autoNumberIncrementPrice = savedGame.autoNumberIncrementPrice;
    }
    //auto save
    setInterval(function(){
        saveGame();
    }, 30000); // 30000ms = 30s

    $("#resetGame").click(function(){
        resetGame();
    }); //reset button


    function resetGame(){ //reset game
        console.log("hello world");
        if (confirm("Are you sure you want to reset?")){
            var gameSave = {};
            localStorage.setItem("gameSave", JSON.stringify(gameSave)); 
            location.reload();
        }
    }  

    document.addEventListener("keydown", function(event){
        if (event.ctrlKey && event.which == 83) {//ctrl + s pressed
            event.preventDefault();
            saveGame();
        }
    }, false)
});

