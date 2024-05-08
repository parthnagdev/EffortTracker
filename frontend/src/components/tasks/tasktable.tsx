import { Task, User } from "api";

import { Button as PButton } from 'primereact/button';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { TreeTable } from 'primereact/treetable';
import { Button } from "react-bootstrap";
import sao from "sao/EffortTrackingSao";


import { Box } from "@mui/material";
import TaskData from "components/models/task_data";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import CreateTask from "./createTask";
import StatusRow from "./statusrow";
import { Dropdown } from "primereact/dropdown";
import { getUserData, getUserDataList } from "components/users/users";

function generateGraph(tasks: Task[]) {
  let taskds: TaskData[] = [];

  let g: Map<String, String[]> = new Map();
  let taskMap: Map<String, TaskData> = new Map();

  let root_rows: TreeNode[] = [];

  for (let i = 0; i< tasks!.length; i++) {
    let taskData: TaskData = {
      task: tasks[i],
      visited: false,
      order: 0,
      depth: 0,
      hasChild: false
    };

    taskds.push(taskData);

    let id: String = tasks[i].id!;
    g.set(id, []);
    taskMap.set(id, taskData); 
  }

  for (let i = 0; i< tasks!.length; i++) {
    let parentId = tasks[i].parentId;
    if (parentId) {
      let ch: String[] | undefined = g.get(parentId);
      if (ch) {
        ch.push(tasks[i].id!);
      }
    }
  }

  for (let i = 0; i< taskds.length; i++) {
    console.log("Task child size: " + taskds[i].task.id! + "; size: " +  g.get(taskds[i].task.id!)!.length);
  }

  for (let i = 0; i< taskds.length; i++) {
    if (!taskds[i].visited) {
      root_rows.push(generateDepthRec(g, tasks[i].id!, taskMap, 0, '' + i)!);
    }
  }

  for (let i = 0; i< taskds.length; i++) {
    console.log("Task Data: " + taskds[i].task.id! + "; depth: " + taskds[i].depth);
  }

  return {
    nodes: root_rows,
    tasks: taskds
  };
}

function generateDepthRec(g: Map<String, String[]>, id: String, taskMap: Map<String, TaskData>, depth: number, key: string): TreeNode | undefined {
  let task = taskMap.get(id)!;
  if (task.visited) {
    return undefined;
  }

  task.visited = true;

  let ch_nodes: TreeNode[] = [];

  console.log("Depth: id: " + id + "; val: " + depth);
  let chs: String[] = g.get(id)!;
  for (let i = 0; i< chs.length; i++) {
    task.hasChild = true;
    console.log("Ch: id: " + id + "; ch i: " + chs[i]);
    let ch = generateDepthRec(g, chs[i], taskMap, depth + 1, key + '-' + i);
    if (ch) {
      ch_nodes.push(ch);
    }
  }

  let node: TreeNode = {
    key: key,
    data: task,
    children: ch_nodes
  }

  task.depth = depth;

  return node;
}

const TaskTable = ({tasks, visible, setVisible, users, refresh} : {
                tasks: Task[], visible: boolean, setVisible: Function, users: User[], refresh: Function}) => {
    console.log("Tasks isU: " + tasks);
  
    console.log("Tasks: " + tasks);
  
    const ref = () => {
      console.log('Clicked outside of MyComponent');
    };
  
    var i = 0;

    let task_data = generateGraph(tasks);


    // for (let i = 0; i< taskds.length; i++) {
    // //   console.log("Task title: " + tasks[i].title);
    //      rows.push(<TaskRow taskd={taskds[i]!} />)
    //   }
    // };


    //  return ( <Table hover size="sm">
    //     <thead>
    //       <tr>
    //         <th/>
    //         <th>Task</th>
    //         <th>Owner</th>
    //         <th>Status</th>
    //         <th>Estimate</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //      { rows }
    //     </tbody>
    //   </Table>);

    const constructStatus = (node: TreeNode) => {
        let taskd: TaskData = node.data;

        return (
          <StatusRow taskId={taskd.task.id + ""} status={taskd.task.state!} refresh={refresh} />
        );
    };

    const constructIdTag = (node: TreeNode) => {
      let taskd: TaskData = node.data;

      return (
        <Button variant="secondary" size="sm"> T53575{taskd.task.id} </Button>
      );
    };

    const constructUserDropDown = (node: TreeNode) => {
        let taskd: TaskData = node.data;

        return (
          <Dropdown value={{name: taskd.task.username}} 
                  onChange={(e) => {
                      sao.updateTask({
                        ...taskd.task,
                        username: e.value.name
                      }, refresh);
                   }} 
                   options={getUserDataList(users)} 
                   optionLabel="name"  placeholder={taskd.task.username}  />
        );
    };

    const textEditor = (options) => {
      return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    const menuLeft = useRef<Menu>(null);
    const menuRight = useRef<Menu>(null);
    const toast = useRef<Toast>(null);
    const items: MenuItem[] = [
        {
            items: [
                {
                    label: 'Create Task',
                    command: () => {
                      setVisible(true);
                    }
                }
            ]
        }
    ];
    
    const [selectedId, setSelectedId] = useState<string | undefined>();


  return (
      <div className="card">
          <TreeTable value={task_data.nodes} size={1} selectionMode="single" stripedRows >
              <Column field="id" body={constructIdTag} expander></Column>
              <Column field="task" header="Task" body={(node: TreeNode) => node.data.task.title} editor={(options) => textEditor(options)} ></Column>
              <Column  header="User" body={constructUserDropDown} ></Column>
              <Column field="status" body={constructStatus} header="Status"></Column>
              <Column field="estimate" header="Estimate" body={(node: TreeNode) => node.data.task.estimate} ></Column>
              <Column headerStyle={{ width: '10%', minWidth: '8rem' }} 
                      bodyStyle={{ textAlign: 'center' }} 
                      body={(node: TreeNode) => {
                        return (
                           <div >
                            <PButton icon="pi pi-pencil" rounded text severity="secondary" aria-label="Bookmark" />
                            <Menu model={items} popup ref={menuRight} id="popup_menu_left" />
                            <PButton icon="pi pi-angle-down" rounded text severity="secondary" onClick={(event) => {
                                    setSelectedId(node.data.task.id);
                                    menuRight.current?.toggle(event);
                              }} aria-label="Bookmark" />

                            </div> 
                          );
                        }}>
                      </Column>
          </TreeTable>
          <Dialog 
              visible={visible}
              modal
              onHide={() => {
                  setSelectedId(undefined);
                  setVisible(false);
                }
              }
              content={({ hide }) => (
                <Box component="section"
                    height={130}
                    width={700}
                    display="flex"
                    sx={{ p: 1, bgcolor:  (theme) => theme.palette.mode === "light"
                      ? "#f5f5f5"
                      : "#0f0f0f",  borderRadius: '16px'}}>

                        <CreateTask parentId={selectedId} setVisible={setVisible} users={users} refresh={refresh}/>
                        <Box  alignItems="top">
                         <PButton icon="pi pi-times" text severity="secondary" onClick={(e) => hide(e)} />
                        </Box>
                </Box>
              )}>
          </Dialog>
      </div> 
  );
}

export default TaskTable;
