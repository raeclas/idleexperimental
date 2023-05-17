$(document).ready(function(){
    var number = 0;
    var money = 0;
    let numberPlus = 1;
    let numberPrice = 1;
    var autoNumberPlus = 0; // number per sec
    var menu;
    var lastFrameTime = 0;
    var autoNumberInterval = 1000;
    var timeSinceLastAutoIncrease = 0;
    var upgrades = {
        name: [
            "autoNumber",
            "autoNumberIncrement"
        ],
        count: [
            0,
            0
        ],
        cost: [
            20,
            40
        ],
        costIncrement: [
            1.1,
            1.15
        ]


    }

    
    function update(currentTime) {
        var elapsedTime = currentTime - lastFrameTime;
        timeSinceLastAutoIncrease += elapsedTime;
    
        if (timeSinceLastAutoIncrease >= autoNumberInterval) {
            number += (autoNumberPlus);
            number = Math.ceil(number)
            timeSinceLastAutoIncrease -= autoNumberInterval;
          }
    
        changeInventory();
        changeMarket();
        document.title = number + " - Number Go Up";
    
        lastFrameTime = currentTime;
        requestAnimationFrame(update);
      }
    
      // Start the animation loop
      lastFrameTime = performance.now();
      requestAnimationFrame(update);
    
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

    $("#buyMax").click(function() {
        for (i = 0; i < upgrades.cost.length; i++){
            buyMaxUpgrade(i);
        }
    });

    function lowestNumber(itemPrice, money){
        return Math.floor(money/itemPrice)
    }

    function buyMaxUpgrade(index){
        totalCost = upgrades.cost[index]
        if (money > upgrades.cost[index]){
            while (money > totalCost){
                money -= upgrades.cost[index];
                upgrades.cost[index] = Math.round(upgrades.costIncrement[index] * upgrades.cost[index]);
                totalCost += upgrades.cost[index];
                upgrades.count[index] ++ ;
                autoNumberPlus = upgrades.count[0] * (1+upgrades.count[1]);
                changeInventory();
                changeMarket();
            }
        }else{
            $(".messageNoMoney").css("display", "block");
            setTimeout(function(){
                $(".messageNoMoney").css("display", "none");
            },1000)
        }
        changeInventory();
        changeMarket();
    }


    $("#saveGame").click(function(){
        saveGame();
    });

    $("#addAutoNumberPlus1").click(function(){
        if (money < upgrades.cost[1]){
            $(".messageNoMoney").css("display", "block");
        }else{
            buyMaxUpgrade(1);
        }
    });

    $("#autoNumber").click(function(){
        if(money < upgrades.cost[0]){
            $(".messageNoMoney").css("display", "block");
            $(".messageNoMoney").css("text-align", "center");
            $(".messageNoMoney").css("font-size", "20px")
        }else{
            buyMaxUpgrade(0);
            changeInventory();
            changeMarket();
            $(".messageNoMoney").css("display", "none");
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
        $("#autoNumber").html("Buy [1] Auto Number ($" + upgrades.cost[0] + ")" + "<br>" + "[" + upgrades.count[0] + "]" + "<br>" + "Increments by " + (1+upgrades.count[1]) + " per second" + "<br>" + "Total: " + (upgrades.count[0]*(1+upgrades.count[1]))); 

        $("#addAutoNumberPlus1").html("Increase Auto Number increment by 1 ($" + upgrades.cost[1] + ")" + "<br>" + "["+upgrades.count[1]+"]");
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

        if(money >= upgrades.cost[0]){
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", 1)
        }else{
            $("#autoNumber").css("display", "block");
            $("#autoNumber").css("opacity", .5);
        }
        if (money>= upgrades.cost[1]){
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
            numberPrice: numberPrice,
            upgrades: upgrades
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }

    function loadGame(){
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (typeof savedGame.number !== "undefined") number = savedGame.number;
        if (typeof savedGame.money !== "undefined") money = savedGame.money;
        if (typeof savedGame.numberPlus !== "undefined") numberPlus = savedGame.numberPlus;
        if (typeof savedGame.autoNumberPlus !== "undefined") autoNumberPlus = savedGame.autoNumberPlus;
        if (typeof savedGame.numberPrice !== "undefined") numberPrice = savedGame.numberPrice;
        if (typeof savedGame.upgrades !== "undefined") upgrades = savedGame.upgrades;
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

