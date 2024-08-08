import { create } from "zustand";
import { mainLogic } from "../util/assistant-logic";
import { persist } from "zustand/middleware";
import { httpStatusCode } from "../util/http-status";
import Swal from "sweetalert2";

const useGptStore = create((set) => ({
    comment: null,
    setComments: (comment) => {
        set(() => ({comment: comment}))
    }
}));

export default useGptStore;