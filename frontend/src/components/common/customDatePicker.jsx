import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

function CustomDatePicker({ timeSet, editTimeSet, label = null }) {
  return (
    <DemoContainer components={["DatePicker"]} className="w-full sm:w-1/2">
      <DatePicker
        value={dayjs(timeSet)}
        onChange={(e) => editTimeSet(new Date(e))}
        format="YYYY-MM-DD"
        label={label}
        className="w-full"
      />
    </DemoContainer>
  );
}

export default CustomDatePicker;
