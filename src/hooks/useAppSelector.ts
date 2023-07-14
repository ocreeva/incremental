import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { type RootState } from "@/App/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
