class Task {
    constructor(name,type,level){
        this.name=name;
        this.type=type;
        this.level=level;
    }
}

let numOfTask = document.getElementById('counter');


let app = new function(){
    this.el=document.getElementById('task-list');
    let tasks= [];
    let errorMsg=false;
    numOfTask.innerHTML = tasks.length;

    this.FetchAll=function(){
        $(".unique").remove();
        
        numOfTask.innerHTML = tasks.length;

        if(tasks.length>0){
            this.el.classList.remove("hidden");
        } else {
            this.el.classList.add("hidden")
        }


            for(i=0;i<tasks.length;i++){
                console.log(tasks[i]);
                let row = this.el.insertRow(i+1);
                row.classList.add("unique");
                row.insertCell(0).innerHTML =tasks[i].name;
                row.insertCell(1).innerHTML=tasks[i].type;
                row.insertCell(2).innerHTML=tasks[i].level;
                let actions = row.insertCell(3);
                actions.appendChild(this.createEditButton(i));
                actions.appendChild(this.createDeleteButton(i));

            }
        }


    this.Add = function(){
        let name =document.getElementById('new-task').value;
        let type =document.getElementById('task-type').value;
        let level =document.getElementById('urgency-level').value;

        if ((name && type && level) !== ''){
            if (errorMsg=true){
                document.getElementById('error-box').classList.add("hidden");
            }
            tasks.push(new Task(name,type,level));
            this.FetchAll();
            document.getElementById('new-task').value = "";
            document.getElementById('task-type').value = "";
            document.getElementById('urgency-level').value = "";
                
        } else {
            document.getElementById('error-box').classList.remove("hidden");
            errorMsg= true;
        }
    }

    this.createEditButton = function(value){
        let editBtn = document.createElement('button');
        editBtn.className = 'btn btn-secondary table-btn';
        editBtn.id = value;
        editBtn.innerHTML = 'Edit';
        editBtn.onclick = () => {
            this.editTask(value);
        }
       return editBtn;
    }

    this.createDeleteButton = function(value){
        let delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger table-btn';

        delBtn.innerHTML = 'Delete';
        delBtn.onclick = () => {  
            tasks.splice(value,1);
            this.FetchAll();
        }
       return delBtn;
    }

    this.editTask = (value) => {
        //put value into fill
        let editTask = document.getElementById('edit-task');
        let editType = document.getElementById('edit-task-type');
        let editLevel = document.getElementById('edit-urgency-level');
        editTask.value = tasks[value].name;
        editType.value = tasks[value].type;
        editLevel.value = tasks[value].level;
        //open box
        document.getElementById("edit-box").classList.remove("hidden")
        self=this;

        document.getElementById('save-edit').onsubmit = function(){
            tasks[value].name = editTask.value;
            tasks[value].type = editType.value;
            tasks[value].level = editLevel.value;
            self.FetchAll();
            document.getElementById("edit-box").classList.add("hidden");
            
        }
    }
}

function CloseInput(){
    document.getElementById('edit-box').classList.add("hidden");
}

function CloseError(){
    document.getElementById('error-box').classList.add("hidden");
    errorMsg=false;
}