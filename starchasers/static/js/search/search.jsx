import React from "react";
import { createRoot } from "react-dom/client";
import Results from "./results";

const root = createRoot(document.getElementById("reactEntrySearch"));
root.render(<Results />);
