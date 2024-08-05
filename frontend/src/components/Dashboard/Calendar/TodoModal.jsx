import React, { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import CustomModal from "../../common/customModal";

function TodoModal({
  title = "Title",
  isOpen,
  children,
  onClose,
  cancelText,
  onSubmit,
  submitText,
  onDelete,
  deleteText,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div
        className={`${
          isMobile ? "scale-90 transform origin-top" : ""
        } select-none`}
      >
        <div className="text-center mb-4 font-semibold text-lg">{title}</div>
        <div className="text-mainTxt text-sm mb-4">
          {React.Children.map(children, (child) => {
            if (
              isMobile &&
              child.props &&
              child.props.id === "flex justify-between"
            ) {
              // Replace TypeRadio and ImportantRadio with select dropdowns on mobile
              return (
                <div className="flex flex-col space-y-2">
                  <select
                    className="border rounded-md p-2"
                    onChange={(e) =>
                      child.props.children[0].props.setSelected(e.target.value)
                    }
                    value={child.props.children[0].props.selected}
                  >
                    <option value="WORK">Work</option>
                    <option value="REST">Rest</option>
                  </select>
                  <select
                    className="border rounded-md p-2"
                    onChange={(e) =>
                      child.props.children[1].props.setSelected(e.target.value)
                    }
                    value={child.props.children[1].props.selected}
                  >
                    <option value="상">High</option>
                    <option value="중">Medium</option>
                    <option value="하">Low</option>
                  </select>
                </div>
              );
            }
            if (
              isMobile &&
              child.type &&
              child.type.name === "DateRangePicker"
            ) {
              return null;
            }
            return child;
          })}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {onClose && (
            <Button
              className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
              onClick={onClose}
            >
              {cancelText || "닫기"}
            </Button>
          )}
          {onDelete && (
            <Button
              className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-red-500 py-2 px-4 text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:bg-red-600 focus:outline-none"
              onClick={onDelete}
            >
              {deleteText || "Delete"}
            </Button>
          )}
          {onSubmit && (
            <Button
              className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-mainBlue py-2 px-4 text-sm font-semibold text-white shadow-md shadow-[#ff93ac]/20 transition-colors duration-300 hover:bg-subBlue focus:outline-none"
              onClick={onSubmit}
            >
              {submitText || "Submit"}
            </Button>
          )}
        </div>
      </div>
    </CustomModal>
  );
}

export default TodoModal;
