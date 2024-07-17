import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, Card, Button, List } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Input Form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error To fetch Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

return (
  <Layout title={"Dashboard-CreateCategory"}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Category Management</h2>
          <Card className="mb-4">
            <h4>Create New Category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </Card>
          
          <Card title="Existing Categories" style={{maxHeight: '400px', overflowY: 'auto'}}>
            <List
              dataSource={categories}
              renderItem={(c) => (
                <List.Item
                  actions={[
                    <Button
                      size="small"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                    >
                      Edit
                    </Button>,
                    <Button size="small" danger onClick={() => handleDelete(c._id)}>
                      Delete
                    </Button>
                  ]}
                >
                  {c.name}
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="col-md-6">
          <div className="mt-4 p-3 border rounded">
            <h2 className="mb-4">Admin Menu</h2>
            <AdminMenu />
          </div>
        </div>
      </div>
    </div>
    
    <Modal
      title="Update Category"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <CategoryForm
        value={updatedName}
        setValue={setUpdatedName}
        handleSubmit={handleUpdate}
      />
    </Modal>
  </Layout>
);
}

export default CreateCategory;
