var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comments")
    
var data = [
    
    {
        name:"Dildo's Peak",
        image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description:"Spicy jalapeno bacon ipsum dolor amet salami shoulder fatback, burgdoggen picanha shank shankle ham turducken ribeye. Salami hamburger jowl porchetta, rump shankle boudin leberkas shank alcatra short ribs. Meatball strip steak tenderloin landjaeger filet mignon bresaola. Filet mignon pastrami short loin sausage bresaola andouille ham pork loin short ribs spare ribs pancetta tongue pork flank."
    },
     {
        name:"Devil's Anus",
        image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg",
        description:"Spicy jalapeno bacon ipsum dolor amet salami shoulder fatback, burgdoggen picanha shank shankle ham turducken ribeye. Salami hamburger jowl porchetta, rump shankle boudin leberkas shank alcatra short ribs. Meatball strip steak tenderloin landjaeger filet mignon bresaola. Filet mignon pastrami short loin sausage bresaola andouille ham pork loin short ribs spare ribs pancetta tongue pork flank."
    },
     {
        name:"Pussy Farts",
        image:"https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
        description:"Spicy jalapeno bacon ipsum dolor amet salami shoulder fatback, burgdoggen picanha shank shankle ham turducken ribeye. Salami hamburger jowl porchetta, rump shankle boudin leberkas shank alcatra short ribs. Meatball strip steak tenderloin landjaeger filet mignon bresaola. Filet mignon pastrami short loin sausage bresaola andouille ham pork loin short ribs spare ribs pancetta tongue pork flank."
    },
     {
        name:"Wilderness Lakes",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description:"Spicy jalapeno bacon ipsum dolor amet salami shoulder fatback, burgdoggen picanha shank shankle ham turducken ribeye. Salami hamburger jowl porchetta, rump shankle boudin leberkas shank alcatra short ribs. Meatball strip steak tenderloin landjaeger filet mignon bresaola. Filet mignon pastrami short loin sausage bresaola andouille ham pork loin short ribs spare ribs pancetta tongue pork flank."
    },
    
];


function seedDB(){
      Campground.remove({},function(err){
        if (err){
            console.log(err);
        }else{
           console.log("removed Campgrounds");
        }
      })
}
           // Add some campgrounds
    //         data.forEach(function(data){
    //             Campground.create(data,function(err,camp){
    //               if (err){
    //                   console.log(err);
    //                 }else{
    //                     console.log("Created a Campground!");
    //                     // Add some comments
    //                     Comment.create({
    //                         text: "This place has the best wildlife and the scenery is breathtaking! Only downside is the Rapist who lives " 
    //                          + "in the cave down by lake.",
    //                          author: "Deez Nuttz"
    //                     },function(err,comment){
    //                         if (err){
    //                             console.log(err);
    //                         }else{
    //                             camp.comments.push(comment)
    //                             camp.save();
    //                         }
    //                     })
    //                 }
    //             })  
    //         })
    //     }
    // })
    
module.exports = seedDB;