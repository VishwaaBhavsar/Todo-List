document.addEventListener("DOMContentLoaded",()=>{
    const storedTask=JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask.forEach((task)=>tasks.push(task));
        updateTaskList();
        updateStats();
    }
});



let tasks=[];

const saveTasks=() =>
{
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

const addTask=()=>
{
    const taskInput=document.getElementById('taskInput');
    const text=taskInput.value.trim();
    if(text)
    {
        tasks.push({text:text,completed:false});
        taskInput.value="";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};
const toggleTaskComplete=(index) =>{
    tasks[index].completed=!tasks[index].completed;
   updateTaskList();
   updateStats();
   saveTasks();
};
//how task[index].completed=!tasks[index].completed;
//it will toogle the tasks
// let completed = tasks[index].completed; // Current value (false)
// completed = !completed;                 // Flip the value (true)
// tasks[index].completed = completed;     // Update the property
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();

};
const editTask=(index)=>{
 const taskInput=document.getElementById("taskInput");
 taskInput.value=tasks[index].text;

 tasks.splice(index,1);
 updateTaskList(); 
 updateStats();
 saveTasks();
};

const updateStats=()=>{
    const completedTasks=tasks.filter((task)=> task.completed).length;
    const totalTasks=tasks.length;
    
    const progress=(completedTasks/totalTasks)*100;
    const progressBar=document.getElementById("progress");
    progressBar.style.width=`${progress}% `;

    document.getElementById("numbers").innerText=`${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks){
         blastConfetti();
    };

};
const updateTaskList=()=>{
    const taskList=document.getElementById("task-list");
    taskList.innerHTML="";

    tasks.forEach((task,index)=>{
        const listItem=document.createElement("li");

        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed': ''}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
            <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="./img/edit.png" onClick="editTask(${index})"/>
        <img src="./img/trash.png" onClick="deleteTask(${index})"/>
        </div>
        </div>
        `;
        listItem.addEventListener("change",() => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};
document.getElementById('newTask').addEventListener("click",function(e){
    e.preventDefault()
    addTask();
});
const blastConfetti = ()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}