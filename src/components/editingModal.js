import React, { useState } from "react";

function EditingModal({
  showModal,
  selectedItem,
  handleChange,
  handleAfterEdit,
  setshowModal,
  categoryList,
  setselectedItem,
  }) {
  let status = ["OPEN", "PROGRESS", "COMPLETED", "CANCELLED"];
  const [categorySwap, setcategorySwap] = useState(false);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={showModal}
        onChange={handleChange} // dummy
        id="my_modal_7"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setselectedItem({
                  _id: "",
                  title: "",
                  category: "",
                  summary: "",
                  state: "",
                  createdBy: "",
                });
                setshowModal(false);
              }}
              title="Create new category"
              className="btn btn-circle mb-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            value={selectedItem.title}
            onChange={handleChange}
            name="title"
            placeholder="Title here"
            className="input input-ghost w-full my-3"
          />
          {/* category   */}
          <div className="flex gap-2">
            {categorySwap ? (
              <select
                onChange={handleChange}
                name="category"
                className="select select-ghost w-full "
                value={selectedItem.category}
              >
                <option defaultValue={true}>Select category</option>
                {categoryList.map((item, i) => (
                  <option key={item} value={item} selected={true}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={selectedItem.category}
                onChange={handleChange}
                name="category"
                placeholder="New category"
                className="input input-ghost w-full"
              />
            )}

            <button
              onClick={() => {
                setcategorySwap(!categorySwap);
              }}
              title="Create new category"
              className="btn btn-circle btn-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <select
              onChange={handleChange}
              name="state"
              className="select select-ghost w-full"
              value={selectedItem.state}
            >
              <option defaultValue={true} value={""}>
                Select status
              </option>
              {status.map((item, i) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* categore  */}
          <br />
          <i className="hidden">{selectedItem._id}</i>
          <br />
          <textarea
            className="textarea textarea-ghost w-full"
            onChange={handleChange}
            value={selectedItem.summary}
            name="summary"
            placeholder="Enter a Summary here"
          ></textarea>
        </div>
        <label
          onClick={handleAfterEdit}
          className="modal-backdrop"
          htmlFor="my_modal_7"
        >
          Close
        </label>
      </div>
    </div>
  );
}

export default EditingModal;
