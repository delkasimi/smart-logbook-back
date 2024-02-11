//app.js
require("dotenv").config();

const cors = require("cors");

const sequelize = require("./sequelize");

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const express = require("express");
const app = express();
const path = require("path");

app.use(cors());

// Serve static files from the 'media' directory
app.use("/media", express.static(path.join(__dirname, "media")));

// Import routes
const ticketDataRoutes = require("./routes/ticketDataRoutes");
const ticketConfigRoutes = require("./routes/ticketConfigRoutes");
const checklistConfigRoutes = require("./routes/checklistConfigRoutes");
const checklistDataRoutes = require("./routes/checklistDataRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const solutionConfigRoutes = require("./routes/solutionConfigRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const ticketSolutionRelationRoutes = require("./routes/ticketSolutionRelationRoutes");
const assetRoutes = require("./routes/assetRoutes");
const objectRoutes = require("./routes/objectRoutes");
const procedureRoutes = require("./routes/procedureRoutes");
const procedureResponseRoutes = require("./routes/procedureResponseRoutes");
const procedureTypeRoutes = require("./routes/procedureTypeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const phaseRoutes = require("./routes/phaseRoutes");
const operationTypeRoutes = require("./routes/operationTypeRoutes");
const localizationRoutes = require("./routes/localizationRoutes");
const responseTypeRoutes = require("./routes/responseTypeRoutes");
const operationRoutes = require("./routes/operationRoutes");
const actionTypeRoutes = require("./routes/actionTypeRoutes");
const actionReferenceRoutes = require("./routes/actionReferenceRoutes");
const actionRoutes = require("./routes/actionRoutes");
const authRoutes = require("./routes/authRoutes");
const actRoutes = require("./routes/actRoutes");

app.use(express.json());

// Use routes
app.use("/ticket-data", ticketDataRoutes);
app.use("/ticket-config", ticketConfigRoutes);
app.use("/checklist-config", checklistConfigRoutes);
app.use("/checklist-data", checklistDataRoutes);
app.use("/media", mediaRoutes);
app.use("/solution-config", solutionConfigRoutes);
app.use("/solution-data", solutionRoutes);
app.use("/ticket-solution/", ticketSolutionRelationRoutes);
app.use("/asset/", assetRoutes);
app.use("/objects/", objectRoutes);
app.use("/procedure/", procedureRoutes);
app.use("/procedure-response/", procedureResponseRoutes);
app.use("/proceduretype/", procedureTypeRoutes);
app.use("/event/", eventRoutes);
app.use("/phase/", phaseRoutes);
app.use("/operation-Types/", operationTypeRoutes);
app.use("/localizations/", localizationRoutes);
app.use("/responseType/", responseTypeRoutes);
app.use("/operations/", operationRoutes);
app.use("/actionType/", actionTypeRoutes);
app.use("/actionReferences/", actionReferenceRoutes);
app.use("/action/", actionRoutes);
app.use("/auth/", authRoutes);
app.use("/act/", actRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
