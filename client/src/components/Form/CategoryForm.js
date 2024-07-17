import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="category-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            {value ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
