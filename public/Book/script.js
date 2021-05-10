var mybook={
  "owner": "Sirarpi Grigoryan",
  "project": "My Book",
  "fullname":"",
  "title":"",
  "author":"",
  "colour":"",
  "covertype":"",
  "othercovervalue":"",
  "number of pages":"",
  "price":"",
  "currency":"",
  "language":"",
  "otherlanguage":"",
  "originallanguage":"",
  "originalother":"",
  "edition":"",
  "dimensions":"",
  "publisher":"",
  "publishingdate":"",
  "orgpublishdate":"",
  "genre":"",
  "agerest":"",
}

function handleFullnameChange(){
  mybook.fullname=document.getElementById("fullname").value;
}
function handleTitleChange(){
  mybook.title=document.getElementById("title").value;
}
function handleAuthorChange(){
  mybook.author=document.getElementById("author").value;
}
function handleColourChange(){
  mybook.colour=document.getElementById("colour").value;
}
function handleCovertypechange(e){
  mybook.covertype=e.target.value;
  if (mybook.covertype!="other") {
    mybook.othercovervalue="";
    document.getElementById("othercovertype").style.display="none";
  }
  else{
    document.getElementById("othercovertype").style.display="block";
  }
}
function handleCovermaterialchange() {
  if (mybook.covertype == "other") {
    mybook.othercovervalue = document.getElementById("othercovertype").value;
    document.getElementById("othercovertype").style.display="block";
  }
}
function handlenumberofpagesChange(){
  mybook.numberofpages=document.getElementById("numberofpages").value;
}
function handlepriceChange(){
  mybook.price=document.getElementById("price").value;
}
function handlecurrencyChange(){
  mybook.currency=document.getElementById("currency").value;
}
function handleLanguagechange(e){
  mybook.language=e.target.value;
  if (mybook.language!="other"){
    mybook.otherlanguage="";
    document.getElementById("otherlanguage").style.display="none";
  }
  else{
    document.getElementById("otherlanguage").style.display="block";
  }
}
function handleLanguagevalue(){
  if (mybook.language=="other"){
    mybook.otherlanguage=document.getElementById("otherlanguage").value;
    document.getElementById("otherlanguage").style.display="block";
  }
}
function handleOriginalLanguagechange(e){
  mybook.originallanguage=e.target.value;
  if (mybook.originallanguage!="other"){
    mybook.originalother="";
    document.getElementById("originalother").style.display="none";
  }
  else{
    document.getElementById("originalother").style.display="block";
  }
}
function handleorlanguagechange(){
  if(mybook.originallanguage=="other"){
    mybook.originalother=document.getElementById("originalother").value;
    document.getElementById("originalother").style.display="block";
  }
}
function handleeditionchange(){
  mybook.edition=document.getElementById("edition").value;
}
function handledimensionschange(){
  mybook.dimensions=document.getElementById("dimensions").value;
}
function handlepublisherchange(){
  mybook.publisher=document.getElementById("publisher").value;
}
function handlegpubdatechange(){
  mybook.publishingdate=document.getElementById("publishingdate").value;
}
function handleorggpubdatechange(){
  mybook.orgpublishdate=document.getElementById("orgpublishingdate").value;
}
function handlegenrechange(){
  mybook.genre=document.getElementById("genre").value;
}
function handleagerestrictionchange(){
  mybook.agerest=document.getElementById("agerestriction").value;
}

function showTheBookData(e){
  e.preventDefault();
  console.log(mybook);
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-sirarpi.herokuapp.com/data",
    data: myfavebook,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}

function loadExistingData() {
  var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api-sirarpi.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}
function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
}
function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
      return;
    }

    var tmp = {
        "id": id
    }
    $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-sirarpi.herokuapp.com/data/delete",
    data: tmp,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.getElementById("div" + id).style.display = "none";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}    
function saveData() {
    var tmp = {
        "test": "Data"
    }

    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-sirarpi.herokuapp.com/data",
      data: tmp,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");  
      }
   });
}
function loadExistingData() {
    $.ajax({
        type : "GET",
        url : "https://cse120-2021-api-sirarpi.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
          console.log("success", data);
            displayData(data.data);
        },
        error : function(data) {
            console.log("Error")
        }
    });
}
function displayData(data) {
    document.getElementById("dataContainer").innerHTML = "";
    data.forEach(elem => {

    var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
    if (Object.keys(elem).length == 1) {
    var span = document.createElement("span");
        span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
        item.appendChild(span);
        }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
      var span = document.createElement("span");

      var b = document.createElement("b");
          b.innerHTML = key + ": ";
          span.appendChild(b);
                
          span.className = "item";
      if (elem[key]) {
          span.innerHTML += elem[key];
      } else {
        
      var span1 = document.createElement("span");
          span1.className = "undefined";
          span1.innerHTML = "N/A";
          span.appendChild(span1)
                }
          item.appendChild(span);

      var br = document.createElement("br");
          item.appendChild(br);
            }
        })
      var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = elem["_id"];
        button.addEventListener("click", function(e){
          deleteData(e.target.id);
        }, false);
        item.appendChild(button);
        document.getElementById("dataContainer").appendChild(item);
    })

}