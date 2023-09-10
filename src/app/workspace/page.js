"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
//   {
//     _id: "task-1",
//     title: "Task 1",
//     category: "Work",
//     summary: "Work on the project proposal",
//     state: "OPEN",
//     createdBy: "John Doe",
//   },
//   {
//     _id: "task-2",
//     title: "Task 2",
//     category: "Personal",
//     summary: "Go for a jog in the park",
//     state: "PROGRESS",
//     createdBy: "Jane Smith",
//   },
//   {
//     _id: "task-3",
//     title: "Task 3",
//     category: "Home",
//     summary: "Clean the living room",
//     state: "COMPLETED",
//     createdBy: "Alice Johnson",
//   },
//   {
//     _id: "task-4",
//     title: "Task 4",
//     category: "Work",
//     summary: "Review the sales report",
//     state: "CANCELLED",
//     createdBy: "Bob Johnson",
//   },
  // You can add more tasks with different properties and states as needed
];

const TodoApp = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const router = useRouter();

  //async Todo fetching
  useEffect(() => {
    let resArray = []
    fetchTodo()
      .then((res) => {
        console.log("response is ", res);
        if (res.code > 205) {
          router.push("/", { scroll: false });
        }
        console.log("response data ", res.data);

        res.data.map((item) => {
          item.data.map((todoItem) => {
            resArray.push(todoItem);
          });
        });
        setTasks(resArray);
      })
      .catch((err) => {
        console.log("error", err);
        router.push("/", { scroll: false });
      });
  }, []);


  async function changeDetails(title, category, summary, state, _id) {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/post/todopost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title, //recieved from params
          category: category,
          summary: summary,
          state: state,
          sys_id: _id,
        }),
        credentials: "include",
      }
    ).then((res)=>{
console.log("Updated Successfully")
    }).catch(()=>{
        alert("error Sync with DB")
    });
    // return await response.json();
  }

  
  async function fetchTodo() {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/todoget`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    return await response.json();
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // No valid destination

    const movedTask = tasks.find((task) => task._id === result.draggableId);
    const newTasks = [...tasks];

    const source = result.source;
    const destination = result.destination;

    if (source.droppableId === destination.droppableId) {
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
    } else {
      movedTask.state = destination.droppableId;
console.log("movedTask",movedTask)
      // Send a PUT request to update the task's state on the server
      changeDetails(movedTask.title, movedTask.category, movedTask.summary, movedTask.state, movedTask._id)
    }

    setTasks(newTasks);
  };

  const renderColumn = (state) => {
    const tasksInState = tasks.filter((task) => task.state === state);
  
    const getColumnStyle = () => {
        switch (state) {
          case 'CANCELLED':
            return {
              background: 'linear-gradient(135deg, #ff6b6b, #e31f1f)',
              borderRadius: '10px',
              padding: '16px',
            //   textAlign: 'center',
            };
          default:
            return {
            //   background: 'linear-gradient(135deg, #63a4ff, #a3bfff)',
              borderRadius: '10px',
              padding: '16px',
            //   textAlign: 'center',
            };
        }}

    return (
      <div
        key={state} style={getColumnStyle()}
        className="p-4 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-lg shadow-lg"
      >
        <h2 className="text-lg font-semibold text-white mb-2">{state}</h2>
        <Droppable droppableId={state}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-white p-2 rounded shadow"
            >
              {tasksInState.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-blue-200 p-4 mb-4 rounded-lg shadow-md cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold text-blue-800">
                        {task.title}
                      </h3>
                      <p className="text-gray-600">Category: {task.category}</p>
                      <p className="text-gray-600">Summary: {task.summary}</p>
                    
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Workspace</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["OPEN", "PROGRESS", "COMPLETED", "CANCELLED"].map((state) => (
            <div key={state} className="flex-1">
              {renderColumn(state)}
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoApp;
