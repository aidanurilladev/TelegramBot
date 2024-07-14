"use client";
import React from "react";
import scss from "./ContactTelegram.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFormTelegram {
  userName: string;
  subject: string;
  description: string;
  email: string;
}

const ContactTelegram = () => {
  const { register, handleSubmit, reset } = useForm<IFormTelegram>();
  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `UserName: <b>${data.userName}</b> \n`;
    messageTG += `Subject: <b>${data.subject}</b> \n`;
    messageTG += `Description:<b>${data.description}</b>\n`;
    messageTG += `Email: <b>${data.email}</b>`;

    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });

    const message = messageModel(data);
    console.log(message);
  };

  return (
    <div className={scss.ContactTelegram}>
      <div className="container">
        <div className={scss.content}>
          <h2>ContactTelegram</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="userName"
              {...register("userName", { required: true })}
            />{" "}
            <input
              type="text"
              placeholder="subject"
              {...register("subject", { required: true })}
            />{" "}
            <input
              type="text"
              placeholder="description"
              {...register("description", { required: true })}
            />{" "}
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactTelegram;
