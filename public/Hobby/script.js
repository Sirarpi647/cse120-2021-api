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

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentHobby = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentHobby.fullname + "</li> : <b>" + currentHobby.title + "</b></li>";
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

var loadedData = [];

function loadEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("fullname").value = editItem["fullname"];
    document.getElementById("hour").value = editItem["hour"];   
    document.getElementById("frequency").value = editItem["frequency"];   
    document.getElementById("water").value = editItem["water"];
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if (item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            document.location  = "form2.html"; 
        }
    })
}
function loadHobbyEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("id").innerHTML = editItem["_id"];
    document.getElementById("fname").value = editItem["fname"];
    document.getElementById("question1").value = editItem["question1"];   
    document.getElementById("question2").value = editItem["question2"];   
    document.getElementById("question3").value = editItem["question3"];
    document.getElementById("genre").value = editItem["question4"];
    document.getElementById("type").value = editItem["question5"];
    document.getElementById("dancer").value = editItem["question6"];
    document.getElementById("professionaldancer").value = editItem["question7"];
}
function editData(id) {
  var tmp = id.split("edit_");
  var item_id = tmp[1];

  loadedData.forEach(item => {
    if (item._id == item_id) {
      console.log(item); 
      localStorage = window.localStorage;
      localStorage.setItem('editItem', JSON.stringify(item));
      if (item.project == "My Hobby") {
      document.location  = "edit_hobby.html"; 
    } else {
              document.location  = "edit_book.html";
  }
        }
    })

