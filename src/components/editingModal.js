import React from 'react'

function EditingModal({showModal,selectedItem,handleChange,handleAfterEdit}) {
    let status = ["OPEN", "PROGRESS", "COMPLETED", "CANCELLED"];
  return (
    <div>
         <input
        type="checkbox"
        checked={showModal}
        id="my_modal_7"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <input
            type="text"
            value={selectedItem.title}
            onChange={handleChange}
            name="title"
            placeholder="Type here"
            className="input input-ghost w-full"
          />
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
          <select
            onChange={handleChange}
            name="state"
            className="select select-ghost w-full max-w-xs"
            value={selectedItem.state}
          >
            {status.map((item) => (
              <option value={item} selected={item === selectedItem.state}>
                {item}
              </option>
            ))}
          </select>
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
  )
}

export default EditingModal