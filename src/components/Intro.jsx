import { UserPlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Form } from "react-router-dom";
import homeImage from "../assets/homeImage.webp";

const Intro = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT – CARD */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Take Control of <span className="text-blue-600">Your Money</span>
          </h1>

          <p className="text-gray-600 mb-6">
            Personal budgeting is the secret to financial freedom. Start your
            journey today.
          </p>

          <Form method="post" className="space-y-4">
            <input
              type="text"
              name="userName"
              required
              placeholder="What is your name?"
              aria-label="Your Name"
              autoComplete="given-name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input type="hidden" name="_action" value="newUser" />

            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2
                         px-6 py-2 font-medium text-white bg-green-600 rounded-md
                         hover:bg-green-700 transition"
            >
              Create Account
              <UserPlusIcon className="w-5 h-5" />
            </button>
          </Form>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="flex justify-center">
          <img
            src={homeImage}
            alt="person with money"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Intro;