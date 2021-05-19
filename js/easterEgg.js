/**
 * Easter Egg feature in Rewards.html
 * @author: Brendan Lin
 * @Ver: 1.0
 */

$(document).ready(function() {
    let logoCounter = 0;

    //Hide Secret Reward
    $("#special").css("visibility", "hidden");
    $("#special").fadeOut();
    
    //Hide Secret Message
    $("#secretMsg").css("visibility", "hidden");
    $("#secretMsg").fadeOut();

    $(".logo").click(function() {
        logoCounter++;

        console.log("LogoCounter was pressed " + logoCounter + " times");

        if (logoCounter == 5) {
            //Make Secret Reward Visible
            $("#special").css("visibility", "visible");
            $("#special").fadeIn();

            //Make Secret Message Visible for a few seconds
            $("#secretMsg").css("visibility", "visible");
            $("#secretMsg").fadeIn().fadeOut(10000);
        }
    });
});