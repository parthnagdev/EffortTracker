import { TaskApi, ListTasksRequest, ListTasksResponse, User, Task } from "api";

class EffortTrackingSao {

    taskApi: TaskApi;

    constructor() {
        this.taskApi = new TaskApi();
    }

    async createUser(user: User) {

    }

    async listUsers() {

    }

    async createTask(title: string, estimate: number, username: string) {
        this.taskApi.createTask({
            title: title,
            state: "OPEN",
            estimate: estimate,
            username: username
        });

        // const listTaskRequest: ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    async updateStatus(taskId: string, status: string, successCallback: Function) {
        successCallback();

        // const listTaskRequest: ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    async updateTask(taskId: string, title: string, estimate: number, username: string, successCallback: Function) {
        successCallback();

        // const listTaskRequest: ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    async listTasks(callback: Function) {
        // var tasks: Task[] = [];
        // tasks.push({
        //    id: 123 + "", 
        //    title: "Create UI", 
        // //    status: "INPROGRESS",
        //    estimate: 3, 
        //    username: "parth"
        // });

        // tasks.push({
        //     id: 546 + "", 
        //     title: "Update Open UI", 
        //     // status: "DONE",
        //     estimate: 4, 
        //     username: "rnnagdev"
        //  });

        //  console.log("Tasks Sao: " + tasks[0].id);

        // callback(tasks);

        const listTaskRequest: ListTasksRequest = {};
        const response = this.taskApi.listTasks(listTaskRequest);
        response.then((res) => {
            callback(res.data.taskList);
        })
    }
}

const sao = new EffortTrackingSao();

export default sao;