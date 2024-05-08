import React, { useState, useEffect, useCallback } from "react";
import ProductList from "../components/ProductList";
import apiService from "../api/apiService";
import { Button, Input, Modal } from "antd";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [seacrhInput, setSearchInput] = useState("");
  const [active, setActive] = useState(false);
  const [productName, setProductName] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const response = await apiService.listProducts(seacrhInput);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products: " + error.message);
    }
  }, [seacrhInput]);

  const handleCreateProduct = async () => {
    await apiService.createProduct(productName).then(() => {
      fetchProducts();
      setActive(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div>
      <Modal
        title="Add product"
        open={active}
        onOk={handleCreateProduct}
        onCancel={() => {
          setProductName("");
          setActive(false);
        }}
      >
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Input
            value={productName}
            placeholder="Enter the product name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
      </Modal>
      <h2>Products</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input
            style={{
              maxWidth: "30%",
            }}
            value={seacrhInput}
            placeholder="Search product"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => setActive(true)}
          >
            Add Product
          </Button>
        </div>
        <ProductList data={products} />
      </div>
    </div>
  );
}

export default HomePage;
