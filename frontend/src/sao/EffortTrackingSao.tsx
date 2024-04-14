import { TaskApi, ListTasksRequest, ListTasksResponse, User, Task } from "api";

class EffortTrackingSao {

    taskApi: TaskApi;

    constructor() {
        this.taskApi = new TaskApi();
    }

    async listTasks(callback: Function) {
        var tasks: Task[] = [];
        tasks.push({
           id: 123, 
           title: "Create UI", 
        //    status: "INPROGRESS",
           estimate: 3, 
           username: "parth"
        });

        tasks.push({
            id: 546, 
            title: "Update Open UI", 
            // status: "DONE",
            estimate: 4, 
            username: "rnnagdev"
         });

         console.log("Tasks Sao: " + tasks[0].id);

        callback(tasks);

        // const listTaskRequest: ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }
}

export default EffortTrackingSao;