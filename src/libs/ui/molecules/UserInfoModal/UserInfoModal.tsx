import React, { useEffect } from "react";
import { classNames } from "@whoiscoming-ui/utilities";
import { Modal, Form, Input, message } from "antd";

import styles from "./UserInfoModal.module.css";

import { CSSProperties, useState } from "react";
import { useMutation } from "@tanstack/react-query";

type RequiredMark = boolean | "optional";

export type UserInfoModalProps = {
  dataTestId: string;
  style?: CSSProperties;
  className?: string;
};

export const UserInfoModal = ({
  dataTestId = "UserInfoModal",
  style,
  className,
}: UserInfoModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const userCreateMutation = useMutation(
    (values: any) => {
      const { user } = values;
      const URL = `http://localhost:3000/users`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: async (data: any) => {
        const result = await data.json();
        localStorage.setItem("userId", result["_id"]);
        localStorage.setItem("email", result["email"]);
        message.success("User created successfully");
      },
      onError: () => {
        message.error("User not created");
      },
    }
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("userId");

    if (!storedEmail || !storedUserId) showModal();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreateUser = (values: any) => {
    userCreateMutation.mutate(values);
    localStorage.setItem("email", values.email);
    setIsModalOpen(false);
  };

  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <Modal
      data-testid={dataTestId}
      title="Enter your information"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      style={style}
      className={classNames([styles.wrapper, className])}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        validateMessages={validateMessages}
        onFinish={onCreateUser}
      >
        <Form.Item
          label="Full name"
          required
          tooltip="This is a required field"
          name={["user", "name"]}
        >
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          rules={[{ type: "email" }]}
          label="Email"
          required
          tooltip="This is a required field"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
