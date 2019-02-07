$(document).ready(()=>{

 // $("#sessionid").val(res.rows[0].ipkmembercode);
 
  $("#sessionid").val(21);
  OpenDashboard();
})

function OpenLoginPage(){
  $('#parent-container').load('pages/login.html #login',function(){

     $("#press").click(function (){

      OpenDashboard();
     })

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
       
  $(".btnRegister").click(function (){
     
    var _userDetails = {
      firstname:$("#r_firstname").val(),
      surname:$("#r_username").val(),     
      middlename:$("#r_middlename").val(),     
      nationalId:$("#r_nationalId").val(),
      dateofBirth:$("#r_dateofbirth").val(),
      gender:$("#r_gender").val(),      
      username:$("#r_username").val(),
      password:$("#r_password").val(),    
      memberid:1,    
      error:0,    
    }
    RegisterMember(_userDetails);
   

  })

  } );
}



function OpenDashboard(){
  $('#parent-container').load('pages/dashboard.html #dashboard',function(){

var usersessioncode =  $("#sessionid").val();

OpenMemberDetails(usersessioncode);

    $("#press2").click(function (){

      OpenLoginPage();
     })

  } );
}

function RegisterMember(user){       

  $.ajax({
    url: 'http://localhost:5000/actions/Getgrandparents',
    type: 'POST',
    dataType: 'json', 
    data:  JSON.stringify(user),
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function(res) {

      console.log(res.rows);

     // var result = res[2][0];
    
      // if (result.successcode==1) 
      //      OpenDashboard();
      //      $("#sessionid").val(result.memberid);
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

      console.log(res);

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
    
    var el = $(".father-mother-pane .father-section");
    if(parent.parent_gender ==="FEMALE")
        el = $(".father-mother-pane .mother-section");
    
        el.find(".parent-name").text(parent.parent_first_name +" "+parent.parent_sur_name+" "+parent.parent_middle_name );

  })
}
  
function LoadGrandParentsUI(parentsData){

  console.log(parentsData);

  parentsData.map((parent)=>{
    
    var el = $(".grandparents-pane table");
    // if(parent.grandparent_gender ==="FEMALE")
    //     el = $(".grandparents-pane .grandmother-section");
    
       var  grandParentsName = parent.grandparent_first_name +" "+parent.grandparent_sur_name+" "+parent.grandparent_middle_name 
       var tr = $('<tr><td> <img width="300" class="member-dp" src="./assets/img/photo.jpg" alt="" srcset=""><td><td>'+grandParentsName+'<td><td>69</td></tr>')

        el.append(tr);

  })
  



}
function LoadsiblingsUI (siblings){

  console.log(siblings);

  siblings.map((sibling)=>{
    
    var el = $(".siblings-pane table");
    // if(parent.grandparent_gender ==="FEMALE")
    //     el = $(".grandparents-pane .grandmother-section");
    
       var  names = sibling.child_first_name +" "+sibling.child_sur_name+" "+sibling.child_middle_name 
       var tr = $('<tr><td> <img width="300" class="member-dp" src="./assets/img/photo.jpg" alt="" srcset=""><td><td>'+names+'<td><td>69</td></tr>')

        el.append(tr);
  });

}

function LoadUnclesAndAuntiesUI (people){

  console.log(people);

  people.map((person)=>{
    
    var el = $(".UnclesAuntie-pane table");
    // if(parent.grandparent_gender ==="FEMALE")
    //     el = $(".grandparents-pane .grandmother-section");
    
       var  names = person.uncaunt_first_name +" "+person.uncaunt_sur_name+" "+person.uncaunt_middle_name 
       var tr = $('<tr><td> <img width="300" class="member-dp" src="./assets/img/photo.jpg" alt="" srcset=""><td><td>'+names+'<td><td>69</td></tr>')

        el.append(tr);
  });

}

function OpenMemberDetails (usersessioncode)
{  
  Getparents(usersessioncode);
  GetGrandparents(usersessioncode);
 Getsiblings(usersessioncode);
  GetUnclesAndAunties(usersessioncode);
} 