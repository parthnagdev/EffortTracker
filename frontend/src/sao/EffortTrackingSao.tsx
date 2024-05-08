import { TaskApi, ListTasksRequest, ListUsersRequest, ListTasksResponse, User, Task, UserApi, ListUsersResponse, State, ProjectApi, ListProjectsRequest, Filter } from "api";

class EffortTrackingSao {

    taskApi: TaskApi;
    userApi: UserApi;
    projectApi: ProjectApi;

    log?: Function;
    error?: Function;

    constructor() {
        this.taskApi = new TaskApi();
        this.userApi = new UserApi();
        this.projectApi = new ProjectApi();
    }

    public setLoggers(log: Function, error: Function) {
        this.log = log;
        this.error = error;
    }

    async createUser(user: string, username: string) {
        this.userApi.createUser({
            name: user,
            username: username
        })
        .then((res) => this.log!("User created successfully"))
        .catch((error) => this.error!("Some error occurred while creating user"));
    }

    async listUsers(callback: Function) {
        const resp = this.userApi.listUsers({});
        resp.then((res) => {
            callback(res.data.userList);
        });
    }

    async createTask(title: string, estimate: number | undefined, username: string | undefined, parentId: string | undefined, onUpdate: Function) {

        console.log("Parent Id: " + parentId);

        this.taskApi.createTask({
            title: title,
            state: "OPEN",
            estimate: estimate,
            username: username,
            parentId: parentId,
            projectId: "1"
        })
        .then((res) => {
            this.log!("Task created successfully");
            onUpdate();
        })
        .catch((error) => {
                console.log("Some error occurred: " + error);
                error!("Some error occurred while creating task");
            }
        );

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
        }).catch((error) => this.error!("Some error occurred while updating status"));

        // const listTaskRequest:   ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    getState(state: string) {
        if (State.Inprogress === state) {
            return State.Inprogress;
        }

        if (State.Complete === state) {
            return State.Complete;
        }

        if (State.Review === state) {
            return State.Review;
        }

        if (State.Blocked === state) {
            return State.Blocked;
        }

        return State.Open;
    }

    async updateTask(task: Task, successCallback: Function) {
        if (!task.id){
            console.error("Task id is needed for task update");
        }

        // this.taskApi.listTasks({
        //     filter: {
        //         idFilter: [task.id!]
        //     }
        // }).then((res) => {
        //     const task = res.data.taskList?.at(0);
        //     const newTask: Task = {
        //         ...task,
        //         title: title,
        //         estimate: estimate,
        //         username: username
        //     }

        //     console.log("newTask: " + newTask.state);
            
        // });

        this.taskApi.updateTask(task).then((res) => {
            console.log("State: " + res.data.state);
            successCallback();
        }).catch((error) => this.error!("Some error occurred while updating task"));;

        // const listTaskRequest: ListTasksRequest = {};
        // return this.taskApi.listTasks(listTaskRequest);
    }

    async listTasks(filter: Filter, callback: Function) {
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
        listTaskRequest.filter = filter;
        const response = this.taskApi.listTasks(listTaskRequest);
        response.then((res) => {
            callback(res.data.taskList);
        }).catch((error) => this.error!("Some error occurred while listing tasks"));
    }

    async listProjects(callback: Function) {
        const listProjectsRequest: ListProjectsRequest = {};
        const response = this.projectApi.listProjects(listProjectsRequest);
        response.then((res) => {
            callback(res.data.projectList);
        }).catch((error) => this.error!("Some error occurred while listing projects"));
    }
}

const sao = new EffortTrackingSao();

export default sao;