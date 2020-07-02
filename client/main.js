import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' 
import popper from 'popper.js'
global.Popper = popper 
import './main.html';
import '../lib/collection.js';
import'../lib/accounts-ui.js';



Template.tasksLib.helpers({
  allTask() {
    return taskdb.find();
  },

userChoice(){//check to see if task is private 
    if ((this.privatet == 1)){
      return true;
    }
    else {
      return false;
    }
  },

usershow(){
  if (this.privatet== 0){
    return true;
  }
  
  if(this.createdById == Meteor.userId() ){
    return true;
  }
  else{
    return false;
  }
}

});




Template.myJumbo.events({
	'click .js-addImage'(event, instance){
    console.log("Open modal");
 	 },
  	'click .js-exitAdd'(event, instance){
   
    $("#tName").val("");
    $("#tdesc").val("");
    $("#fdesc").val("");
    
  },

	'click .js-save'(event, instance){
 /*1 = private  0 = public*/
    var puborpriv = 0;  
    if ($("#privatet").prop("checked")==true)
      puborpriv = 1;






    
    
    
		var tasktitle = $('#tName').val();
		var tdesc = $ ('#tdesc').val();
    var fulltask =$('#fdesc').val();
		taskdb.insert ({
    "privatet": puborpriv,
	  "tName" : tasktitle,
	  "tdesc" : tdesc,
    "fdesc" : fulltask,
    "createdOn": new Date().getTime(),
    "createdBy": Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address,
    "createdById": Meteor.userId()

		});

	
    $("#addTaskModal").modal("hide");
    $("#tName").val("");
    $("#tdesc").val("");
    $("#fdesc").val("");

  },


  
	
	
});
Template.tasksLib.events({
  
  'click .js-delete'(event, instance) {
      var myId = this._id;
        /*taskdb.remove({_id:myId});*/
        
        if ((this.createdById == undefined) || (this.createdById == Meteor.userId())){
          console.log(myId);
      $("#deleteId").val(myId);
      $("#confirmModal").modal("show");
    }
    else {
      alert("You don't have permission to delete that.");
    }
    },

     'click .js-view'(event, instance){
    $("#viewTask").modal('show');
    var myID = this._id;
    console.log(myID);
    $('#viewContent').html(taskdb.findOne({_id:myID}).fdesc);
    

  },

});

Template.confirmTemp.events({
  'click .js-confirm'(event, instance){
    var myId = $("#deleteId").val();
    $("#"+myId).fadeOut('slow',function(){
      taskdb.remove({_id:myId});
    });
  },
});



