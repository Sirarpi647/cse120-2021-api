var requiredFields=["fname", "question1", "question2", "question3", "question5"
]
var myhobby={
  "owner": "Sirarpi Grigoryan",
  "project": "My Hobby",
  "fname":"",
  "question1":"",
  "question2":"",
  "question3":"",
  "question4":"",
  "question5":"",
  "question6":"",
  "question7":"",
}
function handlefnameChange(){
  myhobby.fname=document.getElementById("fname").value;
}
function handlequestion1Change(){
  myhobby.question1=document.getElementById("question1").value;
}
function handlequestion2Change(){
  myhobby.question2=document.getElementById("question2").value;
}
function handlequestion3Change(e){
  myhobby.question3=e.target.value;
  if (myhobby.question3!="other") {
    myhobby.othervalue="";
    document.getElementById("othertype").style.display="none";
  }
  else{
    document.getElementById("othertype").style.display="block";
  }
}
function handleQuestion3Change() {
  if (myhobby.question3 == "other") {
    myhobby.othervalue = document.getElementById("othertype").value;
    document.getElementById("othertype").style.display="block";
  }
}
function handlequestion4Change(e){
  myhobby.question4=e.target.value;
  if (myhobby.question4!="other") {
    myhobby.valueother="";
    document.getElementById("typeother").style.display="none";
  }
  else{
    document.getElementById("typeother").style.display="block";
  }
}
function handleQuestion4Change() {
  if (myhobby.question4 == "other") {
    myhobby.valueother = document.getElementById("typeother").value;
    document.getElementById("typeother").style.display="block";
  }
}
function handlequestion5Change(e){
  myhobby.question5=e.target.value;
  if (myhobby.question5!="other") {
    myhobby.otheransw="";
    document.getElementById("otheranswer").style.display="none";
  }
  else{
    document.getElementById("otheranswer").style.display="block";
  }
}
function handleQuestion5Change() {
  if (myhobby.question5 == "other") {
    myhobby.otheransw = document.getElementById("otheranswer").value;
    document.getElementById("otheranswer").style.display="block";
  }
}
function handlequestion6Change(){
  myhobby.question6=document.getElementById("dancer").value;
}
function handlequestion7Change(){
  myhobby.question7=document.getElementById("professionaldancer").value;
}
function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(myhobby);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && myhobby[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}
function showTheHobbyData(e){
  e.preventDefault();
  if(validateFormData() == false) {
    return;
  } else {
    console.log(myhobby);
    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-sirarpi.herokuapp.com/data",
      data: myhobby,
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
}

function updateHobby(){
  var tmp = {
   "_id" : document.getElementById("_id").innerHTML,
   "fname" : document.getElementById("fname").value,
   "question1" : document.getElementById("question1").value,
   "question2" : document.getElementById("question2").value,
   "question3" : document.getElementById("question3").value,
   "genre" : document.getElementById("genre").value,
   "type" : document.getElementById("type").value,
   "dancer" : document.getElementById("dancer").value,
   "professionaldancer" : document.getElementById("professionaldancer").value, 
   }
 $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-sirarpi.herokuapp.com/update",
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
  
function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
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

function loadHobbyEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("fname").value = editItem["fname"];
    document.getElementById("question1").value = editItem["question1"];   
    document.getElementById("question2").value = editItem["question2"];   
    document.getElementById("question3").value = editItem["question3"];
    document.getElementById("genre").value = editItem["genre"];
    document.getElementById("type").value = editItem["type"];
    document.getElementById("dancer").value = editItem["dancer"];
    document.getElementById("professionaldancer").value = editItem["professionaldancer"];

}
function editData(id) {
  var tmp = id.split("edit_");
  var item_id = tmp[1];
  loadedData.forEach(item => {
    if (item._id == item_id) {
      console.log(item); 
      localStorage = window.localStorage;
      localStorage.setItem('editItem', JSON.stringify(item));
      if (item.project == "Dancing") {
      document.location  = "dancing.html"; 
    } else {
              document.location  = "form.html";
  }
        }
    })
}
function deleteData(id) {
  var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
  if (r == false) {
    return;
 }
  var tmp = {
    "id": id
  } 
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-sirarpi.herokuapp.com/delete",
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
  DancingData = [];
  BookData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api-sirarpi.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
    console.log("success", data);
    loadedData = data.data;
    data.data.forEach(elem => {
          if (elem["project"] == "My Book") {
            BookData.push(elem);
          }else {
            DancingData.push(elem); 
          }
        })
      displayData(DancingData, "dancingDataContainer");
      displayData(BookData, "bookDataContainer");
    },
    error : function(data) {
      console.log("Error")
    }
  });
}
function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
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
          span1.innerHTML = "---";
          span.appendChild(span1)
        }
        item.appendChild(span);
          var br = document.createElement("br");
          item.appendChild(br);
        }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
      editData(e.target.id);
    }, false);
    item.appendChild(edit_button);
    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
      deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })
}
function toggleOtherData() {
  var otherData = document.getElementById("otherDataContainer");
  if (otherData.style.display == "block") {
    otherData.style.display = "none";
  } else {
    otherData.style.display = "block";
  }
}
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
    data: mybook,
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
function updateBook(){
  var tmp = {
   "_id" : document.getElementById("_id").innerHTML,
   "fullname" : document.getElementById("fullname").value,
   "title": document.getElementById("title").value,
   "author": document.getElementById("author").value,
   "colour": document.getElementById("colour").value,
   "covertype": document.getElementById("covertype").value,
   "numberofpages": document.getElementById("numberofpages").value,
   "price": document.getElementById("price").value,
   "currency": document.getElementById("currency").value,
   "language": document.getElementById("language").value,
   "olanguage": document.getElementById("olanguage").value,
   "edition": document.getElementById("edition").value,
   "dimensions": document.getElementById("dimensions").value,
   "publisher": document.getElementById("publisher").value,
   "pdate": document.getElementById("pdate").value,
   "origpdate": document.getElementById("origpdate").value,
   "genre": document.getElementById("genre").value,
   "agerestriction": document.getElementById("agerestriction").value,
   }
 $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-sirarpi.herokuapp.com/data/update",
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
function saveBookData() {
  var mybook = {
    "test": "Data"
  }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-sirarpi.herokuapp.com/data",
        data: mybook,
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
