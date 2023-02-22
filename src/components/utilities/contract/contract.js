import { ethers } from "ethers";
import _abi from "../../../abi.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const ABI = { abi: _abi };

// Meta Mask and Wallet functions
async function requestAccounts() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  } else {
    alert("Install Metamask Wallet to run the application");
  }
}

async function getOwner() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const owner = await contract.owner();
  console.log(owner);
}

async function getAddress() {
  const signer = await requestAccounts();
  const address = signer.getAddress();
  return address;
}

// SC interactions
async function insertUserData(data_name, data_cid) {
  var status;

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.addUserData(data_name, data_cid);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }

  return status;
}

async function getCurrentUserDataIndexes() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getSenderUserDataIndexes();
  return data;
}

async function getUserDataByID(data_id) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.readUserData(data_id);
  return data;
}

async function removeUserData(data_id) {
  var status;

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.removeUserData(data_id);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }

  return status;
}

async function isCurrentUserIssuer(user_address) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.isUserIssuer(user_address);
  return data;
}

async function makeIssuerRequest(data_id) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.makeRequest(data_id);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function getRequestIndexes() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getRequestIndexesForCurrentUser();
  return data;
}

async function getRequestByID(request_id) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getRequestById(request_id);
  return data;
}

async function fulfillIssuerRequest(request_id, statusCode) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.fulfillRequest(request_id, statusCode);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function getRequestsMadeByCurrentUser() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getUserRequest();
  return data;
}

async function giveConsent(data_id, recipient_address) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.give_consent(data_id, recipient_address);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function removeConsent(data_id, recipient_address) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.revoke_consent(data_id, recipient_address);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function getConsentGivenListByDataId(data_id) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getApprovedConsentsForData(data_id);
  return data;
}

async function issuerDataVerification(data_id, verification_status) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.issuerVerification(data_id, verification_status);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function checkConsent(data_id, user_address) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.check_consent(data_id, user_address);
  return data;
}

async function userHasConsentIndexes() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getUserConsentDataIndexes();
  return data;
}

async function makeIssuer(issuer_address) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.makeIssuer(issuer_address);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function removeIssuer(issuer_address) {
  let status = false;
  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    const tx = await contract.removeIssuer(issuer_address);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    console.error("Error occured: ", e);
    status = false;
  }
  return status;
}

async function getIssuerAdmins() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, ABI.abi, signer);
  const data = await contract.getIssuerAdmins();
  return data;
}

const _ = {
  requestAccounts,
  getOwner,
  insertUserData,
  getCurrentUserDataIndexes,
  getAddress,
  getUserDataByID,
  removeUserData,
  isCurrentUserIssuer,
  makeIssuerRequest,
  getRequestIndexes,
  getRequestByID,
  fulfillIssuerRequest,
  getRequestsMadeByCurrentUser,
  giveConsent,
  removeConsent,
  getConsentGivenListByDataId,
  issuerDataVerification,
  checkConsent,
  userHasConsentIndexes,
  makeIssuer,
  removeIssuer,
  getIssuerAdmins,
};

export default _;
