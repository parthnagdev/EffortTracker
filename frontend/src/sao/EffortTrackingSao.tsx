import { TaskApi, ListTasksRequest, ListUsersRequest, ListTasksResponse, User, Task, UserApi, ListUsersResponse, State } from "api";

class EffortTrackingSao {

    taskApi: TaskApi;
    userApi: UserApi;

    constructor() {
        this.taskApi = new TaskApi();
        this.userApi = new UserApi();
    }

    async createUser(user: string, username: string) {
        this.userApi.createUser({
            name: user,
            username: username
        });
    }

    async listUsers(callback: Function) {
        const resp = this.userApi.listUsers({});
        resp.then((res) => {
            callback(res.data.userList);
        });
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

        console.log("Updating task: " + taskId);

        console.log("Updating status: " + status);

        this.taskApi.listTasks({
            filter: {
                idFilter: [taskId]
            }
        }).then((res) => {
            const task = res.data.taskList?.at(0);
            const newTask: Task = {
                ...task,
                state: this.getState(status)
            }

            console.log("newTask: " + newTask.state);
            this.taskApi.updateTask(newTask).then((res) => {
                console.log("State: " + res.data.state);
                successCallback();
            });
        });

        // const listTaskRequest:   ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    getState(state: string) {
        if (State.Open === state) {
            return State.Open;
        }

        if (State.Inprogress === state) {
            return State.Inprogress;
        }

        return State.Complete;
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