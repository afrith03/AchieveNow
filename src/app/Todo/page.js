// import React, { useEffect } from "react";
"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import EditingModal from "@/components/editingModal";
import axios from "axios";
import { useEffect, useState } from "react";

function Todos() {
  //state handling
  const [Todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [showModal, setshowModal] = useState(false);

  // const [summary, setSummary] = useState("");
  const [loading, setloading] = useState(false);

  const [selectedItem, setselectedItem] = useState({
    _id: "",
    title: "",
    category: "",
    summary: "",
    state: "",
    createdBy: "",
  });
  const handleAfterEdit = () => {
    setloading(true);
    changeDetails(
      selectedItem.title,
      selectedItem.category,
      selectedItem.summary,
      selectedItem.state,
      selectedItem._id
    );

    setTimeout(() => {
      fetchTodo()
        .then((res) => {
          console.log("response is ", res);
          console.log("response data ", res.data);
          setTodos(res.data);
          setloading(false);
        })
        .catch((err) => {
          alert("error");
          console.log("error", err);
          setloading(false);
        });
    }, 1000);

    setshowModal(false);
  };
  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setselectedItem({
      ...selectedItem,
      [evt.target.name]: value,
    });
  }

  let serverdomain = "https://todo-server-beta-two.vercel.app";
  // data editing

  async function changeDetails(title, category, summary, state, _id) {
    let response = await fetch(`${serverdomain}/post/todopost`, {
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
    });
    return await response.json();
  }

  //async Todo fetching
  useEffect(() => {
    fetchTodo()
      .then((res) => {
        console.log("response is ", res);
        console.log("response data ", res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        alert("error");
        console.log("error", err);
      });
  }, []);
  async function fetchTodo() {
    let response = await fetch(`${serverdomain}/todoget`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    return await response.json();
  }

  return (
    <div>
     <Navbar/>
      <nav className="grid grid-cols-10 mt-5">
        <section className="col-span-3">
          <div className="flex flex-col gap-4">
            {Todos.map((item, index) => {
              return (
                <div className="flex justify-center ">
                  <button
                    key={index}
                    onClick={() => {
                      setCategory(item.category);
                    }}
                    className={`btn ${
                      category === item.category ? "btn-active" : "btn-outline"
                    }   btn-primary`}
                  >
                    {item.category}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="col-span-7 ">
          {Todos.filter((item) => item.category === category).map((item) => {
            console.log("youthnesss", item);
            return (
              <div>
                {item.data.map((subItem) => {
                  // console.log(subItem);
                  return (
                    <div className="mt-3 mr-5">
                      {/* {subItem.title} */}
                      <div className="collapse bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                          {subItem.title}
                        </div>
                        <div className="collapse-content">
                          <div className="flex justify-between">
                            <p className="textarea textarea-ghost">
                              {subItem.summary}
                            </p>
                            <div className="flex items-center gap-4">
                              <p>{subItem.state}</p>
                              <button
                                onClick={() => {
                                  setselectedItem(subItem);
                                  console.log("inside sub text", subItem);
                                  setshowModal(true);
                                }}
                                className="btn btn-active"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-pen"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </nav>
      {/* The button to open modal */}
      {/* <!-- Modal --> */}
      {/* Put this part before </body> tag */}
      <EditingModal
        showModal={showModal}
        selectedItem={selectedItem}
        handleChange={handleChange}
        handleAfterEdit={handleAfterEdit}
      />

      {loading && <Loader />}
    </div>
  );
}

export default Todos;
