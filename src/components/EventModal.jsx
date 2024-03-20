import React, { useEffect } from "react";
import categories from "../categories.json";

const EventModal = ({ selectedCategory, setSelectedReasonCode }) => {
  useEffect(() => {
    setSelectedReasonCode(categories[selectedCategory][0]);
  }, [selectedCategory]);
};
