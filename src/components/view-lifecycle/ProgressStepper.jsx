import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useFetchAllUsers } from "../../api/query/fetchAllUsers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "../../utils/middleware";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SERVER_BASE_URL } from "../../api/index";
import { DialogContent } from "@mui/material";
import { useUpdateLifecycle } from "../../api/query/lifecycleApi";

export default function ProgressStepper({ refetch }) {
  const { id } = useParams();
  const updateLifecycleMutation = useUpdateLifecycle();
  const [activeStep, setActiveStep] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [completeDialog, setCompleteDialog] = React.useState(false);
  const [stepCompleted, setStepCompleted] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState({});
  const [nextStepLabel, setNextStepLabel] = React.useState("");
  const [lifecycleStages, setLifecycleStages] = React.useState([]); // store lifecycle stages
  const [rolls, setRolls] = useState();
  const [actualPieces, setActualPieces] = useState("");

  const steps = [
    {
      label: "Karigar",
      description: lifecycleStages[0]?.additionalInformation,
    },
    {
      label: "Checking",
      description: lifecycleStages[1]?.additionalInformation,
    },
    {
      label: "FeedOff",
      description: lifecycleStages[2]?.additionalInformation,
    },
    {
      label: "Overlock",
      description: lifecycleStages[3]?.additionalInformation,
    },
    {
      label: "Side & Lupi",
      description: lifecycleStages[4]?.additionalInformation,
    },
    { label: "Belt", description: lifecycleStages[5]?.additionalInformation },
    {
      label: "Thoka & Bottom & Label",
      description: lifecycleStages[6]?.additionalInformation,
    },
    {
      label: "Final Checking",
      description: lifecycleStages[7]?.additionalInformation,
    },
  ];

  // Fetch the lifecycle data by ID
  const fetchLifecycleData = async () => {
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/lifecycle/getLifecycleById/${id}`
      );
      const lifecycleResponse = response.data;
      setRolls(lifecycleResponse.lifecycle.rolls[0]);
      if (lifecycleResponse.lifecycle?.stages) {
        setLifecycleStages(lifecycleResponse.lifecycle.stages);

        const stagesCompletion = lifecycleResponse.lifecycle.stages.map(
          (stage) => stage.isCompleted
        );

        setCompletedSteps(stagesCompletion);

        const firstIncompleteStepIndex = stagesCompletion.findIndex(
          (completed) => !completed
        );
        if (firstIncompleteStepIndex !== -1) {
          setActiveStep(firstIncompleteStepIndex);
        } else {
          setActiveStep(lifecycleResponse.lifecycle.stages.length - 1);
        }
      }
    } catch (error) {
      console.error("Error fetching lifecycle data:", error);
    }
  };

  useEffect(() => {
    fetchLifecycleData();
  }, [id]);

  const handleCompleteButton = () => {
    setCompleteDialog(true);
  };

  const handleCompleteStep = async () => {
    const currentStage = lifecycleStages[activeStep];

    if (!currentStage) return;

    const stageId = currentStage._id;
    const isLastStep = activeStep === lifecycleStages.length - 1;

    if (currentStage.stage === "final checking") {
      try {
        await updateLifecycleMutation.mutateAsync({
          id,
          stageId,
          isCompleted: true,
          markAsDone: true,
          noOfPieces: actualPieces
            ? Number(actualPieces)
            : Number(rolls?.noOfPieces),
          lostPieces: actualPieces ? rolls?.noOfPieces - actualPieces : 0,
        });
        toast.success("Lifecycle completed successfully!");
        setStepCompleted(true);
        setCompleteDialog(false);
        setActualPieces("");
        setCompletedSteps((prev) => ({ ...prev, [activeStep]: true }));

        // Move to the next step
        if (!isLastStep) {
          setActiveStep((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error completing step:", error);
        toast.error("Error completing the step. Please try again.");
      }
    } else {
      try {
        await updateLifecycleMutation.mutateAsync({
          id,
          stageId,
          isCompleted: true,
          noOfPieces: actualPieces
            ? Number(actualPieces)
            : Number(rolls?.noOfPieces),
          lostPieces: actualPieces ? rolls?.noOfPieces - actualPieces : 0,
        });
        toast.success("Step completed successfully!");
        refetch();
        setStepCompleted(true);
        setActualPieces("");
        setCompleteDialog(false);
        setCompletedSteps((prev) => ({ ...prev, [activeStep]: true }));

        // Move to the next step
        if (!isLastStep) {
          setActiveStep((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error completing step:", error);
        toast.error("Error completing the step. Please try again.");
      }
    }
  };

  const navigate = useNavigate();

  const handleBackButton = (e) => {
    navigate("/view-lifecycle");
  };

  const handleStartNextStep = () => {
    if (activeStep < steps.length - 1) {
      setNextStepLabel(steps[activeStep + 1].label);
    }
    setDialogOpen(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStepCompleted(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStepCompleted(false);
    setCompletedSteps({});
  };

  const handleDialogClose = (proceed) => {
    setDialogOpen(false);
    if (proceed) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setStepCompleted(false);
    }
  };

  // Additional state variables
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [price, setPrice] = useState("");
  const [addInfo, setAddInfo] = useState("");

  const { data: peopleData = [], isLoading: isFetching } = useFetchAllUsers();

  // Handle assignTo field
  const handleChange = (event) => {
    const value = event.target.value;
    setAssignTo(value === "others" ? "others" : value);
  };

  // Handle expected date field
  const handleDateChange = (newValue) => {
    if (newValue) {
      setExpectedDeliveryDate(newValue);
    } else {
      setExpectedDeliveryDate(null);
    }
  };

  const handleStartNewStage = async () => {
    const formattedDeliveryDate = expectedDeliveryDate
      ? expectedDeliveryDate.format("DD/MM/YYYY")
      : "";

    const stageData = {
      stage: nextStepLabel,
      expectedDeliveryDate: formattedDeliveryDate,
      price,
      assignTo: assignTo === "Others" ? "others" : assignTo,
      name: assignTo === "Others" ? name : undefined,
      contact: assignTo === "Others" ? contact : undefined,
      additionalInformation: addInfo,
    };

    try {
      await axios.post(
        `${SERVER_BASE_URL}/lifecycle/${id}/new-stage`,
        stageData
      );
      toast.success("New stage started successfully!");
      handleDialogClose(true);
      fetchLifecycleData();
      refetch();
      setName("");
      setContact("");
      setAssignTo("");
      setExpectedDeliveryDate(null);
      setAddInfo("");
      setPrice("");
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} completed={completedSteps[index]}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step?.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  {activeStep === index && !completedSteps[index] ? (
                    <Button
                      variant="contained"
                      onClick={handleCompleteButton}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Complete Step
                    </Button>
                  ) : completedSteps[index] &&
                    index === activeStep &&
                    activeStep < steps.length - 1 ? (
                    <Button
                      variant="outlined"
                      onClick={handleStartNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Start Next Step
                    </Button>
                  ) : null}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
        <Typography>All steps completed - you're finished</Typography>
        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
        Reset
        </Button>
        </Paper>
        )} */}
        <Button variant="contained" onClick={handleBackButton} sx={{ mt: 4 }}>
          Back
        </Button>

        <Dialog
          open={dialogOpen}
          onClose={() => handleDialogClose(false)}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "600px",
                maxWidth: "80%",
                padding: "20px",
              },
            },
          }}
        >
          <DialogTitle>Start {nextStepLabel} Step</DialogTitle>
          <div className="mt-8 px-6 justify-center items-center">
            <div className="">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="assignTo"
              >
                Assign To
              </label>
              <select
                id="assignTo"
                name="assignTo"
                value={assignTo}
                onChange={handleChange}
                className="w-full px-4 py-4 border rounded-lg"
              >
                <option value="" disabled>
                  Select User
                </option>
                {peopleData?.users?.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.name}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>
            </div>
            {assignTo === "Others" ? (
              <>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-lg font-medium"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 border rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-lg font-medium"
                    htmlFor="contact"
                  >
                    Contact
                  </label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-4 py-4 border rounded-lg"
                    placeholder="Enter your contact"
                  />
                </div>
              </>
            ) : null}
            <div className="mt-4">
              <label className="block mb-2 text-lg font-medium" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-4 border rounded-lg"
                placeholder="Enter your contact"
              />
            </div>{" "}
            <div className="mt-4">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="expectedDeliveryDate"
              >
                Expected Delivery Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Expected Delivery Date"
                  value={expectedDeliveryDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="addInfo"
              >
                Additional Info
              </label>
              <textarea
                id="addInfo"
                name="addInfo"
                value={addInfo}
                onChange={(e) => setAddInfo(e.target.value)}
                className="w-full px-4 py-4 border rounded-lg"
                placeholder="Enter additional info"
              />
            </div>
          </div>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
            <Button onClick={handleStartNewStage}>Start</Button>
          </DialogActions>
        </Dialog>

        {/* complete button dialog */}
        <Dialog
          open={completeDialog}
          onClose={() => handleDialogClose(false)}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "600px",
                maxWidth: "80%",
                padding: "20px",
              },
            },
          }}
        >
          <DialogTitle>Complete {steps[activeStep].label} Step</DialogTitle>
          <DialogContent>
            <div className="pt-4">
              <div>
                Roll Number: {rolls?.rollNo}
                <span className="font-medium">{}</span>
              </div>

              <div className="flex">
                {/* Expected No. of Pieces */}
                <div>
                  <label className="text-sm" htmlFor={`expectedPieces`}>
                    Expected No. of Pieces
                  </label>
                  <input
                    type="text"
                    id={`expectedPieces`}
                    name={`expectedPieces`}
                    value={rolls?.noOfPieces}
                    readOnly
                    className="py-2 px-4 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Actual No. of Pieces */}
                <div>
                  <label className="text-sm" htmlFor={`actualPieces`}>
                    Actual No. of Pieces
                  </label>
                  <input
                    type="text"
                    id={`actualPieces}`}
                    name={`actualPieces`}
                    value={actualPieces}
                    onChange={(e) => setActualPieces(e.target.value)}
                    placeholder="Enter actual number"
                    className="py-2 px-4 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCompleteDialog(false)}>Cancel</Button>
            <Button onClick={handleCompleteStep}>Complete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
