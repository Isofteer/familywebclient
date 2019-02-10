var state ={
popUpLoaded:false,
CURRENTUSER:{
  firstname:null,
  surname:null,
  middlename:null,
  age:null
}

}
$(document).ready(()=>{

 // $("#sessionid").val(res.rows[0].ipkmembercode);
 
  $("#sessionid").val(21);  
 
  OpenLoginPage();

  if (!state.popUpLoaded){
  $('#pop-up-container').load('pages/popup.html #pop_modal',function(){
    state.popUpLoaded =true;
   //OpenDashboard();
  });
}
});



function OpenLoginPage(){
  $('#parent-container').load('pages/login.html #login',function(){

         $("#btnlogin").click(function (){

      var data = {username:$("#txtUsername").val(),password:$("#txtPassword").val()};
      $.ajax({
        url: 'http://localhost:5000/actions/Login',
        type: 'post',
        dataType: 'json', 
        data:  JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function(res) {

                if(res && res.rows)  {
                  if (res.rows.length>0){
                    $("#sessionid").val(res.rows[0].ipkmembercode);
                    localStorage.setItem("memberid", res.rows[0].ipkmembercode);
                    state.CURRENTUSER.firstname =  res.rows[0].firstname
                    state.CURRENTUSER.middlename =  res.rows[0].middlename
                    state.CURRENTUSER.surname =  res.rows[0].surname
                    OpenDashboard();
                  }
                  else
                  alert("No account exist");
                }   
                 
          

          console.log(res); 
          },
        error:function (e,t){       
            console.log(t);
        }
    });


     });


     


  } );

  
}

function OpenRegisterPage(){
  $('#parent-container').load('pages/register.html #register',function(){
       
  $(".btnregister").click(function (){
     
    var _userDetails = {
      firstname:$("#txtfirstname").val(),
      surname:$("#txtusername").val(),
      middlename:$("#txtmiddlename").val(),     
      nickname:$("#txtnickname").val(),     
      dateofbirth:$("#dateofbirth").val(),
      gender:$("#gender-radios input[name='gender']:checked").val(),      
      nationalid:$("#txtnationalid").val(),   
      phone:$("#txtphoneno").val(),         
      email:$("#txtmail").val(),     
      username:$("#txtusername").val(),
      password:$("#txtpassword").val(),   
      passwordRepeat:$("#txtpasswordrepeat").val(),    
      memberid:1,   
      pictureid:1,    
      error:0,    
    }
    
    console.log(_userDetails);
    RegisterMember(_userDetails);
         
  });

  //open to do other things 
  $('#dateofbirth').datepicker({
    allowInputToggle: true,
     format: 'dd mmm yyyy' ,
     value: new Date()
  });

  });
}



function OpenDashboard(){
  $('#parent-container').load('pages/dashboard.html #dashboard',function(){

var usersessioncode =  $("#sessionid").val();

OpenMemberDetails(usersessioncode);
$(".curr-username").text(state.CURRENTUSER.firstname)

  

  } );
}

function RegisterMember(user){       

  $.ajax({
    url: 'http://localhost:5000/actions/Register',
    type: 'POST',
    dataType: 'json', 
    data:  JSON.stringify(user),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {
      console.log(res.rows);    
    
      if (res.name !=="error") {
        var result = res.rows[0].savemember
          
        $("#success_register").modal("show")
          setTimeout(()=>{
            OpenDashboard();
            $("#sessionid").val(result);
            localStorage.setItem("memberid", result);
          },1000)
      }
      else{
           $("#error_register").modal("show")
      }
      },
    error:function (e,t){       
        console.log(t);
    }
});
}

function Getparents(memberid){
  var data = {memberid:memberid};
  $.ajax({
    url: 'http://localhost:5000/actions/Getparents',
    type: 'post',
    dataType: 'json', 
    data:  JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {

      console.log(res.rows);

      LoadParentsUI(res.rows);
        

      },
    error:function (e,t){       
        console.log(t);
    }
});
  
}
function GetGrandparents(memberid){
  var data = {memberid:memberid};
  $.ajax({
    url: 'http://localhost:5000/actions/Getgrandparents',
    type: 'post',
    dataType: 'json', 
    data:  JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {

      console.log(res.rows);

      LoadGrandParentsUI(res.rows);
        

      },
    error:function (e,t){       
        console.log(t);
    }
});
  
}






  function Getsiblings(memberid){
  var data = {memberid:memberid};
  $.ajax({
    url: 'http://localhost:5000/actions/Getsiblings',
    type: 'post',
    dataType: 'json', 
    data:  JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {

      console.log(res.rows);     
      LoadsiblingsUI(res.rows);
        

      },
    error:function (e,t){       
        console.log(t);
    }
});
  
}


function GetUnclesAndAunties(memberid){
  var data = {memberid:memberid};
  $.ajax({
    url: 'http://localhost:5000/actions/GetUnclesAndAunties',
    type: 'post',
    dataType: 'json', 
    data:  JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {
      console.log(res);
      LoadUnclesAndAuntiesUI(res.rows);
      },
    error:function (e,t){       
        console.log(t);
    }
});
  
}

function LoadParentsUI(parentsData){

  console.log(parentsData);

  parentsData.map((parent)=>{
    
    
    if(parent.parent_gender ==="MALE") {
      $("#father .first-name").text(parent.parent_first_name);
      $("#father .other-names").text(parent.parent_sur_name+" "+parent.parent_middle_name);
    }
      else{
        $("#mother .first-name").text(parent.parent_first_name);
        $("#mother .other-names").text(parent.parent_sur_name+" "+parent.parent_middle_name);
      }
       
       
       
       //el.find(".parent-name").text(parent.parent_first_name +" "+parent.parent_sur_name+" "+parent.parent_middle_name );

  })
}
  
function LoadGrandParentsUI(parentsData){

  console.log(parentsData);

  parentsData.map((parent)=>{
    
    if(parent.parent_gender=="MALE")
    {
        if(parent.grandparent_gender =="MALE"){
          $(".grandparents.father .grand-father .first-name").text( parent.grandparent_first_name);
          $(".grandparents.father .grand-father .other-names").text(parent.grandparent_sur_name+" "+parent.grandparent_middle_name );
        }
        else{
          $(".grandparents.father .grand-mother .first-name").text( parent.grandparent_first_name);
          $(".grandparents.father .grand-mother .other-names").text(parent.grandparent_sur_name+" "+parent.grandparent_middle_name );
       
        }

   }   
    else{
      if(parent.grandparent_gender =="MALE"){
        $(".grandparents.mother .grand-father .first-name").text( parent.grandparent_first_name);
        $(".grandparents.mother .grand-father .other-names").text(parent.grandparent_sur_name+" "+parent.grandparent_middle_name );
      }
      else{
        $(".grandparents.mother .grand-mother .first-name").text( parent.grandparent_first_name);
        $(".grandparents.mother .grand-mother .other-names").text(parent.grandparent_sur_name+" "+parent.grandparent_middle_name );
     
      }
    } 
       

  })
  



}
function LoadsiblingsUI (siblings){

  console.log(siblings);


  var  siblingsContainer = $("#siblings .list-gallary").html('');
 
  siblings.map((sibling)=>{
    var template =  $("#pop_modal .sub-content").clone();
     
   if (sibling.child_gende =="MALE"){
    template.find(".first-name").text(sibling.child_first_name);
    template.find(".other-name").text(sibling.child_sur_name +" " +sibling.child_middle_name );
    template.find(".gender-marker img")[0].src = "./assets/img/male.png"
   }
   else{
    template.find(".first-name").text(sibling.child_first_name);
    template.find(".other-name").text(sibling.child_sur_name +" " +sibling.child_middle_name );
    template.find(".gender-marker img")[0].src = "./assets/img/female.png"
   }
   siblingsContainer.append(template);
    
  });

}

function LoadUnclesAndAuntiesUI (people){

  console.log(people);
var  unclesandaunties = $("#unclesandaunties");
  people.map((person)=>{
      
    var  itemClone = $("#pop_modal .relation-item").clone();
     
    itemClone.find(".first-name").text(person.uncaunt_first_name );
    itemClone.find(".other-names").text(person.uncaunt_sur_name+" "+person.uncaunt_middle_name);

    if(person.l_gender =="MALE"){
      if (person.uncaunt_gender =="MALE")
        $("tr.father-row td.uncles ul").append(itemClone);     
        else
        $("tr.father-row td.aunties ul").append(itemClone);   

    }
    else{
      if (person.uncaunt_gender =="MALE")
      $("tr.mother-row td.uncles ul").append(itemClone);     
      else
      $("tr.mother-row td.aunties ul").append(itemClone);   

    }

     
  });

}

function OpenMemberDetails (usersessioncode)
{  
    Getparents(usersessioncode);
   GetGrandparents(usersessioncode);
    Getsiblings(usersessioncode);
  GetUnclesAndAunties(usersessioncode);
} 



function OpenAddMember(bools){

  if(bools){
   $(".relate").show();
   $(".loaded-relation").hide();
  }
else{
  $(".relate").hide();
  $(".loaded-relation").show();

}}

function OpenMoreOptions (found){
   
  if(found){
      $("#person-result .found-item-option").slideUp("up");
     // $("#person-result").slideUp("up");
  }
  else{
    $("#person-result").html("")
  }
      
       
  
  

}

function  SearchMmember (){

  var data = {
    searchValue:$("#txtLinkageId").val(),
    searchtype:0

  };
  $.ajax({
    url: 'http://localhost:5000/actions/GetMember',
    type: 'post',
    dataType: 'json', 
    data:  JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {
      console.log(res);
       
      if(!res.name)
       {
         var clone = $("#searchBoxResults")
         res.rows.map(function (person){
          clone.find(".first-name").text(person.firstname);
          clone.find(".other-name").text(person.surname + " "+person.middlename);
          clone.find(".member-ident-code").val(person.ipkmembercode);
          
          $("#person-result").html(clone.html());
         });
     
       }
     
      },
    error:function (e,t){       
        console.log(t);
    }
});
  

}
