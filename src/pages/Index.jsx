import React, { useState } from "react";
import { Container, Button } from "@chakra-ui/react";
import EventModal from "../components/EventModal";

const Index = () => {
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  const categories = ["Electrical", "Mechanical", "Instrument", "Product", "(PLC) Control System", "Operational", "Documentation Control Error", "Foreign Object", "Product Quality"];
  const rootCausesMapping = {
    Electrical: ["Power Surge/Outage", "Electrical Overload", "Wiring Issues", "Component Failure"],
    Mechanical: ["Wear and Tear", "Lubrication Failure", "Misalignment of Shafts", "Overheating of Parts"],
    Instrument: ["Sensor Malfunction", "Calibration Drift", "Communication Failure", "Power Supply Failure"],
    Product: ["Design Flaws", "Specification Deviation", "Material Defect", "Assembly Error"],
    "(PLC) Control System": ["Software Bugs/Errors", "PLC Hardware Failure", "Communication Network Breakdown", "Input/Output Device Malfunction"],
    Operational: ["Operator Error", "Procedure Deviation", "Inadequate Training", "Supervision Lapse"],
    "Documentation Control Error": ["Incorrect Data Entry", "Outdated Procedures or Manuals", "Missing Records or Logs", "Noncompliance with Regulations"],
    "Foreign Object": ["Tool Left Inside Machinery", "Contamination", "Infiltration", "Debris Accumulation"],
    "Product Quality": ["Tolerance Deviation", "Surface Defects", "Material Inconsistency", "Functional Test Failure"],
  };

  return (
    <Container>
      <Button onClick={() => setEventModalOpen(true)}>Load Event</Button>
      <EventModal isOpen={isEventModalOpen} onClose={() => setEventModalOpen(false)} onEventSelect={(event) => console.log(event)} categories={categories} rootCausesMapping={rootCausesMapping} />
    </Container>
  );
};

export default Index;
