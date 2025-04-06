import React from "react";

import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard");
  return <></>;
};

export default Page;
