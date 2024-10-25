import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useFetchAllUsers } from "../../api/query/fetchAllUsers";
import { useFetchAllLifecycle } from "../../api/query/lifecycleApi";
import { useFetchItemsBySubcategory } from "../../api/query/inventory/invetoryApi";
import { useIssueInventoryItems } from "../../api/query/issuanceApi";
import { toast } from "react-hot-toast";

export default function AddMoreInventory() {
  const [open, setOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [formData, setFormData] = useState({
    lot: "",
    stage: "",
    stageId: "",
    inventory: "",
    inventoryItem: "",
    quantity: "",
    allotTo: "",
    name: "",
    contact: "",
  });
  const { mutate: issueInventoryItems, isLoading } = useIssueInventoryItems();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //fetch all users to show name in dropdown
  const { data: peopleData = [], isLoading: isUsersFetching } =
    useFetchAllUsers();

  //fetch all inventory items
  const { data: inventoryResponse, isLoading: isInventoryFetching } =
    useFetchItemsBySubcategory(formData?.inventory);

  //prefill items in select inventory item dropdown
  useEffect(() => {
    if (inventoryResponse && inventoryResponse.length > 0) {
      const inventoryItem = inventoryResponse.find((item) => {
        return item.name === formData.inventoryItem;
      });

      if (inventoryItem) {
        setTotalQuantity(inventoryItem.quantity);
      }
    }
  }, [inventoryResponse, formData.inventoryItem]);

  //fetch all lifecycle
  const { data: lifecycleResponse, isLoading: isAllLifecycleFetching } =
    useFetchAllLifecycle();

  const lifecycleData = lifecycleResponse?.lifecycle || [];

  //filter ongoing lifcycle which has ongoing stage
  const ongoingLifecycle = lifecycleData.filter((item) => {
    return !item.markAsDone && item.stages.some((stage) => !stage.isCompleted);
  });

  //prefill ongoing stage name of selected lot number in ongoing stage field
  useEffect(() => {
    const selectedLifecycle = ongoingLifecycle.find(
      (item) => item._id === formData.lot
    );
    if (selectedLifecycle) {
      const incompleteStage = selectedLifecycle.stages.find(
        (stage) => !stage.isCompleted
      );
      if (incompleteStage || formData.lot) {
        setFormData((prevData) => ({
          ...prevData,
          stage: incompleteStage.stage,
          stageId: incompleteStage._id,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          stage: "",
        }));
      }
    }
  }, [formData.lot]);

  //handle assignTo field
  const handleChange = (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      allotTo: value === "others" ? "others" : value,
    }));
  };

  //handle all input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      lot: formData.lot,
      stage: formData.stageId,
      inventory: formData.inventory,
      inventoryItem: formData.inventoryItem,
      quantity: Number(formData.quantity),
      totalQuantity: totalQuantity,
      allotTo: allotTo === "Others" ? "others" : formData.allotTo,
      name: allotTo === "Others" ? formData.name : undefined,
      contact: allotTo === "Others" ? formData.contact : undefined,
    };

    try {
      issueInventoryItems(payload, {
        onSuccess: (response) => {
          setFormData({
            lot: "",
            stage: "",
            stageId: "",
            inventory: "",
            inventoryItem: "",
            quantity: "",
            allotTo: "",
            name: "",
            contact: "",
          });
          setTotalQuantity("");
          handleClose();
          toast.success("Inventory Items Issued Successfully.");
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.message;
          console.log(errorMessage);

          toast.error(errorMessage);
        },
      });
    } catch (error) {}
  };
  return (
    <div>
      <button
        className="text-[1rem] rounded-lg bg-[#3F51D7] px-6 py-3 text-white font-bold whitespace-nowrap"
        onClick={handleClickOpen}
      >
        Add More
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
          Issue Inventory Items
        </DialogTitle>
        <DialogContent>
          <div className="mt-8">
            <label className="block mb-2 text-lg font-medium" htmlFor="lot">
              Select Lot Number{" "}
            </label>
            <select
              id="lot"
              name="lot"
              value={formData.lot}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Lot Number{" "}
              </option>

              {ongoingLifecycle &&
                ongoingLifecycle?.map((lifecycle, index) => (
                  <option key={index} value={lifecycle._id}>
                    {lifecycle.lotNo}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium" htmlFor="stage">
              Ongoing Stage
            </label>
            <input
              type="text"
              id="stage"
              name="stage"
              value={formData.stage}
              readyOnly
              className="w-full px-4 py-4 border rounded-lg"
              placeholder="No ongoing stage"
            />
          </div>{" "}
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="inventory"
            >
              Select Inventory{" "}
            </label>
            <select
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Inventory
              </option>

              <option value="accessories">Accessories</option>
              <option value="astar">Astar</option>
            </select>
          </div>
          <div className="mt-8">
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="inventoryItem"
            >
              Select Inventory Items{" "}
            </label>
            <select
              id="inventoryItem"
              name="inventoryItem"
              value={formData.inventoryItem}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Inventory Items
              </option>

              {inventoryResponse?.map((item, index) => {
                if (formData.inventory !== "astar") {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                }
                return item.extra_fields?.map((extraField, extraIndex) => {
                  const itemName = extraField.item_name || "";
                  if (itemName) {
                    return (
                      <option key={`${index}-${extraIndex}`} value={itemName}>
                        {itemName}
                      </option>
                    );
                  }
                  return null;
                });
              })}
            </select>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="quantity"
              >
                Quantity
              </label>
              {formData.inventoryItem ? (
                <div>Total Quantity : {totalQuantity}</div>
              ) : (
                <div></div>
              )}
            </div>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border rounded-lg"
            />
          </div>
          <div className="mt-8">
            <label className="block mb-2 text-lg font-medium" htmlFor="allotTo">
              Allot To
            </label>
            <select
              id="allotTo"
              name="allotTo"
              value={formData.allotTo}
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
          {formData.allotTo === "Others" ? (
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
                  className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
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
                  className="w-full px-4 py-4 border rounded-lg sm:w-[50%]"
                  placeholder="Enter your contact"
                />
              </div>{" "}
            </>
          ) : (
            <div></div>
          )}{" "}
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
            onClick={handleSubmit}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
