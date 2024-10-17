import ListItem from "./ListItem";
import FormDialog from "./AddItem";
import React, { useEffect, useState } from "react";
import axios from "../../utils/middleware";
import { SERVER_BASE_URL } from "../../api/index";
import { useFetchMyProduction } from "../../api/query/productionApi";

const Todays = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [myProductionData, setMyProductionData] = useState([]);
  console.log(myProductionData.productions);

  // const getTasks = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${SERVER_BASE_URL}/todo/get-tasks`
  //     );
  //     const filteredTasks = response.data.tasks.filter(
  //       (task) => task.todo_type === "todo3"
  //     );
  //     setTasks(filteredTasks);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const { data: myProductionResponse, isLoading: isFetching } =
    useFetchMyProduction();

  useEffect(() => {
    if (myProductionResponse) {
      setMyProductionData(myProductionResponse); // Update state with the fetched data
    }
  }, [myProductionResponse]);

  // useEffect(() => {
  //   getTasks();
  // }, []);
  return (
    <div className="pr-2 w-80">
      <div>
        <div className="flex justify-center items-center text-xl font-medium">
          <h1 className="">My pending jobs</h1>
        </div>
      </div>
      <div className="mt-2 md:mt-14">
        <ul>
          {myProductionData?.productions?.map((t) => {
            const currentDate = new Date();

            const [day, month, year] = t.expectedDeliveryDate.split("-");
            const expectedDeliveryDate = new Date(`${year}-${month}-${day}`);

            if (isNaN(expectedDeliveryDate.getTime())) {
              console.error(
                "Invalid expected delivery date:",
                t.expectedDeliveryDate
              );
              return null;
            }

            const timeDiff = expectedDeliveryDate - currentDate;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return t.rolls.map((roll) => (
              <ListItem
                key={roll.rollNo} // Use roll.rollNo as key if it's unique
                id={t._id}
                status={t.markAsDone}
                title={`Cutting / ${
                  roll.rollNo
                } / ${expectedDeliveryDate.toDateString()}`}
                daysLeft={daysLeft >= 0 ? `${daysLeft} days left` : "Past due"}
                heading={"My pending jobs"}
              />
            ));
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todays;
