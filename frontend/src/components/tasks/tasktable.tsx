import { Task } from "api";
import TaskRow from "./taskrow";
import { Table } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next'
import { Columns } from "react-bootstrap-icons";

import { TreeTable, TreeTableTogglerTemplateOptions } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { TreeNode } from 'primereact/treenode';

import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { has, size } from "lodash";
import TaskData from "components/models/task_data";
import StatusRow from "./statusrow";
import { classNames } from "primereact/utils";

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
      let ch: String[] = g.get(parentId)!;
      ch.push(tasks[i].id!);
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

const TaskTable = ({tasks} : {tasks: Task[]}) => {
    const rows : any[] = [];
  
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
          <StatusRow taskId={taskd.task.id + ""} status={taskd.task.state!} />
        );
    };

    const constructIdTag = (node: TreeNode) => {
      let taskd: TaskData = node.data;

      return (
        <Button variant="secondary" size="sm"> T53575{taskd.task.id} </Button>
      );
    };


  const togglerTemplate = (node: TreeNode, options: TreeTableTogglerTemplateOptions) => {
      if (!node) {
          return;
      }

      const expanded = options.expanded;
      const iconClassName = classNames('p-treetable-toggler-icon pi pi-fw', {
          'pi-caret-right': !expanded,
          'pi-caret-down': expanded
      });

      return (
          <button type="button" className="p-treetable-toggler p-link" style={options.buttonStyle} tabIndex={-1} onClick={options.onClick}>
              <span className={iconClassName} aria-hidden="true"></span>
          </button>
      );
  };

  const header = <div className="text-xl font-bold">Tasks</div>;


  return (
      <div className="card">
          <TreeTable value={task_data.nodes} size={1}>
              <Column field="id" body={constructIdTag} expander></Column>
              <Column field="task" header="Task" body={(node: TreeNode) => node.data.task.description} ></Column>
              <Column field="owner" header="Owner" body={(node: TreeNode) => node.data.task.username} ></Column>
              <Column field="status" body={constructStatus} header="Status"></Column>
              <Column field="estimate" header="Estimate" body={(node: TreeNode) => node.data.task.estimate} ></Column>
          </TreeTable>
      </div>
  );
}

export default TaskTable;
