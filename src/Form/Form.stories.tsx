import React from "react";
import { Form } from "./Form";

export default {
  component: Form,
  title: "Form",
};

const Template = (args: any) => <Form {...args} />;

export const Default = Template.bind({});
// @ts-ignore
Default.args = {};
