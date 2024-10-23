import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useUpdateProduction } from "../../api/query/productionApi";
import toast from "react-hot-toast";

export default function MarkAsCompletedDialog({
  row,
  id,
  markAsDone,
}) {
  const updateProductionMutation = useUpdateProduction();

  const [open, setOpen] = useState(false);
  const [actualPieces, setActualPieces] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAsCompleted = async () => {
    const rolls = row.rolls.map((roll) => ({
      rollNo: roll.rollNo,
      noOfPieces: actualPieces ? Number(actualPieces) : roll.noOfPieces,
    }));
    const updatedMarkAsDone = !markAsDone;

    try {
      await updateProductionMutation.mutateAsync({
        id,
        updatedMarkAsDone,
        rolls,
      });

      toast.success("Production marked as completed successfully");
      handleClose();
    } catch (error) {
      console.error("Failed to update production:", error);
      toast.error("Failed to update production");
    }
  };

  return (
    <div>
      <button className="" onClick={handleClickOpen}>
        Mark as Completed
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
          Mark as Completed / Update
        </DialogTitle>
        <DialogContent>
          <div>
            {row.rolls.map((roll) => (
              <div key={roll.rollNo} className="pt-4">
                <div>
                  Roll Number:{" "}
                  <span className="font-medium">{roll.rollNo}</span>
                </div>

                <div className="flex">
                  {/* Expected No. of Pieces */}
                  <div>
                    <label
                      className="text-sm"
                      htmlFor={`expectedPieces_${roll.rollNo}`}
                    >
                      Expected No. of Pieces
                    </label>
                    <input
                      type="text"
                      id={`expectedPieces_${roll.rollNo}`}
                      name={`expectedPieces_${roll.rollNo}`}
                      value={roll.noOfPieces}
                      readOnly
                      className="py-2 px-4 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Actual No. of Pieces */}
                  <div>
                    <label
                      className="text-sm"
                      htmlFor={`actualPieces_${roll.rollNo}`}
                    >
                      Actual No. of Pieces
                    </label>
                    <input
                      type="text"
                      id={`actualPieces_${roll.rollNo}`}
                      name={`actualPieces_${roll.rollNo}`}
                      placeholder="Enter actual number"
                      className="py-2 px-4 border rounded-lg"
                      onChange={(e) => setActualPieces(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-8 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            className="text-white bg-[#3F51D7] font-medium px-4 py-2 border-2 rounded-xl"
            onClick={handleMarkAsCompleted}
          >
            Mark As Completed
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
