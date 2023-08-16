// import React, { useEffect } from "react";
"use client";
import AddTodoBotton from "@/components/AddTodoBotton";
import Loader from "@/components/Loader";
import EditingModal from "@/components/editingModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Todos() {
  //state handling
  const [Todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [showModal, setshowModal] = useState(false);

  const [categoryList, setcategoryList] = useState([
    "Home",
    "Work",
    "Learning",
  ]);

  // const [summary, setSummary] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [selectedItem, setselectedItem] = useState({
    _id: "",
    title: "",
    category: "",
    summary: "",
    state: "",
    createdBy: "",
  });

  const handleDelete = async (subItem) => {
    setloading(true);
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/delete/deletetodo`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          sys_id: subItem._id.trim("").toString(),
        }),
      }
    );
    if (response) {
      setTimeout(() => {
        fetchTodo()
          .then((res) => {
            console.log("response is ", res);
            console.log("response data ", res.data);
            setTodos(res.data);
            setloading(false);
            if (res.code > 205) {
              router.push("/", { scroll: false });
            }
          })
          .catch((err) => {
            console.log("error", err);
            setloading(false);
          });
      }, 1000);
      setselectedItem({
        _id: "",
        title: "",
        category: "",
        summary: "",
        state: "",
        createdBy: "",
      });
    }
    setloading(false);
  };

  const handleAfterEdit = () => {
    if (
      selectedItem.category === "" ||
      selectedItem.summary === "" ||
      selectedItem.title === "" ||
      selectedItem.state === ""
    ) {
      setselectedItem({
        _id: "",
        title: "",
        category: "",
        summary: "",
        state: "",
        createdBy: "",
      });
      setshowModal(false);
    } else {
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
            if (res.code > 205) {
              router.push("/", { scroll: false });
            }
          })
          .catch((err) => {
            console.log("error", err);
            setloading(false);
          });
      }, 1000);
      setselectedItem({
        _id: "",
        title: "",
        category: "",
        summary: "",
        state: "",
        createdBy: "",
      });
      setshowModal(false);
    }
  };
  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setselectedItem({
      ...selectedItem,
      [evt.target.name]: value,
    });
  }

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
    );
    return await response.json();
  }

  useEffect(() => {
    let newArray = [];
    Todos?.map((item) => newArray.push(item.category));

    function removeDuplicates(arr) {
      let unique = [];
      arr.forEach((element) => {
        if (!unique.includes(element)) {
          unique.push(element);
        }
      });
      return unique;
    }

    setcategoryList(removeDuplicates([...newArray, ...categoryList]));
    console.log("yuuuuuuuuuuuuuuuuuuuuuu", categoryList);
  }, [showModal]);

  //async Todo fetching
  useEffect(() => {
    fetchTodo()
      .then((res) => {
        console.log("response is ", res);
        if (res.code > 205) {
          router.push("/", { scroll: false });
        }
        console.log("response data ", res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log("error", err);
        router.push("/", { scroll: false });
      });
  }, []);
  async function fetchTodo() {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/todoget`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    return await response.json();
  }
  return (
    <div>
      {Array.isArray(Todos) && Todos.length ? (
        <div>
          <nav className="grid grid-cols-10 mt-5">
            <section className="col-span-3">
              <div className="flex flex-col gap-4">
                {Todos.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-start pl-4 pr-24">
                      <button
                        onClick={() => {
                          setCategory(item.category);
                        }}
                        className={`btn ${
                          category === item.category
                            ? "btn-active"
                            : "btn-outline"
                        }   btn-primary w-[80%]`}
                      >
                        {item.category}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="col-span-7 ">
              {Todos.filter((item) => item.category === category).map(
                (item, index) => {
                  console.log("youthnesss", item);
                  return (
                    <div key={index}>
                      {item.data.map((subItem) => {
                        // console.log(subItem);
                        return (
                          <div className="mt-3 mr-5">
                            {/* {subItem.title} */}
                            <div className="collapse bg-base-200">
                              <input type="checkbox" />
                              <div className="collapse-title text-xl font-medium">
                                {subItem.title}tghj
                              </div>
                              <div className="collapse-content">
                                <div className="flex justify-between">
                                  <p className="textarea max-w-md textarea-ghost">
                                    {subItem.summary}
                                  </p>
                                  <div className="flex flex-col items-center gap-4">
                                    <p className="btn no-animation ">
                                      {subItem.state}
                                    </p>
                                    <div className="flex gap-3">
                                      <button
                                        onClick={() => {
                                          setselectedItem(subItem);
                                          console.log(
                                            "inside sub text",
                                            subItem
                                          );
                                          setshowModal(true);
                                        }}
                                        className="btn btn-outline btn-primary btn-circle"
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
                                      <button
                                        onClick={() => {
                                          setselectedItem(subItem);
                                          handleDelete(subItem);
                                        }}
                                        className="btn btn-outline btn-warning btn-circle"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-trash3"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              )}
            </section>
          </nav>
          {/* The button to open modal */}
          {/* <!-- Modal --> */}
          {/* Put this part before </body> tag */}
          <EditingModal
            showModal={showModal}
            categoryList={categoryList}
            selectedItem={selectedItem}
            setshowModal={setshowModal}
            handleChange={handleChange}
            setselectedItem={setselectedItem}
            handleAfterEdit={handleAfterEdit}
          />
          <div className="fixed right-10 bottom-12">
            <AddTodoBotton
              setshowModal={setshowModal}
              showModal={showModal}
              setselectedItem={setselectedItem}
              selectedItem={selectedItem}
              handleChange={handleChange}
              handleAfterEdit={handleAfterEdit}
            />
          </div>
          {loading && <Loader />}
        </div>
      ) : (
        <div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello Nigga!</h1>
                <p className="mb-5">
                  "No Todo are currently available for you. Create your first
                  Todo with the below botton."
                </p>
                <AddTodoBotton
                  setshowModal={setshowModal}
                  showModal={showModal}
                  setselectedItem={setselectedItem}
                  selectedItem={selectedItem}
                  handleChange={handleChange}
                  handleAfterEdit={handleAfterEdit}
                />
                <EditingModal
                  showModal={showModal}
                  categoryList={categoryList}
                  selectedItem={selectedItem}
                  setshowModal={setshowModal}
                  handleChange={handleChange}
                  setselectedItem={setselectedItem}
                  handleAfterEdit={handleAfterEdit}
                />
              </div>
            </div>
          </div>
          <Link className="fixed right-10 bottom-12" href={"RandomPics"}>
            <button className="btn btn-outline btn-success">
              Try Image discovery?
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Todos;
