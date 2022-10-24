/* eslint-disable no-console */

import { app } from "./app";

app.listen(process.env.API_PORT, () => {
  console.log(`🚀 Server started on port ${process.env.API_PORT}!`);
});

