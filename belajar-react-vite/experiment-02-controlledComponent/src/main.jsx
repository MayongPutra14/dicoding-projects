import React from "react";
import { createRoot } from 'react-dom/client'

import UserForm from "./UserForm";

const root = createRoot(document.getElementById('root'))
root.render(<UserForm/>)