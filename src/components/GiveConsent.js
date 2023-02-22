import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProgressBar } from "react-loader-spinner";

import Contract from "./utilities/contract/contract";
import DropDownDataNames from "./DropDownDataNames";

const GiveConsent = () => {
  const [options, setOptions] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [inProgress, setInProgress] = useState(false);

  const give_consent = async () => {
    setInProgress(true);
    const status = await Contract.giveConsent(
      parseInt(selectedOption, 10),
      recipientAddress
    );

    if (!status) {
      toast(
        "Giving consent operation failed due to some problem, Try again later"
      );
    } else {
      toast("Consent to your data has been given successfully");
    }

    setInProgress(false);
  };

  useEffect(() => {
    const get_indexes = async () => {
      const raw = await Contract.getCurrentUserDataIndexes();
      const idx = raw.map((el) => parseInt(el, 10));
      return idx;
    };

    const get_promises = async () => {
      const idx = await get_indexes();
      const _cards = await idx.map(async (el, index) => {
        return await Contract.getUserDataByID(el);
      });
      return await Promise.all(_cards);
    };

    const get_options = async () => {
      const results = await get_promises();
      const _options = results.map((el) => {
        return {
          dataName: el.user_data_name,
          dataId: el.user_data_id,
        };
      });
      setOptions(_options);
    };

    get_options();
  }, []);

  return (
    <div className="flex items-center justify-center p-12 min-h-screen">
      {inProgress ? (
        <div className="absolute flex flex-col justify-center items-center">
          Uploading...
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        ""
      )}
      <div
        className={`mx-auto w-full max-w-[550px] ${
          inProgress ? "opacity-20" : ""
        }`}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base text-[#07074D] font-bold"
          >
            Select data
          </label>

          {/* <DropDownDataNames /> */}
          <select
            onChange={(e) => setSelectedOption(e.target.value)}
            defaultValue={"DEFAULT"}
            name="dataNames"
            className="w-full px-3 py-3 rounded-md bg-zinc-50 border-none shadow-md"
          >
            <option className="" value="DEFAULT" disabled>
              Select data
            </option>
            {options.map((el, idx) => (
              <option
                className=""
                key={idx}
                value={el.dataId}
              >
                {el.dataName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            <span className="font-bold">Recipient wallet address</span>{" "}
            <span className="font-normal">(copy & paste here)</span>
          </label>
          <input
            onChange={(e) => setRecipientAddress(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="e.g. 0x90F79bf6EB2c4f..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => give_consent()}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Give consent
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveConsent;
